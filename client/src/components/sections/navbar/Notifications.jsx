import React from "react";
import { Bell } from "lucide-react";

const Notifications = ({ notifications = [] }) => {
  return (
    <div className="border-t">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Bell size={16} />
          Notifications
        </div>

        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
          {notifications.length}
        </span>
      </div>

      {/* Content */}
      <div className="px-3 pb-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground text-xs">
            <Bell size={20} className="mb-2 opacity-60" />
            No notifications yet
          </div>
        ) : (
          <ul className="flex flex-col gap-2 max-h-48 overflow-y-auto">
            {notifications.map((n, i) => (
              <li
                key={i}
                className="group flex items-start gap-2 p-3 rounded-lg border bg-muted/30 hover:bg-muted/60 transition cursor-pointer"
              >
                {/* unread indicator */}
                <div className="w-2 h-2 mt-1 rounded-full bg-blue-500 opacity-80" />

                {/* message */}
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition">
                  {n.message || "Notification"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
