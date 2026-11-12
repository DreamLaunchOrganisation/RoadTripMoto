"use client";

import { useState } from "react";

export function Logo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="#e8862c" strokeWidth="2" />
      <path d="M8 28 C14 16, 22 30, 32 12" stroke="#f3ede4" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
      <circle cx="32" cy="12" r="3" fill="#e8862c" />
    </svg>
  );
}

const links = [
  ["#trips", "Road trips"],
  ["#concept", "Le concept"],
  ["#video", "En images"],
  ["#faq", "FAQ"],
  ["#contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <div className="wrap nav">
        <a href="#top" className="logo">
          <Logo />
          AC Road Trip
        </a>
        <ul className={open ? "open" : ""}>
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <a href="#contact" className="btn btn-primary btn-sm">
            Réserver ma place
          </a>
          <button className="burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
