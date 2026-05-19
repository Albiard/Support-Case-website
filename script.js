function rechercher() {
    let input = document.getElementById("search").value.toUpperCase();
    let resultat = document.getElementById("resultat");

    resultat.innerHTML = "";

    data.forEach(item => {
        if (item.nom.toUpperCase().includes(input)) {
            resultat.innerHTML += `
                <div class="card">
                    <h2>${item.nom}</h2>
                    <pre>${item.solution}</pre>
                </div>
            `;
        }
    });

    if (resultat.innerHTML === "") {
        resultat.innerHTML = "<p>Aucun résultat</p>";
    }
}