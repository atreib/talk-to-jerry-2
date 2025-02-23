export const jerryAnimationCatalog = {
  idle: {
    rotation: [0, 0, 0],
  },
  talking: {
    rotation: [0, -0.5, 0],
  },
  thinking: {
    rotation: [0, 0, 0],
  },
};
export type JerryAnimationState = keyof typeof jerryAnimationCatalog;
export type JerryAnimation =
  (typeof jerryAnimationCatalog)[JerryAnimationState];
