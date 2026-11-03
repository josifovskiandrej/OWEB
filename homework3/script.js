const lapstotal = 10;
let curLap = 0;
let scar = false;
let scarNext = false;
const tires = {
    Soft: {
        offset: -0.8,
        wear: 0.10,
        life: 5
    },
    Hard: {
        offset: 0.6,
        wear: 0.03,
        life: 12
    }
}
const drivers = [{
        name: "Max Verstappen",
        team: "Red Bull Racing",
        speed: 95,
        skill: 94
    },
    {
        name: "Lando Norris",
        team: "McLaren",
        speed: 93,
        skill: 89
    },
    {
        name: "Oscar Piastri",
        team: "McLaren",
        speed: 91,
        skill: 88
    },
    {
        name: "Charles Leclerc",
        team: "Ferrari",
        speed: 92,
        skill: 86
    },
    {
        name: "Lewis Hamilton",
        team: "Ferrari",
        speed: 89,
        skill: 93
    },
    {
        name: "George Russell",
        team: "Mercedes",
        speed: 90,
        skill: 87
    },
    {
        name: "Kimi Antonelli",
        team: "Mercedes",
        speed: 87,
        skill: 80
    },
    {
        name: "Fernando Alonso",
        team: "Aston Martin",
        speed: 83,
        skill: 92
    },
    {
        name: "Carlos Sainz",
        team: "Williams",
        speed: 82,
        skill: 85
    },
    {
        name: "Alex Albon",
        team: "Williams",
        speed: 79,
        skill: 83
    }
]

function race() {
    curLap = 0;
    scar = false;
    scarNext = false;
    for (let i = 0; i < drivers.length; i++) {
        const d = drivers[i];
        d.tire = Math.random() < 0.5 ? "Soft" : "Hard";
        d.tireAge = 0;
        d.total = 0;
        d.lapTime = 0;
        d.out = false;
        d.status = "On grid";
        d.startStatus = "On grid";
        d.winner = false;
        d.pitLap = 3 + Math.floor(Math.random() * 5);
        d.pitted = false;
        d.basePace = 90 - d.speed * 0.06 - d.skill * 0.04
    };
}

function tirepen(d) {
    const t = tires[d.tire];
    let penalty = t.offset + t.wear * d.tireAge;
    if (d.tireAge > t.life) penalty += (d.tireAge - t.life) * 1.5;
    return penalty;
}

function calclap(d) {
    return d.basePace + tirepen(d) + (Math.random() - 0.5)
};

function format(s) {
    return Math.floor(s / 60) + ":" + (s - Math.floor(s / 60) * 60).toFixed(3).padStart(6, "0");
}

function updatetable() {
    const sorted = [...drivers].sort((a, b) => (a.out - b.out) || (a.total - b.total));
    let html = "";
    for (let i = 0; i < sorted.length; i++) {
        const d = sorted[i];
        html += `<tr class="${d.out ? "" : "p" + (i + 1)}">
        <td>${d.out ? "-" : i + 1}</td>
        <td class="driver">${d.name}</td>
        <td class="team">${d.team}</td>
        <td>${d.speed}</td>
        <td>${d.skill}</td>
        <td>${d.tire}</td>
        <td>${d.startStatus}</td>
        <td>${d.status}</td>
        <td class="time">${d.lapTime ? format(d.lapTime) : "-"}</td>
        <td class="time">${d.total ? format(d.total) : "-"}</td>
        </tr>`;
    }
    document.getElementById("race").innerHTML = html;
    document.getElementById("lap").textContent = `Lap ${curLap}/${lapstotal}` + (scar ? " - SAFETY CAR" : "");
}

function addEvent(text, type = "") {
    const tr = document.createElement("tr");
    if (type) tr.classList.add(type);
    tr.innerHTML = `<td>${curLap}</td><td>${text}</td>`;
    document.getElementById("events").prepend(tr);
}

function lap() {
    if (curLap >= lapstotal) return;
    curLap++;
    scar = scarNext || (curLap >= 2 && curLap <= 9 && Math.random() < 0.10);
    if (scar) addEvent(scarNext ? "Safety car deployed after the crash!" : "Safety car deployed (debris on track)", "safety-car");
    scarNext = false;
    for (let i = 0; i < drivers.length; i++) {
        const d = drivers[i];
        d.status = d.out ? "Out (DNF)" : (scar ? "Under safety car" : "Racing");
        if (d.out) continue;
        d.status = scar ? "Behind safety car" : "Racing";
        d.lapTime = scar ? 110 + Math.random() * 0.6 : calclap(d);
        d.tireAge++;
        if (!d.pitted && curLap === d.pitLap) {
            const old = d.tire;
            d.tire = old === "Soft" ? "Hard" : "Soft";
            d.tireAge = 0;
            d.pitted = true;
            d.lapTime += scar ? 9 : 20;
            d.status = `Pit stop: ${old} => ${d.tire}`;
            addEvent(`${d.name} pits (${old} => ${d.tire})${scar ? " under the safety car" : ""}`, "pit");
        }
        if (!scar && Math.random() < 0.10 * (1.2 - d.skill / 100)) {
            if (Math.random() < 0.25) {
                d.out = true;
                d.status = "Flew off - DNF";
                scarNext = Math.random() < 0.7;
                addEvent(`${d.name} flies off the track and is out!`, "crash");
            } else {
                const loss = 6 + Math.random() * 6;
                d.lapTime += loss;
                d.status = d.status === "Racing" ? `Spun out (+${loss.toFixed(1)}s)` : d.status + `, Spun out (+${loss.toFixed(1)}s)`;
                addEvent(`${d.name} spins out but rejoins the race`, "crash");
            }
        }
        if (d.out) continue;
        d.total += d.lapTime;
    }
    if (scar) {
        const active = drivers.filter(d => !d.out);
        if (active.length > 6 && Math.random() < 0.30) {
            const d = active[Math.floor(Math.random() * active.length)];
            d.out = true;
            d.status = "Exit under safety car - DNF";
            addEvent(`${d.name} retires into the pits under the safety car`, "crash");
        }
    }
    updatetable();
    if (curLap === lapstotal) winner();
}

function winner() {
    const w = [...drivers].filter(d => !d.out).sort((a, b) => a.total - b.total)[0];
    w.winner = true;
    w.status = "WINNER";
    document.getElementById("winner").textContent = `Winner: ${w.name} (${w.team})`;
    document.getElementById("next").disabled = true;
    addEvent(`${w.name} wins the race!`);
    updatetable();
}

function reset() {
    race();
    updatetable();
    document.getElementById("events").innerHTML = "";
    document.getElementById("winner").textContent = "";
    document.getElementById("next").disabled = false;
}

document.getElementById("next").onclick = lap;
document.getElementById("reset").onclick = reset;
race();
document.getElementById("next").disabled = true;