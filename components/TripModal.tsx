"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { useTrips } from "@/lib/store";
import { fmt, fmtDate } from "@/lib/format";
import type { Trip } from "@/lib/types";
import { Landscape } from "./Landscape";

type Media = { type: "video"; src: string } | { type: "img"; src: string } | { type: "art"; i: number };

function mediaList(t: Trip): Media[] {
  const m: Media[] = [];
  if (t.video) m.push({ type: "video", src: t.video });
  if (t.images.length) t.images.forEach((src) => m.push({ type: "img", src }));
  else [0, 1, 2].forEach((i) => m.push({ type: "art", i }));
  return m;
}

function MediaView({ t, m }: { t: Trip; m: Media }) {
  if (m.type === "video") {
    if (/youtube|vimeo/.test(m.src))
      return <iframe src={m.src} title={t.title} allow="autoplay; encrypted-media; fullscreen" allowFullScreen />;
    return <video src={m.src} controls autoPlay />;
  }
  if (m.type === "img") return <img src={m.src} alt={t.title} />;
  return <Landscape art={t.art} seed={t.id + m.i} />;
}

export default function TripModal() {
  const { trips, openTripId, openTripVideo, closeTrip } = useTrips();
  const t = trips.find((x) => x.id === openTripId);
  const media = useMemo(() => (t ? mediaList(t) : []), [t]);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (!t) return;
    setCur(openTripVideo || !t.video ? 0 : media.length > 1 ? 1 : 0);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeTrip();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTripId]);

  if (!t) return null;

  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && closeTrip()}>
      <div className="modal">
        <button className="close" aria-label="Fermer" onClick={closeTrip}>
          ✕
        </button>
        <div className="gallery-main">{media[cur] && <MediaView t={t} m={media[cur]} />}</div>
        <div className="thumbs">
          {media.map((m, i) => (
            <div
              key={i}
              className={`thumb ${m.type === "video" ? "vid" : ""} ${i === cur ? "active" : ""}`}
              onClick={() => setCur(i)}
            >
              {m.type === "video" ? <Landscape art={t.art} seed={t.id + 9} road={false} /> : <MediaView t={t} m={m} />}
            </div>
          ))}
        </div>
        <div className="modal-body">
          <div>
            <span className="label">
              {t.region} · {fmtDate(t.start)}
            </span>
            <h2>{t.title}</h2>
            <div className="meta">
              <span>⏱ {t.days} jours</span>
              <span>🛣 {fmt(t.km)} km</span>
              <span>◆ {t.level}</span>
              <span>👥 {t.seats} places</span>
            </div>
            <p style={{ color: "var(--muted)", marginTop: "1rem", whiteSpace: "pre-line" }}>{t.desc}</p>
            {t.itin.length > 0 && (
              <>
                <h3 style={{ marginTop: "1.8rem", fontSize: "1.3rem" }}>Itinéraire</h3>
                <ul className="itin">
                  {t.itin.map(([d, s], i) => (
                    <li key={i}>
                      <b>{d}</b>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="book">
            <span className="label">Tarif</span>
            <div className="price">
              {fmt(t.price)} €<small> /pilote</small>
            </div>
            <ul>
              <li>
                <span>Duo (pilote + passager)</span>
                <span>{t.duo ? `${fmt(t.duo)} €` : "—"}</span>
              </li>
              <li>
                <span>Départ</span>
                <span>{fmtDate(t.start)}</span>
              </li>
              <li>
                <span>Places restantes</span>
                <span style={{ color: t.left <= 4 ? "var(--accent2)" : "var(--ok)" }}>
                  {t.left} / {t.seats}
                </span>
              </li>
            </ul>
            <span className="label" style={{ color: "var(--muted)" }}>
              Inclus
            </span>
            <div className="tags">
              {t.included.map((i) => (
                <span key={i}>✓ {i}</span>
              ))}
            </div>
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "1.4rem" }}
              onClick={closeTrip}
            >
              Réserver ma place
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
