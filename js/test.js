fetch("https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/item.json")
  .then(response => response.json())  // Transforme la réponse en JSON
  .then(data => {
    const items = data.data;  // Accède à l'objet 'data' qui contient les items

    // Filtrer les items contenant "Boots" dans leurs tags
    const bootsItems = Object.values(items).filter(item => 
      item.tags && item.tags.includes("Boots")
    );

    // Afficher les objets filtrés
    console.log(bootsItems);
    // Vous pouvez maintenant utiliser 'bootsItems' pour les afficher ou les manipuler
  })
  .catch(error => console.error("Erreur:", error));
