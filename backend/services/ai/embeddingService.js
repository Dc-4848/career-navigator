const aiConfig = require('../../config/aiConfig');

class EmbeddingService {
  constructor() {
    this.baseUrl = aiConfig.aiBaseUrl;
    this.embeddingModel = aiConfig.embeddingModel;
  }

  /**
   * Simple local character n-gram / TF-IDF vectorizer fallback when local embedding server is offline
   */
  _fallbackVectorize(text) {
    const tokens = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    const vocab = ['javascript', 'python', 'java', 'react', 'node', 'sql', 'css', 'html', 'git', 'docker', 'aws', 'api', 'data', 'security', 'machine', 'learning', 'cloud', 'devops', 'testing', 'design'];
    const vector = new Array(vocab.length).fill(0);
    tokens.forEach(tok => {
      const idx = vocab.indexOf(tok);
      if (idx !== -1) vector[idx] += 1;
    });
    // Add length normalization
    const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
    return vector.map(v => v / norm);
  }

  /**
   * Get semantic vector embedding from BAEI BGE-M3 or local model server
   */
  async getEmbedding(text) {
    if (!text || typeof text !== 'string') return this._fallbackVectorize('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${this.baseUrl}/api/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.embeddingModel,
          prompt: text
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.embedding)) {
          return data.embedding;
        }
      }
    } catch {
      // Fallback vectorization if BGE-M3 server endpoint is offline
    }

    return this._fallbackVectorize(text);
  }

  /**
   * Calculate Cosine Similarity between two numerical vectors
   */
  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0;
    const len = Math.min(vecA.length, vecB.length);
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < len; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Compute semantic match score (0 - 100) between two skill lists or text profiles
   */
  async calculateSemanticMatch(userItems, targetItems) {
    if (!Array.isArray(userItems) || userItems.length === 0) return 0;
    if (!Array.isArray(targetItems) || targetItems.length === 0) return 0;

    const userText = userItems.join(', ');
    const targetText = targetItems.join(', ');

    const vecA = await this.getEmbedding(userText);
    const vecB = await this.getEmbedding(targetText);

    const sim = this.cosineSimilarity(vecA, vecB);
    
    // Direct exact keyword match ratio check as complementary feature
    const userLower = userItems.map(i => String(i).toLowerCase().trim());
    const matchedCount = targetItems.filter(t => userLower.includes(String(t).toLowerCase().trim())).length;
    const keywordRatio = matchedCount / targetItems.length;

    // Combined metric: 60% semantic embedding similarity + 40% exact keyword ratio
    const finalScore = Math.round((sim * 0.6 + keywordRatio * 0.4) * 100);
    return Math.min(Math.max(finalScore, 10), 100);
  }
}

module.exports = new EmbeddingService();
