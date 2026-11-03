import React from 'react';
import './Legal.css';

export default function PrivacyPolicy() {
  return (
    <div className="page legal-page">
      <div className="container legal-container">
        <div className="legal-header">
          <span className="badge badge-cyan">Legal Documentation</span>
          <h1>Privacy Policy</h1>
          <p className="legal-effective">Last Updated: November 2, 2026</p>
        </div>

        <div className="legal-content glass-card">
          <section className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Career Navigator ("the Platform", "we", "us", or "our") provides career guidance, technical learning roadmaps,
              curated educational resources, and job application tracking tools for students and software engineering professionals.
              We are committed to maintaining the confidentiality and integrity of your personal information. This Privacy Policy
              describes the collection, storage, use, and disclosure of data when you access or use our web and mobile applications.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information We Collect</h2>
            <p>We collect information that you directly provide when registering an account, configuring your profile, or utilizing platform features:</p>
            <ul>
              <li><strong>Account Credentials:</strong> Full name, email address, and securely salted and hashed password representations (passwords are never stored in plain text).</li>
              <li><strong>Academic and Career Profile:</strong> Degree or educational program, current year of study, self-reported technical skills, areas of interest, and career objectives.</li>
              <li><strong>Curriculum and Learning Progress:</strong> Completed roadmap stages, checked milestone topics, saved roadmaps, and custom curriculum generation inputs.</li>
              <li><strong>Job Application Tracking Data:</strong> Company names, role titles, application stages (e.g. Applied, Assessment, Interview), personal notes, and follow-up deadlines recorded in the Application Tracker.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How Information is Used</h2>
            <p>We utilize the collected information strictly for the following operational purposes:</p>
            <ul>
              <li>To provide, maintain, and personalize your learning roadmaps and career progression dashboard.</li>
              <li>To authenticate your session securely across our web and mobile applications.</li>
              <li>To calculate skill matches against technical domains and suggest relevant learning resources.</li>
              <li>To persist and organize your job and internship application lifecycle.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal data to third parties, advertisers, or data brokers.</p>
          </section>

          <section className="legal-section">
            <h2>4. Authentication and Data Security</h2>
            <p>
              Account passwords are cryptographically hashed using bcrypt with salt prior to storage.
              Authentication sessions utilize stateless JSON Web Tokens (JWT) transmitted over encrypted HTTPS transport.
              Tokens are stored on your local device (in browser localStorage for web, or encrypted AsyncStorage on mobile).
              We enforce role-based access control and strict boundary checks on all API endpoints.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Data Storage and Retention</h2>
            <p>
              All user account records, profiles, roadmap progress, and application tracking cards are stored in
              managed cloud database clusters provided by MongoDB Atlas with encryption at rest and in transit.
              We retain your information as long as your account remains active. If you choose to delete your account,
              your associated profile, progress records, and tracked applications are permanently deleted from our database.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Third-Party Links and External Opportunities</h2>
            <p>
              The platform contains links to external technical documentation, tutorials, open-source repositories,
              internship portals, and hackathon registrations. We do not control or endorse the privacy practices,
              content, or policies of external websites. We encourage you to review the privacy policies of any third-party
              services you choose to visit.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Cookies and Local Storage</h2>
            <p>
              Career Navigator does not utilize third-party tracking or advertising cookies.
              Client-side web local storage is utilized strictly to persist your authentication token and UI preferences
              between active sessions.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Your Rights and Account Deletion</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access, inspect, and update your personal and academic profile details at any time via the Profile settings.</li>
              <li>Export or request a copy of your stored learning progress and application pipeline data.</li>
              <li>Request complete and permanent deletion of your account and all associated records.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>9. Contact Information</h2>
            <p>
              If you have inquiries, concerns, or requests regarding this Privacy Policy or your data,
              please reach out through the official support channel:
            </p>
            <p className="legal-contact-box">
              <strong>Data Inquiries:</strong> privacy@careernavigator.com<br />
              <strong>Platform Support:</strong> support@careernavigator.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
