import type { Trip } from "./types";

/**
 * Données d'exemple pour le POC.
 * En production : remplacé par une base de données (ex. Supabase) alimentée par l'espace gestion.
 */
export const initialTrips: Trip[] = [
  {
    id: 1, title: "Route des Grandes Alpes", region: "France · Alpes", start: "2027-06-12", days: 7, km: 1650,
    level: "Confirmé", price: 1890, duo: 2990, seats: 12, left: 4, visible: true, art: "alpes",
    short: "Du Léman à la Méditerranée par les plus grands cols : Iseran, Galibier, Izoard, Bonette.",
    desc: "Le mythe absolu du motard. Sept jours pour relier Thonon-les-Bains à Menton en franchissant plus de 16 cols, dont les plus hauts d'Europe. Étapes de 200 à 280 km, hôtels de caractère au pied des cols et soirées savoyardes.",
    itin: [
      ["J1", "Thonon → Beaufort · Col des Aravis"],
      ["J2", "Beaufort → Val d'Isère · Cormet de Roselend"],
      ["J3", "Val d'Isère → Valloire · Col de l'Iseran"],
      ["J4", "Valloire → Briançon · Galibier"],
      ["J5", "Briançon → Barcelonnette · Izoard, Vars"],
      ["J6", "Barcelonnette → Saint-Martin · Bonette"],
      ["J7", "Saint-Martin → Menton · Arrivée mer"],
    ],
    included: ["6 nuits en hôtel", "Petits-déjeuners et dîners", "Guide motard", "Traces GPS", "Photos souvenirs"],
    images: [], video: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: 2, title: "Ardennes Express", region: "Belgique · Luxembourg", start: "2027-04-24", days: 2, km: 480,
    level: "Débutant", price: 349, duo: 590, seats: 16, left: 9, visible: true, art: "ardenne",
    short: "Un week-end de virolos entre Semois, Ourthe et Luxembourg. Idéal pour un premier road trip.",
    desc: "Le road trip parfait pour découvrir le concept : deux jours dans les plus belles vallées ardennaises, rythme tranquille, pauses gourmandes et une nuit dans une auberge au bord de la Semois.",
    itin: [["J1", "Spa → Bouillon · Vallée de l'Ourthe"], ["J2", "Bouillon → Vianden → Spa"]],
    included: ["1 nuit en auberge", "Petit-déjeuner et dîner", "Guide motard", "Traces GPS"],
    images: [], video: "",
  },
  {
    id: 3, title: "Pyrénées d'Ouest en Est", region: "France · Espagne", start: "2027-09-04", days: 8, km: 1900,
    level: "Confirmé", price: 2150, duo: 3390, seats: 10, left: 2, visible: true, art: "sud",
    short: "De l'Atlantique à la Méditerranée en zigzaguant entre France et Espagne : Tourmalet, Aubisque, Andorre.",
    desc: "Une traversée complète de la chaîne pyrénéenne, côté français et espagnol. Routes désertes, gorges, cols mythiques du Tour de France et gastronomie basque puis catalane.",
    itin: [
      ["J1", "Biarritz → Saint-Jean-Pied-de-Port"], ["J2", "→ Laruns · Col d'Aubisque"], ["J3", "→ Luz · Tourmalet"],
      ["J4", "→ Ainsa (Espagne)"], ["J5", "→ Andorre"], ["J6", "→ Puigcerdà"], ["J7", "→ Céret"], ["J8", "→ Collioure · Arrivée"],
    ],
    included: ["7 nuits en hôtel", "Demi-pension", "Guide motard", "Traces GPS", "Assistance"],
    images: [], video: "",
  },
  {
    id: 4, title: "Vosges & Route des Vins", region: "France · Alsace", start: "2027-05-15", days: 3, km: 720,
    level: "Intermédiaire", price: 590, duo: 960, seats: 14, left: 14, visible: true, art: "nuit",
    short: "Route des Crêtes, Grand Ballon et villages alsaciens. Trois jours entre virages et winstubs.",
    desc: "Un long week-end sur les plus belles routes des Vosges, avec une boucle sur la Route des Vins d'Alsace et une soirée dégustation.",
    itin: [["J1", "Belgique → Gérardmer"], ["J2", "Route des Crêtes · Grand Ballon · Riquewihr"], ["J3", "Retour par le Donon"]],
    included: ["2 nuits en hôtel", "Demi-pension", "Dégustation", "Guide motard"],
    images: [], video: "",
  },
  {
    id: 5, title: "Highlands Écossais", region: "Royaume-Uni · Écosse", start: "2027-07-10", days: 10, km: 2300,
    level: "Intermédiaire", price: 2690, duo: 4290, seats: 10, left: 6, visible: true, art: "ecosse",
    short: "North Coast 500, Isle of Skye et Glencoe. Les routes les plus sauvages d'Europe.",
    desc: "Ferry depuis Zeebrugge, puis dix jours au cœur des Highlands : lochs, single-track roads, châteaux et distilleries. Un voyage hors du temps.",
    itin: [
      ["J1", "Ferry Zeebrugge → Hull"], ["J2-3", "→ Édimbourg → Inverness"], ["J4-6", "North Coast 500"],
      ["J7-8", "Isle of Skye"], ["J9", "Glencoe → Glasgow"], ["J10", "Retour ferry"],
    ],
    included: ["Ferry A/R", "9 nuits", "Petits-déjeuners", "Guide motard", "Visite distillerie"],
    images: [], video: "",
  },
  {
    id: 6, title: "Toscane & Dolomites", region: "Italie", start: "2027-08-21", days: 9, km: 2100,
    level: "Confirmé", price: 2390, duo: 3790, seats: 12, left: 12, visible: true, art: "desert",
    short: "Des collines toscanes aux tours des Dolomites : Stelvio, Pordoi, Val d'Orcia.",
    desc: "Le meilleur de l'Italie à moto : la douceur toscane et la démesure alpine. Col du Stelvio et ses 48 lacets, Sella Ronda, cyprès du Val d'Orcia et pâtes fraîches tous les soirs.",
    itin: [
      ["J1-2", "Belgique → Lac de Côme"], ["J3", "Stelvio → Bormio"], ["J4", "Dolomites · Sella Ronda"],
      ["J5", "→ Vérone"], ["J6-7", "Toscane · Val d'Orcia"], ["J8-9", "Retour"],
    ],
    included: ["8 nuits", "Demi-pension", "Guide motard", "Traces GPS"],
    images: [], video: "",
  },
];
