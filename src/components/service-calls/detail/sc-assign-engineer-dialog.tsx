"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiGetList, apiPatch } from "@/lib/api/client";
import { Engineer } from "./sc-types";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

interface AssignEngineerDialogProps {
    open: boolean;
    onClose: () => void;
    serviceCallId: string;
    currentEngineerId: string | null;
    onAssigned: () => void;
}

export function AssignEngineerDialog({
    open,
    onClose,
    serviceCallId,
    currentEngineerId,
    onAssigned,
}: AssignEngineerDialogProps) {

    const [engineers, setEngineers] = useState<Engineer[]>([]);
    const [loading, setLoading] =
        useState(true);

    const [selected, setSelected] = useState<string | null
    >(currentEngineerId);[] > ([]);

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!open) return;
        setLoading(true);
        apiGetList<Engineer>("/api/engineers", {
            pageSize: 100,
        })
            .then((res) => {
                setEngineers(res.data);
                setSelected(currentEngineerId);
            })
            .finally(() => setLoading(false));
    }, [open, currentEngineerId]);

    async function handleAssign() {
        if (!selected) return;
        setSaving(true);
        try {
            await apiPatch(
                `/api/service-calls/${serviceCallId}/assign`,
                { engineerId: selected }
            );
            onAssigned();
            onClose();
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {currentEngineerId
                            ? "Reassign Engineer"
                            : "Assign Engineer"}
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-2 max-h-72 overflow-y-auto space-y-1.5">
                    {loading ? (
                        Array.from({ length: 4 }).map(
                            (_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-12 w-full rounded-md"
                                />
                            )
                        )
                    ) : engineers.length === 0 ? (
                        <p className="text-sm text-zinc-500 text-center py-6">
                            No active engineers found.
                        </p>
                    ) : (
                        engineers.map((eng) => (
                            <button
                                key={eng.id}
                                onClick={() =>
                                    setSelected(eng.id)
                                }
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-md border text-left transition-colors ${selected === eng.id
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-zinc-200 hover:bg-zinc-50"
                                    }`}
                            >
                                <div>
                                    <p className="text-sm font-medium text-zinc-800">
                                        {eng.name}
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        {eng.designation ??
                                            "Engineer"}
                                        {eng.employeeCode &&
                                            ` · ${eng.employeeCode}`}
                                    </p>
                                </div>
                                {selected === eng.id && (
                                    <Check
                                        size={16}
                                        className="text-blue-600"
                                    />
                                )}
                            </button>
                        ))
                    )}
                </div>

                <DialogFooter className="mt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={saving}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAssign}
                        disabled={
                            !selected ||
                            saving ||
                            selected === currentEngineerId
                        }
                    >
                        {saving
                            ? "Assigning..."
                            : "Confirm Assignment"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}