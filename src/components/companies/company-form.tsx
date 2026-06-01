"use client";

import { useForm } from "react-hook-form";

import {
  CompanyFormValues,
} from "./company-form-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface CompanyFormProps {
  mode: "create" | "edit";

  company?: Partial<CompanyFormValues>;
}

export function CompanyForm({
  mode,
  company,
}: CompanyFormProps) {
  const {
    register,
    handleSubmit,
  } = useForm<CompanyFormValues>({
    defaultValues: {
      customerCode:
        company?.customerCode ?? "",

      companyName:
        company?.companyName ?? "",

      contactPerson:
        company?.contactPerson ?? "",

      mobile:
        company?.mobile ?? "",

      email:
        company?.email ?? "",

      city:
        company?.city ?? "",

      state:
        company?.state ?? "",

      remarks:
        company?.remarks ?? "",
    },
  });

const router = useRouter();

async function onSubmit(
  values: CompanyFormValues
) {
  try {
    const response =
      await fetch("/api/companies", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(values),
      });

    if (!response.ok) {
      throw new Error(
        "Failed to create company"
      );
    }

    router.push("/companies");
  } catch (error) {
    console.error(error);

    alert(
      "Failed to create company"
    );
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label>
            Customer Code
          </Label>

          <Input
            {...register(
              "customerCode"
            )}
          />
        </div>

        <div>
          <Label>
            Company Name
          </Label>

          <Input
            {...register(
              "companyName"
            )}
          />
        </div>

        <div>
          <Label>
            Contact Person
          </Label>

          <Input
            {...register(
              "contactPerson"
            )}
          />
        </div>

        <div>
          <Label>Mobile</Label>

          <Input
            {...register("mobile")}
          />
        </div>

        <div>
          <Label>Email</Label>

          <Input
            {...register("email")}
          />
        </div>

        <div>
          <Label>City</Label>

          <Input
            {...register("city")}
          />
        </div>

        <div>
          <Label>State</Label>

          <Input
            {...register("state")}
          />
        </div>
      </div>

      <Button type="submit">
        {mode === "create"
          ? "Create Company"
          : "Update Company"}
      </Button>
    </form>
  );
}