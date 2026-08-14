import { BookOpen } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { memo } from "react";
import { useModalStore } from "../../store/modal.store";

const CatalogButton = () => {
  const open = useModalStore((s) => s.open);
  return (
    <Button variant="outline" size="sm" onClick={() => open("catalog")}>
      <BookOpen className="mr-2 size-4" />
      Catalog
    </Button>
  );
};

export default memo(CatalogButton);
