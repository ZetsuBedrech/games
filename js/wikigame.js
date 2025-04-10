const mot1 = document.getElementById("mot1");
        const mot2 = document.getElementById("mot2");
        const bouton = document.getElementById("nouveauxMots");

        async function getMot() {
            const response = await fetch("https://trouve-mot.fr/api/random/1");
            const data = await response.json();
            return data[0];
        }

        async function afficherDeuxMots() {
            try {
                const [motA, motB] = await Promise.all([getMot(), getMot()]);
                mot1.textContent = `Mot 1 : ${motA}`;
                mot2.textContent = `Mot 2 : ${motB}`;
            } catch (error) {
                mot1.textContent = "Erreur de chargement.";
                mot2.textContent = "Erreur de chargement.";
                console.error(error);
            }
        }

        bouton.addEventListener("click", afficherDeuxMots);
        afficherDeuxMots();