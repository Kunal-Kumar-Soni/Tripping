import { pointerWithin, closestCenter, rectIntersection } from "@dnd-kit/core";

export const customCollisionStrategy = (args: any) => {
  const pointerCollisions = pointerWithin(args);
  const isOverActivityPanel = pointerCollisions.some((c) => c.id === "activity-drop");

  if (isOverActivityPanel) {
    return closestCenter(args);
  }

  return rectIntersection(args);
};
