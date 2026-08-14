import { memo } from "react";
import { BookOpen, Users, DoorOpen } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import Faculties from "./Faculties";
import Subjects from "./Subjects";
import Rooms from "./Rooms";

const Catalog = () => {
  return (
    <Tabs defaultValue="faculties" className="grid grid-rows-[auto_1fr]">
      <TabsList className="w-full">
        <TabsTrigger
          value="faculties"
          className="flex cursor-pointer items-center gap-2"
        >
          <Users size={16} />
          Faculties
        </TabsTrigger>

        <TabsTrigger
          value="subjects"
          className="flex cursor-pointer items-center gap-2"
        >
          <BookOpen size={16} />
          Subjects
        </TabsTrigger>

        <TabsTrigger
          value="rooms"
          className="flex cursor-pointer items-center gap-2"
        >
          <DoorOpen size={16} />
          Rooms
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="faculties"
        className="min-h-[60vh] max-h-[60vh] overflow-y-auto"
      >
        <Faculties />
      </TabsContent>

      <TabsContent
        value="subjects"
        className="min-h-[60vh] max-h-[60vh] overflow-y-auto"
      >
        <Subjects />
      </TabsContent>

      <TabsContent
        value="rooms"
        className="min-h-[60vh] max-h-[60vh] overflow-y-auto"
      >
        <Rooms />
      </TabsContent>
    </Tabs>
  );
};

export default memo(Catalog);
