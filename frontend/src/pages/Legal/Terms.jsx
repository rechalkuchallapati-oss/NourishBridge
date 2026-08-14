import LegalPage from "./LegalPage";

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>
        By creating a NourishBridge account, you agree to use the platform responsibly for lawful
        food redistribution. Donors must provide accurate food details; NGOs and volunteers must
        follow applicable food safety and handling guidelines.
      </p>
      <p className="mt-4">
        NourishBridge facilitates connections between donors, NGOs, and volunteers but does not
        guarantee pickup timing in all circumstances. Users must not misuse the platform, submit
        false listings, or attempt unauthorized access to other accounts.
      </p>
      <p className="mt-4">
        We may suspend accounts that violate these terms or pose a safety risk. Continued use of
        the platform constitutes acceptance of these terms.
      </p>
    </LegalPage>
  );
}
