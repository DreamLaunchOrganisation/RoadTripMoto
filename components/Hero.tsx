"use client";

import { useEffect, useRef, useState } from "react";
import { Landscape } from "./Landscape";
import { fmt } from "@/lib/format";

function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const step = Math.max(1, Math.ceil(to / 60));
        timer = window.setInterval(() => {
          setV((cur) => {
            const n = Math.min(to, cur + step);
            if (n >= to) window.clearInterval(timer);
            return n;
          });
        }, 18);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [to]);
  return (
    <div className="stat">
      <strong ref={ref}>
        {fmt(v)}
        {to >= 1000 && v >= to ? "+" : ""}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="label">Road trips moto encadrés</span>
            <h1>
              La route,
              <br />
              <em>vécue ensemble.</em>
            </h1>
            <p>
              Des itinéraires préparés avec soin, des hébergements réservés. Vous
              n&apos;avez plus qu&apos;à rouler.
            </p>
            <div className="hero-ctas">
              <a href="#trips" className="btn btn-primary">
                Voir les prochains départs →
              </a>
              <a href="#concept" className="btn btn-ghost">
                Comment ça marche
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <Landscape art="alpes" seed={42} />
            <span className="anno" style={{ top: 18, left: 18 }}>
              <b>2 764 m</b> · Col de l&apos;Iseran
            </span>
            <span className="anno" style={{ top: "42%", right: 16 }}>
              <b>48</b> lacets
            </span>
            <span className="anno" style={{ bottom: 22, left: 18 }}>
              <b>7</b> jours · <b>1 650</b> km
            </span>
          </div>
        </div>
        <div className="stats">
          <Counter to={5} label="road trips organisés" />
          <Counter to={10} label="motards accompagnés" />
          <Counter to={10000} label="km parcourus" />
          <Counter to={4} label="pays traversés" />
        </div>
      </div>
    </section>
  );
}
