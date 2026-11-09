const categories = ["City", "Beach", "Culture", "Mountain"];
const list = document.getElementById("list");
const filterCategory = document.getElementById("cat");
const newCategory = document.getElementById("fcat");

filterCategory.innerHTML = '<option value="">All categories</option>';
for (let i = 0; i < categories.length; i++) {
    filterCategory.innerHTML += "<option>" + categories[i] + "</option>";
    newCategory.innerHTML += "<option>" + categories[i] + "</option>";
}

function showDestinations() {
    let days = Number(document.getElementById("days").value);
    let people = Number(document.getElementById("ppl").value);
    let maxBudget = Number(document.getElementById("max").value);
    let category = filterCategory.value;

    if (days < 1) {
        days = 1;
    }
    if (people < 1) {
        people = 1;
    }
    if (maxBudget == 0) {
        maxBudget = 999999;
    }

    list.innerHTML = "";

    for (let i = 0; i < destinations.length; i++) {
        let dest = destinations[i];
        let price = people * (dest.flight + dest.perDay * days);

        if (price > maxBudget) {
            continue;
        }
        if (category != "" && dest.category != category) {
            continue;
        }

        list.innerHTML += '<div class="col-md-6 col-lg-4 mb-4">' +
            '<div class="card h-100 shadow-sm border-0">' +
            '<img class="card-img-top" src="' + dest.images[0] + '" alt="' + dest.name + '" style="height:200px;object-fit:cover">' +
            '<div class="card-body">' +
            '<span class="badge badge-pill badge-primary">' + dest.category + '</span>' +
            '<h5 class="card-title mt-2">' + dest.name + ', ' + dest.country + '</h5>' +
            '<p class="card-text">' + dest.description + '</p>' +
            '</div>' +
            '<div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">' +
            '<strong>' + price + ' &euro;</strong>' +
            '<button class="btn btn-sm btn-outline-danger" onclick="deleteDestination(\'' + dest.id + '\')">Delete</button>' +
            '</div></div></div>';
    }

    if (list.innerHTML == "") {
        list.innerHTML = '<p class="col">No destinations match your filters.</p>';
    }
}

function deleteDestination(id) {
    let sure = confirm("Delete this destination?");
    if (sure == false) {
        return;
    }

    let newList = [];
    for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].id != id) {
            newList.push(destinations[i]);
        }
    }
    destinations = newList;

    saveDestinations();
    showDestinations();
}

document.getElementById("add").onsubmit = function (event) {
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
};

document.getElementById("days").oninput = showDestinations;
document.getElementById("ppl").oninput = showDestinations;
document.getElementById("max").oninput = showDestinations;
filterCategory.oninput = showDestinations;

showDestinations();