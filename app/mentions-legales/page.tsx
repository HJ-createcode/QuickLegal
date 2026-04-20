import type { Metadata } from "next";
import {
  TrustPageLayout,
  TrustSection,
  TodoMark,
} from "@/components/TrustPageLayout";
import {
  LEGAL,
  CONTACT,
  INFRASTRUCTURE,
  isPlaceholder,
} from "@/lib/site-facts";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Identité de l'éditeur, directeur de la publication, hébergeur et informations légales du site QuickLegal, conformément à l'article 6-III de la LCEN.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    url: `${SITE_URL}/mentions-legales`,
    title: "Mentions légales | QuickLegal",
  },
};

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-medium text-slate-900">{label} :</span>{" "}
      {isPlaceholder(value) ? <TodoMark label={label.toLowerCase()} /> : value}
    </p>
  );
}

export default function MentionsLegalesPage() {
  return (
    <TrustPageLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      subtitle="Éditeur, directeur de la publication et hébergeur du site quicklegal, au sens de l'article 6-III de la LCEN et des articles L.111-1 et suivants du Code de la consommation."
    >
      <TrustSection title="Éditeur du site">
        <Fact label="Raison sociale" value={LEGAL.legalName} />
        <Fact label="Forme juridique" value={LEGAL.legalForm} />
        <Fact label="Capital social" value={LEGAL.capital} />
        <Fact label="Numéro SIREN" value={LEGAL.siren} />
        <Fact label="Numéro SIRET" value={LEGAL.siret} />
        <Fact
          label="Immatriculation"
          value={
            isPlaceholder(LEGAL.rcsCity)
              ? LEGAL.rcsCity
              : `RCS de ${LEGAL.rcsCity}`
          }
        />
        <Fact label="Numéro de TVA intracommunautaire" value={LEGAL.vatNumber} />
        <Fact label="Siège social" value={LEGAL.registeredOffice} />
      </TrustSection>

      <TrustSection title="Direction de la publication">
        <Fact
          label="Directeur de la publication"
          value={LEGAL.publicationDirector}
        />
        <Fact label="Courriel" value={CONTACT.generalEmail} />
        <Fact label="Téléphone" value={CONTACT.phone} />
      </TrustSection>

      <TrustSection title="Hébergeur du site">
        <p>
          Le site QuickLegal est hébergé par{" "}
          <span className="font-medium text-slate-900">
            {INFRASTRUCTURE.hostingProvider}
          </span>
          .
        </p>
        <p>{INFRASTRUCTURE.hostingAddress}</p>
        <p className="text-sm text-slate-500">
          Les données applicatives sont stockées chez{" "}
          {INFRASTRUCTURE.databaseProvider} et {INFRASTRUCTURE.blobProvider}.
          Les paiements sont traités par {INFRASTRUCTURE.paymentProvider}.
        </p>
      </TrustSection>

      <TrustSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus présents sur le site QuickLegal —
          textes, modèles de documents, interfaces, logos, graphismes et
          organisation — est protégé par les articles L.111-1 et suivants du
          Code de la propriété intellectuelle. Toute reproduction, adaptation
          ou diffusion, totale ou partielle, sans autorisation écrite
          préalable, est interdite et constitue une contrefaçon.
        </p>
        <p>
          Les documents générés par l&apos;utilisateur sont personnalisés à
          partir de ses réponses. L&apos;utilisateur bénéficie d&apos;un droit
          d&apos;usage personnel et illimité sur les documents qu&apos;il a
          générés, dans les conditions prévues par les CGV.
        </p>
      </TrustSection>

      <TrustSection title="Données personnelles">
        <p>
          Les traitements de données personnelles mis en œuvre sur le site
          sont décrits dans la{" "}
          <a href="/politique-de-confidentialite" className="text-blue-500 hover:text-blue-600">
            politique de confidentialité
          </a>
          . Les utilisateurs disposent des droits d&apos;accès, de
          rectification, d&apos;effacement, de limitation, d&apos;opposition
          et à la portabilité de leurs données, à exercer à l&apos;adresse{" "}
          {isPlaceholder(CONTACT.dpoEmail) ? (
            <TodoMark label="email DPO / contact données" />
          ) : (
            <a
              href={`mailto:${CONTACT.dpoEmail}`}
              className="text-blue-500 hover:text-blue-600"
            >
              {CONTACT.dpoEmail}
            </a>
          )}
          .
        </p>
        <p>
          L&apos;utilisation des cookies est décrite dans la{" "}
          <a href="/cookies" className="text-blue-500 hover:text-blue-600">
            politique de cookies
          </a>
          .
        </p>
      </TrustSection>

      <TrustSection title="Médiation de la consommation">
        <p>
          Conformément aux articles L.611-1 et suivants du Code de la
          consommation, en cas de litige non résolu avec notre service client,
          l&apos;utilisateur consommateur peut recourir gratuitement à un
          médiateur de la consommation dont les coordonnées sont précisées
          dans les{" "}
          <a href="/cgv" className="text-blue-500 hover:text-blue-600">
            conditions générales de vente
          </a>
          .
        </p>
      </TrustSection>

      <TrustSection title="Droit applicable et juridiction">
        <p>
          Les présentes mentions légales sont régies par le droit français.
          En cas de litige, et après échec d&apos;une résolution amiable, les
          tribunaux français sont seuls compétents, sous réserve des règles
          impératives protectrices du consommateur.
        </p>
      </TrustSection>
    </TrustPageLayout>
  );
}
