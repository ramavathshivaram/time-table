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
    id: string;
  } | null;
}

type InstitutionFormData = {
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  periodDuration: number;
  numberOfPeriods: number;
  workingDays: string;
  lunchStartTime: string;
  lunchEndTime: string;
};

const InstitutionModal = ({ data }: Props) => {
  const close = useModalStore((state) => state.close);

  const { getNode } = useReactFlow();

  const institution = data?.id ? getNode(data.id) : undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InstitutionFormData>({
    defaultValues: {
      name: "",
      code: "",
      startTime: "09:00",
      endTime: "16:30",
      periodDuration: 60,
      numberOfPeriods: 7,
      workingDays: "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
      lunchStartTime: "13:00",
      lunchEndTime: "14:00",
    },
  });

  useEffect(() => {
    if (!institution) return;

    const data = institution.data;

    const lunchBreak = data?.time?.breaks?.find(
      (item: any) => item.type === "lunch",
    );

    reset({
      name: data?.name ?? data?.label ?? "",
      code: data?.code ?? "",

      startTime: data?.time?.startTime ?? "09:00",

      endTime: data?.time?.endTime ?? "16:30",

      periodDuration: data?.time?.periodDuration ?? 60,

      numberOfPeriods: data?.time?.numberOfPeriods ?? 7,

      workingDays:
        data?.time?.workingDays?.join(",") ??
        "Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",

      lunchStartTime: lunchBreak?.startTime ?? "13:00",

      lunchEndTime: lunchBreak?.endTime ?? "14:00",
    });
  }, [institution, reset]);

  const handleUpdate = (formData: InstitutionFormData) => {
    if (!data?.id) return;

    const workingDays = formData.workingDays
      .split(",")
      .map((day) => day.trim())
      .filter(Boolean);

    nodeService.update(data.id, {
      data: {
        ...institution?.data,

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
              type: "lunch",
              startTime: formData.lunchStartTime,
              endTime: formData.lunchEndTime,
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
          {institution?.data?.name || institution?.data?.label || "Institution"}
        </DialogTitle>

        <DialogDescription>
          Configure institution timetable settings.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium">Institution Name</label>

          <Input
            placeholder="Institution name"
            {...register("name", {
              required: "Institution name is required",
            })}
          />

          {errors.name && (
            <p className="text-[10px] text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">Institution Code</label>

          <Input
            placeholder="PVPSIT"
            {...register("code", {
              required: "Institution code is required",
            })}
          />

          {errors.code && (
            <p className="text-[10px] text-destructive">
              {errors.code.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Start Time</label>

            <Input
              type="time"
              {...register("startTime", {
                required: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">End Time</label>

            <Input
              type="time"
              {...register("endTime", {
                required: true,
              })}
            />
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
                required: true,
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
                required: true,
              })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium">Working Days</label>

          <Input
            placeholder="Monday,Tuesday,Wednesday..."
            {...register("workingDays", {
              required: "Working days are required",
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">Lunch Break</label>

          <div className="grid grid-cols-2 gap-3">
            <Input type="time" {...register("lunchStartTime")} />

            <Input type="time" {...register("lunchEndTime")} />
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

export default InstitutionModal;
