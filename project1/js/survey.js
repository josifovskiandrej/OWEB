const form = document.getElementById("sf");
const rate = document.getElementById("rate");

rate.oninput = function() {
    document.getElementById("rv").textContent = rate.value;
};

function showAlert(message, type = "info") {
    let alertBox = document.getElementById("surveyAlert");
    let alertMsg = document.getElementById("alertMessage");

    alertBox.className = "alert alert-" + type + " alert-dismissible fade show";
    alertMsg.textContent = message;
    alertBox.classList.remove("d-none");

    setTimeout(function() {
        if (!alertBox.classList.contains("d-none")) {
            $(alertBox).alert('close');
        }
    }, 4000);
}

form.onsubmit = function(event) {
    event.preventDefault();

    let sfname = document.getElementById("sfname");
    let slname = document.getElementById("slname");
    let email = document.getElementById("se");
    let freq = document.getElementById("freq");
    let st = document.getElementById("st");
    let navChecked = form.querySelector("input[name=navigation]:checked");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let fieldsToValidate = [{
            el: sfname,
            isValid: val => val.trim().length >= 2
        },
        {
            el: slname,
            isValid: val => val.trim().length >= 2
        },
        {
            el: email,
            isValid: val => emailPattern.test(val.trim())
        },
        {
            el: freq,
            isValid: val => val !== ""
        }
    ];

    let isValid = true;

    for (let i = 0; i < fieldsToValidate.length; i++) {
        let field = fieldsToValidate[i];
        let passed = field.isValid(field.el.value);

        field.el.classList.toggle("is-invalid", !passed);
        if (!passed) {
            isValid = false;
        }
    }

    if (!isValid) {
        return;
    }

    let boxes = form.querySelectorAll("input[type=checkbox]");
    let useful = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            useful.push(boxes[i].value);
        }
    }

    let answers = JSON.parse(localStorage.getItem("aeroSurvey")) || [];

    answers.push({
        firstName: sfname.value,
        lastName: slname.value,
        email: email.value,
        frequency: freq.value,
        navigation: navChecked ? navChecked.value : "",
        rating: Number(rate.value),
        useful: useful,
        comment: st.value
    });
    localStorage.setItem("aeroSurvey", JSON.stringify(answers));

    form.reset();

    for (let i = 0; i < fieldsToValidate.length; i++) {
        fieldsToValidate[i].el.classList.remove("is-invalid");
    }

    document.getElementById("rv").textContent = "3";
    document.getElementById("thanks").classList.remove("d-none");

    showResults();
};

function deleteResponse(index) {
    let answers = JSON.parse(localStorage.getItem("aeroSurvey"));
    if (answers != null) {
        answers.splice(index, 1);
        localStorage.setItem("aeroSurvey", JSON.stringify(answers));
        showAlert("Response deleted.", "warning");
        showResults();
    }
}

function showResults() {
    let answers = JSON.parse(localStorage.getItem("aeroSurvey"));
    let stats = document.getElementById("stats");

    if (answers == null || answers.length == 0) {
        stats.innerHTML = '<p class="text-muted mb-0">No responses yet.</p>';
        return;
    }

    let sum = 0;
    for (let i = 0; i < answers.length; i++) {
        sum = sum + answers[i].rating;
    }

    let rawAvg = Number((sum / answers.length).toFixed(1));
    let average = Number.isInteger(rawAvg) ? rawAvg : rawAvg.toFixed(1);

    let html = '<p class="mb-2">Responses: <b>' + answers.length + '</b> · Average rating: <b>' + average + '/5</b></p><hr class="my-3">';

    for (let i = 0; i < answers.length; i++) {
        let ans = answers[i];
        html += '<div class="card border-0 bg-light p-3 mb-3">' +
            '<div class="d-flex justify-content-between align-items-center mb-1">' +
            '<strong>' + ans.firstName + ' ' + ans.lastName + '</strong>' +
            '<div>' +
            '<span class="badge badge-pill px-3 py-1 survey-badge-rating">' + ans.rating + ' / 5</span>' +
            '<button class="btn btn-sm rounded-pill px-3 ml-2 btn-delete-dest" onclick="deleteResponse(' + i + ')">Delete</button>' +
            '</div>' +
            '</div>' +
            '<p class="small text-muted mb-1">Travel: ' + ans.frequency + ' · Navigation: ' + (ans.navigation || 'N/A') + '</p>';

        if (ans.comment) {
            html += '<p class="small mb-0 font-italic text-secondary">"' + ans.comment + '"</p>';
        }
        html += '</div>';
    }

    stats.innerHTML = html;
}

showResults();