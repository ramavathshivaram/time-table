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

const CollegeModal = ({ activeNode, setNodes, closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: activeNode?.data?.label || "",
      timings: activeNode.data?.timings || "",
      lunch: activeNode.data?.lunch || "",
      branches: activeNode.data?.branches || "",
    },
  });

  const onSubmit = (data) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === activeNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            }
          : node,
      ),
    );

    reset();
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">College Modal</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldSet>
          <FieldGroup>
            {/* College Name */}
            <Field>
              <FieldLabel htmlFor="name">College Name</FieldLabel>
              <Input
                id="name"
                placeholder="ABC Engineering College"
                {...register("label", { required: true })}
              />
              {errors.label && (
                <FieldError>College name is required</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>College Timings</FieldLabel>

              <Select
                defaultValue={activeNode.data?.timings}
                onValueChange={(value) => setValue("timings", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timings" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="8:30 AM - 3:30 PM">
                    8:30 AM - 3:30 PM
                  </SelectItem>
                  <SelectItem value="9:00 AM - 4:00 PM">
                    9:00 AM - 4:00 PM
                  </SelectItem>
                  <SelectItem value="9:30 AM - 4:30 PM">
                    9:30 AM - 4:30 PM
                  </SelectItem>
                  <SelectItem value="10:00 AM - 5:00 PM">
                    10:00 AM - 5:00 PM
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Lunch Time */}
            <Field>
              <FieldLabel>Lunch Time</FieldLabel>

              <Select
                defaultValue={activeNode.data?.lunch}
                onValueChange={(value) => setValue("lunch", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lunch time" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="12:00 PM - 12:45 PM">
                    12:00 PM - 12:45 PM
                  </SelectItem>

                  <SelectItem value="12:30 PM - 1:15 PM">
                    12:30 PM - 1:15 PM
                  </SelectItem>

                  <SelectItem value="1:00 PM - 1:45 PM">
                    1:00 PM - 1:45 PM
                  </SelectItem>

                  <SelectItem value="1:30 PM - 2:15 PM">
                    1:30 PM - 2:15 PM
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Number of Branches */}
            <Field>
              <FieldLabel htmlFor="branches">Number of Branches</FieldLabel>
              <Input
                id="branches"
                type="number"
                placeholder="10"
                {...register("branches")}
              />
            </Field>

            {/* Buttons */}
            <Field
              orientation="horizontal"
              className="flex flex-wrap justify-end items-center gap-4"
            >
              <Button type="button" onClick={closeModal} variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};

export default CollegeModal;
