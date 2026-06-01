import { CompanyForm } from "@/components/companies/company-form";

export default function NewCompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Create Company
        </h1>
      </div>

      <CompanyForm
        mode="create"
      />
    </div>
  );
}