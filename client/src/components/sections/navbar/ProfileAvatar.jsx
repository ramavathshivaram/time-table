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
      {notifications.length > -9 && (
        <>
          <span className="absolute -top-0.5 -right-0.5 size-2 animate-bounce rounded-full bg-sky-600 dark:bg-sky-400" />
          <span className="sr-only">{notifications.length}</span>
        </>
      )}
    </div>
  );
};

export default ProfileAvatar;
