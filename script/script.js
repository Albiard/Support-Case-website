const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let defauts = [];

fetch("./defauts.json")
  .then(response => response.json())
  .then(data => {
    defauts = data;
  });

searchInput.addEventListener("input", () => {
    rechercherDefaut("PMAF");
});

function rechercherDefaut(machine) {

    const recherche = searchInput.value.trim().toLowerCase();

    if (recherche.length === 0) {
        resultsDiv.innerHTML = "";
        return;
    }

    const resultats = defauts.filter(defaut => {

        return (
            defaut.Machine === machine &&
            defaut.Nom &&
            defaut.Nom.toLowerCase().includes(recherche)
        );

    });

    afficherResultats(resultats);
}

function afficherResultats(resultats) {

    resultsDiv.innerHTML = "";

    if (resultats.length === 0) {
        resultsDiv.innerHTML = "<p>Aucun défaut trouvé</p>";
        return;
    }

    resultats.forEach(defaut => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h3>${defaut.Nom}</h3>
            <p><strong>Type :</strong> ${defaut.type}</p>
        `;

        resultsDiv.appendChild(card);

    });
}