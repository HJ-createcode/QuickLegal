import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageLayout, TrustSection } from "@/components/TrustPageLayout";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Comment nous rédigeons nos modèles",
  description:
    "L'approche éditoriale de QuickLegal : sélection des sources, paramétrage des clauses, revue par un avocat au Barreau de Paris, cycle de mise à jour.",
  alternates: { canonical: "/comment-nous-redigeons" },
  openGraph: {
    url: `${SITE_URL}/comment-nous-redigeons`,
    title: "Comment nous rédigeons nos modèles | QuickLegal",
  },
};

export default function CommentNousRedigeonsPage() {
  return (
    <TrustPageLayout
      eyebrow="Politique éditoriale"
      title="Comment nous rédigeons nos modèles"
      subtitle="Le détail du travail juridique et éditorial qui précède la publication d'un document dans notre catalogue."
    >
      <TrustSection title="1. Origine des trames">
        <p>
          Chaque modèle publié sur QuickLegal repose sur une trame rédigée à
          partir des sources de premier rang du droit français : Code de
          commerce, Code civil, Code de la consommation, RGPD et loi
          Informatique et Libertés, jurisprudence de la Cour de cassation et
          du Conseil d&apos;État, doctrine administrative (greffes, CNIL,
          DGCCRF), et usages établis par les praticiens.
        </p>
        <p>
          Nous n&apos;empruntons pas de modèles à des plateformes tierces et
          n&apos;agrégeons pas automatiquement des clauses trouvées en ligne.
          Chaque trame est écrite pour être autoportante, cohérente et
          valide comme un tout.
        </p>
      </TrustSection>

      <TrustSection title="2. Choix des clauses paramétrables">
        <p>
          Un document juridique de qualité n&apos;est pas le plus long —
          c&apos;est celui dont chaque clause a une raison d&apos;être. Nous
          distinguons trois catégories :
        </p>
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            <span className="font-medium text-slate-900">Clauses obligatoires</span> :
            celles sans lesquelles le document est irrecevable ou expose son
            auteur à une sanction. Elles sont présentes dans tous les cas.
          </li>
          <li>
            <span className="font-medium text-slate-900">Clauses recommandées par la pratique</span> :
            celles qui sécurisent une situation courante (clause
            d&apos;agrément dans les statuts, clause de médiation dans les
            CGV). Elles sont activées par défaut, avec possibilité
            d&apos;arbitrage par l&apos;utilisateur.
          </li>
          <li>
            <span className="font-medium text-slate-900">Clauses optionnelles</span> :
            celles dont l&apos;inclusion dépend du projet précis (clause
            pénale d&apos;un NDA, droit de préférence, etc.). Elles sont
            proposées dans le questionnaire et apparaissent uniquement si
            l&apos;utilisateur les choisit.
          </li>
        </ul>
      </TrustSection>

      <TrustSection title="3. Langage clair, pas jargonneux">
        <p>
          Nous rédigeons en français précis. Nous n&apos;empilons pas les
          termes latins ni les adverbes pour donner l&apos;impression du
          sérieux. Là où un article du Code dit « au plus tard dans les six
          mois suivant la clôture de l&apos;exercice », nous le disons de la
          même façon — le droit français est un travail de précision, pas de
          décoration.
        </p>
        <p>
          Les articles du document portent des titres descriptifs, sont
          numérotés, et regroupent les clauses par thème pour rester
          lisibles par un utilisateur non juriste. Les références textuelles
          sont insérées seulement quand elles aident à comprendre la règle
          (article L.223-30 pour les majorités d&apos;AGE en SARL, par
          exemple).
        </p>
      </TrustSection>

      <TrustSection title="4. Revue par un avocat d'affaires">
        <p>
          Avant publication, chaque modèle est relu par un avocat d&apos;affaires
          inscrit au Barreau de Paris. La revue couvre :
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
          <li>la conformité aux textes et à la jurisprudence ;</li>
          <li>
            la cohérence des formulations avec la pratique courante des
            cabinets ;
          </li>
          <li>
            la logique du questionnaire : est-ce qu&apos;il demande tout ce
            qu&apos;il faut, et uniquement cela ?
          </li>
          <li>
            la robustesse des clauses optionnelles et la clarté des
            conditions d&apos;activation.
          </li>
        </ul>
        <p>
          La revue donne lieu à une série d&apos;itérations entre
          l&apos;équipe éditoriale et l&apos;avocat revue jusqu&apos;à
          signature du modèle pour mise en ligne.
        </p>
      </TrustSection>

      <TrustSection title="5. Cycle de mise à jour">
        <p>
          Un modèle publié n&apos;est pas figé. Nous surveillons plusieurs
          sources :
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
          <li>
            les nouvelles lois et ordonnances (publications Journal officiel,
            Légifrance) ;
          </li>
          <li>
            les décrets et arrêtés d&apos;application, notamment ceux
            modifiant les formalités ou les mentions obligatoires ;
          </li>
          <li>
            les décisions publiées de la Cour de cassation et du Conseil
            d&apos;État, quand elles affectent la validité ou
            l&apos;interprétation d&apos;une clause ;
          </li>
          <li>
            les recommandations administratives (CNIL, DGCCRF, INPI) sur
            l&apos;application de règles touchant directement nos modèles ;
          </li>
          <li>
            les retours utilisateurs qui signalent un décalage entre modèle
            et attente d&apos;un greffe ou d&apos;une administration.
          </li>
        </ul>
        <p>
          Quand une mise à jour est décidée, elle suit le même cycle qu&apos;à
          la création : rédaction des modifications par un juriste, revue
          avocat, publication datée.
        </p>
      </TrustSection>

      <TrustSection title="6. Confidentialité des documents rédigés">
        <p>
          Les documents générés par les utilisateurs ne nourrissent pas nos
          modèles. Vos réponses au questionnaire ne sont pas utilisées pour
          améliorer la plateforme. La séparation est totale : côté éditorial,
          les modèles sont conçus indépendamment des données utilisateurs ;
          côté plateforme, les données utilisateurs servent exclusivement à
          générer, conserver et mettre à disposition le document qu&apos;elles
          concernent.
        </p>
      </TrustSection>

      <TrustSection title="Pour en savoir plus">
        <p>
          Les pages suivantes détaillent le parcours utilisateur et la
          politique de confidentialité du service :
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
          <li>
            <Link
              href="/notre-methode"
              className="text-blue-500 hover:text-blue-600"
            >
              Notre méthode
            </Link>{" "}
            — comment un besoin devient un document.
          </li>
          <li>
            <Link
              href="/politique-de-confidentialite"
              className="text-blue-500 hover:text-blue-600"
            >
              Politique de confidentialité
            </Link>{" "}
            — comment nous traitons les données.
          </li>
          <li>
            <Link
              href="/faq"
              className="text-blue-500 hover:text-blue-600"
            >
              Questions fréquentes
            </Link>
            .
          </li>
        </ul>
      </TrustSection>
    </TrustPageLayout>
  );
}
