import React from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/hover-card";

import { Button } from "@/shared/ui/button";

import { useUserStore } from "@/shared/user/user.store";

import ProfileAvatar from "./ProfileAvatar";
import Notifications from "./Notifications";
import DarkMode from "./DarkMode";
import LogoutButton from "./LogoutButton";

const Profile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <ProfileAvatar />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent
        side="bottom"
        align="end"
        className="w-80 overflow-hidden rounded-xl border bg-popover p-0 shadow-xl"
      >
        {/* Profile Header */}
        <div className="flex items-center gap-3 bg-muted/40 px-4 py-4">
          <ProfileAvatar />

          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold">
              {user?.userName ?? "Guest User"}
            </span>

            <span className="truncate text-xs text-muted-foreground">
              {user?.email ?? "No email available"}
            </span>
          </div>
        </div>

        {/* Notifications */}
        <Notifications />

        {/* Settings */}
        <div className="flex flex-col gap-2 border-t px-4 py-3">
          <DarkMode />
        </div>

        {/* Logout */}
        <div className="border-t px-4 py-3">
          <LogoutButton />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Profile;
