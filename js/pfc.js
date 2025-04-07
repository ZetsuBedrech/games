// Sélection des éléments
const pierre = document.getElementById("pierre");
const feuille = document.getElementById("feuille");
const ciseaux = document.getElementById("ciseaux");
const ordiChoix = document.getElementById("ordichoix");
const resultat = document.getElementById("resultat");
const scoreJoueur = document.getElementById("scorejoueur");
const scoreOrdi = document.getElementById("scoreordi");

// Variables
const choixPossibles = ["pierre", "feuille", "ciseaux"];
let scorejoueur = 0;
let scoreordi = 0;

function jouerTour(choixJoueur) {
    const choixOrdinateur = choixPossibles[Math.floor(Math.random() * 3)];
    let result = "";

    if (choixJoueur === choixOrdinateur) {
        result = "Égalité";
    } else if (
        (choixJoueur === "pierre" && choixOrdinateur === "ciseaux") ||
        (choixJoueur === "feuille" && choixOrdinateur === "pierre") ||
        (choixJoueur === "ciseaux" && choixOrdinateur === "feuille")
    ) {
        result = "Vous avez gagné !";
        scorejoueur++;
    } else {
        result = "Vous avez perdu !";
        scoreordi++;
    }

    // Mise à jour de l'interface
    ordiChoix.innerHTML = `Choix de l'ordinateur :<br> ${choixOrdinateur}.`;
    resultat.innerHTML = `Résultat :<br> ${result}`;
    scoreJoueur.textContent = `Score Joueur : ${scorejoueur}`;
    scoreOrdi.textContent = `Score Ordinateur : ${scoreordi}`;
}

// Ajout des événements
pierre.addEventListener("click", () => jouerTour("pierre"));
feuille.addEventListener("click", () => jouerTour("feuille"));
ciseaux.addEventListener("click", () => jouerTour("ciseaux"));