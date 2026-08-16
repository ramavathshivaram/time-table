import { useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import type { Faculty } from "../../../types";
import { facultyService } from "../../../services/faculty.service";

interface Props {
  onSave: () => void;
  onCancel: () => void;
}

type FacultyFormData = {
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
};

const AddFacultyForm = ({ onSave, onCancel }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacultyFormData>({
    defaultValues: {
      name: "",
      email: "",
      employeeId: "",
      department: "Computer Science & Engineering",
      designation: "",
    },
  });

  const onSubmit = (data: FacultyFormData) => {
    const faculty: Faculty = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: data.email.trim(),
      employeeId: data.employeeId.trim() || undefined,
      department: data.department.trim() || undefined,
      designation: data.designation.trim() || undefined,

      subjectIds: [],

      availability: {
        workingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        startTime: "09:00",
        endTime: "16:30",
        unavailableSlots: [],
      },
    };

    facultyService.add(faculty);

    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">
            Add Faculty
          </h3>

          <p className="text-[11px] text-muted-foreground">
            Create a faculty member.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">
            Name
          </label>

          <Input
            placeholder="Faculty name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-[10px] text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">
            Email
          </label>

          <Input
            type="email"
            placeholder="Faculty email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-[10px] text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">
              Employee ID
            </label>

            <Input
              placeholder="FAC001"
              {...register("employeeId")}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">
              Designation
            </label>

            <Input
              placeholder="Professor"
              {...register("designation")}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">
            Department
          </label>

          <Input
            placeholder="Department"
            {...register("department")}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button type="submit" size="sm">
            Add Faculty
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddFacultyForm;