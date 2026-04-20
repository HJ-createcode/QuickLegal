import type { DeclarationNonCondamnationData } from "@/lib/questionnaire-configs/declaration-non-condamnation";

export function generateDeclarationNonCondamnation(
  data: DeclarationNonCondamnationData
): string {
  const nomComplet = `${data.prenom} ${data.nom.toUpperCase()}`;
  const nomNaissance =
    data.nom_naissance && data.nom_naissance.trim() !== ""
      ? `, né(e) ${data.nom_naissance.toUpperCase()}`
      : "";

  return `DÉCLARATION SUR L'HONNEUR
DE NON-CONDAMNATION ET DE FILIATION


Je soussigné(e) :

${nomComplet}${nomNaissance}

Né(e) le ${data.date_naissance} à ${data.lieu_naissance}

De nationalité ${data.nationalite.toLowerCase()}

Demeurant : ${data.adresse}

Fils / fille de :
- Monsieur ${data.pere_prenom} ${data.pere_nom.toUpperCase()} (père)
- Madame ${data.mere_prenom} ${data.mere_nom.toUpperCase()} (mère, née)

Agissant en qualité de ${data.qualite} de la société ${data.societe_denomination}, ${data.societe_forme},


DÉCLARE SUR L'HONNEUR :


1. N'avoir fait l'objet d'aucune condamnation pénale ni de sanction civile ou administrative de nature à m'interdire :
   - la gestion, l'administration, la direction ou le contrôle d'une personne morale ;
   - l'exercice d'une activité commerciale, artisanale, industrielle ou libérale,
   conformément aux dispositions de l'article L.128-1 du Code de commerce, des articles L.241-9 et L.249-1 du Code de commerce, et plus largement de toute disposition légale ou réglementaire prononçant une interdiction, une déchéance ou une incapacité d'exercer.


2. Ne pas être frappé(e) d'une mesure de faillite personnelle ou d'une interdiction de gérer prononcée en application des articles L.653-1 et suivants du Code de commerce.


3. Être pleinement capable juridiquement et disposer de tous mes droits civils et civiques.


4. Attester de l'exactitude des renseignements de filiation ci-dessus énoncés, lesquels sont destinés à l'inscription au Registre du Commerce et des Sociétés conformément à l'article R.123-54 du Code de commerce.


5. Être informé(e) des peines encourues en cas de fausse déclaration, notamment celles prévues par les articles 441-1 et suivants du Code pénal (jusqu'à trois ans d'emprisonnement et 45 000 € d'amende pour faux et usage de faux en écriture), ainsi que des conséquences civiles et pénales d'une déclaration mensongère au regard de l'inscription au RCS.


La présente déclaration est établie pour servir et valoir ce que de droit, notamment en vue de l'immatriculation, de la modification ou de tout acte relatif à la société ${data.societe_denomination} auprès du greffe du tribunal de commerce compétent.



Fait à ${data.lieu_signature}, le ${data.date_signature}.



(signature précédée de la mention manuscrite « Lu et approuvé »)`;
}
