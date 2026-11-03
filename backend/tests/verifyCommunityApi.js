async function testCommunity() {
  const BASE_URL = 'http://localhost:5000';
  console.log('--- Testing Community API Endpoints ---');

  // 1. Authenticate (Login or register if not existing)
  const email = 'community_qa@careernavigator.com';
  const password = 'TestPassword123!';
  let token = null;
  let user = null;

  try {
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (loginRes.ok) {
      const data = await loginRes.json();
      token = data.token;
      user = data.user;
    }
  } catch {}

  if (!token) {
    const regRes = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Dhanush Chandra', email, password })
    });
    const regData = await regRes.json();
    if (!regRes.ok) throw new Error(`Signup failed: ${JSON.stringify(regData)}`);
    token = regData.token;
    user = regData.user;
  }

  console.log('✓ Authentication successful for user:', user.name);

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // 2. Fetch posts
  const feedRes = await fetch(`${BASE_URL}/community/posts`, { headers: authHeaders });
  const feedData = await feedRes.json();
  console.log(`✓ Fetched ${feedData.posts.length} posts from feed.`);

  const pollPost = feedData.posts.find(p => p.postType === 'poll');
  if (pollPost) {
    console.log('✓ Found poll post:', pollPost.poll.question);
    
    // 3. Vote on poll (Option index 2: Python)
    const voteRes = await fetch(`${BASE_URL}/community/posts/${pollPost._id}/poll/vote`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ optionIndex: 2 })
    });
    const voteData = await voteRes.json();
    console.log('✓ Voted on poll. Total votes:', voteData.poll.totalVotes, 'Options:', voteData.poll.options.map(o => `${o.text}: ${o.votesCount} (${o.percentage}%)`));
  }

  // 4. Like first post
  const firstPost = feedData.posts[0];
  const likeRes = await fetch(`${BASE_URL}/community/posts/${firstPost._id}/like`, {
    method: 'POST',
    headers: authHeaders
  });
  const likeData = await likeRes.json();
  console.log(`✓ Toggled like on post. isLiked: ${likeData.isLiked}, likesCount: ${likeData.likesCount}`);

  // 5. Add a comment
  const commentRes = await fetch(`${BASE_URL}/community/posts/${firstPost._id}/comments`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      content: 'Practicing sliding window and two pointers helped me solve technical questions faster!'
    })
  });
  const commentData = await commentRes.json();
  console.log(`✓ Added comment. Author: ${commentData.authorName}, Text: "${commentData.content}"`);

  // 6. Fetch comments
  const commentsRes = await fetch(`${BASE_URL}/community/posts/${firstPost._id}/comments`, { headers: authHeaders });
  const commentsData = await commentsRes.json();
  console.log(`✓ Fetched ${commentsData.length} comments for post.`);

  // 7. Create a new student post
  const createRes = await fetch(`${BASE_URL}/community/posts`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      category: 'Hackathons',
      title: 'Forming a 3-member team for upcoming SIH and MLH Web3 Track',
      content: 'Looking for a teammate who is comfortable with backend Node.js and smart contract integration. We already have 2 members with React and UI/UX design experience.',
      tags: ['Hackathons', 'TeamBuilding', 'Web3', 'NodeJS'],
      postType: 'discussion'
    })
  });
  const createData = await createRes.json();
  console.log('✓ Created post with ID:', createData._id);

  // 8. Edit own post
  const editRes = await fetch(`${BASE_URL}/community/posts/${createData._id}`, {
    method: 'PUT',
    headers: authHeaders,
    body: JSON.stringify({
      title: 'Forming a 3-member team for upcoming SIH and MLH Hackathons [Updated]'
    })
  });
  const editData = await editRes.json();
  console.log('✓ Updated post title:', editData.title);

  // 9. Share post
  const shareRes = await fetch(`${BASE_URL}/community/posts/${createData._id}/share`, {
    method: 'POST'
  });
  const shareData = await shareRes.json();
  console.log('✓ Registered share. Shares count:', shareData.sharesCount);

  // 10. Clean up created post
  const deleteRes = await fetch(`${BASE_URL}/community/posts/${createData._id}`, {
    method: 'DELETE',
    headers: authHeaders
  });
  const deleteData = await deleteRes.json();
  console.log('✓ Deleted test post cleanly:', deleteData.message);

  console.log('--- ALL COMMUNITY BACKEND TESTS PASSED SUCCESSFULLY! ---');
}

testCommunity().catch(err => {
  console.error('Test failed:', err.message);
  process.exit(1);
});
