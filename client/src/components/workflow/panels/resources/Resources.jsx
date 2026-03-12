import React, { memo } from "react";
import { BookOpen, Users, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Faculties from "./Faculties";
import Subjects from "./Subjects";
import Rooms from "./Rooms";

const Resources = () => {
  const list = [
    {
      label: "Faculties",
      icon: <Users size={16} />,
      component: <Faculties />,
    },
    {
      label: "Subjects",
      icon: <BookOpen size={16} />,
      component: <Subjects />,
    },
    {
      label: "Rooms",
      icon: <DoorOpen size={16} />,
      component: <Rooms />,
    },
  ];

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center">
            Resources
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-75 p-2 ml-2">
          <DropdownMenuGroup>
            <Tabs defaultValue="faculties">
              <TabsList className="w-full">
                {list.map((item) => (
                  <TabsTrigger
                    key={item.label}
                    value={item.label.toLowerCase()}
                    className="flex items-center gap-2"
                  >
                    {item.icon}
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {list.map((item) => (
                <TabsContent
                  key={item.label}
                  value={item.label.toLowerCase()}
                  className="p-0 min-h-[60vh] max-h-[60vh]"
                >
                  {item.component}
                </TabsContent>
              ))}
            </Tabs>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default memo(Resources);
