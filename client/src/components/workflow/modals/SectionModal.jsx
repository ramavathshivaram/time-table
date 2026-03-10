import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

const SectionModal = ({ activeNode, setNodes, closeModal }) => {
  const [form, setForm] = useState({
    section: activeNode?.data?.section || "",
    subject: activeNode?.data?.subject || "",
    faculty: activeNode?.data?.faculty || "",
    labs: activeNode?.data?.labs || "",
    rooms: activeNode?.data?.rooms || "",
    times: activeNode?.data?.times || "",
    lunch: activeNode?.data?.lunch || "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === activeNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                ...form,
              },
            }
          : node
      )
    );

    closeModal();
  };

  return (
    <div className="flex flex-col gap-4 w-80">
      <h2 className="text-lg font-semibold">Section Settings</h2>

      <FieldSet>
        <FieldGroup>

          <Field>
            <FieldLabel>Section</FieldLabel>
            <Input
              value={form.section}
              onChange={(e) => handleChange("section", e.target.value)}
              placeholder="A, B, C..."
            />
          </Field>

          <Field>
            <FieldLabel>Subject</FieldLabel>
            <Input
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Subject name"
            />
          </Field>

          <Field>
            <FieldLabel>Faculty</FieldLabel>
            <Input
              value={form.faculty}
              onChange={(e) => handleChange("faculty", e.target.value)}
              placeholder="Faculty name"
            />
          </Field>

          <Field>
            <FieldLabel>Labs</FieldLabel>
            <Input
              value={form.labs}
              onChange={(e) => handleChange("labs", e.target.value)}
              placeholder="Lab name"
            />
          </Field>

          <Field>
            <FieldLabel>Rooms</FieldLabel>
            <Input
              value={form.rooms}
              onChange={(e) => handleChange("rooms", e.target.value)}
              placeholder="Room number"
            />
          </Field>

          <Field>
            <FieldLabel>Times</FieldLabel>
            <Input
              value={form.times}
              onChange={(e) => handleChange("times", e.target.value)}
              placeholder="9:00 - 10:00"
            />
          </Field>

          <Field>
            <FieldLabel>Lunch</FieldLabel>
            <Input
              value={form.lunch}
              onChange={(e) => handleChange("lunch", e.target.value)}
              placeholder="Lunch time"
            />
          </Field>

        </FieldGroup>
      </FieldSet>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>

        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default SectionModal;