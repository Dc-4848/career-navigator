const BASE_URL = 'http://localhost:5000';
const LAN_URL = 'http://192.168.1.19:5000';

async function runSharedDataTest() {
  console.log('====================================================');
  console.log('🔄 PHASE 5: REAL WEB & MOBILE SHARED DATA TEST (MONGODB ATLAS)');
  console.log('====================================================\n');

  const testUser = {
    name: 'Shared Data Tester',
    email: `shared_student_${Date.now()}@careernavigator.com`,
    password: 'Password@123'
  };

  // Step 1: Register dedicated test user on the Web endpoint (http://localhost:5000)
  console.log('▶ Step 1: Registering test user via Web endpoint (http://localhost:5000)...');
  const webSignupRes = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testUser)
  });
  const webSignupData = await webSignupRes.json();
  if (webSignupRes.status !== 201 || !webSignupData.token) {
    throw new Error(`Web registration failed: ${JSON.stringify(webSignupData)}`);
  }
  const webToken = webSignupData.token;
  console.log('✓ Web Registration SUCCESS. Token issued for user ID:', webSignupData.user.id);

  // Step 2: Log in to the mobile endpoint (http://192.168.1.19:5000) using the same account
  console.log('\n▶ Step 2: Logging in via Mobile LAN endpoint (http://192.168.1.19:5000)...');
  const mobileLoginRes = await fetch(`${LAN_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testUser.email, password: testUser.password })
  });
  const mobileLoginData = await mobileLoginRes.json();
  if (mobileLoginRes.status !== 200 || !mobileLoginData.token) {
    throw new Error(`Mobile login failed: ${JSON.stringify(mobileLoginData)}`);
  }
  const mobileToken = mobileLoginData.token;
  console.log('✓ Mobile Login SUCCESS. Token issued for user ID:', mobileLoginData.user.id);

  // Step 3: Retrieve the profile from Web endpoint
  console.log('\n▶ Step 3: Initial profile setup from Web endpoint...');
  const initProfileRes = await fetch(`${BASE_URL}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${webToken}` },
    body: JSON.stringify({
      degree: 'B.Tech Computer Science (Created on Web)',
      year: '2nd Year',
      skills: ['HTML', 'CSS', 'JavaScript'],
      goal: 'Frontend Developer',
      selectedDomain: 'webdev'
    })
  });
  const initProfileData = await initProfileRes.json();
  console.log('✓ Web Initial Profile Saved:', initProfileData.degree);

  // Step 4: Update the profile from Mobile endpoint
  console.log('\n▶ Step 4: Updating profile from Mobile LAN endpoint...');
  const mobileUpdateRes = await fetch(`${LAN_URL}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${mobileToken}` },
    body: JSON.stringify({
      degree: 'B.Tech Computer Science (Updated on Mobile)',
      year: '3rd Year',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      goal: 'Full Stack Architect'
    })
  });
  const mobileUpdateData = await mobileUpdateRes.json();
  console.log('✓ Mobile Profile Update Saved:', mobileUpdateData.degree);
  console.log('  Updated Skills count:', mobileUpdateData.skills.length);

  // Step 5 & 6: Verify the updated profile appears when fetched via Web endpoint
  console.log('\n▶ Step 5 & 6: Fetching profile via Web endpoint to verify persistence...');
  const webVerifyRes = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${webToken}` }
  });
  const webVerifyData = await webVerifyRes.json();
  if (webVerifyData.degree !== 'B.Tech Computer Science (Updated on Mobile)') {
    throw new Error(`Profile sync mismatch: expected "Updated on Mobile", got "${webVerifyData.degree}"`);
  }
  console.log('✓ Web Profile Verification SUCCESS:');
  console.log('  Degree:', webVerifyData.degree);
  console.log('  Year:', webVerifyData.year);
  console.log('  Goal:', webVerifyData.goal);
  console.log('  Skills:', webVerifyData.skills.join(', '));

  // Step 7: Save a roadmap from the Web app
  console.log('\n▶ Step 7: Saving roadmap from Web app endpoint...');
  const sampleRoadmap = {
    domain: 'Web Development',
    weeks: [
      { week: 1, title: 'HTML & Modern CSS', completed: true },
      { week: 2, title: 'JavaScript Fundamentals', completed: false }
    ]
  };
  const webRoadmapRes = await fetch(`${BASE_URL}/roadmap/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${webToken}` },
    body: JSON.stringify({ roadmapData: sampleRoadmap })
  });
  const webRoadmapData = await webRoadmapRes.json();
  console.log('✓ Web Roadmap Saved:', !!webRoadmapData.roadmapData);

  // Step 8: Check whether roadmap is accessible through Mobile LAN endpoint
  console.log('\n▶ Step 8: Retrieving roadmap from Mobile LAN endpoint...');
  const mobileRoadmapRes = await fetch(`${LAN_URL}/roadmap`, {
    headers: { Authorization: `Bearer ${mobileToken}` }
  });
  const mobileRoadmapData = await mobileRoadmapRes.json();
  if (!mobileRoadmapData.roadmapData || mobileRoadmapData.roadmapData.domain !== 'Web Development') {
    throw new Error('Roadmap sync failed');
  }
  console.log('✓ Mobile Roadmap Retrieval SUCCESS:');
  console.log('  Domain:', mobileRoadmapData.roadmapData.domain);
  console.log('  Weeks Count:', mobileRoadmapData.roadmapData.weeks.length);

  // Step 9: Save an internship from Mobile endpoint
  console.log('\n▶ Step 9: Saving internship bookmark from Mobile LAN endpoint...');
  const mobileInternRes = await fetch(`${LAN_URL}/internships/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${mobileToken}` },
    body: JSON.stringify({
      title: 'Full Stack Developer Intern',
      company: 'Atlas Cloud Innovations',
      location: 'Bengaluru, India',
      link: 'https://careernavigator.com/jobs/101',
      type: 'internship'
    })
  });
  const mobileInternData = await mobileInternRes.json();
  console.log('✓ Mobile Internship Saved:', mobileInternData.title, 'at', mobileInternData.company);

  // Step 10: Check whether internship appears on Web endpoint
  console.log('\n▶ Step 10: Retrieving saved internships from Web endpoint...');
  const webInternRes = await fetch(`${BASE_URL}/internships`, {
    headers: { Authorization: `Bearer ${webToken}` }
  });
  const webInternData = await webInternRes.json();
  const foundIntern = Array.isArray(webInternData) ? webInternData.find(i => i.title === 'Full Stack Developer Intern') : null;
  if (!foundIntern) {
    throw new Error('Internship sync failed: bookmark not found on Web');
  }
  console.log('✓ Web Internship Retrieval SUCCESS:');
  console.log('  Found Title:', foundIntern.title);
  console.log('  Company:', foundIntern.company);
  console.log('  ID in MongoDB Atlas:', foundIntern._id);

  console.log('\n====================================================');
  console.log('🎉 ALL 10 SHARED DATA TEST STEPS PASSED 100% IN ATLAS!');
  console.log('====================================================');
}

runSharedDataTest().catch(err => {
  console.error('\n❌ Shared Data Test Failed:', err.message);
  process.exit(1);
});
