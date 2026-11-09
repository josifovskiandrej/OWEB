const picker = document.getElementById("picker");
let selectedId = "";
if (destinations.length > 0) {
    selectedId = destinations[0].id;
}

function showPicker() {
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

    if (dest == null) {
        document.getElementById("chosen").textContent = "";
        out.innerHTML = '<p class="text-muted mb-0">No destinations yet. Add one on the Destinations page.</p>';
        return;
    }

    let days = Number(document.getElementById("days").value);
    let people = Number(document.getElementById("ppl").value);
    if (days < 1) {
        days = 1;
    }
    if (people < 1) {
        people = 1;
    }

    let flights = people * dest.flight;
    let stay = people * days * dest.perDay;
    let total = flights + stay;

    document.getElementById("chosen").textContent = dest.name + ", " + dest.country;
    out.innerHTML = '<table class="table mb-0">' +
        '<tr><td>Flights (' + people + ' <ion-icon name="close"></ion-icon> ' + dest.flight + ' &euro;)</td><td class="text-right">' + flights + ' &euro;</td></tr>' +
        '<tr><td>Stay + food (' + people + ' <ion-icon name="close"></ion-icon> ' + days + ' days <ion-icon name="close"></ion-icon> ' + dest.perDay + ' &euro;)</td><td class="text-right">' + stay + ' €</td></tr>' +
        '<tr><td>Per person</td><td class="text-right">' + (total / people) + ' &euro;</td></tr>' +
        '<tr class="font-weight-bold"><td>Total</td><td class="text-right">' + total + ' &euro;</td></tr>' +
        '</table>';
}

document.getElementById("days").oninput = calculate;
document.getElementById("ppl").oninput = calculate;

showPicker();
calculate();