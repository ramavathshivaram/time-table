import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useResourcesModalStore from "@/store/recources.modal.store.js";
import React, { useState } from "react";
import { Delete, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { generateFacultyId } from "@/lib/utils";
import facultyService from "@/services/workflow/faculty.service.js";

const FacultyModal = ({ closeModal }) => {
  const isNew = useResourcesModalStore((s) => s.isNew);
  const current = useResourcesModalStore((s) => s.current);

  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState(current?.subjects || []);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: current?.name || "",
    },
  });

  // Add subject
  const addSubject = (e) => {
    if (e.key === "Enter" && subjectInput.trim()) {
      e.preventDefault();

      if (!subjects.includes(subjectInput.trim())) {
        setSubjects([...subjects, subjectInput.trim()]);
      }

      setSubjectInput("");
    }
  };

  // Remove subject
  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // Submit form
  const onSubmit = (data) => {
    const payload = {
      ...data,
      subjects,
      id: current?.id || generateFacultyId(),
    };

    if (isNew) {
      facultyService.addFaculty(payload);
    } else {
      facultyService.updateFaculty(current.id, payload);
    }

    reset();
    closeModal();
  };

  // Delete faculty
  const handleDelete = () => {
    facultyService.removeFaculty(current.id);
    closeModal();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isNew ? "Add Faculty" : "Edit Faculty"}
        </h2>

        <p className="text-sm text-muted-foreground">
          {!isNew && (
            <Button variant="destructive" onClick={handleDelete}>
              <Delete />
            </Button>
          )}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Faculty Name */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Name</h2>
          <Input
            placeholder="Enter faculty name"
            {...register("name", { required: true })}
          />
        </div>

        {/* Subjects */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Subjects</h2>

          <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-background">
            {subjects.map((sub, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm"
              >
                {sub}
                <X
                  size={14}
                  onClick={() => removeSubject(i)}
                  className="cursor-pointer opacity-60 hover:opacity-100"
                />
              </div>
            ))}

            <Input
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={addSubject}
              placeholder="Add subject..."
              className="border-none shadow-none focus-visible:ring-0 w-32"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>

          <Button type="submit">
            {isNew ? "Create Faculty" : "Update Faculty"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FacultyModal;
