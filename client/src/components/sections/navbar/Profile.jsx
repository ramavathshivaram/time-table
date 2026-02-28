import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProfileAvatar from "./ProfileAvatar";
import useUserStore from "@/store/user.store";

import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import DarkMode from "./DarkMode";
import { Bell } from "lucide-react";

const Profile = () => {
  const user = useUserStore((s) => s.user);

  const notifications = user?.notifications || [];

  return (
    <HoverCard openDelay={100} closeDelay={150}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full p-0">
          <ProfileAvatar />
        </Button>
      </HoverCardTrigger>

      <HoverCardContent side="top" align="end" className="w-72 p-4 z-50">
        <div className="flex flex-col gap-3">
          
          {/* User Info */}
          <div>
            <h4 className="text-sm font-semibold">
              {user?.userName || "Guest User"}
            </h4>

            <p className="text-xs text-muted-foreground">
              {user?.email || "No email available"}
            </p>
          </div>

          {/* Notifications */}
          <div className="border rounded-lg p-2">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={16} />
              <span className="text-sm font-medium">
                Notifications ({notifications.length})
              </span>
            </div>

            {notifications.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                No notifications
              </p>
            ) : (
              <ul className="flex flex-col gap-1 max-h-32 overflow-y-auto">
                {notifications.map((n, i) => (
                  <li
                    key={i}
                    className="text-xs p-2 rounded-md bg-muted"
                  >
                    {n.message || "Notification"}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Actions */}
          <DarkMode />
          <LogoutButton />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Profile;