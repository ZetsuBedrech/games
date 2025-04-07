// Sélectionner les éléments du DOM
const clearBtn = document.getElementById("clearBtn");
const eraserBtn = document.getElementById("eraserBtn"); // Nouveau bouton pour la gomme
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Variables pour l'outil actif
let drawing = false;
let erasing = false; // Nouvelle variable pour savoir si on utilise la gomme

// Fonction pour effacer le canvas
clearBtn.addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Activer/désactiver la gomme
eraserBtn.addEventListener("click", function() {
    erasing = !erasing; // Alterne entre gomme et stylo
    if (erasing) {
        eraserBtn.textContent = "Stylo"; // Change le texte du bouton pour "Stylo" quand la gomme est activée
    } else {
        eraserBtn.textContent = "Gomme"; // Change le texte du bouton pour "Gomme" quand la gomme est désactivée
    }
});

// Fonction de dessin (stylo)
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
        if (erasing) {
            ctx.clearRect(e.offsetX - 10, e.offsetY - 10, 20, 20); // Efface une petite zone autour du curseur (taille de la gomme)
        } else {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }
    }
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
});
