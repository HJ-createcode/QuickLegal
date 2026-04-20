import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageLayout, TrustSection } from "@/components/TrustPageLayout";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Tout ce qu'il faut savoir sur QuickLegal : services, produits, paiement, sécurité, accès à vie, différences avec un cabinet. Vos réponses en un coup d'œil.",
  alternates: { canonical: "/faq" },
  openGraph: {
    url: `${SITE_URL}/faq`,
    title: "Questions fréquentes | QuickLegal",
  },
};

interface QA {
  q: string;
  a: string;
}

interface Group {
  title: string;
  items: QA[];
}

const GROUPS: Group[] = [
  {
    title: "Le service",
    items: [
      {
        q: "Qu'est-ce que QuickLegal exactement ?",
        a: "QuickLegal est une plateforme d'édition de modèles juridiques français. Vous répondez à un questionnaire guidé, vous payez le document à prix fixe, vous téléchargez un PDF personnalisé prêt à signer.",
      },
      {
        q: "QuickLegal est-il un cabinet d'avocats ?",
        a: "Non. QuickLegal est un éditeur de modèles juridiques. Les modèles sont rédigés par des juristes puis revus par un avocat d'affaires inscrit au Barreau de Paris, mais nous ne fournissons pas de consultation personnalisée.",
      },
      {
        q: "À qui le service s'adresse-t-il ?",
        a: "Aux fondateurs, dirigeants et indépendants qui ont besoin d'actes courants (statuts, PV, CGV, NDA, mentions légales) rapidement et à coût maîtrisé, sans faire tous les allers-retours avec un cabinet pour des documents standardisés.",
      },
      {
        q: "Dois-je créer un compte pour générer un document ?",
        a: "Oui. Le compte est gratuit et permet de retrouver vos documents à tout moment dans votre espace, de reprendre un questionnaire en cours, ou de régénérer une variante.",
      },
    ],
  },
  {
    title: "Produits et périmètre juridique",
    items: [
      {
        q: "Les documents sont-ils à jour du droit français ?",
        a: "Oui. Les modèles sont révisés au fil des évolutions législatives, jurisprudentielles et réglementaires. Chaque fois qu'un texte clé change (Code de commerce, Code de la consommation, RGPD…), les modèles concernés sont mis à jour.",
      },
      {
        q: "Les documents conviennent-ils à une juridiction étrangère ?",
        a: "Non. Tous nos modèles sont calibrés pour le droit français. Ils référencent les textes du Code de commerce, du Code civil, du Code de la consommation et du RGPD. Ils ne sont pas adaptés à une juridiction étrangère.",
      },
      {
        q: "Un document peut-il être signé par signature électronique ?",
        a: "Oui, dans les limites prévues par le règlement eIDAS et la jurisprudence française. Notre PDF peut être signé via les plateformes classiques (DocuSign, Yousign, etc.). Certains actes exigeant un formalisme renforcé (par exemple un testament authentique) ne peuvent évidemment pas être signés électroniquement.",
      },
      {
        q: "Et si ma situation sort du modèle proposé ?",
        a: "Chaque page produit précise le périmètre exact, ce qui est inclus et ce qui ne l'est pas. Si votre situation est atypique — clauses avancées, dimension internationale, patrimoine complexe — faites relire le document par votre conseil habituel avant signature.",
      },
    ],
  },
  {
    title: "Paiement, abonnement, prix",
    items: [
      {
        q: "Y a-t-il un abonnement ?",
        a: "Non. Vous payez uniquement le document que vous générez, au prix fixe indiqué. Aucun prélèvement récurrent, aucun engagement, aucune facturation cachée.",
      },
      {
        q: "Comment se déroule le paiement ?",
        a: "Le paiement se fait en ligne par carte bancaire via Stripe. Nous ne stockons aucune donnée de carte. Dès que la transaction est validée, le document est généré et mis à disposition dans votre espace.",
      },
      {
        q: "Puis-je obtenir une facture ?",
        a: "Oui. Une facture récapitulative est disponible dans votre espace après chaque achat. Si vous souhaitez modifier des informations de facturation (raison sociale, TVA), contactez le support.",
      },
      {
        q: "Puis-je me faire rembourser ?",
        a: "Le service étant constitué par la fourniture d'un contenu numérique immédiatement exécuté, le droit de rétractation ne s'exerce pas après génération du document (art. L.221-28, 13° du Code de la consommation). En cas d'erreur technique empêchant la génération, le remboursement est intégral et immédiat.",
      },
    ],
  },
  {
    title: "Sécurité et accès à vos documents",
    items: [
      {
        q: "Combien de temps mes documents sont-ils conservés ?",
        a: "Sans limite, tant que votre compte est actif. Vous pouvez retélécharger un document ou rouvrir son questionnaire à tout moment depuis votre espace.",
      },
      {
        q: "Mes données sont-elles sécurisées ?",
        a: "Oui. Nous utilisons HTTPS partout, stockons les mots de passe sous forme d'empreintes cryptographiques (bcrypt), et appliquons des en-têtes HTTP de sécurité stricts. Les détails figurent dans la politique de confidentialité.",
      },
      {
        q: "Qui peut voir mes documents ?",
        a: "Vous seul, via votre compte authentifié. Les données applicatives sont cloisonnées par utilisateur. Aucun tiers n'a accès à votre contenu en dehors de l'équipe QuickLegal et de ses sous-traitants techniques, dans les cas strictement nécessaires au fonctionnement du service.",
      },
      {
        q: "Puis-je supprimer mon compte et mes documents ?",
        a: "Oui. Contactez le support pour demander la suppression complète. Certaines données de facturation sont conservées pendant la durée légale imposée par le Code de commerce.",
      },
    ],
  },
  {
    title: "Comparaison avec un cabinet d'avocats",
    items: [
      {
        q: "Quand choisir QuickLegal plutôt qu'un cabinet ?",
        a: "Pour les actes standardisés du droit français, quand le modèle couvre votre situation : statuts de SAS ou SCI classiques, PV d'approbation des comptes, CGV e-commerce, NDA bilatéral, mentions légales. Pour ces cas, le cabinet facturera largement plus cher pour produire un document équivalent.",
      },
      {
        q: "Quand privilégier un cabinet ?",
        a: "Pour une structuration complexe (holdings multiples, actions de préférence, pactes d'actionnaires avancés), des opérations internationales, un contentieux en cours, ou toute situation où un conseil stratégique personnalisé est nécessaire.",
      },
      {
        q: "Peut-on combiner les deux ?",
        a: "Oui, et c'est un usage pertinent. Générez la base via QuickLegal, faites-la relire par votre cabinet si la situation l'exige. Vous économisez le temps de rédaction en conservant le contrôle juridique.",
      },
    ],
  },
];

