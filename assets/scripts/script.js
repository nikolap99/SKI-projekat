function removeAd() {
    document.getElementById('ad').style.display = 'none';
}

const umotvorineArr = [
    'Bolje vrabac u ruci, nego golub na grani.',
    'Ko voli da laže, i samom sebi veruje.',
    'Gvožđe se kuje dok je vruće.',
    ' Ko drugome jamu kopa, sam u nju upada.',
    'U laži su kratke noge.'
];
let umotvorineBr = 0;
function umotvorine() {
    document.getElementById('umotvorine-text').innerHTML =
        umotvorineArr[umotvorineBr];
    umotvorineBr < 4 ? umotvorineBr++ : (umotvorineBr = 0);
    setTimeout(() => {
        umotvorine();
    }, 10000);
}

function galerija(element) {
    Object.values(document.getElementsByClassName('selected-image')).map(
        el => (el.className = '')
    );
    element.className = 'selected-image';
    document.getElementById('choosen-image').src = element.src;
}

let hranaArr = [];
function izaberiHranu(hrana) {
    if (!hranaArr.includes(hrana)) {
        document.getElementById('korpa').innerHTML += `
        <div class="korpa-item"><img src="assets/images/naruci/${hrana}.jpg"></div>
    `;
    }
    hranaArr.push(hrana);
    if (hranaArr.length != 0) {
        document.getElementById('isprazni-korpu').style.display = 'block';
        document.getElementById('plati').style.display = 'block';
    } else {
        document.getElementById('isprazni-korpu').style.display = 'none';
        document.getElementById('plati').style.display = 'none';
    }
}

function isprazniKorpu() {
    hranaArr = [];
    document.getElementById('korpa').innerHTML = `
        <h1>Korpa:</h1>
        <div id="isprazni-korpu" onclick="isprazniKorpu()">Isprazni korpu</div>
    `;
}

function naruciHranu() {
    if (!isFilled()) {
        alert('Popuni sva polja!');
    }
    if (proveri()) {
        alert(`Uspesno ste narucili: ${hranaArr.map(hrana => hrana)}`);
        isprazniKorpu();
        document.getElementById('plati').style.display = 'none';
    } else {
        alert('Email nije validan!');
    }
}

function proveri() {
    const element = document.getElementById('email-polje');
    const val = element.value;
    const firstPart = element.value.split('@')[0] || '';
    const secondPart = element.value.split('@')[1] || '';
    const secondPartCheck = secondPart.split('.') || '';
    let check;
    if (
        !firstPart ||
        !secondPart ||
        secondPartCheck[1] == undefined ||
        secondPartCheck[1].length == 0
    ) {
        element.style.border = '2px solid red';
        check = false;
    } else {
        element.style.border = '';
        check = true;
    }
    return check;
}

function isFilled() {
    const poljaArr = [
        document.getElementById('ime-polje'),
        document.getElementById('prezime-polje'),
        document.getElementById('adresa-polje'),
        document.getElementById('email-polje')
    ];

    let isEveryFilled = true;

    for (let i = 0; i < poljaArr.length; i++) {
        if (!poljaArr[i].value) {
            isEveryFilled = false;
            poljaArr[i].style.border = '2px solid red';
            console.log(poljaArr[i]);
        } else {
            poljaArr[i].style.border = '';
        }
    }
    return isEveryFilled;
}

/* Lavirint */
function loadNumbers() {
    // Random brojevi od 1 do 16
    let randomArr = [];
    for (let i = 0; i < 16; i++) {
        randomArr.push(generateRandom(randomArr));
    }

    // Generisi elemente
    document.getElementById('brojevi-container').innerHTML = ``;

    for (let i = 0; i < 16; i++) {
        document.getElementById(
            'brojevi-container'
        ).innerHTML += `<div onclick="proveriBroj(id)" id=${randomArr[i]} class="broj-polje">${randomArr[i]}</div>`;
    }

    // Zapocni tajmer
    brojeviTimer();
}

function generateRandom(arr) {
    let rand = Math.floor(Math.random() * 16 + 1);
    while (arr.includes(rand)) {
        rand = Math.floor(Math.random() * 16 + 1);
    }
    return rand;
}

let rastuciNiz = [];
function proveriBroj(id) {
    if (rastuciNiz.length == 0) {
        if (id == 1) {
            rastuciNiz.push(id);
            document.getElementById(id).style.background = '#78e08f';
        } else {
            alert('Greska!');
        }
    } else {
        if (parseInt(rastuciNiz[rastuciNiz.length - 1]) + 1 == id) {
            rastuciNiz.push(id);
            document.getElementById(id).style.background = '#78e08f';
        } else {
            alert('Greska!');
        }
    }
    if (parseInt(rastuciNiz[rastuciNiz.length - 1]) == 16) {
        alert('Svaka cast!');
        document.getElementById('brojevi-reset').style.display = 'block';
    }
    console.log(rastuciNiz);
}

function brojeviTimer() {
    let i = 15;
    document.getElementById('brojevi-timer').innerHTML = i;
    let timer = setInterval(() => {
        i--;
        if (i < 0 && rastuciNiz.length != 16) {
            alert('Nisi uspeo!');
            clearInterval(timer);
            document.getElementById('brojevi-reset').style.display = 'block';
            return;
        } else if (rastuciNiz.length == 16) {
            clearInterval(timer);
            return;
        }
        document.getElementById('brojevi-timer').innerHTML = i;
    }, 1000);
}

function pokreniPonovo() {
    window.location.href = '';
}
