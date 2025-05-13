
import MainLayout from "@/components/layout/MainLayout";

const Terms = () => {
  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-white text-lg">Please read these terms carefully before using our services.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
            <p>
              These Terms and Conditions ("Terms") govern your use of the Digital Boda and Deliveries Association of Kenya ("DBDDAK") website and services. By accessing our website or using our services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the website or use our services.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">1. Membership Terms</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Eligibility:</strong> Membership is open to boda boda riders and delivery personnel who meet our eligibility criteria, including valid identification, motorcycle ownership or authorization to operate, and valid driving license.
              </li>
              <li>
                <strong>Registration:</strong> Members must provide accurate, current, and complete information during the registration process and keep their information updated.
              </li>
              <li>
                <strong>Membership Fees:</strong> Members are required to pay the applicable membership fees. Fees are non-refundable except as expressly provided in these Terms.
              </li>
              <li>
                <strong>Code of Conduct:</strong> Members must adhere to our Code of Conduct, which includes professional behavior, safety standards, and compliance with all applicable laws and regulations.
              </li>
              <li>
                <strong>Termination:</strong> We reserve the right to terminate or suspend membership for violations of these Terms, the Code of Conduct, or for any other reason at our discretion.
              </li>
            </ol>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">2. Website Use</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Content:</strong> The content on our website is for informational purposes only. While we strive to keep information accurate and up-to-date, we make no representations or warranties about the completeness, reliability, or accuracy of this information.
              </li>
              <li>
                <strong>User Accounts:</strong> If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
              </li>
              <li>
                <strong>Prohibited Activities:</strong> You may not use our website for any illegal purpose or to transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.
              </li>
            </ol>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">3. Intellectual Property</h2>
            <p className="mb-4">
              The Digital Boda name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of DBDDAK. You may not use these marks without our prior written permission.
            </p>
            <p>
              All content on the website, including but not limited to text, graphics, logos, images, audio clips, and software, is the property of DBDDAK and is protected by copyright and other intellectual property laws.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">4. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall DBDDAK, its directors, officers, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Your access to or use of or inability to access or use our website or services</li>
              <li>Any conduct or content of any third party on the website</li>
              <li>Any content obtained from the website</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ol>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">5. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">6. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">7. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 bg-light p-4 rounded-md">
              <p>Digital Boda and Deliveries Association of Kenya</p>
              <p>Email: info@digitalboda.co.ke</p>
              <p>Phone: +254 702 423004</p>
            </div>
          </div>

          <div>
            <p className="mt-4">
              <strong>Last Updated:</strong> May 25, 2024
            </p>
            <p className="mt-4 text-center">
              By using our website or services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;
