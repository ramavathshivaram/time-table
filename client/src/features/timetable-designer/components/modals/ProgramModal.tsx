import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useReactFlow } from "@xyflow/react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";

import { useModalStore } from "../../store/modal.store";
import { nodeService } from "../../services/node.service";

interface Props {
  data: {
    id?: string;
  } | null;
}

type ProgramFormData = {
  name: string;
  code: string;

  startTime: string;
  endTime: string;
  periodDuration: number;
  numberOfPeriods: number;

  workingDays: string;

  breakType: "lunch" | "short-break";
  breakStartTime: string;
  breakEndTime: string;
};

const ProgramModal = ({ data }: Props) => {
  const close = useModalStore((state) => state.close);

  const { getNode } = useReactFlow();

  const program = data?.id ? getNode(data.id) : undefined;

  const { register, handleSubmit, reset } = useForm<ProgramFormData>({
    defaultValues: {
      name: "",
      code: "",

      startTime: "09:00",
      endTime: "16:30",
      periodDuration: 60,
      numberOfPeriods: 7,

      workingDays: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",

      breakType: "lunch",
      breakStartTime: "13:00",
      breakEndTime: "14:00",
    },
  });

  useEffect(() => {
    if (!program) return;

    const programData = program.data;

    const time = programData?.time;

    const breakItem = time?.breaks?.[0];

    reset({
      name: programData?.name ?? programData?.label ?? "",
      code: programData?.code ?? "",

      startTime: time?.startTime ?? "09:00",
      endTime: time?.endTime ?? "16:30",

      periodDuration: time?.periodDuration ?? 60,
      numberOfPeriods: time?.numberOfPeriods ?? 7,

      workingDays:
        time?.workingDays?.join(",") ??
        "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",

      breakType: breakItem?.type ?? "lunch",
      breakStartTime: breakItem?.startTime ?? "13:00",
      breakEndTime: breakItem?.endTime ?? "14:00",
    });
  }, [program, reset]);

  const handleUpdate = (formData: ProgramFormData) => {
    if (!data?.id) return;

    const workingDays = formData.workingDays
      .split(",")
      .map((day) => day.trim())
      .filter(Boolean);

    nodeService.update(data.id, {
      data: {
        ...program?.data,

        label: formData.name,

        name: formData.name,
        code: formData.code,

        time: {
          startTime: formData.startTime,
          endTime: formData.endTime,

          periodDuration: formData.periodDuration,
          numberOfPeriods: formData.numberOfPeriods,

          workingDays,

          breaks: [
            {
              type: formData.breakType,
              startTime: formData.breakStartTime,
              endTime: formData.breakEndTime,
            },
          ],
        },
      },
    });

    close();
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <DialogHeader>
        <DialogTitle>
          {program?.data?.name || program?.data?.label || "Program"}
        </DialogTitle>

        <DialogDescription>
          Configure program timetable settings.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium">Program Name</label>

          <Input
            placeholder="Computer Science & Engineering"
            {...register("name", {
              required: true,
            })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">Program Code</label>

          <Input
            placeholder="CSE"
            {...register("code", {
              required: true,
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Start Time</label>

            <Input type="time" {...register("startTime")} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">End Time</label>

            <Input type="time" {...register("endTime")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Period Duration</label>

            <Input
              type="number"
              min={1}
              {...register("periodDuration", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Number of Periods</label>

            <Input
              type="number"
              min={1}
              {...register("numberOfPeriods", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">Working Days</label>

          <Input
            placeholder="Monday,Tuesday,Wednesday..."
            {...register("workingDays")}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">Break Type</label>

          <select
            {...register("breakType")}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="lunch">Lunch</option>
            <option value="short-break">Short Break</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Break Start</label>

            <Input type="time" {...register("breakStartTime")} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Break End</label>

            <Input type="time" {...register("breakEndTime")} />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={close}>
          Cancel
        </Button>

        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
};

export default ProgramModal;
