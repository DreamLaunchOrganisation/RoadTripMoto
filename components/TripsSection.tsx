"use client";

import { useState } from "react";
import { useTrips } from "@/lib/store";
import { fmt, fmtDate } from "@/lib/format";
import type { Trip } from "@/lib/types";
import { TripCover } from "./TripCover";

const filters = [
  ["all", "Tous"],
  ["weekend", "Week-end"],
  ["semaine", "Une semaine et +"],
  ["Débutant", "Débutant"],
  ["Confirmé", "Confirmé"],
] as const;

type Filter = (typeof filters)[number][0];

function match(t: Trip, f: Filter) {
  if (f === "all") return true;
  if (f === "weekend") return t.days <= 3;
  if (f === "semaine") return t.days >= 7;
  return t.level === f;
}

export default function TripsSection() {
  const { trips, openTrip } = useTrips();
  const [filter, setFilter] = useState<Filter>("all");
  const list = trips
    .filter((t) => t.visible && match(t, filter))
    .sort((a, b) => (a.start || "9").localeCompare(b.start || "9"));

  return (
    <section id="trips">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label">Prochains départs</span>
            <h2>
              Choisissez votre <em>prochaine route</em>
            </h2>
          </div>
          <div className="filters">
            {filters.map(([k, label]) => (
              <button key={k} className={`chip ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="trips">
          {list.length === 0 && <div className="empty">Aucun road trip pour ce filtre pour l&apos;instant.</div>}
          {list.map((t) => (
            <article key={t.id} className="trip" onClick={() => openTrip(t.id)}>
              <div className="trip-cover">
                <TripCover trip={t} />
                <span className="badge">{fmtDate(t.start)}</span>
                {t.left <= 4 && <span className="badge hot">{t.left === 0 ? "Complet" : `Plus que ${t.left} places`}</span>}
              </div>
              <div className="trip-body">
                <span className="label">{t.region}</span>
                <h3>{t.title}</h3>
                <div className="meta">
                  <span>⏱ {t.days} jour{t.days > 1 ? "s" : ""}</span>
                  <span>🛣 {fmt(t.km)} km</span>
                  <span>◆ {t.level}</span>
                </div>
                <p>{t.short}</p>
                <div className="trip-foot">
                  <div className="price">
                    <small>dès </small>
                    {fmt(t.price)} €<small> /pilote</small>
                  </div>
                  <span className="btn btn-ghost btn-sm">Détails →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
