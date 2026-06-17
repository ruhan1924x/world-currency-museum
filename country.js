const params = new URLSearchParams(window.location.search);

const countryName = params.get("country");

fetch("data/data.json")
.then(res => res.json())
.then(data => {

    const country = data.find(c =>
        c.country === countryName
    );
      if (!country) {
        alert("Country not found!");
        return;
    }

    document.getElementById("countryName").textContent =
        country.flag + " " + country.country;
    document.getElementById("flag").textContent =
        country.flag;

    document.getElementById("currency").textContent =
        "Currency: " + country.currency;

    document.getElementById("capital").textContent =
        "Capital: " + country.capital;

    document.getElementById("largestNote").textContent =
        "Largest Note: " + country.largestNote;

    document.getElementById("history").textContent =
        country.history;

    const banknotesDiv =
document.getElementById("banknotes");
console.log(country);
console.log(country.banknotes);

country.banknotes.forEach(note => {

    banknotesDiv.innerHTML += `
        <div class="note-card"
        onclick="openNote('${country.country}','${note.value}')">
            <img src="${note.image}" width="200">
            <p>${note.value}</p>
        </div>
    `;
});
const coinsDiv =
document.getElementById("coins");

country.coins.forEach(coin => {

    coinsDiv.innerHTML += `
        <div class="coin-card">
            <img src="${coin.image}" width="120">
            <p>${coin.value}</p>
        </div>
    `;
});
});
function openNote(country, note){

    window.location.href =
    `note.html?country=${encodeURIComponent(country)}&note=${encodeURIComponent(note)}`;

}