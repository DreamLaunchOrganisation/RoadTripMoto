"use client";

import { useTrips } from "@/lib/store";
import { fmtDate } from "@/lib/format";

export default function Contact() {
  const { trips, toast } = useTrips();
  return (
    <section id="contact" className="concept">
      <div className="wrap contact-grid">
        <div>
          <span className="label">Contact &amp; réservation</span>
          <h2>
            Prêt à <em>prendre la route&nbsp;?</em>
          </h2>
          <div className="contact-info">
            <div>
              <small>E-mail</small>monmail@mail.be
            </div>
            <div>
              <small>Téléphone</small>+32 4xx xx xx xx
            </div>
            <div>
              <small>Basé en</small>Belgique
            </div>
            <div>
              <small>Suivez-nous</small>Instagram · Facebook · YouTube
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast("Demande envoyée (démo)");
            e.currentTarget.reset();
          }}
        >
          <div className="row">
            <div className="field">
              <label htmlFor="c-name">Nom</label>
              <input id="c-name" required />
            </div>
            <div className="field">
              <label htmlFor="c-mail">E-mail</label>
              <input id="c-mail" type="email" required />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="c-trip">Road trip</label>
              <select id="c-trip">
                {trips
                  .filter((t) => t.visible)
                  .map((t) => (
                    <option key={t.id}>
                      {t.title} – {fmtDate(t.start)}
                    </option>
                  ))}
                <option>Autre / sur mesure</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="c-who">Participants</label>
              <select id="c-who">
                <option>1 pilote</option>
                <option>Pilote + passager</option>
                <option>2 pilotes</option>
                <option>Groupe</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="c-msg">Message</label>
            <textarea id="c-msg" placeholder="Votre moto, vos questions..." />
          </div>
          <button className="btn btn-primary">Envoyer ma demande →</button>
        </form>
      </div>
    </section>
  );
}
