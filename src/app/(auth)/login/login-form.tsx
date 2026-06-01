"use client";

import Link from "next/link";
import { useState } from "react";

import { signIn } from "next-auth/react";

import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginInput,
  LoginSchema,
} from "@/modules/auth/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

export default function LoginForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(
    values: LoginInput
  ) {
    setError("");

    const result = await signIn(
      "credentials",
      {
        email: values.email,
        password: values.password,
        redirect: false,
      }
    );

    if (result?.ok) {
      window.location.href =
        "/dashboard";
      return;
    }

    setError(
      "Invalid email or password"
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[40%_60%]">
      <div className="hidden lg:flex flex-col justify-between bg-slate-50 p-16">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white text-sm font-semibold">
                SC
                </div>

                <div className="text-sm font-medium tracking-wider text-muted-foreground">
                SERVICE CRM
                </div>
            </div>

            <h1 className="mt-8 text-4xl xl:text-5xl font-semibold tracking-tight">
                Manage your field service operations.
            </h1>

            <p className="mt-6 max-w-md text-lg text-muted-foreground">
                From customer complaints to engineer visits,
                track every service interaction in one place.
            </p>
            </div>
        </div>

        <div className="space-y-5">
            <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">
                Companies & Sites
                </span>
            </div>

            <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">
                Asset Management
                </span>
            </div>

            <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">
                Engineer Operations
                </span>
            </div>

            <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">
                Service Call Tracking
                </span>
            </div>
            </div>

        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            Version 0.1
          </div>

          <div className="text-xs text-muted-foreground">
            Field Service Management Platform
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-lg border shadow-sm bg-background">
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome Back
            </CardTitle>

            <CardDescription>
              Sign in to continue to Service CRM
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(
                onSubmit
              )}
              className="space-y-5"
            >
              {error && (
                <Alert
                  variant="destructive"
                >
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>
                  Email
                </Label>

                <Input
                  type="email"
                  placeholder="you@company.com"
                  {...register("email")}
                />

                {errors.email && (
                  <p className="text-sm text-destructive">
                    {
                      errors.email
                        .message
                    }
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  Password
                </Label>

                <div className="relative">
                  <Input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    {...register(
                      "password"
                    )}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-3 top-2.5"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-destructive">
                    {
                      errors.password
                        .message
                    }
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {isSubmitting
                  ? "Signing In..."
                  : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}