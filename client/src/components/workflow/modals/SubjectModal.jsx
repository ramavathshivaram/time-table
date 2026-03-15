import { generateSubjectId } from "@/lib/utils.js";
import useResourcesModalStore from "@/store/recources.modal.store.js";
import subjectService from "@/services/workflow/subject.service.js";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

const SubjectModal = ({ closeModal }) => {
  const isNew = useResourcesModalStore((s) => s.isNew);
  const current = useResourcesModalStore((s) => s.current);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: current?.name || "",
      duration: current?.duration || "",
      isLab: current?.isLab || false,
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      duration: Number(data.duration),
      id: current?.id || generateSubjectId(),
    };

    if (isNew) {
      subjectService.addSubject(payload);
    } else {
      subjectService.updateSubject(current.id, payload);
    }

    reset();
    closeModal();
  };

  const handleDelete = () => {
    subjectService.removeSubject(current.id);
    closeModal();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isNew ? "Add Subject" : "Edit Subject"}
        </h2>

        {!isNew && (
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Delete size={16} />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        {/* Subject Name */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Subject Name</h2>
          <Input
            placeholder="Enter subject name"
            {...register("name", { required: true })}
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Duration (Periods)</h2>
          <Input
            type="number"
            placeholder="Enter duration"
            {...register("duration", { required: true })}
          />
        </div>

        {/* Is Lab */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isLab")} className="h-4 w-4" />
          <label className="text-sm font-medium">Is Lab</label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>

          <Button type="submit">
            {isNew ? "Create Subject" : "Update Subject"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubjectModal;
