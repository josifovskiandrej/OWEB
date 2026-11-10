function highlightActiveNav() {
    let currentPath = window.location.pathname.split("/").pop() || "index.html";
    let navLinks = document.querySelectorAll(".aero-nav .navbar-nav .nav-link");

    for (let i = 0; i < navLinks.length; i++) {
        let href = navLinks[i].getAttribute("href");
        if (href) {
            let cleanHref = href.split("/").pop();
            if (cleanHref === currentPath) {
                navLinks[i].classList.add("active-page");
            }
        }
    }
}

highlightActiveNav();