import React from 'react';
import './Legal.css';

export default function Terms() {
  return (
    <div className="page legal-page">
      <div className="container legal-container">
        <div className="legal-header">
          <span className="badge badge-cyan">Legal Documentation</span>
          <h1>Terms and Conditions</h1>
          <p className="legal-effective">Last Updated: November 2, 2026</p>
        </div>

        <div className="legal-content glass-card">
          <section className="legal-section">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing, browsing, or using the Career Navigator platform, including our web applications,
              mobile applications, and associated API services, you agree to be bound by these Terms and Conditions.
              If you do not agree to these terms, you must not access or use the platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. User Accounts and Security</h2>
            <p>
              When creating an account, you must provide accurate, current, and complete information. You are responsible
              for safeguarding the confidentiality of your login credentials and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized access or breach of security.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Acceptable Use Policy</h2>
            <p>You agree to use Career Navigator only for lawful, educational, and professional career development purposes. You agree not to:</p>
            <ul>
              <li>Attempt to gain unauthorized access to any accounts, computer systems, or networks connected to our servers.</li>
              <li>Circumvent, disable, or tamper with security features, rate limits, or access controls.</li>
              <li>Scrape, harvest, or extract automated data from the platform without explicit authorization.</li>
              <li>Introduce malicious code, viruses, trojan horses, or other harmful materials.</li>
              <li>Transmit harassing, defamatory, fraudulent, or unlawful content.</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Educational Nature and Opportunities Disclaimer</h2>
            <p>
              The learning roadmaps, curricula, skill gap analyses, and ATS resume evaluations provided on Career Navigator
              are structured for guidance and self-directed technical education. We make no guarantee of employment, internship
              acceptance, or specific compensation outcomes.
            </p>
            <p>
              Job, internship, and hackathon listings featured on the platform reference publicly available positions or external
              postings. Career Navigator is not an employer, hiring agent, or recruitment agency. We are not responsible for the
              selection processes, terms of employment, or hiring decisions of external companies.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Intellectual Property</h2>
            <p>
              The Career Navigator software, interface design, logo, database architectures, and original educational roadmaps
              are the proprietary property of Career Navigator and are protected by applicable intellectual property laws.
              Third-party product names, technologies, and trademarks referenced within curricula (such as React, Docker, Python,
              and AWS) belong to their respective copyright and trademark holders and are utilized strictly for descriptive
              educational purposes.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account access if you violate these Terms and Conditions
              or engage in activity that threatens platform security or operational stability. You may terminate your account
              at any time by submitting a deletion request through the platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Career Navigator and its maintainers shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages arising out of your access to, use of,
              or inability to use the platform. The platform is provided on an "as is" and "as available" basis without
              warranties of any kind.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Contact and Legal Inquiries</h2>
            <p>
              Questions regarding these Terms and Conditions should be directed to our support team:
            </p>
            <p className="legal-contact-box">
              <strong>Legal and Terms:</strong> legal@careernavigator.com<br />
              <strong>Platform Administration:</strong> support@careernavigator.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
