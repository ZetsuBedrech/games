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




// Lance le timer
timerInterval = setInterval(updateTimer, 1000);


// Affichage initial
updateFlowerStatus();
updateSunStatus();
