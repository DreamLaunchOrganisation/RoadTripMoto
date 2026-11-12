"use client";

import { useTrips } from "@/lib/store";
import { Landscape } from "./Landscape";

export default function VideoSection() {
  const { trips, openTrip } = useTrips();
  const withVideo = trips.find((t) => t.visible && t.video) ?? trips.find((t) => t.visible);

  return (
    <section id="video">
      <div className="wrap video-band">
        <div>
          <span className="label">En images</span>
          <h2>
            Ce qui vous <em>attend</em>
          </h2>
          <p style={{ color: "var(--muted)" }}>
            Cols, lacets, paysages et soirées entre passionnés. Chaque road trip a sa vidéo et sa galerie photo,
            directement sur sa fiche.
          </p>
          <a href="#trips" className="btn btn-ghost" style={{ marginTop: "1.5rem" }}>
            Explorer les road trips
          </a>
        </div>
        <div className="video-box" onClick={() => withVideo && openTrip(withVideo.id, true)}>
          <Landscape art="sud" seed={77} />
          <div className="play">
            <span>▶</span>
          </div>
        </div>
      </div>
    </section>
  );
}
