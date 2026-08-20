import { memo, useState } from "react";
import { FileStack, Globe2, Lock, Plus, Search } from "lucide-react";

import { Input } from "@/shared/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import TemplateGrid from "./TemplateGrid";

type TemplateTab = "my" | "public";

const Templates = () => {
  const [tab, setTab] = useState<TemplateTab>("my");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div
              className="
                flex size-9 items-center
                justify-center rounded-xl
                border bg-muted/40
              "
            >
              <FileStack className="size-4" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Templates
              </h1>

              <p className="text-sm text-muted-foreground">
                Reusable timetable configurations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="
          flex flex-col gap-3
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        {/* Tabs */}
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as TemplateTab)}
        >
          <TabsList>
            <TabsTrigger value="my" className="gap-2">
              <Lock className="size-3.5" />
              My Templates
            </TabsTrigger>

            <TabsTrigger value="public" className="gap-2">
              <Globe2 className="size-3.5" />
              Public
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search
            className="
              absolute left-3 top-1/2
              size-4 -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Templates */}
      <TemplateGrid tab={tab} search={search} />
    </div>
  );
};

export default memo(Templates);
