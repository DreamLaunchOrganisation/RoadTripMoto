"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { initialTrips } from "./trips-data";
import type { Trip } from "./types";

/**
 * Store de démo : les road trips sont gardés dans le navigateur (localStorage)
 * pour que la cliente puisse tester l'ajout/modification et retrouver ses changements.
 * En production : remplacer par des appels API vers la base de données.
 */
const KEY = "acrt-demo-trips-v1";

interface Store {
  trips: Trip[];
  addTrip: (t: Omit<Trip, "id" | "visible">) => void;
  updateTrip: (id: number, t: Partial<Trip>) => void;
  deleteTrip: (id: number) => void;
  resetDemo: () => void;
  toast: (msg: string) => void;
  toastMsg: string | null;
  openTripId: number | null;
  openTripVideo: boolean;
  openTrip: (id: number, video?: boolean) => void;
  closeTrip: () => void;
}

const Ctx = createContext<Store | null>(null);

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [loaded, setLoaded] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [openTripId, setOpenTripId] = useState<number | null>(null);
  const [openTripVideo, setOpenTripVideo] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setTrips(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(trips));
    } catch {
      // Quota dépassé (photos lourdes) : la démo continue en mémoire.
    }
  }, [trips, loaded]);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 2200);
  }, []);

  const value: Store = {
    trips,
    addTrip: (t) =>
      setTrips((prev) => [...prev, { ...t, id: Math.max(0, ...prev.map((p) => p.id)) + 1, visible: true }]),
    updateTrip: (id, t) => setTrips((prev) => prev.map((p) => (p.id === id ? { ...p, ...t } : p))),
    deleteTrip: (id) => setTrips((prev) => prev.filter((p) => p.id !== id)),
    resetDemo: () => setTrips(initialTrips),
    toast,
    toastMsg,
    openTripId,
    openTripVideo,
    openTrip: (id, video = false) => {
      setOpenTripId(id);
      setOpenTripVideo(video);
    },
    closeTrip: () => setOpenTripId(null),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTrips() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useTrips doit être utilisé dans <TripsProvider>");
  return c;
}
