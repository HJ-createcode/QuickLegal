import type { Metadata } from "next";
import {
  TrustPageLayout,
  TrustSection,
  TodoMark,
} from "@/components/TrustPageLayout";
import { CONTACT, isPlaceholder } from "@/lib/site-facts";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description:
    "Usage des cookies et technologies assimilées sur QuickLegal : cookies strictement nécessaires, mesure d'audience et gestion de vos préférences.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    url: `${SITE_URL}/cookies`,
    title: "Politique de cookies | QuickLegal",
  },
};

export default function CookiesPage() {
  return (
    <TrustPageLayout
      eyebrow="Cookies et traceurs"
      title="Politique de cookies"
      subtitle="Quels cookies nous utilisons, pourquoi, et comment vous pouvez les paramétrer."
    >
      <TrustSection title="1. Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier texte déposé sur votre appareil
          lorsque vous visitez un site web. Il permet au site de reconnaître
          votre navigateur, de mémoriser des informations utiles (session
          d&apos;authentification, préférences) ou de mesurer son utilisation.
        </p>
      </TrustSection>

      <TrustSection title="2. Cookies utilisés sur QuickLegal">
        <p className="font-medium text-slate-900">Cookies strictement nécessaires</p>
        <p>
          Ces cookies sont indispensables au fonctionnement du service. Ils ne
          sont pas soumis à consentement préalable, conformément à
          l&apos;article 82 de la loi Informatique et Libertés.
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-slate-400 mt-2">
          <li>Cookie de session d&apos;authentification (NextAuth)</li>
          <li>
            Jetons CSRF et de sécurité émis par le framework applicatif
          </li>
          <li>
            Cookies Stripe strictement nécessaires au déroulement du paiement
            sur la page de checkout
          </li>
        </ul>

        <p className="font-medium text-slate-900 mt-6">
          Cookies de mesure d&apos;audience anonymisée
        </p>
        <p>
          À la date de publication de cette politique, aucun outil de mesure
          d&apos;audience n&apos;est déployé sur le site. Si un tel outil
          était ajouté, il serait soumis à consentement préalable — une
          bannière dédiée vous permettrait d&apos;accepter ou de refuser
          avant tout dépôt.
        </p>

        <p className="font-medium text-slate-900 mt-6">
          Cookies publicitaires
        </p>
        <p>QuickLegal n&apos;utilise aucun cookie publicitaire.</p>
      </TrustSection>

      <TrustSection title="3. Stockage local de vos brouillons">
        <p>
          Lorsque vous remplissez un questionnaire, vos réponses sont
          sauvegardées dans le stockage local (<code>localStorage</code>) de
          votre navigateur afin de permettre une reprise ultérieure. Ces
          données ne sont pas transmises à un tiers tant que vous n&apos;avez
          pas déclenché le paiement.
        </p>
      </TrustSection>

      <TrustSection title="4. Gestion de vos préférences">
        <p>
          Vous pouvez à tout moment supprimer les cookies de votre navigateur
          ou configurer son comportement (acceptation, refus, alerte à chaque
          dépôt). Chaque navigateur propose une procédure spécifique —
          reportez-vous à son aide en ligne.
        </p>
        <p>
          Le refus des cookies strictement nécessaires peut empêcher le bon
          fonctionnement du service (connexion, paiement).
        </p>
      </TrustSection>

      <TrustSection title="5. Contact">
        <p>
          Pour toute question relative à cette politique :{" "}
          {isPlaceholder(CONTACT.dpoEmail) ? (
            <TodoMark label="email contact données" />
          ) : (
            <a
              href={`mailto:${CONTACT.dpoEmail}`}
              className="text-emerald-700 hover:text-emerald-800"
            >
              {CONTACT.dpoEmail}
            </a>
          )}
          .
        </p>
      </TrustSection>
    </TrustPageLayout>
  );
}
