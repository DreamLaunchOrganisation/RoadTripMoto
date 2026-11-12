"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { useTrips } from "@/lib/store";
import { fmt, fmtDate, toEmbed } from "@/lib/format";
import type { ArtKey, Level, Trip } from "@/lib/types";
import { palettes } from "./Landscape";
import { TripCover } from "./TripCover";

/**
 * Espace gestion – DÉMO.
 * La connexion est simulée. En production : authentification serveur
 * (ex. lien magique par e-mail + liste d'e-mails autorisés en variable d'environnement)
 * et routes API protégées pour créer / modifier / supprimer.
 */

type Draft = Omit<Trip, "id" | "visible">;

const emptyDraft: Draft = {
  title: "", region: "", start: "", days: 3, km: 0, level: "Intermédiaire", price: 0, duo: 0,
  seats: 12, left: 12, art: "alpes", short: "", desc: "", itin: [["J1", ""]],
  included: ["Hébergement", "Guide motard"], images: [], video: "",
};

/** Redimensionne et compresse une photo avant stockage (démo : localStorage limité). */
function resizeImage(file: File, max = 1400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.78));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function Admin() {
  const { trips, addTrip, updateTrip, deleteTrip, resetDemo, toast } = useTrips();
  const [open, setOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const [tab, setTab] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [confirmDel, setConfirmDel] = useState<number | null>(null);
  const [videoName, setVideoName] = useState("");
  const imgIn = useRef<HTMLInputElement>(null);
  const vidIn = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  const startNew = () => {
    setEditingId(null);
    setDraft({ ...emptyDraft, itin: [["J1", ""]] });
    setVideoName("");
    setTab("form");
  };
  const startEdit = (t: Trip) => {
    const { id, visible, ...rest } = t;
    void visible;
    setEditingId(id);
    setDraft({ ...rest, itin: rest.itin.length ? rest.itin : [["J1", ""]] });
    setVideoName("");
    setTab("form");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Draft = {
      ...draft,
      video: toEmbed(draft.video.trim()),
      itin: draft.itin.filter(([, s]) => s.trim()),
      included: draft.included.map((s) => s.trim()).filter(Boolean),
    };
    if (editingId !== null) {
      updateTrip(editingId, data);
      toast("Modifications enregistrées");
    } else {
      addTrip(data);
      toast("Road trip publié sur le site ✓");
    }
    setTab("list");
    setEditingId(null);
  };

  const onDelete = (id: number) => {
    if (confirmDel !== id) {
      setConfirmDel(id);
      window.setTimeout(() => setConfirmDel((c) => (c === id ? null : c)), 2500);
      return;
    }
    deleteTrip(id);
    setConfirmDel(null);
    toast("Road trip supprimé");
  };

  return (
    <>
      <button className="btn btn-primary admin-fab" onClick={() => setOpen(true)}>
        ⚙ Espace gestion
      </button>
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h3>
            Espace <em>gestion</em>
          </h3>
          <button className="icon-btn" aria-label="Fermer" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        {!logged ? (
          <div className="drawer-body">
            <form
              className="login"
              onSubmit={(e) => {
                e.preventDefault();
                setLogged(true);
              }}
            >
              <p>
                Connexion réservée à la gérante.
                <br />
                <small>(démo : aucun mot de passe requis)</small>
              </p>
              <div className="field">
                <input defaultValue="cliente@ac-road-trip.be" aria-label="E-mail" />
              </div>
              <div className="field">
                <input type="password" defaultValue="demo1234" aria-label="Mot de passe" />
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Se connecter
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="drawer-tabs">
              <button className={tab === "list" ? "active" : ""} onClick={() => setTab("list")}>
                Mes road trips ({trips.length})
              </button>
              <button className={tab === "form" ? "active" : ""} onClick={startNew}>
                {editingId !== null && tab === "form" ? "Modifier" : "+ Ajouter"}
              </button>
            </div>
            <div className="drawer-body">
              {tab === "list" ? (
                <>
                  <p className="hint" style={{ margin: "0 0 14px" }}>
                    Activez/désactivez la visibilité, modifiez ou supprimez. Les changements sont visibles
                    immédiatement sur le site.
                  </p>
                  {trips.map((t) => (
                    <div className="adm-item" key={t.id}>
                      <div className="mini">
                        <TripCover trip={t} />
                      </div>
                      <div className="info">
                        <b>{t.title}</b>
                        <small>
                          {fmtDate(t.start)} · {fmt(t.price)} € · {t.left}/{t.seats} places
                        </small>
                      </div>
                      <label className="switch" title="Visible sur le site">
                        <input
                          type="checkbox"
                          checked={t.visible}
                          onChange={(e) => {
                            updateTrip(t.id, { visible: e.target.checked });
                            toast(e.target.checked ? "Road trip publié" : "Road trip masqué");
                          }}
                        />
                        <span />
                      </label>
                      <button className="icon-btn" title="Modifier" onClick={() => startEdit(t)}>
                        ✎
                      </button>
                      <button
                        className="icon-btn del"
                        title={confirmDel === t.id ? "Cliquer à nouveau pour confirmer" : "Supprimer"}
                        style={confirmDel === t.id ? { borderColor: "var(--danger)", color: "var(--danger)" } : undefined}
                        onClick={() => onDelete(t.id)}
                      >
                        {confirmDel === t.id ? "?" : "🗑"}
                      </button>
                    </div>
                  ))}
                  <div className="adm-actions">
                    <button className="btn btn-primary btn-sm" onClick={startNew}>
                      + Ajouter un road trip
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        resetDemo();
                        toast("Démo réinitialisée");
                      }}
                    >
                      Réinitialiser la démo
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="field">
                    <label>Titre du road trip *</label>
                    <input required value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="ex. Tour de Corse" />
                  </div>
                  <div className="row">
                    <div className="field">
                      <label>Région / pays</label>
                      <input value={draft.region} onChange={(e) => set("region", e.target.value)} placeholder="France · Corse" />
                    </div>
                    <div className="field">
                      <label>Date de départ</label>
                      <input type="date" value={draft.start} onChange={(e) => set("start", e.target.value)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="field">
                      <label>Durée (jours)</label>
                      <input type="number" min={1} value={draft.days} onChange={(e) => set("days", +e.target.value || 1)} />
                    </div>
                    <div className="field">
                      <label>Distance (km)</label>
                      <input type="number" min={0} value={draft.km || ""} onChange={(e) => set("km", +e.target.value || 0)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="field">
                      <label>Prix pilote (€) *</label>
                      <input type="number" min={0} required value={draft.price || ""} onChange={(e) => set("price", +e.target.value || 0)} />
                    </div>
                    <div className="field">
                      <label>Prix duo (€)</label>
                      <input type="number" min={0} value={draft.duo || ""} onChange={(e) => set("duo", +e.target.value || 0)} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="field">
                      <label>Niveau</label>
                      <select value={draft.level} onChange={(e) => set("level", e.target.value as Level)}>
                        <option>Débutant</option>
                        <option>Intermédiaire</option>
                        <option>Confirmé</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Places (total / restantes)</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input type="number" min={0} value={draft.seats} onChange={(e) => set("seats", +e.target.value || 0)} />
                        <input type="number" min={0} value={draft.left} onChange={(e) => set("left", +e.target.value || 0)} />
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label>Accroche (carte)</label>
                    <input maxLength={160} value={draft.short} onChange={(e) => set("short", e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Description complète</label>
                    <textarea value={draft.desc} onChange={(e) => set("desc", e.target.value)} />
                  </div>

                  <div className="field">
                    <label>Photos</label>
                    <div className="drop" onClick={() => imgIn.current?.click()}>
                      📷 Cliquez pour ajouter des photos
                      <br />
                      <small>JPG / PNG – la première sert de couverture</small>
                    </div>
                    <input
                      ref={imgIn}
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={async (e) => {
                        const files = [...(e.target.files ?? [])];
                        const urls = await Promise.all(files.map((f) => resizeImage(f)));
                        setDraft((d) => ({ ...d, images: [...d.images, ...urls] }));
                        e.target.value = "";
                      }}
                    />
                    <div className="previews">
                      {draft.images.map((src, i) => (
                        <div key={i}>
                          <img src={src} alt="" />
                          <button
                            type="button"
                            aria-label="Retirer"
                            onClick={() => setDraft((d) => ({ ...d, images: d.images.filter((_, j) => j !== i) }))}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>Vidéo</label>
                    <input value={draft.video.startsWith("blob:") ? "" : draft.video} onChange={(e) => set("video", e.target.value)} placeholder="Lien YouTube / Vimeo" />
                    <div className="hint">
                      ou{" "}
                      <a
                        href="#"
                        style={{ color: "var(--accent)" }}
                        onClick={(e) => {
                          e.preventDefault();
                          vidIn.current?.click();
                        }}
                      >
                        importer un fichier vidéo
                      </a>{" "}
                      {videoName && `✓ ${videoName} (aperçu temporaire en démo)`}
                    </div>
                    <input
                      ref={vidIn}
                      type="file"
                      accept="video/*"
                      hidden
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        set("video", URL.createObjectURL(f));
                        setVideoName(f.name);
                      }}
                    />
                  </div>

                  <div className="field">
                    <label>Itinéraire jour par jour</label>
                    {draft.itin.map(([d, s], i) => (
                      <div className="itin-row" key={i}>
                        <input
                          value={d}
                          onChange={(e) =>
                            setDraft((x) => ({ ...x, itin: x.itin.map((r, j) => (j === i ? [e.target.value, r[1]] : r)) }))
                          }
                        />
                        <input
                          value={s}
                          placeholder="Ville → Ville · col / point fort"
                          onChange={(e) =>
                            setDraft((x) => ({ ...x, itin: x.itin.map((r, j) => (j === i ? [r[0], e.target.value] : r)) }))
                          }
                        />
                        <button
                          type="button"
                          className="icon-btn del"
                          aria-label="Supprimer l'étape"
                          onClick={() => setDraft((x) => ({ ...x, itin: x.itin.filter((_, j) => j !== i) }))}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => setDraft((x) => ({ ...x, itin: [...x.itin, [`J${x.itin.length + 1}`, ""]] }))}
                    >
                      + Ajouter une étape
                    </button>
                  </div>

                  <div className="field">
                    <label>Inclus (séparés par des virgules)</label>
                    <input value={draft.included.join(", ")} onChange={(e) => set("included", e.target.value.split(","))} />
                  </div>

                  {draft.images.length === 0 && (
                    <div className="field">
                      <label>Ambiance visuelle (si pas de photo)</label>
                      <select value={draft.art} onChange={(e) => set("art", e.target.value as ArtKey)}>
                        {Object.keys(palettes).map((k) => (
                          <option key={k}>{k}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="adm-actions">
                    <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                      {editingId !== null ? "Enregistrer" : "Publier le road trip"}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => setTab("list")}>
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
