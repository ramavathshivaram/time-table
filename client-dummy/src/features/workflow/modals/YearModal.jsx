import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

const YearModal = ({ activeNode, setNodes, closeModal }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      year: activeNode?.data?.year || "",
      subject: activeNode?.data?.subject || "",
      faculty: activeNode?.data?.faculty || "",
      labs: activeNode?.data?.labs || "",
      rooms: activeNode?.data?.rooms || "",
      times: activeNode?.data?.times || "",
      lunch: activeNode?.data?.lunch || "",
      sections: activeNode?.data?.sections || "",
    },
  });

  const onSubmit = (formData) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === activeNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                ...formData,
              },
            }
          : node
      )
    );

    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-80"
    >
      <h2 className="text-lg font-semibold">Year Settings</h2>

      <FieldSet>
        <FieldGroup>

          <Field>
            <FieldLabel>Year</FieldLabel>
            <Input placeholder="1,2,3,4" {...register("year")} />
          </Field>

          <Field>
            <FieldLabel>Subject</FieldLabel>
            <Input placeholder="Subject name" {...register("subject")} />
          </Field>

          <Field>
            <FieldLabel>Faculty</FieldLabel>
            <Input placeholder="Faculty name" {...register("faculty")} />
          </Field>

          <Field>
            <FieldLabel>Labs</FieldLabel>
            <Input placeholder="Lab name / number" {...register("labs")} />
          </Field>

          <Field>
            <FieldLabel>Rooms</FieldLabel>
            <Input placeholder="Room number" {...register("rooms")} />
          </Field>

          <Field>
            <FieldLabel>Times</FieldLabel>
            <Input placeholder="Example: 9:00-10:00" {...register("times")} />
          </Field>

          <Field>
            <FieldLabel>Lunch</FieldLabel>
            <Input placeholder="Lunch time" {...register("lunch")} />
          </Field>

          <Field>
            <FieldLabel>No of Sections</FieldLabel>
            <Input
              type="number"
              placeholder="Sections"
              {...register("sections")}
            />
          </Field>

        </FieldGroup>
      </FieldSet>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={closeModal}>
          Cancel
        </Button>

        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default memo(YearModal);