import type { Metadata } from "next";
import {
  TrustPageLayout,
  TrustSection,
  TodoMark,
} from "@/components/TrustPageLayout";
import {
  CONTACT,
  LEGAL,
  INFRASTRUCTURE,
  isPlaceholder,
} from "@/lib/site-facts";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Traitements de données personnelles mis en œuvre sur QuickLegal : finalités, bases légales, destinataires, durées de conservation et droits des personnes (RGPD).",
  alternates: { canonical: "/politique-de-confidentialite" },
  openGraph: {
    url: `${SITE_URL}/politique-de-confidentialite`,
    title: "Politique de confidentialité | QuickLegal",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <TrustPageLayout
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      subtitle="Comment nous collectons, utilisons et protégeons vos données personnelles, dans le respect du RGPD et de la loi Informatique et Libertés."
    >
      <TrustSection title="1. Responsable du traitement">
        <p>
          Le responsable de traitement des données personnelles collectées sur
          le site QuickLegal est{" "}
          {isPlaceholder(LEGAL.legalName) ? (
            <TodoMark label="raison sociale de l'éditeur" />
          ) : (
            <span className="font-medium text-slate-900">
              {LEGAL.legalName}
            </span>
          )}
          , dont les coordonnées sont précisées dans les{" "}
          <a href="/mentions-legales" className="text-emerald-700 hover:text-emerald-800">
            mentions légales
          </a>
          .
        </p>
        <p>
          Pour toute question relative à vos données :{" "}
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

      <TrustSection title="2. Données collectées">
        <p>
          Nous ne collectons que les données strictement nécessaires au
          fonctionnement du service.
        </p>
        <p className="font-medium text-slate-900 mt-4">Création de compte</p>
        <p>
          Lors de l&apos;inscription, nous collectons votre adresse
          électronique, un nom d&apos;usage facultatif, et votre mot de passe
          (stocké sous forme d&apos;empreinte bcrypt — nous ne connaissons
          jamais votre mot de passe en clair).
        </p>
        <p className="font-medium text-slate-900 mt-4">Génération de documents</p>
        <p>
          Les informations saisies dans le questionnaire pour générer un
          document (dénominations, adresses, noms, dates…) sont stockées de
          manière sécurisée afin de reconstruire le document si vous souhaitez
          le retélécharger ou le rouvrir dans votre espace.
        </p>
        <p className="font-medium text-slate-900 mt-4">Paiement</p>
        <p>
          Les paiements sont traités par {INFRASTRUCTURE.paymentProvider}. Nous
          ne stockons aucune donnée de carte bancaire — seul un identifiant de
          session Stripe est conservé à des fins de rapprochement et de
          facturation.
        </p>
      </TrustSection>

      <TrustSection title="3. Finalités et bases légales">
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            <span className="font-medium text-slate-900">Fourniture du service</span>{" "}
            (exécution du contrat, art. 6.1.b RGPD) : création de compte,
            authentification, génération et stockage de vos documents.
          </li>
          <li>
            <span className="font-medium text-slate-900">Paiement et facturation</span>{" "}
            (exécution du contrat + obligation légale comptable, art. 6.1.b et
            6.1.c RGPD).
          </li>
          <li>
            <span className="font-medium text-slate-900">Sécurité et prévention des fraudes</span>{" "}
            (intérêt légitime, art. 6.1.f RGPD) : logs d&apos;accès, détection
            d&apos;abus.
          </li>
          <li>
            <span className="font-medium text-slate-900">Amélioration du service</span>{" "}
            (intérêt légitime, art. 6.1.f RGPD), dans la limite de mesures
            agrégées.
          </li>
        </ul>
      </TrustSection>

      <TrustSection title="4. Destinataires">
        <p>
          Seuls les personnes autorisées de l&apos;éditeur et ses
          sous-traitants techniques ont accès à vos données, dans la limite
          strictement nécessaire à l&apos;exécution du service.
        </p>
        <p className="font-medium text-slate-900 mt-4">Sous-traitants techniques</p>
        <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
          <li>
            <span className="font-medium">{INFRASTRUCTURE.hostingProvider}</span> —
            hébergement applicatif ({INFRASTRUCTURE.hostingAddress}).
          </li>
          <li>
            <span className="font-medium">{INFRASTRUCTURE.databaseProvider}</span> —
            stockage de la base de données.
          </li>
          <li>
            <span className="font-medium">{INFRASTRUCTURE.blobProvider}</span> —
            stockage des PDF finaux.
          </li>
          <li>
            <span className="font-medium">{INFRASTRUCTURE.paymentProvider}</span> —{" "}
            {INFRASTRUCTURE.paymentProviderAddress}.
          </li>
        </ul>
        <p className="mt-4">
          Vos données ne sont ni vendues, ni louées, ni communiquées à des
          tiers à des fins commerciales. Elles peuvent être transmises aux
          autorités compétentes sur réquisition légale.
        </p>
      </TrustSection>

      <TrustSection title="5. Transferts hors UE">
        <p>
          {INFRASTRUCTURE.hostingProvider} est établi aux États-Unis. Les
          transferts de données vers ce prestataire s&apos;appuient sur les
          Clauses Contractuelles Types adoptées par la Commission Européenne
          et, le cas échéant, sur le Data Privacy Framework (DPF) lorsque le
          prestataire y est certifié. Les autres prestataires sont établis
          dans l&apos;Union Européenne.
        </p>
      </TrustSection>

      <TrustSection title="6. Durées de conservation">
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            <span className="font-medium text-slate-900">Compte utilisateur</span> :
            conservé tant que votre compte est actif, puis supprimé sur demande
            ou après une période d&apos;inactivité prolongée.
          </li>
          <li>
            <span className="font-medium text-slate-900">Documents générés</span> :
            conservés tant que votre compte existe (« accessibles à vie »
            dans votre espace). Vous pouvez demander leur suppression.
          </li>
          <li>
            <span className="font-medium text-slate-900">Données de facturation</span> :
            conservées 10 ans conformément à l&apos;article L.123-22 du Code
            de commerce.
          </li>
          <li>
            <span className="font-medium text-slate-900">Logs techniques</span> :
            conservés 12 mois à des fins de sécurité et d&apos;audit.
          </li>
        </ul>
      </TrustSection>

      <TrustSection title="7. Vos droits">
        <p>
          Conformément au Règlement (UE) 2016/679 et à la loi n° 78-17
          modifiée, vous disposez des droits suivants sur vos données
          personnelles :
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
          <li>Droit d&apos;accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit d&apos;effacement (« droit à l&apos;oubli »)</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité</li>
          <li>Droit d&apos;opposition</li>
          <li>
            Droit de définir des directives post-mortem sur le sort de vos
            données
          </li>
        </ul>
        <p>
          Pour exercer ces droits, écrivez à{" "}
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
          . Nous répondons dans un délai maximal d&apos;un mois.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          introduire une réclamation auprès de la Commission Nationale de
          l&apos;Informatique et des Libertés (CNIL),{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800"
          >
            www.cnil.fr
          </a>
          .
        </p>
      </TrustSection>

      <TrustSection title="8. Sécurité">
        <p>
          Nous mettons en œuvre les mesures techniques et organisationnelles
          appropriées pour protéger vos données : HTTPS systématique, en-têtes
          de sécurité stricts, hachage des mots de passe (bcrypt), cloisonnement
          des données utilisateur, journaux d&apos;accès, contrôle des droits
          d&apos;administration.
        </p>
      </TrustSection>

      <TrustSection title="9. Modifications">
        <p>
          Cette politique peut être mise à jour pour refléter des évolutions
          légales ou fonctionnelles. La version applicable est celle publiée
          ici, à la date figurant en tête de la page. Nous vous informerons
          par email des modifications substantielles.
        </p>
      </TrustSection>
    </TrustPageLayout>
  );
}
