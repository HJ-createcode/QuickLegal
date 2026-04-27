import type { Metadata } from "next";
import {
  TrustPageLayout,
  TrustSection,
  TodoMark,
} from "@/components/TrustPageLayout";
import {
  LEGAL,
  CONTACT,
  MEDIATOR,
  isPlaceholder,
} from "@/lib/site-facts";
import { SITE_URL } from "@/lib/site-url";
import {
  listDocuments,
  CATEGORY_LABELS,
  type DocumentCategory,
} from "@/lib/document-registry";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente du service QuickLegal : commande, paiement, accès aux documents, droit de rétractation, médiation, responsabilité.",
  alternates: { canonical: "/cgv" },
  openGraph: {
    url: `${SITE_URL}/cgv`,
    title: "Conditions générales de vente | QuickLegal",
  },
};

const CATEGORY_ORDER: DocumentCategory[] = [
  "statuts",
  "gouvernance",
  "commercial",
  "conformite",
];

export default function CGVPage() {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    docs: listDocuments().filter((d) => d.category === cat),
  }));

  return (
    <TrustPageLayout
      eyebrow="Vente du service"
      title="Conditions générales de vente"
      subtitle="Conditions applicables à toute commande passée sur le site QuickLegal. Elles encadrent la vente des documents juridiques numériques générés via la plateforme."
    >
      <TrustSection title="1. Identification du vendeur">
        <p>
          Le service QuickLegal est édité et commercialisé par{" "}
          {isPlaceholder(LEGAL.legalName) ? (
            <TodoMark label="raison sociale du vendeur" />
          ) : (
            <span className="font-medium text-slate-900">
              {LEGAL.legalName}
            </span>
          )}
          , dont les coordonnées complètes figurent dans les{" "}
          <a href="/mentions-legales" className="text-emerald-700 hover:text-emerald-800">
            mentions légales
          </a>
          .
        </p>
        <p>
          Contact client :{" "}
          {isPlaceholder(CONTACT.supportEmail) ? (
            <TodoMark label="email support" />
          ) : (
            <a
              href={`mailto:${CONTACT.supportEmail}`}
              className="text-emerald-700 hover:text-emerald-800"
            >
              {CONTACT.supportEmail}
            </a>
          )}
          .
        </p>
      </TrustSection>

      <TrustSection title="2. Objet et champ d'application">
        <p>
          Les présentes conditions générales de vente (« CGV ») régissent
          l&apos;ensemble des commandes passées sur le site QuickLegal. Elles
          forment, avec la commande, le contrat entre le vendeur et le client.
        </p>
        <p>
          Le service consiste en la génération de documents juridiques
          personnalisés à partir d&apos;un questionnaire rempli par le client.
          Le vendeur ne fournit pas de conseil juridique personnalisé : il
          édite des modèles à jour du droit français, auxquels les réponses
          du client sont appliquées par un moteur de génération automatique.
        </p>
      </TrustSection>

      <TrustSection title="3. Prix et documents disponibles">
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises (TTC). Ils
          sont définitifs au moment de la validation de la commande.
        </p>
        <div className="mt-4 space-y-5">
          {byCategory.map(({ cat, docs }) =>
            docs.length === 0 ? null : (
              <div key={cat}>
                <p className="font-medium text-slate-900 mb-1.5 text-sm">
                  {CATEGORY_LABELS[cat]}
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  {docs.map((d) => (
                    <li
                      key={d.type}
                      className="flex justify-between items-baseline gap-4"
                    >
                      <a
                        href={`/documents/${d.type}`}
                        className="text-slate-700 hover:text-slate-900 truncate"
                      >
                        {d.label}
                      </a>
                      <span className="text-slate-500 text-xs whitespace-nowrap">
                        {Math.round(d.priceCents / 100)}&nbsp;€&nbsp;TTC
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </TrustSection>

      <TrustSection title="4. Commande et paiement">
        <p>
          La commande est matérialisée par le parcours suivant : création
          d&apos;un compte, saisie des réponses au questionnaire, validation,
          paiement en ligne par carte bancaire. Le vendeur confirme la
          commande par un email récapitulatif et par l&apos;accès immédiat au
          document dans l&apos;espace client.
        </p>
        <p>
          Les paiements sont traités par Stripe Payments Europe Ltd, selon un
          protocole sécurisé. Le vendeur ne stocke aucune donnée de carte
          bancaire.
        </p>
      </TrustSection>

      <TrustSection title="5. Livraison du document">
        <p>
          Les documents sont fournis sous forme numérique, par mise à
          disposition immédiate dans l&apos;espace client et par téléchargement
          au format PDF. Aucune livraison physique n&apos;est prévue.
        </p>
        <p>
          Le document généré est conservé dans l&apos;espace client et reste
          téléchargeable ultérieurement, sans limite de durée tant que le
          compte demeure actif.
        </p>
      </TrustSection>

      <TrustSection title="6. Droit de rétractation">
        <p>
          Le service QuickLegal étant constitué par la fourniture d&apos;un
          contenu numérique dont l&apos;exécution commence immédiatement après
          le paiement — conformément à l&apos;article L.221-28, 13° du Code
          de la consommation — le client consommateur reconnaît et accepte
          expressément, avant la validation de sa commande, que son droit de
          rétractation ne peut pas s&apos;exercer dès lors que le document a
          été généré et mis à sa disposition.
        </p>
        <p>
          L&apos;acceptation de cette renonciation est recueillie via une
          case à cocher dédiée lors du parcours de paiement.
        </p>
        <p>
          Pour les commandes qui n&apos;auraient pas encore donné lieu à la
          génération d&apos;un document (par exemple en cas d&apos;erreur
          technique), un remboursement intégral est effectué sur simple
          demande à{" "}
          {isPlaceholder(CONTACT.supportEmail) ? (
            <TodoMark label="email support" />
          ) : (
            <a
              href={`mailto:${CONTACT.supportEmail}`}
              className="text-emerald-700 hover:text-emerald-800"
            >
              {CONTACT.supportEmail}
            </a>
          )}
          .
        </p>
      </TrustSection>

      <TrustSection title="7. Portée des documents">
        <p>
          Les documents générés sont des modèles paramétrés à partir des
          réponses du client. Ils reproduisent la pratique usuelle du droit
          français et ont été revus par un avocat d&apos;affaires inscrit au
          Barreau de Paris. Ils ne tiennent cependant pas compte des
          particularités de chaque situation.
        </p>
        <p>
          Le vendeur n&apos;exerce pas la profession d&apos;avocat et ne
          fournit pas de consultation juridique personnalisée. Pour des
          situations atypiques, complexes, ou comportant des enjeux
          patrimoniaux significatifs, le client est invité à faire relire le
          document par un conseil de son choix avant signature.
        </p>
      </TrustSection>

      <TrustSection title="8. Responsabilité">
        <p>
          Le vendeur met en œuvre les moyens raisonnables pour assurer la
          continuité et la sécurité du service, sans garantir toutefois une
          disponibilité permanente. Sa responsabilité se limite au montant
          effectivement payé par le client pour le document concerné.
        </p>
        <p>
          Le client est seul responsable de l&apos;exactitude des
          informations saisies et de l&apos;usage qu&apos;il fait du document
          généré, notamment lors des formalités de dépôt, d&apos;enregistrement
          ou de publication.
        </p>
      </TrustSection>

      <TrustSection title="9. Données personnelles">
        <p>
          Le traitement des données personnelles du client est régi par la{" "}
          <a
            href="/politique-de-confidentialite"
            className="text-emerald-700 hover:text-emerald-800"
          >
            politique de confidentialité
          </a>
          .
        </p>
      </TrustSection>

      <TrustSection title="10. Médiation de la consommation">
        <p>
          Conformément aux articles L.611-1 et suivants du Code de la
          consommation, le client consommateur peut recourir gratuitement à
          un médiateur de la consommation. Le vendeur adhère à :
        </p>
        <p>
          <span className="font-medium text-slate-900">{MEDIATOR.name}</span>{" "}
          —{" "}
          <a
            href={MEDIATOR.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800"
          >
            {MEDIATOR.url}
          </a>
          .
        </p>
        <p>
          Une plateforme européenne de règlement en ligne des litiges est
          également disponible à l&apos;adresse{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>
      </TrustSection>

      <TrustSection title="11. Droit applicable et juridiction">
        <p>
          Les présentes CGV sont régies par le droit français. En cas de
          litige, et après tentative de résolution amiable, les tribunaux
          français sont compétents. Pour un client consommateur, les règles
          impératives protectrices demeurent applicables : il peut saisir le
          juge de son lieu de domicile.
        </p>
      </TrustSection>
    </TrustPageLayout>
  );
}
