const form = document.getElementById("sf");
const rate = document.getElementById("rate");

rate.oninput = function () {
    document.getElementById("rv").textContent = rate.value;
};

form.onsubmit = function (event) {
    event.preventDefault();

    let boxes = form.querySelectorAll("input[type=checkbox]");
    let useful = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            useful.push(boxes[i].value);
        }
    }

    let answers = JSON.parse(localStorage.getItem("aeroSurvey"));
    if (answers == null) {
        answers = [];
    }
    answers.push({
        name: document.getElementById("sn").value,
        email: document.getElementById("se").value,
        rating: Number(rate.value),
        useful: useful,
        comment: document.getElementById("st").value
    });
    localStorage.setItem("aeroSurvey", JSON.stringify(answers));

    form.reset();
    document.getElementById("rv").textContent = "3";
    document.getElementById("thanks").classList.remove("d-none");
    showResults();
};

function showResults() {
    let answers = JSON.parse(localStorage.getItem("aeroSurvey"));
    let stats = document.getElementById("stats");

    if (answers == null || answers.length == 0) {
        stats.textContent = "No responses yet.";
        return;
    }

    let sum = 0;
    for (let i = 0; i < answers.length; i++) {
        sum = sum + answers[i].rating;
    }
    let average = (sum / answers.length).toFixed(1);

    stats.innerHTML = 'Responses: <b>' + answers.length + '</b> · Average rating: <b>' + average + '/5</b>';
}

showResults();