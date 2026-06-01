"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { EngineerFormValues } from "./engineer-form-schema";

export function EngineerForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
  } = useForm<EngineerFormValues>();

  async function onSubmit(
    values: EngineerFormValues
  ) {
    try {
      const response =
        await fetch("/api/engineers", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            values
          ),
        });

      if (!response.ok) {
        throw new Error(
          "Failed to create engineer"
        );
      }

      router.push("/engineers");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create engineer"
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label>
            Employee Code
          </Label>

          <Input
            {...register(
              "employeeCode"
            )}
          />
        </div>

        <div>
          <Label>
            Name
          </Label>

          <Input
            {...register(
              "name"
            )}
          />
        </div>

        <div>
          <Label>
            Mobile
          </Label>

          <Input
            {...register(
              "mobile"
            )}
          />
        </div>

        <div>
          <Label>
            Email
          </Label>

          <Input
            {...register(
              "email"
            )}
          />
        </div>

        <div>
          <Label>
            Designation
          </Label>

          <Input
            {...register(
              "designation"
            )}
          />
        </div>
      </div>

      <Button type="submit">
        Create Engineer
      </Button>
    </form>
  );
}