const faq = [
  [
    "Quel niveau faut-il pour participer ?",
    "Chaque road trip indique un niveau (Débutant, Intermédiaire, Confirmé). Les trips débutants restent sur des routes faciles avec des étapes courtes.",
  ],
  ["Puis-je venir en duo ?", "Oui, les passagers sont les bienvenus. Un tarif duo est appliqué (hébergement partagé)."],
  [
    "Que se passe-t-il en cas de panne ?",
    "Le guide vous accompagne et nous organisons l'assistance avec votre assurance. Une assistance dépannage est vivement recommandée.",
  ],
  ["Comment se passe le paiement ?", "Un acompte de 30 % confirme la réservation, le solde est demandé 30 jours avant le départ."],
  [
    "Quelles sont les conditions d'annulation ?",
    "L'acompte est remboursable jusqu'à 60 jours avant le départ. Les conditions détaillées sont envoyées avec la confirmation.",
  ],
];

export default function Faq() {
  return (
    <section id="faq" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <span className="label">Questions fréquentes</span>
        <h2>
          Bon à <em>savoir</em>
        </h2>
        <div className="faq">
          {faq.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
