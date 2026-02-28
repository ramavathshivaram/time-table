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

  const notifications = user?.notifications || [];

  const fallbackText = user?.userName?.charAt(0)?.toUpperCase() || "U";

  return (
    <Avatar className="cursor-pointer">
      <AvatarImage
        src={user?.avatar || ""}
        alt={user?.userName || "User avatar"}
      />
      <AvatarFallback>{fallbackText}</AvatarFallback>
      {notifications.length > 0 && (
        <AvatarBadge className="bg-red-600 dark:bg-red-800">
          {notifications.length}
        </AvatarBadge>
      )}
    </Avatar>
  );
};

export default ProfileAvatar;
