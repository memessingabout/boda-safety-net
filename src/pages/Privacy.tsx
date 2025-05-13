
import MainLayout from "@/components/layout/MainLayout";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white text-lg">How we collect, use, and protect your information.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Introduction</h2>
            <p className="mb-4">
              Digital Boda and Deliveries Association of Kenya ("we", "our", or "us") is committed to protecting the privacy and security of your personal information. This privacy policy describes how we collect, use, and disclose your personal information when you use our website, services, or interact with us.
            </p>
            <p>
              We encourage you to read this privacy policy carefully to understand our practices regarding your personal data and how we will treat it.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Information We Collect</h2>
            <p className="mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong>Personal Identification Information:</strong> Name, ID number, email address, phone number, physical address, and other similar contact data.
              </li>
              <li>
                <strong>Vehicle Information:</strong> Motorcycle registration details, insurance information, and ownership documents.
              </li>
              <li>
                <strong>Membership Information:</strong> Registration date, membership status, payment information, and training records.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access our website.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website and services.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for various purposes, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To register you as a member and provide our services</li>
              <li>To process and manage your membership and payments</li>
              <li>To communicate with you about services, events, and updates</li>
              <li>To verify your identity and eligibility for membership</li>
              <li>To improve our website, services, and member experience</li>
              <li>To comply with legal obligations and regulatory requirements</li>
              <li>To protect our rights, property, or safety, and that of our members and others</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We may share your personal information with the following categories of recipients:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Service providers who perform services on our behalf</li>
              <li>Government authorities and regulatory bodies when required by law</li>
              <li>Partners and affiliated organizations with your consent</li>
              <li>Professional advisers including lawyers, auditors, and insurers</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Your Rights</h2>
            <p className="mb-4">
              Under applicable data protection laws, you may have the following rights:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Erasure of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
              <li>Objection to processing of your personal information</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 bg-light p-4 rounded-md">
              <p>Digital Boda and Deliveries Association of Kenya</p>
              <p>Email: info@digitalboda.co.ke</p>
              <p>Phone: +254 702 423004</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
            </p>
            <p className="mt-4">
              <strong>Last Updated:</strong> May 25, 2024
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
