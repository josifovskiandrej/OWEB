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
    '<div id="loginError" class="text-danger small mb-2 d-none"></div>' +
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

loginButton.onclick = function() {
    if (localStorage.getItem("aeroUser") != null) {
        localStorage.removeItem("aeroUser");
        showLoginState();
    } else {
        document.getElementById("loginError").classList.add("d-none");
        document.getElementById("loginPass").classList.remove("is-invalid");
        $("#loginModal").modal("show");
    }
};

document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault();

    let getVal = (id) => document.getElementById(id).value.trim().toLowerCase();

    let username = getVal("loginName");
    let password = getVal("loginPass");
    let errorDiv = document.getElementById("loginError");
    let reversedUser = username.split("").reverse().join("");

    let isSimilar = password === username ||
        password === reversedUser ||
        password.includes(username) ||
        username.includes(password);

    if (isSimilar) {
        errorDiv.textContent = "Password cannot be the same as or a variation of your username.";
        errorDiv.classList.remove("d-none");
        passwordInput.classList.add("is-invalid");
        return;
    }

    errorDiv.classList.add("d-none");
    passwordInput.classList.remove("is-invalid");

    localStorage.setItem("aeroUser", usernameInput.value.trim());
    document.getElementById("loginForm").reset();
    $("#loginModal").modal("hide");
    showLoginState();
};

showLoginState();