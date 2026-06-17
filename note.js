const params = new URLSearchParams(window.location.search);

const countryName = params.get("country");
const noteValue = params.get("note");

let countries = [];
let notes = [];
let currentIndex = 0;
let currentNote;

let touchStartX = 0;
let touchEndX = 0;

let mouseStartX = 0;
let mouseEndX = 0;
let isDragging = false;

const img = document.getElementById("noteImage");

/* ---------------- IMAGE TRANSITION ---------------- */
function changeImage(src){
    img.style.opacity = 0;

    setTimeout(() => {
        img.src = src;
        img.style.opacity = 1;
    }, 200);
}

/* ---------------- LOAD NOTE ---------------- */
function loadNote(index){

    currentNote = notes[index];
    
 
    const country = countries.find(c => c.country === currentNote.country);

if(country){
    document.body.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,.80), rgba(0,0,0,.80)),
     url('${country.map}')`;
}

    document.getElementById("noteTitle").textContent = currentNote.value;

    changeImage(currentNote.image);

    document.getElementById("country").textContent =
        "Country: " + currentNote.country;

        document.getElementById("currency").textContent =
        "Currency: " + country.currency;

    document.getElementById("value").textContent =
        "Value: " + currentNote.value;

    document.getElementById("issueDate").textContent =
        "Issue Date: " + currentNote.issueDate;

    document.getElementById("governor").textContent =
        "Governor: " + currentNote.governor;

    document.getElementById("person").textContent =
        "Person: " + currentNote.person;

    document.getElementById("material").textContent =
        "Material: " + currentNote.material;

    document.getElementById("dimensions").textContent =
        "Dimensions: " + currentNote.dimensions;

    document.getElementById("history").textContent =
        currentNote.history;

    document.getElementById("economy").textContent =
        currentNote.economy;

    document.getElementById("security").textContent =
        currentNote.security;
}

/* ---------------- NAVIGATION ---------------- */
function nextNote(){
    if(currentIndex < notes.length - 1){
        currentIndex++;
        loadNote(currentIndex);
    }
}

function prevNote(){
    if(currentIndex > 0){
        currentIndex--;
        loadNote(currentIndex);
    }
}

/* ---------------- FRONT / BACK ---------------- */
function showFront(){
    if(currentNote){
        changeImage(currentNote.image);
    }
}

function showBack(){
    if(currentNote){
        changeImage(currentNote.backImage);
    }
}

/* ---------------- SWIPE LOGIC ---------------- */
function handleSwipe(){
    const diff = touchStartX - touchEndX;
    const threshold = 80;

    if(diff > threshold){
        nextNote();
    } else if(diff < -threshold){
        prevNote();
    }
}

/* ---------------- MOUSE SWIPE ---------------- */
function handleMouseSwipe(){
    const diff = mouseStartX - mouseEndX;
    const threshold = 80;

    if(diff > threshold){
        nextNote();
    } else if(diff < -threshold){
        prevNote();
    }
}

/* ---------------- FETCH DATA ---------------- */
Promise.all([
    fetch("data/note.json").then(res => res.json()),
    fetch("data/data.json").then(res => res.json())
])
.then(([noteData, countryData]) => {

    notes = noteData;
    countries = countryData;

    currentIndex = notes.findIndex(n =>
        n.country === countryName &&
        n.value === noteValue
    );

    if(currentIndex === -1){
        alert("Note not found!");
        return;
    }

    loadNote(currentIndex);

})
.catch(err => console.error(err));
/* ---------------- TOUCH EVENTS (MOBILE) ---------------- */
document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

/* ---------------- MOUSE EVENTS (PC) ---------------- */
window.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".container");

    container.addEventListener("mousedown", (e) => {
        isDragging = true;
        mouseStartX = e.clientX;
    });

    container.addEventListener("mouseup", (e) => {
        if(!isDragging) return;

        mouseEndX = e.clientX;
        isDragging = false;

        handleMouseSwipe();
    });

    container.addEventListener("mouseleave", () => {
        isDragging = false;
    });

});