import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useResourcesModalStore from "@/store/recources.modal.store.js";
import React, { useState, useMemo, memo } from "react";
import { Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { generateFacultyId } from "@/lib/utils";
import facultyService from "@/services/workflow/faculty.service.js";
import useWorkflowStore from "@/store/workflow.store";
import { toast } from "sonner";

const FacultyModal = ({ closeModal }) => {
  const isNew = useResourcesModalStore((s) => s.isNew);
  const current = useResourcesModalStore((s) => s.current);

  const allSubjects = useWorkflowStore((s) => s.subjects);
  const faculties = useWorkflowStore((s) => s.faculties);

  const [subjectInput, setSubjectInput] = useState("");
  const [subjects, setSubjects] = useState(() => current?.subjects || []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: current?.name || "",
    },
  });

  // Convert subjects array to map for fast lookup
  const subjectMap = useMemo(() => {
    const map = {};
    allSubjects.forEach((s) => {
      map[s.id] = s;
    });
    return map;
  }, [allSubjects]);

  // Add subject using Enter
  const addSubject = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const value = subjectInput.trim().toLowerCase();
      if (!value) return;

      const subject = allSubjects.find((s) => s.name.toLowerCase() === value);

      if (!subject) return;

      const exists = subjects.includes(subject.id);

      if (!exists) {
        setSubjects((prev) => [...prev, subject.id]);
      }

      setSubjectInput("");
    }
  };

  // Remove subject
  const removeSubject = (index) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const onSubmit = (data) => {
    if (subjects.length === 0) {
      return toast.error("Please add at least one subject");
    }

    const payload = {
      ...data,
      subjects, // only IDs stored
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {isNew ? "Add Faculty" : "Edit Faculty"}
        </h2>

        {!isNew && (
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 size={16} />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        {/* Faculty Name */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Name</h2>

          <Input
            placeholder="Enter faculty name"
            {...register("name", {
              required: "Faculty name is required",
              validate: (value) => {
                const name = value.trim().toLowerCase();
                const exists = faculties.some((f) => f.name === name);
                return !exists || "Faculty name already exists";
              },
            })}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Subjects */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Subjects</h2>

          {/* Selected subjects */}
          <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-background">
            {subjects.map((id, i) => {
              const subject = subjectMap[id];

              return (
                <div
                  key={id}
                  className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm"
                >
                  {subject?.name}

                  <X
                    size={14}
                    onClick={() => removeSubject(i)}
                    className="cursor-pointer opacity-60 hover:opacity-100"
                  />
                </div>
              );
            })}

            {/* Input */}
            <Input
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={addSubject}
              placeholder="Add subject..."
              className="border-none shadow-none focus-visible:ring-0 w-40"
            />
          </div>

          {subjectInput.trim().length > 0 && (
            <div className="relative z-99">
              <ul className="absolute z-10 w-full max-h-32 overflow-y-auto rounded-md border bg-background text-xs shadow">
                {allSubjects
                  .filter(
                    (s) =>
                      s.name
                        .toLowerCase()
                        .includes(subjectInput.toLowerCase()) &&
                      !subjects.includes(s.id),
                  )
                  .slice(0, 6)
                  .map((subject) => (
                    <li
                      key={subject.id}
                      className="px-2 py-1 cursor-pointer hover:bg-muted"
                      onClick={() => {
                        setSubjects((prev) => [...prev, subject.id]);
                        setSubjectInput("");
                      }}
                    >
                      {subject.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
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

export default memo(FacultyModal);
