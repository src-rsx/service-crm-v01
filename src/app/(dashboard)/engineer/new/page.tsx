import { EngineerForm }
  from "@/components/engineer/engineer-form";

export default function NewEngineerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Create Engineer
      </h1>

      <EngineerForm />
    </div>
  );
}