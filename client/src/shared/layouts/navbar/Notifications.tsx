import { Bell } from "lucide-react";

const Notifications = () => {
  const notifications = [
    {
      _id: "1",
      title: "New workflow created",
      desc: "You have created a new workflow",
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "New workflow created",
      desc: "You have created a new workflow",
      createdAt: new Date(),
    },
    {
      _id: "3",
      title: "New workflow created",
      desc: "You have created a new workflow",
      createdAt: new Date(),
    },
  ];

  return (
    <div className="w-full border rounded-sm shadow-sm bg-background">
      {/* Header */}
      <div className="flex items-center gap-2 border-b px-4 py-2 font-medium">
        <Bell size={16} />
        Notifications {`(${notifications.length})`}
      </div>

      {/* Content */}
      <div className="max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-xs text-muted-foreground text-center">
            No new notifications
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className="px-3 py-2 border-b hover:bg-muted/40 transition cursor-pointer"
            >
              <div className="text-sm font-medium">{n.title}</div>

              {n.desc && (
                <div className="text-xs text-muted-foreground mt-1">
                  {n.desc}
                </div>
              )}

              <div className="text-[10px] text-muted-foreground mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
