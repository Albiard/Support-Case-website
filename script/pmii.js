const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let defauts = [];

/* ================= BDD ================= */

fetch("../donnees/bdd.json")
    .then(response => response.json())
    .then(data => {
        defauts = data;
    })
    .catch(error => {
        console.error("Erreur chargement JSON :", error);
    });

/* ================= ONGLETS ================= */

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const tabName = button.dataset.tab;

        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        button.classList.add("active");
        document.getElementById(tabName).classList.add("active");
    });
});

/* ================= RECHERCHE ================= */

searchInput.addEventListener("input", () => {
    rechercherDefaut("PMII");
});

function rechercherDefaut(machine) {
    const recherche = searchInput.value.trim().toUpperCase();

    if (recherche.length === 0) {
        resultsDiv.innerHTML = "";
        return;
    }

    const resultats = defauts.filter(defaut => {
        return (
            defaut.Machine?.trim().toUpperCase() === machine.toUpperCase()
            &&
            defaut.Nom
            &&
            defaut.Nom.toUpperCase().includes(recherche)
        );
    });

    afficherResultats(resultats);
}

/* ================= RESULTATS ================= */

function afficherResultats(resultats) {
    resultsDiv.innerHTML = "";

    if (resultats.length === 0) {
        resultsDiv.innerHTML = `
            <div class="card">
                <p>AUCUN DÉFAUT TROUVÉ.</p>
            </div>
        `;
        return;
    }

    resultats.forEach(defaut => {
        const card = document.createElement("div");
        card.classList.add("card", "result-item");

        card.innerHTML = `
            <h3>${defaut.Nom.toUpperCase()}</h3>
        `;

        card.addEventListener("click", () => {
            ouvrirPopupDefaut(defaut);
        });

        resultsDiv.appendChild(card);
    });
}

/* ================= POPUP ================= */

function ouvrirPopupDefaut(defaut) {
    document.getElementById("popupTitle").innerText = defaut.Nom.toUpperCase();
    document.getElementById("popupType").innerText = defaut.type.toUpperCase();
    document.getElementById("popupCause").innerHTML = defaut.Cause.toUpperCase().replace(/\n/g, "<br>");
    document.getElementById("popupSolution").innerHTML = defaut.Solution.toUpperCase().replace(/\n/g, "<br>");

    document.getElementById("popupDefaut").classList.add("active");
}

function fermerPopupDefaut() {
    document.getElementById("popupDefaut").classList.remove("active");
}