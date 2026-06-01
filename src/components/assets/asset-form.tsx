"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AssetFormValues } from "./asset-form-schema";

interface Company {
  id: string;
  companyName: string;
}

interface Site {
  id: string;
  siteName: string;
}

interface Manufacturer {
  id: string;
  name: string;
}

interface AssetFormProps {
  companies: Company[];
  sites: Site[];
  manufacturers: Manufacturer[];
}

export function AssetForm({
  companies,
  sites,
  manufacturers,
}: AssetFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
  } = useForm<AssetFormValues>();

  async function onSubmit(
    values: AssetFormValues
  ) {
    try {
      const response =
        await fetch("/api/assets", {
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
          "Failed to create asset"
        );
      }

      router.push("/assets");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create asset"
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
                  key={
                    site.id
                  }
                  value={
                    site.id
                  }
                >
                  {
                    site.siteName
                  }
                </option>
              )
            )}
          </select>
        </div>

<div>
  <Label>
    Manufacturer
  </Label>

  <select
    {...register(
      "manufacturerId"
    )}
    className="border rounded-md w-full h-10 px-3"
  >
    <option value="">
      Select Manufacturer
    </option>

    {manufacturers.map(
      (manufacturer) => (
        <option
          key={
            manufacturer.id
          }
          value={
            manufacturer.id
          }
        >
          {
            manufacturer.name
          }
        </option>
      )
    )}
  </select>
</div>

        <div>
          <Label>
            Asset Code
          </Label>

          <Input
            {...register(
              "assetCode"
            )}
          />
        </div>

        <div>
          <Label>
            Asset Name
          </Label>

          <Input
            {...register(
              "assetName"
            )}
          />
        </div>

        <div>
          <Label>
            Equipment Type
          </Label>

          <Input
            {...register(
              "equipmentType"
            )}
          />
        </div>

        <div>
          <Label>
            Model
          </Label>

          <Input
            {...register(
              "model"
            )}
          />
        </div>

        <div>
          <Label>
            Serial Number
          </Label>

          <Input
            {...register(
              "serialNumber"
            )}
          />
        </div>

        <div>
          <Label>
            Location
          </Label>

          <Input
            {...register(
              "location"
            )}
          />
        </div>

        <div>
          <Label>
            Remarks
          </Label>

          <Input
            {...register(
              "remarks"
            )}
          />
        </div>
      </div>

      <Button type="submit">
        Create Asset
      </Button>
    </form>
  );
}