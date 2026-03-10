import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import useUserStore from "@/store/user.store";

const ProfileAvatar = () => {
  const user = useUserStore((s) => s.user);
  const notifications = useUserStore((s) => s.notifications);

  const fallbackText = user?.userName?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative">
      <Avatar className="cursor-pointer">
        <AvatarImage
          src={user?.avatar || ""}
          alt={user?.userName || "User avatar"}
        />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      {notifications.length > 0 && (
        <span className="z-9 border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-red-600 dark:bg-red-400"></span>
      )}
    </div>
  );
};

export default ProfileAvatar;
