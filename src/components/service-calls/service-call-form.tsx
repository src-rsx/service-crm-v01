"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

interface Engineer {
  id: string;
  name: string;
}

interface ServiceCallFormProps {
  companies: Company[];
  sites: Site[];
  assets: Asset[];
  engineers: Engineer[];
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
      className="space-y-8"
    >
      {/* Customer Information */}

      <Card>
        <CardHeader>
          <CardTitle>
            Customer Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>
                Company
              </Label>

              <select
                {...register(
                  "companyId"
                )}
                className="mt-2 h-10 w-full rounded-md border px-3"
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
                className="mt-2 h-10 w-full rounded-md border px-3"
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
                Reported By
              </Label>

              <Input
                className="mt-2"
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
                className="mt-2"
                {...register(
                  "reportedMobile"
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Label>
                Customer Reference Number
              </Label>

              <Input
                className="mt-2"
                {...register(
                  "customerReferenceNumber"
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Information */}

      <Card>
        <CardHeader>
          <CardTitle>
            Equipment Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>
                Asset
              </Label>

              <select
                {...register(
                  "assetId"
                )}
                className="mt-2 h-10 w-full rounded-md border px-3"
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
          </div>
        </CardContent>
      </Card>

      {/* Service Request */}

      <Card>
        <CardHeader>
          <CardTitle>
            Service Request
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>
                Subject
              </Label>

              <Input
                className="mt-2"
                {...register(
                  "subject"
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Label>
                Description
              </Label>

              <textarea
                rows={5}
                className="mt-2 w-full rounded-md border px-3 py-2"
                {...register(
                  "description"
                )}
              />
            </div>

            <div>
              <Label>
                Priority
              </Label>

              <select
                {...register(
                  "priority"
                )}
                className="mt-2 h-10 w-full rounded-md border px-3"
              >
                <option value="LOW">
                  LOW
                </option>

                <option value="MEDIUM">
                  MEDIUM
                </option>

                <option value="HIGH">
                  HIGH
                </option>

                <option value="CRITICAL">
                  CRITICAL
                </option>
              </select>
            </div>

            <div>
              <Label>
                Call Type
              </Label>

              <select
                {...register(
                  "callType"
                )}
                className="mt-2 h-10 w-full rounded-md border px-3"
              >
                <option value="BREAKDOWN">
                  BREAKDOWN
                </option>

                <option value="SERVICE">
                  SERVICE
                </option>

                <option value="INSTALLATION">
                  INSTALLATION
                </option>

                <option value="PREVENTIVE_MAINTENANCE">
                  PREVENTIVE MAINTENANCE
                </option>
              </select>
            </div>

            <div>
              <Label>
                Source
              </Label>

              <select
                {...register(
                  "source"
                )}
                className="mt-2 h-10 w-full rounded-md border px-3"
              >
                <option value="PHONE">
                  PHONE
                </option>

                <option value="EMAIL">
                  EMAIL
                </option>

                <option value="WHATSAPP">
                  WHATSAPP
                </option>

                <option value="WEB">
                  WEB
                </option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignment */}

      <Card>
        <CardHeader>
          <CardTitle>
            Assignment
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div>
            <Label>
              Assign Engineer
            </Label>

            <select
              {...register(
                "assignedEngineerId"
              )}
              className="mt-2 h-10 w-full rounded-md border px-3"
            >
              <option value="">
                Select Engineer
              </option>

              {engineers.map(
                (engineer) => (
                  <option
                    key={
                      engineer.id
                    }
                    value={
                      engineer.id
                    }
                  >
                    {
                      engineer.name
                    }
                  </option>
                )
              )}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            router.push(
              "/service-calls"
            )
          }
        >
          Cancel
        </Button>

        <Button type="submit">
          Create Service Call
        </Button>
      </div>
    </form>
  );
}