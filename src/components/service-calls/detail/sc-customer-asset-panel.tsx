import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceCall } from "./sc-types";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Tag,
} from "lucide-react";
import { format, isAfter } from "date-fns";

interface SCCustomerAssetPanelProps {
  call: ServiceCall;
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <Icon
        size={14}
        className="text-zinc-400 mt-0.5 shrink-0"
      />
      <div>
        <p className="text-xs text-zinc-400 leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm text-zinc-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="text-sm text-zinc-400 italic">
      {message}
    </p>
  );
}

export function SCCustomerAssetPanel({
  call,
}: SCCustomerAssetPanelProps) {
  // Warranty status
  const warrantyStatus = (() => {
    if (!call.asset?.warrantyExpiryDate)
      return null;
    const expiry = new Date(
      call.asset.warrantyExpiryDate
    );
    const inWarranty = isAfter(
      expiry,
      new Date()
    );
    return {
      inWarranty,
      label: inWarranty
        ? `In Warranty · Expires ${format(expiry, "dd MMM yyyy")}`
        : `Warranty Expired ${format(expiry, "dd MMM yyyy")}`,
      color: inWarranty
        ? "text-green-600"
        : "text-red-500",
    };
  })();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Customer Panel */}
      <Card className="border-zinc-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">
            Customer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {call.company ? (
            <>
              <div>
                <p className="text-base font-semibold text-zinc-900">
                  {call.company.companyName}
                </p>
                <p className="text-xs text-zinc-400">
                  {call.company.customerCode}
                </p>
              </div>

              {call.site && (
                <Field
                  icon={MapPin}
                  label="Site"
                  value={`${call.site.siteName}${call.site.city ? ` · ${call.site.city}` : ""}`}
                />
              )}

              <Field
                icon={Phone}
                label="Contact"
                value={
                  call.site?.contactPerson ??
                  call.company.contactPerson
                }
              />

              <Field
                icon={Phone}
                label="Mobile"
                value={
                  call.site?.mobile ??
                  call.company.mobile
                }
              />
            </>
          ) : (
            <EmptyState message="No company linked to this call." />
          )}

          {/* Reported by section */}
          {(call.reportedBy ||
            call.customerName) && (
            <div className="pt-2 border-t border-zinc-100">
              <p className="text-xs text-zinc-400 mb-2 uppercase tracking-wide">
                Reported By
              </p>
              <Field
                icon={Tag}
                label="Name"
                value={
                  call.reportedBy ??
                  call.customerName
                }
              />
              <Field
                icon={Phone}
                label="Mobile"
                value={
                  call.reportedMobile ??
                  call.customerMobile
                }
              />
              <Field
                icon={Mail}
                label="Email"
                value={call.customerEmail}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Asset Panel */}
      <Card className="border-zinc-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">
            Asset
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {call.asset ? (
            <>
              <div>
                <p className="text-base font-semibold text-zinc-900">
                  {call.asset.assetName}
                </p>
                <p className="text-xs text-zinc-400">
                  {call.asset.assetCode}
                  {call.asset.equipmentType &&
                    ` · ${call.asset.equipmentType}`}
                </p>
              </div>

              <Field
                icon={Tag}
                label="Model"
                value={call.asset.model}
              />

              <Field
                icon={Tag}
                label="Serial Number"
                value={call.asset.serialNumber}
              />

              <Field
                icon={Calendar}
                label="Installation Date"
                value={
                  call.asset.installationDate
                    ? format(
                        new Date(
                          call.asset
                            .installationDate
                        ),
                        "dd MMM yyyy"
                      )
                    : null
                }
              />

              {warrantyStatus && (
                <div className="flex items-center gap-2">
                  <Shield
                    size={14}
                    className={
                      warrantyStatus.inWarranty
                        ? "text-green-500"
                        : "text-red-400"
                    }
                  />
                  <span
                    className={`text-sm font-medium ${warrantyStatus.color}`}
                  >
                    {warrantyStatus.label}
                  </span>
                </div>
              )}
            </>
          ) : (
            <EmptyState message="No asset linked. Asset may be identified during the visit." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}