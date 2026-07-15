"use client";

import FieldValidationError from "@/components/shared/FieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createSpeciality } from "@/services/admin/specialitiesManagement";
import { Loader } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface ISpecialitiesFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SpecialitiesFormDialog = ({
  open,
  onClose,
  onSuccess,
}: ISpecialitiesFormDialogProps) => {
  const [state, formAction, isPending] = useActionState(createSpeciality, null);


  useEffect(() => {
    if (state && state?.success) {
      toast.success(state?.message);
      onSuccess();
      onClose();
    }
  }, [state, onClose, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Specialty</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" placeholder="Cardiology" />
            <FieldValidationError fieldName="title" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="file">Upload Icon</FieldLabel>
            <Input id="file" name="file" type="file" accept="image/*" />

            <FieldValidationError fieldName="file" state={state} />
          </Field>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Save Specialty"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialitiesFormDialog;
