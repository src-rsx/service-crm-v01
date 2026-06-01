"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Engineer {
    id: string;
    name: string;
}

interface Props {
    serviceCallId: string;
    engineers: Engineer[];
}

export function ReassignEngineer({
    serviceCallId,
    engineers,
}: Props) {
    const router = useRouter();

    const [engineerId, setEngineerId] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [remarks, setRemarks] =
        useState("");

    async function handleSubmit() {
        if (!engineerId) return;

        setLoading(true);

        try {
            const response =
                await fetch(
                    `/api/service-calls/${serviceCallId}/reassign`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            engineerId,
                            remarks,
                        }),
                    }
                );

            if (!response.ok) {
                throw new Error(
                    "Failed to reassign"
                );
            }

            router.refresh();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-3">
            <select
                value={engineerId}
                onChange={(e) =>
                    setEngineerId(
                        e.target.value
                    )
                }
                className="border rounded-md px-3 py-2"
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
            <textarea
                value={remarks}
                onChange={(e) =>
                    setRemarks(
                        e.target.value
                    )
                }
                placeholder="Reason for reassignment (optional)"
                className="border rounded-md p-2 w-full"
            />
            <button
                onClick={handleSubmit}
                disabled={
                    loading ||
                    !engineerId
                }
                className="rounded-md border px-4 py-2"
            >
                {loading
                    ? "Reassigning..."
                    : "Reassign"}
            </button>
        </div>
    );
}