// options
// nom de la fleur
const changeName = document.getElementById("changename");
const flowerName = document.getElementById("flowername");
flowerName.textContent = localStorage.getItem("flowerName") || "Ma Fleur";

changeName.addEventListener("click", () => {
    const newName = prompt("Entrez un nouveau nom :");
    if (newName) {
        flowerName.textContent = newName;
        localStorage.setItem("flowerName", newName);
    }
});


// succes
const success = document.getElementById("succes");
const succesList = [
    {
        id: "firstClick",
        title: "Premier Insecte !",
        description: "Clique sur ton premier insecte.",
        unlocked: false
    },
    {
        id: "richBoy",
        title: "Riche !",
        description: "Atteins 1000 Argent.",
        unlocked: false
    },
    {
        id: "collector",
        title: "Collectionneur",
        description: "Clique sur 10 insectes.",
        unlocked: false
    },
    {
        id: "waterboy",
        title: "Hydro Pro",
        description: "Achète 50 arrosoirs.",
        unlocked: false
    },
    {
        id: "sunboy",
        title: "Maître Soleil",
        description: "Achète 50 parasols.",
        unlocked: false
    },
];

function unlockSuccess(id) {
    const success = succesList.find(s => s.id === id);
    if (success && !success.unlocked) {
        success.unlocked = true;
        alert("🎉 Succès débloqué : " + success.title + " - " + success.description);
        // tu peux aussi afficher ça dans une boîte stylée ou l’ajouter à une liste HTML
        saveSuccesses();
    }
}

function saveSuccesses() {
    const unlockedIds = succesList.filter(s => s.unlocked).map(s => s.id);
    localStorage.setItem("unlockedSuccesses", JSON.stringify(unlockedIds));
}

const savedSuccesses = JSON.parse(localStorage.getItem("unlockedSuccesses")) || [];
succesList.forEach(success => {
    if (savedSuccesses.includes(success.id)) {
        success.unlocked = true;
    }
});


const successButton = document.getElementById("succes");
const successMenu = document.getElementById("successMenu");
const successListEl = document.getElementById("successList");

successButton.addEventListener("click", () => {
    successListEl.innerHTML = "";

    succesList.forEach(success => {
        const li = document.createElement("li");
        li.textContent = (success.unlocked ? "✅ " : "🔒 ") + success.title + " - " + success.description;
        successListEl.appendChild(li);
    });

    successMenu.style.display = successMenu.style.display === "none" ? "block" : "none";
});

// Sélectionne la croix pour fermer le menu des succès
const closeSuccessMenuButton = document.getElementById("closeSuccessMenu");

// Ajoute un événement pour fermer le menu des succès
closeSuccessMenuButton.addEventListener("click", () => {
    successMenu.style.display = "none"; // Masque la div des succès
});


// mini jeux
const miniGame = document.getElementById("minigame");
const miniGamesWindow = document.getElementById("minigames");

miniGame.addEventListener("click", () => {
    miniGamesWindow.style.display = miniGamesWindow.style.display === "none" ? "block" : "none";
});

const quiz = document.getElementById("quiz");
const quizWindow = document.getElementById("quizWindow");

quiz.addEventListener("click", () => {
    quizWindow.style.display = quizWindow.style.display === "none" ? "block" : "none";
});





// inventaire
const inventory = document.getElementById("inventorycontent");
let inventoryItems = JSON.parse(localStorage.getItem("inventoryItems")) || []; // Si aucun inventaire, on commence avec un tableau vide

const updateInventory = () => {
    inventory.innerHTML = ""; // Vider le contenu précédent
    const itemCounts = {}; // Un objet pour compter les quantités de chaque élément

    // Compter les quantités des arrosoirs
    for (let i = 0; i < inventoryItems.length; i++) {
        const item = inventoryItems[i];
        if (item.name === "Arrosoir") {
            if (!itemCounts["Arrosoir"]) {
                itemCounts["Arrosoir"] = 0;
            }
            itemCounts["Arrosoir"] += item.quantity;
        }
    }
    // Verifie si l'utilisateur a 50 arrosoirs pour le succès
    if (itemCounts["Arrosoir"] >= 50) {
        unlockSuccess("waterboy");
    }

    // Compter les quantités des parasols
    for (let i = 0; i < inventoryItems.length; i++) {
        const item = inventoryItems[i];
        if (item.name === "Parasol") {
            if (!itemCounts["Parasol"]) {
                itemCounts["Parasol"] = 0;
            }
            itemCounts["Parasol"] += item.quantity;
        }
    }
    // Verifie si l'utilisateur a 50 parasols pour le succès
    if (itemCounts["Parasol"] >= 50) {
        unlockSuccess("sunboy");
    }

    // Afficher l'inventaire
    for (const itemName in itemCounts) {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.textContent = `${itemName} x${itemCounts[itemName]}`; // Afficher le nom + la quantité
        inventory.appendChild(itemElement);
    }
};

