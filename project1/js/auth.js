const loginButton = document.querySelector(".aero-nav .btn-accent");
const hamburger = document.querySelector(".aero-nav .navbar-toggler");

document.body.insertAdjacentHTML("beforeend",
    '<div class="modal fade" id="loginModal" tabindex="-1">' +
    '<div class="modal-dialog modal-dialog-centered">' +
    '<form class="modal-content" id="loginForm">' +
    '<div class="modal-header border-0">' +
    '<h5 class="modal-title">Welcome back</h5>' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<p class="text-muted">Log in to access your account.</p>' +
    '<input class="form-control mb-2" id="loginName" placeholder="Username" required minlength="3">' +
    '<input class="form-control mb-2" id="loginPass" type="password" placeholder="Password" required minlength="4">' +
    '</div>' +
    '<div class="modal-footer border-0">' +
    '<button class="btn btn-accent btn-block rounded-pill">Log in</button>' +
    '</div></form></div></div>');

function showLoginState() {
    let user = localStorage.getItem("aeroUser");

    let oldGreeting = document.getElementById("greeting");
    if (oldGreeting != null) {
        oldGreeting.remove();
    }

    if (user != null) {
        let greeting = document.createElement("span");
        greeting.id = "greeting";
        greeting.textContent = "Hi, " + user;
        hamburger.parentNode.insertBefore(greeting, hamburger);
        loginButton.textContent = "Log out";
    } else {
        loginButton.textContent = "Log in";
    }
}

loginButton.onclick = function () {
    if (localStorage.getItem("aeroUser") != null) {
        localStorage.removeItem("aeroUser");
        showLoginState();
    } else {
        $("#loginModal").modal("show");
    }
};

document.getElementById("loginForm").onsubmit = function (event) {
    event.preventDefault();

    localStorage.setItem("aeroUser", document.getElementById("loginName").value.trim());
    document.getElementById("loginForm").reset();
    $("#loginModal").modal("hide");
    showLoginState();
};

showLoginState();