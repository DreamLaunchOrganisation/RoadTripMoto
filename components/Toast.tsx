"use client";

import { useTrips } from "@/lib/store";

export default function Toast() {
  const { toastMsg } = useTrips();
  return <div className={`toast ${toastMsg ? "show" : ""}`}>{toastMsg}</div>;
}
