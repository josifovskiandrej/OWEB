const grid = document.getElementById("grid");
let city;

function showGrid() {
    grid.innerHTML = "";

    for (let i = 0; i < destinations.length; i++) {
        let dest = destinations[i];

        grid.innerHTML += '<div class="col-md-6 col-lg-4 mb-4">' +
            '<div class="card dest-card bg-dark text-white border-0" style="cursor:pointer" onclick="openCity(\'' + dest.id + '\')">' +
            '<img class="card-img" src="' + dest.images[0] + '" alt="">' +
            '<div class="card-img-overlay">' +
            '<h4 class="card-title">' + dest.name + '</h4>' +
            '<small><ion-icon name="thumbs-up"></ion-icon> ' + dest.likes + ' · <ion-icon name="thumbs-down"></ion-icon> ' + dest.dislikes + ' · <ion-icon name="chatbubble-ellipses"></ion-icon> ' + dest.comments.length + '</small>' +
            '</div></div></div>';
    }
}

function openCity(id) {
    city = findDestination(id);

    let slides = "";
    for (let i = 0; i < city.images.length; i++) {
        let active = "";
        if (i == 0) {
            active = "active";
        }
        slides += '<div class="carousel-item ' + active + '"><img class="d-block w-100" src="' + city.images[i] + '" alt=""></div>';
    }

    let arrows = "";
    if (city.images.length > 1) {
        arrows = '<a class="carousel-control-prev" href="#car" data-slide="prev"><span class="carousel-control-prev-icon"></span></a>' +
            '<a class="carousel-control-next" href="#car" data-slide="next"><span class="carousel-control-next-icon"></span></a>';
    }

    document.getElementById("mt").textContent = city.name + ", " + city.country;
    document.getElementById("mb").innerHTML = '<div id="car" class="carousel slide mb-3">' +
        '<div class="carousel-inner">' + slides + '</div>' + arrows + '</div>' +
        '<div id="reactions"></div>';

    showReactions();
    $("#m").modal("show");
}

function showReactions() {
    let comments = "";
    for (let i = city.comments.length - 1; i >= 0; i--) {
        comments += '<div class="comment"><small class="text-muted">' + city.comments[i].date + '</small>' +
            '<div>' + city.comments[i].text + '</div></div>';
    }
    if (comments == "") {
        comments = '<p class="text-muted">No comments yet.</p>';
    }

    document.getElementById("reactions").innerHTML =
        '<button class="btn btn-outline-success" onclick="addLike()"><ion-icon name="thumbs-up"></ion-icon> ' + city.likes + '</button> ' +
        '<button class="btn btn-outline-danger" onclick="addDislike()"><ion-icon name="thumbs-down"></ion-icon> ' + city.dislikes + '</button>' +
        '<h6 class="mt-3">Comments (' + city.comments.length + ')</h6>' +
        '<form class="mb-3" onsubmit="addComment(event)">' +
        '<textarea class="form-control mb-2" id="commentText" rows="2" placeholder="Write a comment..." required></textarea>' +
        '<button class="btn btn-accent btn-sm">Post</button>' +
        '</form>' + comments;
}

function addLike() {
    city.likes++;
    saveDestinations();
    showReactions();
}

function addDislike() {
    city.dislikes++;
    saveDestinations();
    showReactions();
}

function addComment(event) {
    event.preventDefault();

    let newComment = {
        text: document.getElementById("commentText").value,
        date: new Date().toLocaleString()
    };
    city.comments.push(newComment);

    saveDestinations();
    showReactions();
}

$("#m").on("hidden.bs.modal", showGrid);

showGrid();