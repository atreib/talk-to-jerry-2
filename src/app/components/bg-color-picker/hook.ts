"use client";

import * as React from "react";

export function useBgColor() {
  const [bgColor, setBgColor] = React.useState(() => {
    // Initialize from session storage if available, otherwise use default white
    if (typeof window !== "undefined") {
      return localStorage.getItem("bgColor") || "#ffffff";
    }
    return "#ffffff";
  });

  function changeBgColor(color: string) {
    setBgColor(color);
    localStorage.setItem("bgColor", color);
  }

  return { bgColor, changeBgColor };
}
