"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ServiceCallFormValues }
  from "./service-call-form-schema";

interface Company {
  id: string;
  companyName: string;
}

interface Site {
  id: string;
  siteName: string;
}

interface Asset {
  id: string;
  assetName: string;
}

interface ServiceCallFormProps {
  companies: Company[];
  sites: Site[];
  assets: Asset[];
  engineers: Engineer[];
}

interface Engineer {
  id: string;
  name: string;
}

export function ServiceCallForm({
  companies,
  sites,
  assets,
  engineers,
}: ServiceCallFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
  } = useForm<ServiceCallFormValues>();

  async function onSubmit(
    values: ServiceCallFormValues
  ) {
    try {
      const response =
        await fetch(
          "/api/service-calls",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              values
            ),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to create service call"
        );
      }

      router.push(
        "/service-calls"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create service call"
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
            Site
          </Label>

          <select
            {...register(
              "siteId"
            )}
            className="border rounded-md w-full h-10 px-3"
          >
            <option value="">
              Select Site
            </option>

            {sites.map(
              (site) => (
                <option
                  key={site.id}
                  value={site.id}
                >
                  {site.siteName}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <Label>
            Asset
          </Label>

          <select
            {...register(
              "assetId"
            )}
            className="border rounded-md w-full h-10 px-3"
          >
            <option value="">
              Select Asset
            </option>

            {assets.map(
              (asset) => (
                <option
                  key={asset.id}
                  value={asset.id}
                >
                  {asset.assetName}
                </option>
              )
            )}
          </select>
        </div>

        <div>
  <Label>
    Assign Engineer
  </Label>

  <select
    {...register(
      "assignedEngineerId"
    )}
    className="border rounded-md w-full h-10 px-3"
  >
    <option value="">
      Select Engineer
    </option>

    {engineers.map(
      (engineer) => (
        <option
          key={engineer.id}
          value={engineer.id}
        >
          {engineer.name}
        </option>
      )
    )}
  </select>
</div>

        <div>
          <Label>
            Customer Ref No
          </Label>

          <Input
            {...register(
              "customerReferenceNumber"
            )}
          />
        </div>

        <div>
          <Label>
            Call Type
          </Label>

          <Input
            {...register(
              "callType"
            )}
          />
        </div>

        <div>
          <Label>
            Source
          </Label>

          <Input
            {...register(
              "source"
            )}
          />
        </div>

        <div>
          <Label>
            Subject
          </Label>

          <Input
            {...register(
              "subject"
            )}
          />
        </div>

        <div>
          <Label>
            Priority
          </Label>

          <Input
            {...register(
              "priority"
            )}
          />
        </div>

        <div>
          <Label>
            Reported By
          </Label>

          <Input
            {...register(
              "reportedBy"
            )}
          />
        </div>

        <div>
          <Label>
            Mobile
          </Label>

          <Input
            {...register(
              "reportedMobile"
            )}
          />
        </div>

        <div className="col-span-2">
          <Label>
            Description
          </Label>

          <Input
            {...register(
              "description"
            )}
          />
        </div>

      </div>

      <Button type="submit">
        Create Service Call
      </Button>
    </form>
  );
}