"use client";

import {
  useState,
} from "react";

interface Props {
  visitId: string;
}

export function WorkNotesForm({
  visitId,
}: Props) {
  const [
    observation,
    setObservation,
  ] = useState("");

  const [
    actionTaken,
    setActionTaken,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  async function save() {
    try {
      setSaving(true);

      await fetch(
        `/api/engineer/visits/${visitId}/notes`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            observation,
            actionTaken,
          }),
        }
      );

      alert(
        "Notes saved successfully"
      );
    } catch {
      alert(
        "Failed to save notes"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">

      <textarea
        className="w-full border rounded-md p-3"
        rows={5}
        placeholder="Observation"
        value={observation}
        onChange={(e) =>
          setObservation(
            e.target.value
          )
        }
      />

      <textarea
        className="w-full border rounded-md p-3"
        rows={5}
        placeholder="Action Taken"
        value={actionTaken}
        onChange={(e) =>
          setActionTaken(
            e.target.value
          )
        }
      />

      <button
        onClick={save}
        disabled={saving}
        className="border rounded-md px-4 py-2"
      >
        {saving
          ? "Saving..."
          : "Save Notes"}
      </button>

    </div>
  );
}