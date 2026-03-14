import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useWorkflowStore from "@/store/workflow.store.js";

const BranchModal = ({ activeNode, closeModal }) => {
  const updateNode = useWorkflowStore((s) => s.updateNode);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: activeNode?.data?.label || "",
      timings: activeNode?.data?.timings || "",
      lunch: activeNode?.data?.lunch || "",
      years: activeNode?.data?.years || "",
      subjects: activeNode?.data?.subjects || "",
      faculty: activeNode?.data?.faculty || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    updateNode(activeNode.id, data);

    closeModal();
  };

  return (
    <div className="p-4 w-80">
      <h2 className="text-lg font-semibold mb-3">Branch Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FieldSet>
          <FieldGroup>
            {/* Branch Label */}
            <Field>
              <FieldLabel>Branch Name</FieldLabel>
              <Input
                placeholder="CSE"
                {...register("label", { required: true })}
              />
              {errors.label && <FieldError>Branch name required</FieldError>}
            </Field>

            {/* Timings */}
            <Field>
              <FieldLabel>Timings</FieldLabel>

              <Select onValueChange={(value) => setValue("timings", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timings" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="9-4">9 AM - 4 PM</SelectItem>
                  <SelectItem value="9-5">9 AM - 5 PM</SelectItem>
                  <SelectItem value="10-4">10 AM - 4 PM</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Lunch */}
            <Field>
              <FieldLabel>Lunch Time</FieldLabel>
              <Input placeholder="1 PM - 2 PM" {...register("lunch")} />
            </Field>

            {/* Years */}
            <Field>
              <FieldLabel>No of Years</FieldLabel>
              <Input type="number" placeholder="4" {...register("years")} />
            </Field>

            {/* Subjects */}
            <Field>
              <FieldLabel>No of Subjects</FieldLabel>
              <Input type="number" placeholder="30" {...register("subjects")} />
            </Field>

            {/* Faculty */}
            <Field>
              <FieldLabel>No of Faculty</FieldLabel>
              <Input type="number" placeholder="20" {...register("faculty")} />
            </Field>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={closeModal}>
                Cancel
              </Button>

              <Button type="submit">Save</Button>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};

export default BranchModal;
