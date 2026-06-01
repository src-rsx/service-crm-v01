// components/service-calls/close-call-button.tsx

"use client";

import { useRouter } from "next/navigation";

export function CloseCallButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  async function handleClose() {
    const response =
      await fetch(
        `/api/service-calls/${id}/close`,
        {
          method: "POST",
        }
      );

    if (!response.ok) {
      alert("Failed to close call");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleClose}
      className="rounded-md border px-4 py-2"
    >
      Close Call
    </button>
  );
}