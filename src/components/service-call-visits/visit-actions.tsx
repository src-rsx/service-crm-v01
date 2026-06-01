"use client";

import { useRouter }
  from "next/navigation";

interface Props {
  visitId: string;
  status: string;
}

export function VisitActions({
  visitId,
  status,
}: Props) {
  const router =
    useRouter();

  async function execute(
    action: string
  ) {
    await fetch(
      `/api/service-call-visits/${visitId}/${action}`,
      {
        method: "POST",
      }
    );

    router.refresh();
  }

  return (
    <div className="flex gap-3">

      {status ===
        "ASSIGNED" && (
        <button
          onClick={() =>
            execute(
              "travel"
            )
          }
          className="border rounded-md px-4 py-2"
        >
          Start Travel
        </button>
      )}

      {status ===
        "TRAVELLING" && (
        <button
          onClick={() =>
            execute(
              "check-in"
            )
          }
          className="border rounded-md px-4 py-2"
        >
          Check In
        </button>
      )}

      {status ===
        "IN_PROGRESS" && (
        <button
          onClick={() =>
            execute(
              "check-out"
            )
          }
          className="border rounded-md px-4 py-2"
        >
          Check Out
        </button>
      )}

    </div>
  );
}