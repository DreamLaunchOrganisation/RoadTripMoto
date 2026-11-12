export type Level = "Débutant" | "Intermédiaire" | "Confirmé";

export type ArtKey = "alpes" | "ardenne" | "sud" | "desert" | "nuit" | "ecosse";

export interface Trip {
  id: number;
  title: string;
  region: string;
  /** Date de départ au format AAAA-MM-JJ */
  start: string;
  days: number;
  km: number;
  level: Level;
  /** Prix par pilote (€) */
  price: number;
  /** Prix pilote + passager (€) */
  duo: number;
  seats: number;
  left: number;
  visible: boolean;
  /** Ambiance d'illustration utilisée tant qu'il n'y a pas de photo */
  art: ArtKey;
  short: string;
  desc: string;
  itin: [string, string][];
  included: string[];
  /** URLs (ou data-URLs en démo) des photos – la première sert de couverture */
  images: string[];
  /** Lien YouTube/Vimeo (embed) ou URL de fichier vidéo */
  video: string;
}
