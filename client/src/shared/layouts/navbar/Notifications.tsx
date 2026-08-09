import React from "react";
import { Bell } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

interface Notification {
  _id: string;
  title: string;
  desc?: string;
  createdAt: Date | string;
}

const Notifications = () => {
  const notifications: Notification[] = [
    {
      _id: "1",
      title: "New workflow created",
      desc: "You have created a new workflow",
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "Workflow updated",
      desc: "Your workflow has been updated",
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "Workflow published",
      desc: "Your workflow is now available",
      createdAt: new Date(),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="size-4" />

          <span className="text-sm font-semibold">Notifications</span>

          {notifications.length > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-xs text-muted-foreground">
            No new notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="cursor-pointer border-b px-4 py-3 transition hover:bg-muted/40"
            >
              <div className="text-sm font-medium">{notification.title}</div>

              {notification.desc && (
                <div className="mt-1 text-xs text-muted-foreground">
                  {notification.desc}
                </div>
              )}

              <div className="mt-1 text-[10px] text-muted-foreground">
                {/* {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })} */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
