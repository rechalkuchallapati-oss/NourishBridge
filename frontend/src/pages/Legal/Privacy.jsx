import LegalPage from "./LegalPage";

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        NourishBridge respects your privacy. We collect only the information needed to operate
        the food redistribution platform — account details, contact information, and activity
        related to donations, pickups, and deliveries.
      </p>
      <p className="mt-4">
        We do not sell personal data. Data is used to verify partners, coordinate food rescue
        operations, send service notifications, and improve platform safety. You may request
        account updates or deletion by contacting our support team through the Contact page.
      </p>
      <p className="mt-4">
        For production deployments, this policy should be reviewed with your legal advisor and
        updated with your organization&apos;s official contact details.
      </p>
    </LegalPage>
  );
}
