/* eslint-disable @next/next/no-img-element */
import type { Trip } from "@/lib/types";
import { Landscape } from "./Landscape";

/** Photo n°i du road trip, ou illustration générée si la cliente n'a pas encore ajouté de photo. */
export function TripCover({ trip, i = 0 }: { trip: Trip; i?: number }) {
  return trip.images[i] ? <img src={trip.images[i]} alt={trip.title} /> : <Landscape art={trip.art} seed={trip.id + i} />;
}
