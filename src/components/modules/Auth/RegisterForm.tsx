"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerPatient } from "@/services/auth/registerPatient";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import FieldValidationError from "@/components/shared/FieldError";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="md:mt-3">
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input id="name" name="name" type="text" placeholder="John Doe" />
            <FieldValidationError fieldName="name" state={state} />
          </Field>
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />
            <FieldValidationError fieldName="email" state={state} />
          </Field>
          {/* Address */}
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main St"
            />
            <FieldValidationError fieldName="address" state={state} />
          </Field>
          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" />

            <FieldValidationError fieldName="password" state={state} />
          </Field>
          {/* Confirm Password */}
          <Field className="">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
            <FieldValidationError fieldName="confirmPassword" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
