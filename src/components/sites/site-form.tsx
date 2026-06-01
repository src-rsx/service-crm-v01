"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SiteFormValues } from "./site-form-schema";

interface Company {
  id: string;
  companyName: string;
}

interface SiteFormProps {
  companies: Company[];
}

export function SiteForm({
  companies,
}: SiteFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
  } = useForm<SiteFormValues>();

  async function onSubmit(
    values: SiteFormValues
  ) {
    try {
      const response =
        await fetch("/api/sites", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            values
          ),
        });

      if (!response.ok) {
        throw new Error(
          "Failed to create site"
        );
      }

      router.push("/sites");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create site"
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label>
            Company
          </Label>

          <select
            {...register(
              "companyId"
            )}
            className="border rounded-md w-full h-10 px-3"
          >
            <option value="">
              Select Company
            </option>

            {companies.map(
              (company) => (
                <option
                  key={
                    company.id
                  }
                  value={
                    company.id
                  }
                >
                  {
                    company.companyName
                  }
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <Label>
            Site Code
          </Label>

          <Input
            {...register(
              "siteCode"
            )}
          />
        </div>

        <div>
          <Label>
            Site Name
          </Label>

          <Input
            {...register(
              "siteName"
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
          <Label>
            Mobile
          </Label>

          <Input
            {...register(
              "mobile"
            )}
          />
        </div>

        <div>
          <Label>
            Email
          </Label>

          <Input
            {...register(
              "email"
            )}
          />
        </div>

        <div>
          <Label>
            City
          </Label>

          <Input
            {...register(
              "city"
            )}
          />
        </div>

        <div>
          <Label>
            State
          </Label>

          <Input
            {...register(
              "state"
            )}
          />
        </div>
      </div>

      <Button type="submit">
        Create Site
      </Button>
    </form>
  );
}