import { useCallback } from "react";

export const useDesignerDnD = () => {
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((e) => {}, []);
  return { onDragOver, onDrop };
};
