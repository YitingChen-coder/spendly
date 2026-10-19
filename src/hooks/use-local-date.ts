"use client";

import { useSyncExternalStore } from "react";
import { getLocalDate } from "@/lib/expense";

function subscribe(onChange: () => void) {
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  const interval = window.setInterval(onChange, 60_000);
  return () => {
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
    window.clearInterval(interval);
  };
}

export function useLocalDate() {
  const date = useSyncExternalStore(subscribe, getLocalDate, () => "");
  return date || getLocalDate();
}
