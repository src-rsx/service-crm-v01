"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPatch } from "@/lib/api/client";
import {
  ServiceCall,
  ServiceCallStatus,
} from "@/components/service-calls/detail/sc-types";
import { SCHero } from "@/components/service-calls/detail/sc-hero";
import { SCActionBar } from "@/components/service-calls/detail/sc-action-bar";
import { SCCustomerAssetPanel } from "@/components/service-calls/detail/sc-customer-asset-panel";
import { SCProgressTracker } from "@/components/service-calls/detail/sc-progress-tracker";
import { SCResolutionCard } from "@/components/service-calls/detail/sc-resolution-card";
import { SCVisitTimeline } from "@/components/service-calls/detail/sc-visit-timeline";
import { SCAuditSection } from "@/components/service-calls/detail/sc-audit-section";
import { AssignEngineerDialog } from "@/components/service-calls/detail/sc-assign-engineer-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ServiceCallDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [call, setCall] =
    useState<ServiceCall | null>(null);
  const [loading, setLoading] = useState(true);
  const [assignOpen, setAssignOpen] =
    useState(false);

  const fetchCall = useCallback(async () => {
    try {
      const data = await apiGet<ServiceCall>(
        `/api/service-calls/${id}`
      );
      setCall(data);
    } catch {
      toast.error("Failed to load service call");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCall();
  }, [fetchCall]);

  async function handleStatusChange(
    newStatus: ServiceCallStatus
  ) {
    if (!call) return;
    try {
      await apiPatch(
        `/api/service-calls/${id}/status`,
        { status: newStatus }
      );
      toast.success(
        `Status updated to ${newStatus}`
      );
      fetchCall();
    } catch (e: unknown) {
      toast.error(
        e instanceof Error
          ? e.message
          : "Failed to update status"
      );
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4 p-6">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!call) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center py-20">
        <p className="text-zinc-500">
          Service call not found.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() =>
            router.push("/service-calls")
          }
        >
          Back to Service Calls
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {/* Back */}
      <button
        onClick={() =>
          router.push("/service-calls")
        }
        className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-700 transition-colors mb-2"
      >
        <ArrowLeft size={14} />
        Back to Service Calls
      </button>

      {/* Hero */}
      <SCHero call={call} />

      {/* Action Bar */}
      <SCActionBar
        call={call}
        onAssign={() => setAssignOpen(true)}
        onStatusChange={handleStatusChange}
      />

      {/* Customer + Asset */}
      <SCCustomerAssetPanel call={call} />

      {/* Progress Tracker */}
      <SCProgressTracker call={call} />

      {/* Resolution */}
      <SCResolutionCard call={call} />

      {/* Timeline */}
      <SCVisitTimeline
        events={call.events ?? []}
      />

      {/* Audit */}
      <SCAuditSection call={call} />

      {/* Assign Dialog */}
      <AssignEngineerDialog
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        serviceCallId={id}
        currentEngineerId={
          call.assignedEngineerId
        }
        onAssigned={fetchCall}
      />
    </div>
  );
}

// import { auth } from "@/auth/auth";

// import {
//   serviceCallsService,
// } from "@/modules/service-calls/service";

// import {
//   serviceCallVisitsService,
// } from "@/modules/service-call-visits/service";

// import { CloseCallButton } from "@/components/service-calls/close-call-button";

// import {
//   engineersService,
// } from "@/modules/engineers/service";

// import {
//   ReassignEngineer,
// } from "@/components/service-calls/reassign-engineer";

// import {
//   ServiceCallHeader,
// } from "@/components/service-calls/detail/service-call-header";

// import {
//   ServiceCallOverview,
// } from "@/components/service-calls/detail/service-call-overview";

// import {
//   ServiceCallSidebar,
// } from "@/components/service-calls/detail/service-call-sidebar";

// import {
//   ServiceCallResolution,
// } from "@/components/service-calls/detail/service-call-resolution";

// interface Props {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export default async function ServiceCallDetailPage(
//   { params }: Props
// ) {
//   const { id } =
//     await params;

//   const session =
//     await auth();

//   if (
//     !session?.user?.tenantId
//   ) {
//     throw new Error(
//       "Tenant not found"
//     );
//   }

//   const call =
//     await serviceCallsService.getServiceCallById(
//       session.user.tenantId,
//       id
//     );

//   const visit =
//     await serviceCallVisitsService.getVisitByServiceCall(
//       session.user.tenantId,
//       id
//     );

//   const engineersResult =
//     await engineersService.getEngineers(
//       session.user.tenantId,
//       {
//         page: 1,
//         pageSize: 100,
//       }
//     );

//   const visitHistory =
//     await serviceCallVisitsService
//       .getVisitHistory(
//         session.user.tenantId,
//         id
//       );

//   return (
//     <div
//       className="
//       space-y-6
//       max-w-7xl
//       mx-auto
//     "
//     >

//       <ServiceCallHeader
//         call={call}
//       />

//       <div
//         className="
//     grid
//     gap-8
//     lg:grid-cols-12
//     items-start
//   "
//       >
//         <div
//           className="
//       lg:col-span-8
//       space-y-8
//     "
//         >
//           <ServiceCallOverview
//             call={call}
//           />

//           <ServiceCallResolution
//             visit={visit}
//           />
//         </div>

//         <div className="lg:col-span-4">
//           <ServiceCallSidebar
//             call={call}
//             engineers={
//               engineersResult.engineers
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }