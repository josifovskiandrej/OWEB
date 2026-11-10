const container = document.getElementById("popular");

for (let i = 0; i < popularDestinations.length; i++) {
    let d = popularDestinations[i];

    let colClass = "col-md-4";
    if (i < 2) {
        colClass = "col-md-6";
    }

    container.innerHTML += '<div class="' + colClass + ' mb-4">' +
        '<div class="card dest-card bg-dark text-white border-0">' +
        '<img class="card-img" src="' + d.img + '" alt="' + d.name + '">' +
        '<div class="card-img-overlay">' +
        '<h4 class="card-title font-weight-bold">' + d.name + ', ' +
        '<small class="font-weight-normal ml-1">' + d.country + '</small></h4>' +
        '</div></div></div>';
}