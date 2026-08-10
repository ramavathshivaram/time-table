import { useNavigate } from "react-router-dom";
import { ArrowUpRightIcon } from "lucide-react";

import {
  CraftButton,
  CraftButtonLabel,
  CraftButtonIcon,
} from "@/shared/ui/craft-button";

import { useTimetableMutation } from "@/features/timetables/hooks/timetable.query";

const CreateTimetableBtn = () => {
  const navigate = useNavigate();

  const { mutateAsync: createTimetable, isPending } =
    useTimetableMutation.useCreateTimetable();

  const handleCreate = async () => {
    try {
      const timetable = await createTimetable();

      navigate(`/timetables/${timetable._id}`);
    } catch (error) {
      console.error("Failed to create timetable:", error);
    }
  };

  return (
    <CraftButton size="default" onClick={handleCreate} disabled={isPending}>
      <CraftButtonLabel>
        {isPending ? "Creating..." : "Create Timetable"}
      </CraftButtonLabel>

      <CraftButtonIcon>
        <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
      </CraftButtonIcon>
    </CraftButton>
  );
};

export default CreateTimetableBtn;
