const aiConfig = require('../../config/aiConfig');

class LLMService {
  constructor() {
    this.baseUrl = aiConfig.aiBaseUrl;
    this.defaultModel = aiConfig.llmModel;
    this.timeoutMs = aiConfig.timeoutMs;
  }

  /**
   * Check if local model server (Ollama / Local Inference) is online
   */
  async checkServerHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(`${this.baseUrl}/api/tags`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) return { isAvailable: false, error: 'Model server returned status ' + res.status };
      const data = await res.json();
      const models = Array.isArray(data.models) ? data.models.map(m => m.name) : [];
      return { isAvailable: true, models };
    } catch (err) {
      return { isAvailable: false, error: 'Local AI service is temporarily unavailable. Please start the local AI service (Ollama) and try again.' };
    }
  }

  /**
   * Generate text response from local LLM (Qwen3 / local model)
   */
  async generateText(prompt, systemPrompt = 'You are an expert career counselor for Indian tech students.') {
    const health = await this.checkServerHealth();
    if (!health.isAvailable) {
      throw new Error(health.error);
    }

    // Determine target model (use configured model or first available model)
    let modelToUse = this.defaultModel;
    if (health.models && health.models.length > 0) {
      const foundMatch = health.models.find(m => m.includes('qwen') || m.includes('llama') || m.includes('mistral'));
      if (foundMatch) modelToUse = foundMatch;
      else modelToUse = health.models[0];
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelToUse,
          prompt: `System: ${systemPrompt}\n\nUser: ${prompt}`,
          stream: false,
          options: { temperature: 0.3 }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Local LLM server returned HTTP status ${response.status}`);
      }

      const data = await response.json();
      return data.response ? data.response.trim() : '';
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error('Local AI inference timed out. Please try again.');
      }
      throw err;
    }
  }

  /**
   * Generate and parse JSON output safely from local LLM
   */
  async generateJSON(prompt, systemPrompt = 'You are a JSON generator API. Return ONLY valid, minified JSON object without markdown wrappers or extra commentary.') {
    const jsonPrompt = `${prompt}\n\nIMPORTANT: Return strictly raw JSON. Do not include markdown code block tags like \`\`\`json.`;
    const textOutput = await this.generateText(jsonPrompt, systemPrompt);

    // Clean markdown code fence formatting if present
    const cleaned = textOutput
      .replace(/^\`\`\`(json)?/i, '')
      .replace(/\`\`\`$/, '')
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (parseErr) {
      // Attempt substring extraction for JSON object/array
      const match = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (match) {
        return JSON.parse(match[0]);
      }
      throw new Error('Failed to parse valid JSON from local LLM response.');
    }
  }
}

module.exports = new LLMService();
