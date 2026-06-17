let countriesData = [];
let popularCountries = [
    "United States",
    "Japan",
    "Russia",
    "China",
]

fetch("data/countries.json")
.then(response => response.json())
.then(data => {

    countriesData = data;
    const popular = data.filter(country =>
        popularCountries.includes(country.country)
    );

    displayCountries(popular);

});

function displayCountries(data){

    const container =
    document.getElementById("countryList");

    container.innerHTML = "";

    data.forEach(country => {

        container.innerHTML += `
        <div class="card" onclick="openCountry('${country.country}')">
        
            <h3>
                ${country.flag}
                ${country.country}
            </h3>
            <p>
            ${country.currency}
            </p>
        </div>
        `;


    });

}


function searchCountry(){

let input = document.getElementById("search").value.toLowerCase();
if(input === ""){
    const popular = countriesData.filter(country=>
        popularCountries.includes(country.country)
    );
    displayCountries(popular);
    return;
}
 let filtered = countriesData.filter(country =>
        country.country.toLowerCase().includes(input) ||
        country.currency.toLowerCase().includes(input)
    );
    const noResult = document.getElementById("noResult");

    if(filtered.length === 0){
        noResult.style.display = "block";
    }
    else{
        noResult.style.display = "none";
    }

    displayCountries(filtered);


}

function openCountry(country){

    window.location.href =
    `country.html?country=${encodeURIComponent(country)}`;

}
document.getElementById("search").addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        searchCountry();
    }

});
document.getElementById("search")
.addEventListener("input", searchCountry);