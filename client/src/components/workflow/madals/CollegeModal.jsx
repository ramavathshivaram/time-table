import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldError,
} from "@/components/ui/field";

const CollegeModal = ({ activeNode, setNodes, closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      collegeName: activeNode.data.collegeName || "",
      city: activeNode.data.city || "",
      students: activeNode.data.students || "",
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <FieldSet>
          <FieldGroup>
            {/* College name */}
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input
                id="name"
                autoComplete="off"
                placeholder="Evil Rabbit"
                {...register("label")}
              />
              {errors.label ? (
                <FieldDescription>
                  This appears on invoices and emails.
                </FieldDescription>
              ) : (
                <FieldError>College name is required.</FieldError>
              )}
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
