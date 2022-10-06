function definirZoneIdentificationGabarit(identifiant) {
    const gabarits = obtenirGabarits()

    const gabarit = gabarits.find((g) => g.code === identifiant)

    if (gabarit) {
        document.getElementById('descriptionCorrespondance').textContent = gabarit.desc
        document.getElementById('versionCouranteCorrespondance').textContent = gabarit.v
    }
}

function obtenirGabarits() {
    return [{ "code": "ADD", "desc": "Avis de convocation et demande de documents", "v": "1" },
    { "code": "AVI", "desc": "Avis de convocation", "v": "1" },
    { "code": "CER", "desc": "Certificat de recouvrement", "v": "2" },
    { "code": "CE2", "desc": "Certificat de recouvrement", "v": "1" },
    { "code": "C03", "desc": "Exigibilité de la dette", "v": "2" },
    { "code": "C04", "desc": "Succession Confirmation de dette", "v": "1" },
    { "code": "C05", "desc": "Succession Demande de renseignements", "v": "1" },
    { "code": "C06", "desc": "Rappel de votre engagement de remboursement - débit préautorisé", "v": "1" },
    { "code": "C07", "desc": "Rappel de votre engagement de remboursement", "v": "1" },
    { "code": "C08", "desc": "Modification d'une information bancaire", "v": "2" },
    { "code": "C09", "desc": "Proposition d'entente de remboursement", "v": "1" },
    { "code": "C13", "desc": "Réception d'un chèque portant la mention « Paiement final »", "v": "1" },
    { "code": "C14", "desc": "Demande de renseignements débit préautorisé", "v": "1" },
    { "code": "C15", "desc": "Demande de renseignements au sujet d'un chèque", "v": "3" },
    { "code": "C16", "desc": "Rappel de vos obligations", "v": "1" },
    { "code": "C17", "desc": "Confirmation de consentement à une hypothèque", "v": "1" },
    { "code": "C18", "desc": "Annulation de chèques postdatés", "v": "1" },
    { "code": "C20", "desc": "Demande d'attestation d'études", "v": "1" },
    { "code": "C24", "desc": "Renouvellement de chèques postdatés", "v": "1" },
    { "code": "C26", "desc": "Reprise de la procédure de recouvrement", "v": "2" },
    { "code": "C27", "desc": "Retour de chèques", "v": "1" },
    { "code": "C28", "desc": "Identification d'un paiement", "v": "1" },
    { "code": "C29", "desc": "Débit préautorisé non réalisé", "v": "1" },
    { "code": "C35", "desc": "Demande de consentement à une hypothèque", "v": "1" },
    { "code": "C39", "desc": "Avis de compte payé par dépôt volontaire", "v": "2" },
    { "code": "C40", "desc": "Proposition de règlement", "v": "1" },
    { "code": "C41", "desc": "Reconnaissance de dette", "v": "1" },
    { "code": "C42", "desc": "Proposition de règlement Acceptation", "v": "3" },
    { "code": "C43", "desc": "Proposition de règlement Refus", "v": "1" },
    { "code": "C44", "desc": "Renseignements sur les biens immobiliers", "v": "1" },
    { "code": "C45", "desc": "Demande de renseignements sur un détenu", "v": "1" },
    { "code": "C46", "desc": "Réévaluation de votre entente de remboursement", "v": "1" },
    { "code": "C48", "desc": "Régularisation de dossier", "v": "1" },
    { "code": "C50", "desc": "Demande de réévaluation de la réclamation", "v": "1" },
    { "code": "C57", "desc": "Preuve de la réclamation au curateur public", "v": "3" },
    { "code": "C58", "desc": "Autorisation concernant un détenu francophone", "v": "1" },
    { "code": "C59", "desc": "Autorisation concernant un détenu anglophone", "v": "1" },
    { "code": "C62", "desc": "Preuve de réclamation dans une faillite", "v": "1" },
    { "code": "C63", "desc": "Lettre d'amendement Relevé 5 - aaaa", "v": "1" },
    { "code": "C65", "desc": "Confirmation d'engagement de remboursement", "v": "1" },
    { "code": "C66", "desc": "Confirmation d'engagement de remboursement", "v": "1" },
    { "code": "C67", "desc": "Confirmation d'engagement de remboursement", "v": "1" },
    { "code": "C68", "desc": "Engagement de remboursement et préavis de débit préautorisé", "v": "2" },
    { "code": "C69", "desc": "Engagement de remboursement et préavis de débit préautorisé", "v": "2" },
    { "code": "C70", "desc": "Engagement de remboursement et préavis de débit préautorisé", "v": "1" },
    { "code": "C71", "desc": "Engagement de remboursement et préavis de débit préautorisé", "v": "1" },
    { "code": "C72", "desc": "Succession - Demande de renseignements (rappel)", "v": "1" },
    { "code": "C80", "desc": "Avis au prestataire", "v": "1" },
    { "code": "C81", "desc": "Avis au prestataire", "v": "2" },
    { "code": "DDO", "desc": "Demande de documents", "v": "1" },
    { "code": "E05", "desc": "REMBOURSEMENTS EXCÉDENTAIRES", "v": "2" },
    { "code": "J05", "desc": "", "v": "1" },
    { "code": "J06", "desc": "", "v": "1" },
    { "code": "J07", "desc": "", "v": "1" },
    { "code": "J08", "desc": "", "v": "1" },
    { "code": "J09", "desc": "Attestation de présence à l'aide sociale", "v": "2" },
    { "code": "J59", "desc": "Évaluation concernant la contribution parentale", "v": "3" },
    { "code": "J60", "desc": "", "v": "1" },
    { "code": "J61", "desc": "", "v": "1" },
    { "code": "J62", "desc": "", "v": "1" },
    { "code": "J63", "desc": "Contribution parentale - Suivi diminution des revenus", "v": "1" },
    { "code": "J64", "desc": "Refus de contribuer", "v": "1" },
    { "code": "J65", "desc": "", "v": "1" },
    { "code": "J66", "desc": "", "v": "1" },
    { "code": "J67", "desc": "", "v": "1" },
    { "code": "J68", "desc": "Contribution parentale - Suivi diminution des revenus", "v": "2" },
    { "code": "J69", "desc": "", "v": "1" },
    { "code": "J70", "desc": "", "v": "1" },
    { "code": "J71", "desc": "", "v": "1" },
    { "code": "J72", "desc": "", "v": "1" },
    { "code": "J73", "desc": "", "v": "1" },
    { "code": "J74", "desc": "", "v": "1" },
    { "code": "J75", "desc": "", "v": "1" },
    { "code": "J76", "desc": "", "v": "1" },
    { "code": "J77", "desc": "", "v": "1" },
    { "code": "J78", "desc": "", "v": "1" },
    { "code": "J79", "desc": "", "v": "1" },
    { "code": "K07", "desc": "Déclaration mensuelle", "v": "3" },
    { "code": "K09", "desc": "Demande de dépôt direct des prestations", "v": "2" },
    { "code": "K10", "desc": "", "v": "1" },
    { "code": "K15", "desc": "", "v": "1" },
    { "code": "K16", "desc": "", "v": "1" },
    { "code": "K17", "desc": "", "v": "1" },
    { "code": "K18", "desc": "Dossier en attente d'un droit réalisable (dossier inactif) suivi", "v": "1" },
    { "code": "K25", "desc": "Conjoint non déclaré Dossier annulé", "v": "1" },
    { "code": "K26", "desc": "Décès non déclaré Dossier annulé", "v": "3" },
    { "code": "K27", "desc": "Renseignements sur votre état civil", "v": "1" },
    { "code": "K28", "desc": "Revenus de votre enfant", "v": "2" },
    { "code": "K29", "desc": "Convocation - Revenus de pension alimentaire non déclarés", "v": "1" },
    { "code": "K45", "desc": "", "v": "1" },
    { "code": "K46", "desc": "", "v": "1" },
    { "code": "K47", "desc": "", "v": "1" },
    { "code": "K70", "desc": "Pouvoir discrétionnaire Remboursable en totalité", "v": "3" },
    { "code": "K71", "desc": "Pouvoir discrétionnaire Mois de la demande remboursable", "v": "1" },
    { "code": "K72", "desc": "Pouvoir discrétionnaire Période d'aide remboursable", "v": "1" },
    { "code": "K73", "desc": "Pouvoir discrétionnaire Prestation spéciale : remboursable", "v": "2" },
    { "code": "K74", "desc": "Pouvoir discrétionnaire Augmentation de l'aide versée", "v": "1" },
    { "code": "K75", "desc": "Pouvoir discrétionnaire Diminution de l'aide versée", "v": "2" },
    { "code": "K76", "desc": "Pouvoir discrétionnaire Augmentation : aide remboursable", "v": "1" },
    { "code": "K77", "desc": "Pouvoir discrétionnaire Diminution : aide remboursable", "v": "3" },
    { "code": "K78", "desc": "Pouvoir discrétionnaire Fin de l'aide remboursable", "v": "1" },
    { "code": "K79", "desc": "Pouvoir discrétionnaire Prestation spéciale", "v": "3" },
    { "code": "K80", "desc": "Pouvoir discrétionnaire Acceptation", "v": "1" },
    { "code": "K81", "desc": "Pouvoir discrétionnaire Acceptation : mois de la demande", "v": "2" },
    { "code": "K82", "desc": "Pouvoir discrétionnaire Acceptation", "v": "1" },
    { "code": "K83", "desc": "Pouvoir discrétionnaire Prestation spéciale acceptée", "v": "3" },
    { "code": "K85", "desc": "Pouvoir discrétionnaire", "v": "1" },
    { "code": "K86", "desc": "Pouvoir discrétionnaire", "v": "1" },
    { "code": "K87", "desc": "Pouvoir discrétionnaire Carnet de réclamation", "v": "4" },
    { "code": "K88", "desc": "Pouvoir discrétionnaire Demande refusée", "v": "1" },
    { "code": "K89", "desc": "Pouvoir discrétionnaire Refus : Étudiant temps plein", "v": "2" },
    { "code": "K90", "desc": "Renseignements sur votre situation financière", "v": "3" },
    { "code": "K93", "desc": "Avis de réclamation", "v": "1" },
    { "code": "K94", "desc": "Avis de réclamation", "v": "1" },
    { "code": "K95", "desc": "", "v": "1" },
    { "code": "K96", "desc": "", "v": "1" },
    { "code": "K97", "desc": "", "v": "1" },
    { "code": "MAI", "desc": "Avis de convocation", "v": "2" },
    { "code": "MAN", "desc": "Avis d'annulation d'une rencontre", "v": "1" },
    { "code": "MRE", "desc": "Avis de modification à une rencontre", "v": "3" },
    { "code": "M01", "desc": "", "v": "1" },
    { "code": "M02", "desc": "", "v": "1" },
    { "code": "M03", "desc": "", "v": "1" },
    { "code": "M04", "desc": "", "v": "1" },
    { "code": "M05", "desc": "", "v": "1" },
    { "code": "M06", "desc": "Frais de séjour pour traitement en toxicomanie", "v": "1" },
    { "code": "M07", "desc": "Frais de séjour pour traitement en toxicomanie", "v": "2" },
    { "code": "M09", "desc": "Transport médical ou frais de séjour", "v": "1" },
    { "code": "M10", "desc": "", "v": "1" },
    { "code": "M11", "desc": "Acceptation prestation spéciale desanté non prévue au Règlement", "v": "3" },
    { "code": "M12", "desc": "", "v": "1" },
    { "code": "M13", "desc": "Rapport médical de Retraite Québec", "v": "1" },
    { "code": "M30", "desc": "Référence CLSC", "v": "1" },
    { "code": "M35", "desc": "", "v": "1" },
    { "code": "M36", "desc": "", "v": "1" },
    { "code": "M37", "desc": "Rente d'invalidité Demande de rente", "v": "1" },
    { "code": "M38", "desc": "Demande de rente de retraite", "v": "1" },
    { "code": "M39", "desc": "Demande de pension Sécurité de la vieillesse", "v": "1" },
    { "code": "M40", "desc": "Demande au Programme d'allocation au survivant", "v": "2" },
    { "code": "M41", "desc": "Demande au Programme d'allocation", "v": "1" },
    { "code": "M42", "desc": "Demande de versements du supplément à la prime au travail", "v": "1" },
    { "code": "M43", "desc": "Demande incomplète du supplément à la prime au travail", "v": "2" },
    { "code": "M44", "desc": "Demande de versements du supplément à la prime au travail", "v": "1" },
    { "code": "M45", "desc": "Confirmation du nombre de mois d'aide financière", "v": "2" },
    { "code": "M50", "desc": "", "v": "1" },
    { "code": "M51", "desc": "", "v": "1" },
    { "code": "M60", "desc": "", "v": "1" },
    { "code": "M61", "desc": "", "v": "1" },
    { "code": "M70", "desc": "Réexamen - Contraintes sévères à l'emploi", "v": "1" },
    { "code": "M71", "desc": "Réexamen - Contraintes sévères à l'emploi - 2e avis", "v": "3" },
    { "code": "M72", "desc": "Programme de solidarité sociale maintenu", "v": "1" },
    { "code": "M80", "desc": "Ajustement pour personnes seules Programme Allocation-logement", "v": "1" },
    { "code": "M81", "desc": "", "v": "1" },
    { "code": "M82", "desc": "", "v": "1" },
    { "code": "M83", "desc": "", "v": "1" },
    { "code": "M84", "desc": "", "v": "1" },
    { "code": "M85", "desc": "", "v": "1" },
    { "code": "M86", "desc": "", "v": "1" },
    { "code": "Q01", "desc": "Mesure Action emploi Acceptation de votre demande", "v": "2" },
    { "code": "Q02", "desc": "Mesure action emploi Refus de votre demande", "v": "1" },
    { "code": "Q03", "desc": "Mesure Action emploi Demande de documents", "v": "3" },
    { "code": "Q04", "desc": "Mesure Action emploi Période de maintien", "v": "1" },
    { "code": "Q05", "desc": "Mesure action emploi Fin de participation", "v": "2" },
    { "code": "R05", "desc": "RELEVÉ 5 MODIFIÉ", "v": "1" },
    { "code": "R06", "desc": "RELEVÉ 5 DUPLICATA", "v": "1" },
    { "code": "R07", "desc": "RELEVÉ 5 DUPLICATA", "v": "1" },
    { "code": "R08", "desc": "RELEVÉ 5 DUPLICATA", "v": "1" },
    { "code": "R10", "desc": "LETTRE DE REMBOURSEMENT", "v": "1" },
    { "code": "R11", "desc": "LETTRE DE REMBOURSEMENT", "v": "1" },
    { "code": "R12", "desc": "LETTRE DE REMBOURSEMENT" }]
}