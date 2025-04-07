const horoscopeElement = document.getElementById("horoscope");
        const bouton = document.querySelector("button");
        const signeSelect = document.getElementById("signe");

        async function obtenirHoroscope() {
            const signe = signeSelect.value;
            const url = `https://kayoo123.github.io/astroo-api/jour.json`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if (data && data[signe]) {
                    horoscopeElement.textContent = `Horoscope pour ${signeSelect.options[signeSelect.selectedIndex].text}: ${data[signe]}`;
                } else {
                    horoscopeElement.textContent = "Désolé, l'horoscope est indisponible pour le moment.";
                }
            } catch (error) {
                horoscopeElement.textContent = "Erreur lors du chargement de l'horoscope.";
                console.error(error);
            }
        }

        bouton.addEventListener("click", obtenirHoroscope);