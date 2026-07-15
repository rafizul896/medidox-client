"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteSpeciality } from "@/services/admin/specialitiesManagement";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { specialitiesColumns } from "./specialitiesColumns";
import { ISpeciality } from "../../../../../types/specialities.interface";

interface ISpecialityTableProps {
  specialities: ISpeciality[];
}

const SpecialitiesTable = ({ specialities }: ISpecialityTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingSpeciality, setDeletingSpeciality] =
    useState<ISpeciality | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (speciality: ISpeciality) => {
    setDeletingSpeciality(speciality);
  };

  const confirmDelete = async () => {
    if (!deletingSpeciality) return;

    setIsDeletingDialog(true);
    const result = await deleteSpeciality(deletingSpeciality.id);
    setIsDeletingDialog(false);
    if (result.success) {
      toast.success(result.message || "Speciality deleted successfully");
      setDeletingSpeciality(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete speciality");
    }
  };

  return (
    <>
      <ManagementTable
        data={specialities}
        columns={specialitiesColumns}
        onDelete={handleDelete}
        getRowKey={(speciality) => speciality.id}
        emptyMessage="No specialities found"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingSpeciality}
        onOpenChange={(open) => !open && setDeletingSpeciality(null)}
        onConfirm={confirmDelete}
        title="Delete Speciality"
        description={`Are you sure you want to delete ${deletingSpeciality?.title}? This action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default SpecialitiesTable;