document.getElementById("inventory").addEventListener("click", () => {
    const content = document.getElementById("inventorycontent");
    content.style.display = content.style.display === "none" ? "block" : "none";
    if (content.style.display === "block") {
        updateInventory(); // Met à jour l'inventaire
    }
});

// Fonction pour calculer les bonus des objets
const ArrosoirBonus = () => {
    const numberOfWateringCans = inventoryItems
        .filter(item => item.name === "Arrosoir") 
        .reduce((total, item) => total + item.quantity, 0); 
    const bonus = numberOfWateringCans * 50; // Calculer le bonus
    return bonus;
};

const ParasolBonus = () => {
    const numberOfParasols = inventoryItems
        .filter(item => item.name === "Parasol") 
        .reduce((total, item) => total + item.quantity, 0); 
    const bonus = numberOfParasols * 50; // Calculer le bonus
    return bonus;
};

// Acheter un arrosoir
document.getElementById("buywater").addEventListener("click", () => {
    if (currentMoney >= 20) {
        currentMoney -= 20;
        const existingWateringCan = inventoryItems.find(item => item.name === "Arrosoir");
        if (existingWateringCan) {
            existingWateringCan.quantity += 1;
        } else {
            inventoryItems.push({ name: "Arrosoir", quantity: 1 });
        }

        money.textContent = "Argent : " + currentMoney;
        localStorage.setItem("money", currentMoney);
        localStorage.setItem("inventoryItems", JSON.stringify(inventoryItems));
        updateInventory();
        restartIntervals(); // Redémarrer les intervalles après l'achat d'un objet
    } else {
        alert("Pas assez d'argent !");
    }
});

// Acheter un Parasol
document.getElementById("buysun").addEventListener("click", () => {
    if (currentMoney >= 20) {
        currentMoney -= 20;
        const existingWateringCan = inventoryItems.find(item => item.name === "Parasol");
        if (existingWateringCan) {
            existingWateringCan.quantity += 1;
        } else {
            inventoryItems.push({ name: "Parasol", quantity: 1 });
        }

        money.textContent = "Argent : " + currentMoney;
        localStorage.setItem("money", currentMoney);
        localStorage.setItem("inventoryItems", JSON.stringify(inventoryItems));
        updateInventory();
        restartIntervals(); // Redémarrer les intervalles après l'achat d'un objet
    } else {
        alert("Pas assez d'argent !");
    }
});

// Mettre à jour l'argent
const moneyButton = document.getElementById("moneybutton");
const money = document.getElementById("money");
let currentMoney = parseInt(localStorage.getItem("money")) || 0;
money.textContent = "Argent : " + currentMoney;

moneyButton.addEventListener("click", () => {
    currentMoney += 1;
    money.textContent = "Argent : " + currentMoney;
    localStorage.setItem("money", currentMoney);
    updateStats();
});

// l'eau
const waterButton = document.getElementById("waterbutton");
const water = document.getElementById("water");
const alertMessage = document.getElementById("alertmessage");
let waterLevel = parseInt(localStorage.getItem("waterLevel")) || 50;

function updateFlowerStatus() {
    water.textContent = "Eau : " + waterLevel + " %";
    localStorage.setItem("waterLevel", waterLevel);

    if (waterLevel <= 25) {
        alertMessage.textContent = "La petite fleur a besoin d'eau !";
    } else {
        alertMessage.textContent = "";
    }
}

let waterInterval;
const startWaterInterval = () => {
    if (waterInterval) clearInterval(waterInterval); // Clear any previous interval
    waterInterval = setInterval(() => {
        waterLevel = Math.max(0, waterLevel - 1);
        updateFlowerStatus();
    }, 1000 + ArrosoirBonus());
};

waterButton.addEventListener("click", () => {
    waterLevel = Math.min(100, waterLevel + 10);
    updateFlowerStatus();
});

startWaterInterval(); // Start the water interval