const FLATTENED = GROUPS.flatMap((g) => g.items);

export default function FAQPage() {
  return (
    <>
      <TrustPageLayout
        eyebrow="Centre d'aide"
        title="Questions fréquentes"
        subtitle="Un aperçu rapide de ce qu'il faut savoir avant, pendant et après votre commande."
      >
        {GROUPS.map((group) => (
          <TrustSection
            key={group.title}
            id={group.title.toLowerCase().replace(/\s+/g, "-")}
            title={group.title}
          >
            <div className="space-y-3">
              {group.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-200 bg-white p-5"
                >
                  <summary className="flex justify-between items-start gap-4 cursor-pointer font-medium text-slate-900 text-sm list-none">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="text-slate-400 text-lg leading-none transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </TrustSection>
        ))}

        <TrustSection title="Vous ne trouvez pas votre réponse ?">
          <p>
            Consultez les pages produit — chaque document a sa propre FAQ
            dédiée, souvent plus précise que cette vue d&apos;ensemble. Vous
            pouvez aussi nous écrire directement.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <Link
              href="/generation-document"
              className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
            >
              Voir le catalogue
            </Link>
            <Link
              href="/comment-ca-marche"
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-900 text-sm font-medium"
            >
              Comment ça marche
            </Link>
            <Link
              href="/notre-methode"
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-900 text-sm font-medium"
            >
              Notre méthode
            </Link>
          </div>
        </TrustSection>
      </TrustPageLayout>

      <JsonLd
        id="ld-faq-full"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FLATTENED.map((qa) => ({
            "@type": "Question",
            name: qa.q,
            acceptedAnswer: { "@type": "Answer", text: qa.a },
          })),
        }}
      />
    </>
  );
}
