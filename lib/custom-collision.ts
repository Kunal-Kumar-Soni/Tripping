import {
  CollisionDetection,
  closestCenter,
  pointerWithin,
  rectIntersection,
} from "@dnd-kit/core";

export const customCollisionStrategy: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);
  const isOverActivityPanel = pointerCollisions.some(
    (c) => c.id === "activity-drop",
  );

  if (isOverActivityPanel) {
    return closestCenter(args);
  }

  return rectIntersection(args);
};
