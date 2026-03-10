import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import ProfileAvatar from "./ProfileAvatar";
import LogoutButton from "./LogoutButton";
import DarkMode from "./DarkMode";
import useUserStore from "@/store/user.store";
import Notifications from "./Notifications";

const Profile = () => {
  const user = useUserStore((s) => s.user);

  return (
    <HoverCard openDelay={80} closeDelay={120}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-0 hover:ring-2 hover:ring-primary/30 transition"
        >
          <ProfileAvatar />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        align="end"
        className="w-80 p-0 rounded-xl shadow-xl border bg-popover overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 bg-muted/40">
          <ProfileAvatar />

          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {user?.userName || "Guest User"}
            </span>

            <span className="text-xs text-muted-foreground">
              {user?.email || "No email available"}
            </span>
          </div>
        </div>

        <Notifications/>

        {/* Settings */}
        <div className="px-4 py-3 border-t flex flex-col gap-2">
          <DarkMode />
        </div>
        {/* Logout */}
        <div className="px-4 py-3 border-t">
          <LogoutButton />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Profile;
