const sights = {
    paris: ["Eiffel Tower", "Louvre", "Notre-Dame", "Arc de Triomphe", "Montmartre", "Versailles", "Musée d'Orsay", "Seine cruise", "Latin Quarter", "Champs-Élysées"],
    rome: ["Colosseum", "Roman Forum", "Pantheon", "Trevi Fountain", "Spanish Steps", "Vatican Museums", "Sistine Chapel", "Piazza Navona", "Trastevere", "Baths of Caracalla"],
    barcelona: ["Sagrada Família", "Park Güell", "Casa Batlló", "La Rambla", "Gothic Quarter", "Barceloneta Beach", "Montjuïc", "Camp Nou", "La Boqueria", "Casa Milà"],
    dubai: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Dubai Fountain", "Desert safari", "Old Dubai souks", "Dubai Marina", "Museum of the Future", "Jumeirah Beach", "Dubai Frame"],
    tokyo: ["Senso-ji", "Shibuya Crossing", "Meiji Shrine", "Tokyo Skytree", "Akihabara", "Shinjuku", "Tsukiji Outer Market", "Imperial Palace", "Ueno Park", "teamLab Planets"]
};

let current = null;
if (destinations.length > 0) {
    current = destinations[0];
}

function showBlog() {
    let tabs = document.getElementById("pills");
    let page = document.getElementById("post");

    if (current == null) {
        page.innerHTML = "<p>No destinations yet.</p>";
        return;
    }

    tabs.innerHTML = "";
    for (let i = 0; i < destinations.length; i++) {
        let dest = destinations[i];
        let active = "";
        if (dest.id == current.id) {
            active = "active";
        }
        tabs.innerHTML += '<li><a href="#" class="blog-tab ' + active + '" onclick="selectCity(\'' + dest.id + '\'); return false;">' +
            dest.name + ',' + '<small>' + dest.country + '</small></a></li>';
    }

    let guide = '<p class="text-muted">No guide for this destination yet.</p>';
    let places = sights[current.id];
    if (places != undefined) {
        guide = "<h4>10 things you must see in " + current.name + "</h4><ol>";
        for (let i = 0; i < places.length; i++) {
            guide += "<li>" + places[i] + "</li>";
        }
        guide += "</ol>";
    }

    let posts = "";
    for (let i = 0; i < current.posts.length; i++) {
        posts += '<div class="card border-0 shadow-sm mb-2"><div class="card-body">' +
            '<h5>' + current.posts[i].title + '</h5>' +
            '<p class="mb-1">' + current.posts[i].text + '</p>' +
            '<small class="text-muted">' + current.posts[i].date + '</small>' +
            '</div></div>';
    }
    if (posts == "") {
        posts = '<p class="text-muted">No posts yet. Write the first one!</p>';
    }

    page.innerHTML = '<div class="card border-0 shadow-sm"><div class="card-body">' +
        '<h3>A guide to ' + current.name + '</h3>' +
        '<p>' + current.description + '</p>' + guide +
        '</div></div>' +
        '<h4 class="mt-4">Visitor posts</h4>' + posts +
        '<form class="card card-body border-0 shadow-sm mt-3" onsubmit="addPost(event)">' +
        '<h5>Write a post about ' + current.name + '</h5>' +
        '<input class="form-control mb-2" id="postTitle" placeholder="Title" required>' +
        '<textarea class="form-control mb-2" id="postText" rows="3" placeholder="Your story or tips" required></textarea>' +
        '<button class="btn btn-accent align-self-start">Publish</button>' +
        '</form>';
}

function selectCity(id) {
    current = findDestination(id);
    showBlog();
}

function addPost(event) {
    event.preventDefault();

    let newPost = {
        title: document.getElementById("postTitle").value,
        text: document.getElementById("postText").value,
        date: new Date().toLocaleDateString()
    };
    current.posts.push(newPost);

    saveDestinations();
    showBlog();
}

showBlog();