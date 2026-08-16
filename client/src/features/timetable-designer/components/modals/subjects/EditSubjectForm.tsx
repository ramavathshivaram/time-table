import { memo } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { subjectService } from "../../../services/subject.service";

interface Props {
  subjectId: string;
  onCancel: () => void;
  onSave: () => void;
}

type SubjectFormData = {
  name: string;
  code: string;
  duration: number;
  credits: number;
  isLab: boolean;
  weeklyPeriods: number;
  periodsPerDay: number;
  consecutivePeriods: number;
};

const EditSubjectForm = ({
  subjectId,
  onCancel,
  onSave,
}: Props) => {
  const subject =
    subjectService.getById(subjectId);

  const { register, handleSubmit } =
    useForm<SubjectFormData>({
      defaultValues: subject
        ? {
            name: subject.name,
            code: subject.code,
            duration: subject.duration,
            credits: subject.credits,
            isLab: subject.isLab,
            weeklyPeriods: subject.weeklyPeriods,
            periodsPerDay:
              subject.periodsPerDay ?? 1,
            consecutivePeriods:
              subject.consecutivePeriods ?? 1,
          }
        : undefined,
    });

  if (!subject) {
    return null;
  }

  const onSubmit = (data: SubjectFormData) => {
    subjectService.update(subjectId, {
      ...subject,

      name: data.name.trim() || "New Subject",

      code: data.code.trim(),

      duration: data.duration,

      credits: data.credits,

      isLab: data.isLab,

      weeklyPeriods: data.weeklyPeriods,

      periodsPerDay: data.periodsPerDay,

      consecutivePeriods:
        data.consecutivePeriods,

      roomRequirements: {
        ...subject.roomRequirements,
        type: data.isLab
          ? "laboratory"
          : "classroom",
      },
    });

    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-3"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">
            Edit Subject
          </h3>

          <p className="text-[11px] text-muted-foreground">
            Update subject configuration.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-subject-name">
            Subject Name
          </Label>

          <Input
            id="edit-subject-name"
            {...register("name")}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-subject-code">
            Subject Code
          </Label>

          <Input
            id="edit-subject-code"
            {...register("code")}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="edit-duration">
              Duration (minutes)
            </Label>

            <Input
              id="edit-duration"
              type="number"
              min={1}
              {...register("duration", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-credits">
              Credits
            </Label>

            <Input
              id="edit-credits"
              type="number"
              min={0}
              {...register("credits", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="edit-weekly-periods">
              Weekly Periods
            </Label>

            <Input
              id="edit-weekly-periods"
              type="number"
              min={1}
              {...register("weeklyPeriods", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-periods-per-day">
              Periods / Day
            </Label>

            <Input
              id="edit-periods-per-day"
              type="number"
              min={1}
              {...register("periodsPerDay", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="edit-consecutive-periods">
            Consecutive Periods
          </Label>

          <Input
            id="edit-consecutive-periods"
            type="number"
            min={1}
            {...register("consecutivePeriods", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="edit-is-lab"
            type="checkbox"
            {...register("isLab")}
            className="size-4 rounded border"
          />

          <Label
            htmlFor="edit-is-lab"
            className="cursor-pointer text-sm"
          >
            Laboratory Subject
          </Label>
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
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default memo(EditSubjectForm);