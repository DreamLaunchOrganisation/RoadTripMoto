const steps = [
  ["Choisissez", "Sélectionnez un road trip selon vos envies, votre niveau et vos dates."],
  ["Réservez", "Réservez votre place en ligne, seul ou en duo. Un acompte confirme votre inscription."],
  ["Préparez-vous", "Vous recevez le roadbook, le tracé GPS et la liste du matériel conseillé."],
  ["Roulez", "Rendez-vous au départ, le guide ouvre la route. Plus qu'à profiter."],
];

const included = [
  ["🗺️", "Itinéraire & traces GPS", "Routes choisies et reconnues"],
  ["🏨", "Hébergements réservés", "Hôtels avec parking moto"],
  ["🧭", "Guide motard", "Encadrement tout au long du trip"],
  ["🍽️", "Petits-déjeuners & dîners", "Selon formule"],
  ["📸", "Photos souvenirs", "Partagées après le trip"],
  ["🛟", "Assistance", "En cas de pépin sur la route"],
];

export default function Concept() {
  return (
    <section id="concept" className="concept">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="label">Le concept</span>
            <h2>
              Vous roulez, <em>on s&apos;occupe du reste</em>
            </h2>
          </div>
          <p>
            Chaque road trip est reconnu en amont : routes, pauses, hôtels et restaurants sont testés pour que vous
            profitiez uniquement du plaisir de rouler.
          </p>
        </div>
        <div className="steps">
          {steps.map(([title, text], i) => (
            <div className="step" key={title}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="incl">
          {included.map(([icon, title, sub]) => (
            <div key={title}>
              <i>{icon}</i>
              <span>
                <b>{title}</b>
                <br />
                <small style={{ color: "var(--muted)" }}>{sub}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
