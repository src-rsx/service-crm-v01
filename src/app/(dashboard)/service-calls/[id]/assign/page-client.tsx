"use client";

import { useRouter }
  from "next/navigation";

import { useState }
  from "react";

interface Engineer {
  id: string;

  employeeCode: string | null;

  name: string;
}

interface Props {
  serviceCallId: string;

  engineers: Engineer[];
}

export default function AssignEngineerForm({
  serviceCallId,
  engineers,
}: Props) {
  const router =
    useRouter();

  const [
    engineerId,
    setEngineerId,
  ] = useState("");

  async function submit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const response =
        await fetch(
          `/api/service-calls/${serviceCallId}/assign`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                engineerId,
              }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Assignment failed"
        );
      }

      router.push(
        "/service-calls"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to assign engineer"
      );
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 max-w-xl"
    >
      <div>
        <label className="block mb-2">
          Engineer
        </label>

        <select
          value={
            engineerId
          }
          onChange={(e) =>
            setEngineerId(
              e.target.value
            )
          }
          className="border rounded-md w-full h-10 px-3"
        >
          <option value="">
            Select Engineer
          </option>

          {engineers.map(
            (
              engineer
            ) => (
              <option
                key={
                  engineer.id
                }
                value={
                  engineer.id
                }
              >
                {
                  engineer.employeeCode ?? "NO-CODE"
                }
                {" - "}
                {
                  engineer.name
                }
              </option>
            )
          )}
        </select>
      </div>

      <button
        type="submit"
        className="border rounded-md px-4 py-2"
      >
        Assign Engineer
      </button>
    </form>
  );
}