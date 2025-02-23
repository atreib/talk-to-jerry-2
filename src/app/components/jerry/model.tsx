"use client";

import * as React from "react";
import { jerryAnimationCatalog, JerryAnimationState } from "./types";
import * as THREE from "three";
import { useAnimations } from "@react-three/drei";

type Props = {
  animationState: JerryAnimationState;
  group: React.RefObject<THREE.Group | null>;
  scene: THREE.Object3D;
  animations: THREE.AnimationClip[];
};

export function JerryModel({
  animationState,
  group,
  scene,
  animations,
}: Props) {
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    // Stop all animations
    Object.values(actions).forEach((action) => action?.stop());

    // Play the appropriate animation based on state
    if (animationState === "idle" && actions.Idle) {
      actions.Idle.play();
    } else if (animationState === "talking" && actions.Talking) {
      actions.Talking.play();
    } else if (animationState === "thinking" && actions.Thinking) {
      actions.Thinking.play();
    }
  }, [actions, animationState]);

  return (
    <primitive
      ref={group}
      object={scene}
      position={[0, 0, 0]}
      scale={1.8}
      rotation={jerryAnimationCatalog[animationState].rotation}
    />
  );
}
