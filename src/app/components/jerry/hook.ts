"use client";

import * as React from "react";
import * as THREE from "three";
import * as constants from "./constants";
import { useGLTF } from "@react-three/drei";
import { JerryAnimationState } from "./types";

export function useJerry() {
  const group = React.useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(constants.jerry3dModelUrl);
  const [animationState, setAnimationState] =
    React.useState<JerryAnimationState>("idle");

  return {
    animationState,
    setAnimationState,
    group,
    scene,
    animations,
  };
}
