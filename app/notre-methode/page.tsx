import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageLayout, TrustSection } from "@/components/TrustPageLayout";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Notre méthode",
  description:
    "Comment QuickLegal transforme un questionnaire en document juridique fiable : sélection des modèles, paramétrage, revue avocat, mise à jour continue.",
  alternates: { canonical: "/notre-methode" },
  openGraph: {
    url: `${SITE_URL}/notre-methode`,
    title: "Notre méthode | QuickLegal",
  },
};

export default function NotreMethodePage() {
  return (
    <TrustPageLayout
      eyebrow="Méthode"
      title="Notre méthode"
      subtitle="Comment un document juridique passe de la question de l'utilisateur au PDF final, en conservant à chaque étape un niveau de rigueur compatible avec un usage professionnel."
    >
      <TrustSection title="1. Nous partons du besoin, pas d'un formulaire générique">
        <p>
          Chaque modèle commence par une analyse de l&apos;intention.
          Qu&apos;est-ce que l&apos;utilisateur cherche à faire — créer une
          société, approuver des comptes, encadrer une négociation, publier
          son site ? Quelles pièces doit-il fournir au greffe ou au
          cocontractant ? Quelles clauses sont attendues par la pratique ?
          Ces réponses déterminent la structure du questionnaire et la trame
          du document final.
        </p>
        <p>
          Nous faisons ce travail document par document, en nous appuyant sur
          la pratique courante du droit français et sur les exigences réelles
          des greffes, de la DGCCRF, de la CNIL et des juridictions. Pas de
          formulaire générique qui couvre « tous les cas » en étant médiocre
          partout — une trame précise par document.
        </p>
      </TrustSection>

      <TrustSection title="2. Un questionnaire qui ne pose que les bonnes questions">
        <p>
          Chaque question du parcours est là parce qu&apos;elle change au
          moins une ligne du document final. Les questions accessoires ou
          redondantes sont retirées. Les questions conditionnelles sont
          masquées quand elles n&apos;ont pas lieu d&apos;être : par exemple,
          un champ « tiers président » ne s&apos;affiche que si vous avez
          indiqué nommer un président non-associé.
        </p>
        <p>
          Chaque question porte une aide en ligne rédigée par nos juristes,
          en français clair, référençant le texte applicable lorsque c&apos;est
          utile (article du Code de commerce, règlement RGPD…). L&apos;idée :
          vous apporter le niveau d&apos;explication d&apos;un rendez-vous,
          en format asynchrone.
        </p>
      </TrustSection>

      <TrustSection title="3. Un moteur qui applique vos réponses à la trame">
        <p>
          Vos réponses sont appliquées à la trame du document par un moteur
          de génération contrôlé : chaque variable a sa place, chaque clause
          conditionnelle s&apos;active ou se désactive selon ce que vous avez
          déclaré, chaque mention légale obligatoire apparaît au bon endroit.
          Le document est produit en PDF, conforme à la charte graphique de
          QuickLegal, sans filigrane.
        </p>
        <p>
          Le moteur s&apos;arrête aux vérifications techniques : il contrôle
          par exemple la cohérence des totaux de capital, la présence des
          mentions obligatoires, la taille des champs. Il ne se substitue pas
          à une lecture juridique de la situation — c&apos;est pourquoi nous
          recommandons toujours, pour les actes importants, une relecture
          finale par un conseil.
        </p>
      </TrustSection>

      <TrustSection title="4. Revue par un avocat d'affaires">
        <p>
          Chaque modèle, avant publication, est revu par un avocat d&apos;affaires
          inscrit au Barreau de Paris. La revue porte sur la conformité aux
          textes applicables, la pertinence des clauses par rapport à la
          pratique, la cohérence des formulations, l&apos;adéquation du
          questionnaire aux décisions réelles à prendre.
        </p>
        <p>
          Les évolutions législatives et jurisprudentielles sont suivies en
          continu. Quand un texte change — nouvelle loi, décret
          d&apos;application, décision significative de la Cour de cassation
          ou du Conseil d&apos;État — les modèles affectés sont mis à jour.
        </p>
      </TrustSection>

      <TrustSection title="5. Ce que nous ne faisons pas">
        <p>
          QuickLegal est transparent sur les limites du service. Nous ne
          fournissons pas :
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
          <li>
            de consultation juridique personnalisée sur votre situation
            précise ;
          </li>
          <li>
            d&apos;accompagnement sur les formalités post-document (dépôt au
            greffe, annonce légale, enregistrement au SIE) ;
          </li>
          <li>
            de plaidoirie ni de représentation en justice — c&apos;est le
            monopole des avocats ;
          </li>
          <li>
            de rédaction sur mesure en dehors du périmètre de nos modèles.
          </li>
        </ul>
        <p>
          Pour ces prestations, un avocat — le vôtre ou un que nous
          pourrions recommander — reste la voie appropriée.
        </p>
      </TrustSection>

      <TrustSection title="6. Ce que vous pouvez attendre">
        <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
          <li>
            Un document cadré, conforme à la pratique du droit français,
            accepté par les greffes pour les pièces qui s&apos;y prêtent.
          </li>
          <li>
            Un parcours rapide — une dizaine de minutes pour les documents
            courts, jusqu&apos;à une vingtaine pour des statuts.
          </li>
          <li>
            Un prix fixe, affiché à l&apos;avance, sans surprise à la
            facturation.
          </li>
          <li>
            Un accès à vie à votre document dans votre espace, avec la
            possibilité de régénérer une variante à tout moment.
          </li>
        </ul>
      </TrustSection>

      <TrustSection title="Pour aller plus loin">
        <p>
          Nous détaillons ailleurs nos choix éditoriaux et le fonctionnement
          du service dans trois pages complémentaires :
        </p>
        <ul className="list-disc pl-6 space-y-1 marker:text-slate-400">
          <li>
            <Link
              href="/comment-nous-redigeons"
              className="text-blue-500 hover:text-blue-600"
            >
              Comment nous rédigeons nos modèles
            </Link>{" "}
            — l&apos;approche éditoriale détaillée.
          </li>
          <li>
            <Link
              href="/comment-ca-marche"
              className="text-blue-500 hover:text-blue-600"
            >
              Comment ça marche
            </Link>{" "}
            — le parcours utilisateur, du questionnaire à la signature.
          </li>
          <li>
            <Link
              href="/faq"
              className="text-blue-500 hover:text-blue-600"
            >
              Questions fréquentes
            </Link>{" "}
            — les réponses les plus demandées.
          </li>
        </ul>
      </TrustSection>
    </TrustPageLayout>
  );
}
