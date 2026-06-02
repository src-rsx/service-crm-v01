"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
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
  companyId: string;
}

interface Asset {
  id: string;
  assetName: string;
  siteId: string;

  serialNumber: string;
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
    control,
    setValue,
    formState: {
      errors,
      isValid,
    },
  } = useForm<ServiceCallFormValues>({
    mode: "onChange",

    defaultValues: {
      priority: "MEDIUM",
      callType: "BREAKDOWN",
      source: "PHONE",
    },
  });

  const [showCompanies, setShowCompanies] =
    useState(false);

  const [selectedCompany, setSelectedCompany] =
    useState<Company | null>(null);

  const customerName = useWatch({
    control,
    name: "customerName",
  });

  const customerMobile = useWatch({
    control,
    name: "customerMobile",
  });

  const assignedEngineerId = useWatch({
    control,
    name: "assignedEngineerId",
  });

  const priority = useWatch({
    control,
    name: "priority",
  });

  const companySearch =
    useWatch({
      control,
      name: "companySearch",
    });

  const selectedSiteId =
    useWatch({
      control,
      name: "siteId",
    });

  const selectedAssetId =
    useWatch({
      control,
      name: "assetId",
    });

  const selectedAsset =
    assets.find(
      asset =>
        asset.id === selectedAssetId
    );

  const assetSerialSearch =
    useWatch({
      control,
      name: "assetSerialNumber",
    });

  const selectedEngineer =
    engineers.find(
      e =>
        e.id === assignedEngineerId
    );

  const filteredCompanies =
    useMemo(() => {
      if (!companySearch?.trim()) {
        return [];
      }

      return companies
        .filter(company =>
          company.companyName
            .toLowerCase()
            .includes(
              companySearch.toLowerCase()
            )
        )
        .slice(0, 8);
    }, [
      companySearch,
      companies,
    ]);

  const filteredSites =
    selectedCompany
      ? sites.filter(
        site =>
          site.companyId ===
          selectedCompany.id
      )
      : [];

  const filteredAssets =
    selectedSiteId
      ? assets.filter(
        asset =>
          (asset as any).siteId ===
          selectedSiteId
      )
      : assets;

  const matchedAsset =
    assets.find(
      asset =>
        asset.serialNumber
          ?.toLowerCase()
        ===
        assetSerialSearch
          ?.toLowerCase()
    );

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
        const error =
          await response.json();

        throw new Error(
          error?.message ??
          "Failed to create service call"
        );
      }

      router.push(
        "/service-calls"
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create service call"
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
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Identification */}
          {/* Equipment Information */}

          <Card className="border-2 bg-muted/20 shadow-sm">
            <CardHeader>
              <CardTitle>
                Customer Identification
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Optional. Link this call to an existing customer,
                site or asset if known.
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-5">

                {/* Company */}

                <div className="relative">
                  <Label>
                    Company Name
                    <span className="text-red-500">
                      *
                    </span>
                  </Label>

                  <Input
                    className={`
    mt-2
    ${errors.companyName
                        ? "border-red-500"
                        : ""
                      }
  `}
                    placeholder="Search company..."
                    {...register(
                      "companySearch",
                      { required: "Company name is required.", }
                    )}
                    onFocus={() =>
                      setShowCompanies(true)
                    }
                    onChange={(e) => {
                      setValue(
                        "companySearch",
                        e.target.value
                      );

                      setValue(
                        "companyName",
                        e.target.value
                      );

                      setValue(
                        "companyId",
                        undefined
                      );
                    }}
                  />

                  {showCompanies &&
                    filteredCompanies.length > 0 && (
                      <div
                        className="
          absolute
          z-50
          mt-1
          w-full
          rounded-md
          border
          bg-background
          shadow-md
        "
                      >
                        {filteredCompanies.map(
                          company => (
                            <button
                              type="button"
                              key={company.id}
                              className="
                block
                w-full
                px-3
                py-2
                text-left
                hover:bg-muted
              "
                              onClick={() => {
                                setSelectedCompany(
                                  company
                                );

                                setValue(
                                  "companyId",
                                  company.id
                                );

                                setValue(
                                  "companyName",
                                  company.companyName
                                );

                                setValue(
                                  "companySearch",
                                  company.companyName
                                );

                                setShowCompanies(
                                  false
                                );
                              }}
                            >
                              {
                                company.companyName
                              }
                            </button>
                          )
                        )}
                      </div>
                    )}
                </div>

                {/* Site */}

                <div>
                  <Label>
                    Site
                  </Label>

                  <select
                    {...register(
                      "siteId"
                    )}
                    className="
      mt-2
      h-10
      w-full
      rounded-md
      border
      px-3
    "
                  >
                    <option value="">
                      Select Site
                    </option>

                    {filteredSites.map(
                      site => (
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

                {/* Asset */}
                <div>
                  <Label>
                    Asset Serial Number
                  </Label>

                  <Input
                    placeholder="Enter serial number"
                    {...register(
                      "assetSerialNumber"
                    )}
                  />

                  {
                    matchedAsset && (
                      <div
                        className="
        mt-4
        rounded-lg
        border
        bg-background
        p-4
      "
                      >
                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground">
                            MATCHED ASSET
                          </p>

                          <p className="font-semibold">
                            {matchedAsset.assetName}
                          </p>
                        </div>

                        <div className="grid gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Serial:
                            </span>{" "}
                            {matchedAsset.serialNumber}
                          </div>

                          <div>
                            <span className="text-muted-foreground">
                              Asset ID:
                            </span>{" "}
                            {matchedAsset.id}
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Caller Information
              </CardTitle>

              <CardDescription>
                Capture customer details for the incoming request.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <Label>
                    Customer Name
                    <span className="text-red-500">
                      *
                    </span>
                  </Label>

                  <Input
                    className={`
    mt-2
    ${errors.customerName
                        ? "border-red-500"
                        : ""
                      }
  `}
                    {...register(
                      "customerName",
                      { required: "Customer name is required.", }
                    )}
                  />
                  {
                    errors.customerName && (
                      <p className=" mt-1 text-sm text-red-500">
                        {
                          errors.customerName.message
                        }
                      </p>
                    )
                  }
                </div>

                <div>
                  <Label>
                    Mobile Number
                    <span className="text-red-500">
                      *
                    </span>
                  </Label>

                  <Input type="tel"
                    maxLength={10}
                    inputMode="numeric"

                    {...register("customerMobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message:
                          "Enter valid 10 digit mobile number",
                      },
                    })}

                    onInput={(e) => {
                      e.currentTarget.value =
                        e.currentTarget.value.replace(
                          /\D/g,
                          ""
                        );
                    }}
                  />
                  {
                    errors.customerMobile && (
                      <p className=" mt-1 text-sm text-red-500">
                        {
                          errors.customerMobile.message
                        }
                      </p>
                    )
                  }
                </div>

                <div>
                  <Label>
                    Email
                    <span className="text-red-500">
                      *
                    </span>
                  </Label>
                  <Input
                    className={`
    mt-2
    ${errors.customerEmail
                        ? "border-red-500"
                        : ""
                      }
  `}
                    {...register(
                      "customerEmail",
                      {
                        pattern: {
                          value:
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                          message:
                            "Enter valid email address",
                        },
                      }
                    )}
                  />
                  {
                    errors.customerEmail && (
                      <p className="mt-1 text-sm text-red-500">
                        {
                          errors.customerEmail.message
                        }
                      </p>
                    )
                  }
                </div>

                <div>
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

                <div className="md:col-span-2">
                  <Label>
                    Address
                  </Label>

                  <textarea
                    rows={3}
                    className="
 mt-2
 min-h-[100px]
 w-full
 rounded-md
 border
 bg-background
 px-3
 py-2
 text-sm
"
                    {...register(
                      "customerAddress"
                    )}
                  />
                </div>

              </div>
            </CardContent>
          </Card>
          {/* Service Request */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>
                Service Request
              </CardTitle>

              <CardDescription>
                Describe the problem and provide any details shared by the caller.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>
                    Issue
                    <span className="text-red-500">
                      *
                    </span>
                  </Label>

                  <Input
                    className={`
    mt-2
    ${errors.subject
                        ? "border-red-500"
                        : ""
                      }
  `}
                    {...register(
                      "subject",
                      { required: "Subject is required", }
                    )}
                  />
                  {
                    errors.subject && (
                      <p className="mt-1 text-sm text-red-500">
                        {
                          errors.subject.message
                        }
                      </p>
                    )
                  }
                </div>

                <div className="md:col-span-2">
                  <Label>
                    Description
                  </Label>

                  <textarea
                    rows={5}
                    className="
 mt-2
 min-h-[100px]
 w-full
 rounded-md
 border
 bg-background
 px-3
 py-2
 text-sm
"
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
        </div>

        {/* Call Summary right panel */}
        <div className="sticky top-6 space-y-6 self-start">
          <Card>
            <CardHeader>
              <CardTitle>
                Call Summary
              </CardTitle>

              <CardDescription>
                Live preview of this service call.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-3">

              <div className="rounded-md border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Customer
                </p>
                <p className="font-medium mt-1">
                  {customerName || "Not Provided"}
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Mobile
                </p>
                <p className="font-medium mt-1">
                  {customerMobile || "-"}
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Priority
                </p>
                <p className="font-medium mt-1">
                  {priority || "Medium"}
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Status After Save
                </p>
                <p className="font-medium mt-1">
                  {assignedEngineerId
                    ? "ASSIGNED"
                    : "LOGGED"}
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Engineer
                </p>
                <p className="font-medium mt-1">
                  {selectedEngineer?.name ?? "Not Assigned"}
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Company
                </p>
                <p className="font-medium mt-1">
                  {selectedCompany
                    ?.companyName ??
                    "Not Selected"}
                </p>
              </div>

              <div className="rounded-md border p-3">
                <p className="text-xs uppercase text-muted-foreground">
                  Asset Serial Number
                </p>
                <p className="font-medium mt-1">
                  {matchedAsset?.serialNumber ??
                    "Not Linked"}
                </p>
              </div>

            </CardContent>
          </Card>


          {/* Assignment */}

          <Card>
            <CardHeader>
              <CardTitle>
                Assignment
              </CardTitle>

              <CardDescription>
                Assign an engineer now or leave the call unassigned.
              </CardDescription>
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
                <div className="mt-4 rounded-md border p-3 bg-muted/30">
                  <p className="text-sm">
                    {assignedEngineerId
                      ? "This call will be assigned immediately."
                      : "Call will remain in LOGGED state until assigned."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
    sticky
    bottom-0
    z-40
    border-t
    bg-background/95
    backdrop-blur
    py-4
  "
      >
        <div className="
    flex
    items-center
    justify-between
  ">
          <div>
            <p className="text-sm text-muted-foreground">
              Service Call will be created in LOGGED status.
            </p>
          </div>

          <div className="flex gap-3">
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

            <Button type="submit" disabled={!isValid}>
              Create Service Call
            </Button>
          </div>
        </div>
      </div>
      {/* <div className=" sticky bottom-0 bg-background border-t py-4 flex justify-end gap-3">
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

        <Button type="submit" disabled={!isValid}>
          Create Service Call
        </Button>
      </div> */}
    </form>
  );
}