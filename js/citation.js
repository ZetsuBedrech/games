const citationElement = document.getElementById("citation");
        const bouton = document.querySelector("button");
    
        async function nouvelleCitation() {
            try {
                const response = await fetch("https://luha.alwaysdata.net/api/");
                const data = await response.json();
                citationElement.textContent = `"${data.citation}"`;
            } catch (error) {
                citationElement.textContent = "Erreur lors du chargement de la citation.";
                console.error(error);
            }
        }
    
        bouton.addEventListener("click", nouvelleCitation);
    
        nouvelleCitation();