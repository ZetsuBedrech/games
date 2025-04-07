// Déclarer les boutons pour éviter des erreurs
const randomizeChampion = document.getElementById("randomizechampion");
const randomizeItems = document.getElementById("randomizeitems");
const randomizeBottes = document.getElementById("randomizebottes");

// Fonction pour randomiser un champion
function randomChampion() {
    fetch("https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/champion.json")
        .then(response => response.json())
        .then(data => {
            const champions = data.data;
            const randomChampionKey = Object.keys(champions)[Math.floor(Math.random() * Object.keys(champions).length)];
            const randomChampion = champions[randomChampionKey];
            const randomChampionName = randomChampion.name;
            const randomChampionImage = randomChampion.image.full;
            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${randomChampionImage}`;

            test.textContent = randomChampionName;
            testimg.src = imageUrl;
            testimg.alt = randomChampionName;
        })
        .catch(error => console.error("Erreur:", error));
}

// Fonction pour randomiser des items
function randomItems() {
    fetch("https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/item.json")
        .then(response => response.json())
        .then(data => {
            const items = data.data;
            const excludedNames = [
                "Doran's", "Scorchclaw Pup", "Structure Bounty", "Penetrating Bullets", "Mosstomper Seedling",
                "Gustwalker Hatchling", "Super Mech Armor", "Phreakish Gusto", "Reinforced Armor",
                "OvererchargedHA", "Vigilant Wardstone", "Gusto", "Kalista's Black Spear", "Fortification",
                "Trailblazer", "Anti-tower Socks", "Turret Plating", "Warden's Eye", "Tower Power-Up",
                "Super Mech Power Field", "Overcharged"
            ];

            const itemfiltered = Object.values(items).filter(item =>
                item.maps && item.maps["11"] === true &&
                !item.into && !item.consumed &&
                !excludedNames.some(name => item.name.includes(name)) &&
                !item.tags.includes("Trinket") &&
                !item.tags.includes("Lane") &&
                !item.tags.includes("Boots")
            );

            // Supprimer les items précédents
            const randomItemsContainer = document.getElementById("randomitems");
            randomItemsContainer.innerHTML = "";

            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * itemfiltered.length);
                const randomItem = itemfiltered[randomIndex];
                const randomItemName = randomItem.name;
                const randomItemImage = randomItem.image.full;
                const imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${randomItemImage}`;

                const itemContainer = document.createElement("div");
                const itemName = document.createElement("p");
                const itemImage = document.createElement("img");

                itemName.textContent = randomItemName;
                itemImage.src = imageUrl;
                itemImage.alt = randomItemName;

                itemContainer.appendChild(itemName);
                itemContainer.appendChild(itemImage);
                randomItemsContainer.appendChild(itemContainer);
            }
        })
        .catch(error => console.error("Erreur:", error));
}

// Fonction pour randomiser des bottes
function randomBottes() {
    fetch("https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/item.json")
        .then(response => response.json())
        .then(data => {
            const items = data.data;
            const bootsItems = Object.values(items).filter(item => item.tags && item.tags.includes("Boots"));

            const randomIndex = Math.floor(Math.random() * bootsItems.length);
            const randomBoots = bootsItems[randomIndex];
            const bootName = randomBoots.name;
            const bootImage = randomBoots.image.full;
            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${bootImage}`;

            testboot.textContent = bootName;
            testbootimg.src = imageUrl;
            testbootimg.alt = bootName;
        })
        .catch(error => console.error("Erreur:", error));
}
// Ajouter des événements aux boutons
randomizeChampion.addEventListener("click", randomChampion);
randomizeItems.addEventListener("click", randomItems);
randomizeBottes.addEventListener("click", randomBottes);

// Lancer les fonctions au chargement de la page
randomChampion();
randomItems();
randomBottes();