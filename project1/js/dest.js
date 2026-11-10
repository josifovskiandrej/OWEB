const categories = ["City", "Beach", "Culture", "Mountain"];
const list = document.getElementById("list");
const filterCategory = document.getElementById("cat");
const newCategory = document.getElementById("fcat");

filterCategory.innerHTML = '<option value="">All categories</option>';
newCategory.innerHTML = '<option value="" disabled selected>Pick category...</option>';
for (let i = 0; i < categories.length; i++) {
    filterCategory.innerHTML += "<option>" + categories[i] + "</option>";
    newCategory.innerHTML += "<option>" + categories[i] + "</option>";
}

const picker = document.getElementById("picker");
let selectedId = "";
if (destinations.length > 0) {
    selectedId = destinations[0].id;
}

let sharedDays = 3;
let sharedPpl = 1;

function switchView(view) {
    let btnDest = document.getElementById("btnDestTab");
    let btnCalc = document.getElementById("btnCalcTab");
    let destSec = document.getElementById("destSection");
    let calcSec = document.getElementById("calcSection");

    if (view === 'dest') {
        btnDest.classList.add("active");
        btnCalc.classList.remove("active");
        destSec.classList.remove("d-none");
        calcSec.classList.add("d-none");
        showDestinations();
    } else {
        btnCalc.classList.add("active");
        btnDest.classList.remove("active");
        calcSec.classList.remove("d-none");
        destSec.classList.add("d-none");

        document.getElementById("calcDays").value = sharedDays;
        document.getElementById("calcPpl").value = sharedPpl;

        showPicker();
        calculate();
    }
}

function showPicker() {
    if (!picker) return;
    picker.innerHTML = "";

    for (let i = 0; i < destinations.length; i++) {
        let dest = destinations[i];
        let active = "";
        if (dest.id == selectedId) {
            active = "active";
        }

        picker.innerHTML += '<div class="card dest-pill text-white ' + active + '" onclick="selectDestination(\'' + dest.id + '\')">' +
            '<img class="card-img" src="' + dest.images[0] + '" alt="">' +
            '<div class="card-img-overlay">' +
            '<h4 class="card-title">' + dest.name + ',' + '<small>' + dest.country + '</small></h4>' +
            '</div></div>';
    }
}

function selectDestination(id) {
    selectedId = id;
    showPicker();
    calculate();
}

function calculate() {
    let dest = findDestination(selectedId);
    let out = document.getElementById("out");
    if (!out) return;

    if (dest == null) {
        document.getElementById("chosen").textContent = "";
        out.innerHTML = '<p class="text-muted mb-0">No destinations yet. Add one in the Viewer tab.</p>';
        return;
    }

    let days = Number(document.getElementById("calcDays").value);
    let people = Number(document.getElementById("calcPpl").value);
    if (days < 1) days = 1;
    if (people < 1) people = 1;

    sharedDays = days;
    sharedPpl = people;
    document.getElementById("days").value = days;
    document.getElementById("ppl").value = people;

    let flights = people * dest.flight;
    let stay = people * days * dest.perDay;
    let total = flights + stay;

    document.getElementById("chosen").textContent = dest.name + ", " + dest.country;
    out.innerHTML = '<table class="table mb-0">' +
        '<tr><td>Flights &lpar;' + people + ' <ion-icon name="close"></ion-icon> ' + dest.flight + ' &euro;&rpar;</td><td class="text-right">' + flights + ' &euro;</td></tr>' +
        '<tr><td>Stay + food &lpar;' + people + ' <ion-icon name="close"></ion-icon> ' + days + ' days <ion-icon name="close"></ion-icon> ' + dest.perDay + ' &euro;&rpar;</td><td class="text-right">' + stay + ' €</td></tr>' +
        '<tr><td>Per person</td><td class="text-right">' + (total / people) + ' &euro;</td></tr>' +
        '<tr class="font-weight-bold"><td>Total</td><td class="text-right">' + total + ' &euro;</td></tr>' +
        '</table>';
}

function showDestinations() {
    let days = Number(document.getElementById("days").value);
    let people = Number(document.getElementById("ppl").value);
    let maxBudget = Number(document.getElementById("max").value);
    let category = filterCategory.value;

    if (days < 1) days = 1;
    if (people < 1) people = 1;
    if (maxBudget == 0) maxBudget = 999999;

    sharedDays = days;
    sharedPpl = people;

    list.innerHTML = "";

    for (let i = 0; i < destinations.length; i++) {
        let dest = destinations[i];
        let price = people * (dest.flight + dest.perDay * days);

        if (price > maxBudget) continue;
        if (category != "" && dest.category != category) continue;

        list.innerHTML += '<div class="col-md-6 col-lg-4 mb-4">' +
            '<div class="card h-100 shadow-sm border-0">' +
            '<img class="card-img-top" src="' + dest.images[0] + '" alt="' + dest.name + '" style="height:200px;object-fit:cover">' +
            '<div class="card-body">' +
            '<span class="badge badge-pill px-3 py-2 dest-badge">' + dest.category + '</span>' +
            '<h5 class="card-title mt-2">' + dest.name + ', ' + dest.country + '</h5>' +
            '<p class="card-text">' + dest.description + '</p>' +
            '</div>' +
            '<div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">' +
            '<div>' +
            '<strong class="d-block">' + price + ' &euro;</strong>' +
            '<small class="text-muted">' + days + 'd, ' + people + 'p</small>' +
            '</div>' +
            '<button class="btn btn-sm rounded-pill px-3 btn-delete-dest" onclick="deleteDestination(\'' + dest.id + '\')">Delete</button>' +
            '</div></div></div>';
    }

    if (list.innerHTML == "") {
        list.innerHTML = '<p class="col">No destinations match your filters.</p>';
    }
}

function deleteDestination(id) {
    let sure = confirm("Delete this destination?");
    if (sure == false) return;

    let newList = [];
    for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].id != id) {
            newList.push(destinations[i]);
        }
    }
    destinations = newList;

    saveDestinations();
    showDestinations();
    showPicker();
};

document.getElementById("add").onsubmit = function(event) {
    event.preventDefault();

    let newDestination = {
        id: "c" + Date.now(),
        name: document.getElementById("fname").value,
        country: document.getElementById("fcountry").value,
        category: newCategory.value,
        flight: Number(document.getElementById("fflight").value),
        perDay: Number(document.getElementById("fday").value),
        description: document.getElementById("fdesc").value,
        images: ["../assets/img/plane.webp"],
        likes: 0,
        dislikes: 0,
        comments: [],
        posts: []
    };
    destinations.push(newDestination);

    saveDestinations();
    document.getElementById("add").reset();
    showDestinations();
    showPicker();
};

function syncFromViewer() {
    sharedDays = Number(document.getElementById("days").value);
    sharedPpl = Number(document.getElementById("ppl").value);
    document.getElementById("calcDays").value = sharedDays;
    document.getElementById("calcPpl").value = sharedPpl;
    showDestinations();
}

document.getElementById("calcDays").oninput = calculate;
document.getElementById("calcPpl").oninput = calculate;
document.getElementById("days").oninput = syncFromViewer;
document.getElementById("ppl").oninput = syncFromViewer;
document.getElementById("max").oninput = showDestinations;
filterCategory.oninput = showDestinations;

showPicker();
showDestinations();