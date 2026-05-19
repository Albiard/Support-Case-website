const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let defauts = [];

/* ------------------------------
   CHARGEMENT JSON
------------------------------ */

fetch("../donnees/bdd.json")
    .then(response => response.json())
    .then(data => {
        defauts = data;
    })
    .catch(error => {
        console.error("Erreur chargement JSON :", error);
    });

/* ------------------------------
   GESTION ONGLETS
------------------------------ */

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        const tabName = button.dataset.tab;

        tabButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        tabContents.forEach(content => {
            content.classList.remove("active");
        });

        button.classList.add("active");

        document
            .getElementById(tabName)
            .classList.add("active");

    });

});

/* ------------------------------
   RECHERCHE DYNAMIQUE
------------------------------ */

searchInput.addEventListener("input", () => {
    rechercherDefaut("PMAF");
});

function rechercherDefaut(machine) {

    const recherche = searchInput.value
        .trim()
        .toLowerCase();

    if (recherche.length === 0) {

        resultsDiv.innerHTML = "";

        return;
    }

    const resultats = defauts.filter(defaut => {

        return (

            defaut.Machine === machine &&

            defaut.Nom &&

            defaut.Nom
                .toLowerCase()
                .includes(recherche)

        );

    });

    afficherResultats(resultats);
}

/* ------------------------------
   AFFICHAGE RESULTATS
------------------------------ */

function afficherResultats(resultats) {

    resultsDiv.innerHTML = "";

    if (resultats.length === 0) {

        resultsDiv.innerHTML = `
            <div class="card">
                <p>Aucun défaut trouvé.</p>
            </div>
        `;

        return;
    }

    resultats.forEach(defaut => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <h3>${defaut.Nom}</h3>

            <p>
                <strong>Type :</strong>
                ${defaut.type}
            </p>

            <p>
                <strong>Cause :</strong><br>
                ${defaut.Cause.replace(/\n/g, "<br>")}
            </p>

            <p>
                <strong>Solution :</strong><br>
                ${defaut.Solution.replace(/\n/g, "<br>")}
            </p>

        `;

        resultsDiv.appendChild(card);

    });

}