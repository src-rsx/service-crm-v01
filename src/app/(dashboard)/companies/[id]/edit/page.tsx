// import { auth } from "@/auth/auth";
// import { redirect, notFound } from "next/navigation";

// import { companiesService } from "@/modules/companies/service";

// import { CompanyForm } from "@/components/companies/company-form";

// interface EditCompanyPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export default async function EditCompanyPage({
//   params,
// }: EditCompanyPageProps) {
//   const session = await auth();

//   if (!session?.user?.tenantId) {
//     redirect("/login");
//   }

//   const { id } = await params;

//   try {
//     const company =
//       await companiesService.getCompanyById(
//         session.user.tenantId,
//         id
//       );

//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-semibold">
//             Edit Company
//           </h1>

//           <p className="text-muted-foreground">
//             Update company information
//           </p>
//         </div>

//         <CompanyForm
//           mode="edit"
//           company={company}
//         />
//       </div>
//     );
//   } catch {
//     notFound();
//   }
// }