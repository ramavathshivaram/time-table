import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateNodeId = () => `NODE_${nanoid()}`;
export const generateEdgeId = () => `EDGE_${nanoid()}`;
