import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ServiceCallOverview({
    call,
}: any) {
    return (
        <div className="space-y-6">
            <section>
                <h3 className="text-lg font-semibold mb-4">
                    Customer
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>Reported By</div>
                    <div>
                        {call.reportedBy ?? "-"}
                    </div>

                    <div>Mobile</div>

                    <div>
                        {call.reportedMobile ?? "-"}
                    </div>

                </div>
            </section>
            <section>
                <h3 className="text-lg font-emibold mb-4">
                    Service Request
                </h3>
                <div className="space-y-3">
                    <div>
                        <span className="font-medium">
                            Subject:
                        </span>
                        {" "}
                        {call.subject}
                    </div>
                    <div>
                        <span className="font-medium">
                            Description:
                        </span>
                        {" "}
                        {call.description ?? "-"}
                    </div>
                    <div>
                        <span className="font-medium">
                            Source:
                        </span>
                        {" "}
                        {call.source}
                    </div>
                </div>
            </section>
        </div>
    );
}