// soleil
const sunButton = document.getElementById("sunbutton");
const sun = document.getElementById("sun");
const alertMessageSun = document.getElementById("alertmessagesun");
let sunLevel = parseInt(localStorage.getItem("sunLevel")) || 50;

function updateSunStatus() {
    sun.textContent = "Soleil : " + sunLevel + " %";
    localStorage.setItem("sunLevel", sunLevel);

    if (sunLevel <= 25) {
        alertMessageSun.textContent = "La petite fleur a besoin de soleil !";
    } else {
        alertMessageSun.textContent = "";
    }
}

let sunInterval;
const startSunInterval = () => {
    if (sunInterval) clearInterval(sunInterval); // Clear any previous interval
    sunInterval = setInterval(() => {
        sunLevel = Math.max(0, sunLevel - 1);
        updateSunStatus();
    }, 1000 + ParasolBonus());
};

sunButton.addEventListener("click", () => {
    sunLevel = Math.min(100, sunLevel + 10);
    updateSunStatus();
});

startSunInterval(); // Start the sun interval

// Fonction pour redémarrer les intervalles
const restartIntervals = () => {
    startWaterInterval();
    startSunInterval();
};


// ouvrir le magasin et options
document.querySelectorAll(".dropdown > button").forEach(btn => {
    btn.addEventListener("click", function () {
        const dropdown = this.parentElement.querySelector(".dropdown-content");
        dropdown.classList.toggle("show");
    });
});

// Optionnel : Fermer le menu si on clique en dehors
document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-content").forEach(menu => {
            menu.classList.remove("show");
        });
    }
});


// Insectes bonus
const body = document.body;
const alertInsect = document.getElementById("alertinsect");
let insectClickCount = parseInt(localStorage.getItem("insectClickCount")) || 0;

// Bonus pour chaque insecte
const insectes = [
    {
        src: "../jeux/images/flower/gendarme.png",
        bonusType: "water",
        bonusAmount: 152,
    },
    {
        src: "../jeux/images/flower/guepe.png",
        bonusType: "sun",
        bonusAmount: 195,
    },
];


// Met à jour les stats (à appeler après chaque changement)
function updateStats() {
    money.textContent = "Argent : " + currentMoney;
    if (currentMoney >= 1000) {
        unlockSuccess("richBoy");
    }
}

// Apparition aléatoire d'un insecte toutes les 10-20 secondes
setInterval(() => {
    const insect = insectes[Math.floor(Math.random() * insectes.length)];

    const img = document.createElement("img");
    img.src = insect.src;
    img.classList.add("insect");
    img.style.position = "absolute";
    img.style.width = "50px";
    img.style.cursor = "pointer";

    // Position aléatoire
    img.style.left = Math.floor(Math.random() * window.innerWidth * 0.8) + "px";
    img.style.top = Math.floor(Math.random() * window.innerHeight * 0.6 + 100) + "px";

    // Quand on clique
    img.addEventListener("click", () => {
        if (insect.bonusType === "water") {
            currentMoney += insect.bonusAmount;
            console.log("Vous avez gagné " + insect.bonusAmount + " Argent !"); // on affiche dans la console
            alertInsect.style.display = "block"; // on affiche le message
            alertInsect.textContent = "Vous avez Gagné " + insect.bonusAmount + " Argent !"; // on met le message
            setTimeout(() => {
                alertInsect.style.display = "none";
            }, 5000); // le message disparait après 5 secondes
        } else if (insect.bonusType === "sun") {
            currentMoney += insect.bonusAmount;
            console.log("Vous avez gagné " + insect.bonusAmount + " Argent !");
            alertInsect.style.display = "block";
            alertInsect.textContent = "Vous avez Gagné " + insect.bonusAmount + " Argent !";
            setTimeout(() => {
                alertInsect.style.display = "none";
            }, 5000);
        }
        updateStats();
        insectClickCount++;
        localStorage.setItem("insectClickCount", insectClickCount);
        if (insectClickCount === 1) {
            unlockSuccess("firstClick");
        }
        if (insectClickCount === 10) {
            unlockSuccess("collector");
        }
        console.log(insectClickCount);
        img.remove();
    });
    body.appendChild(img);

    // L'insecte disparaît après 5 secondes s'il n’est pas cliqué
    setTimeout(() => {
        img.remove();
    }, 5000);
}, Math.random() * 100 + 10000);


// Affichage initial
updateFlowerStatus();
updateSunStatus();
