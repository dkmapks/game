// Główne zmienne
let energy = 50;
let knowledge = 0;
let money = 0;
let stress = 0;
let health = 100;
let careerLevel = 1;
let age = 18;
let expensesEnabled = true;

// Aktualizacja statystyk
function updateStats() {
    document.getElementById('energy').innerText = energy;
    document.getElementById('knowledge').innerText = knowledge;
    document.getElementById('money').innerText = money;
    document.getElementById('stress').innerText = stress;
    document.getElementById('health').innerText = health;
    document.getElementById('careerLevel').innerText = careerLevel;
    document.getElementById('age').innerText = age;
}

// Funkcje akcji
function study() {
    if (energy >= 10) {
        knowledge += 10;
        energy -= 10;
        stress += 5;
        ageUp();
        randomEvent();
        showMessage("Zdobyłeś nową wiedzę!");
    } else {
        showMessage("Za mało energii aby się uczyć!");
    }
    updateStats();
}

function work() {
    if (energy >= 10 && knowledge >= 20) {
        let earned = 20 + careerLevel * 10;
        money += earned;
        knowledge -= 5;
        energy -= 10;
        stress += 10;
        if (knowledge >= 100) {
            careerLevel++;
            knowledge = 20;
            showMessage("Awansowałeś w pracy!");
        }
        ageUp();
        randomEvent();
        showMessage("Zarobiłeś " + earned + " zł!");
    } else {
        showMessage("Za mało wiedzy lub energii!");
    }
    updateStats();
}

function rest() {
    energy += 30;
    if (energy > 100) energy = 100;
    stress -= 15;
    if (stress < 0) stress = 0;
    health += 10;
    if (health > 100) health = 100;
    ageUp();
    randomEvent();
    showMessage("Odpocząłeś!");
    updateStats();
}

function shop() {
    if (money >= 50) {
        money -= 50;
        energy += 20;
        health += 10;
        showMessage("Zakupiłeś zdrowe produkty!");
    } else {
        showMessage("Za mało pieniędzy na zakupy!");
    }
    updateStats();
}

function invest() {
    if (money >= 100) {
        money -= 100;
        let chance = Math.random();
        if (chance > 0.5) {
            money += 300;
            showMessage("Udała się inwestycja! +300 zł!");
        } else {
            showMessage("Nieudana inwestycja. Straciłeś 100 zł.");
        }
    } else {
        showMessage("Za mało pieniędzy na inwestycje!");
    }
    updateStats();
}

// Wiadomości
function showMessage(msg) {
    document.getElementById('message').innerText = msg;
}

// System starzenia
function ageUp() {
    age++;
    if (expensesEnabled) {
        money -= 10;
    }
    if (health <= 0) {
        showMessage("Zmarłeś z wyczerpania. Gra skończona.");
        disableButtons();
    }
}

// Losowe zdarzenia
function randomEvent() {
    let eventChance = Math.random();
    if (eventChance < 0.05) {
        health -= 20;
        showMessage("Zachorowałeś! Tracisz zdrowie.");
    } else if (eventChance < 0.10) {
        money += 100;
        showMessage("Znalazłeś 100 zł na ulicy!");
    }
}

// Wyłączenie wszystkich przycisków po przegranej
function disableButtons() {
    document.querySelectorAll('button').forEach(button => button.disabled = true);
}

// Mod Menu - aktywacja
document.addEventListener('keydown', function(event) {
    if (event.key === "7") {
        promptCode();
    }
});

function promptCode() {
    let code = prompt("Podaj kod:");
    if (code === "7432") {
        document.getElementById('modMenu').style.display = 'block';
        showMessage("Mod Menu Aktywowane!");
    } else {
        showMessage("Zły kod!");
    }
}

// Funkcje Mod Menu
function addEnergy(amount) {
    energy += amount;
    if (energy > 100) energy = 100;
    updateStats();
}

function addKnowledge(amount) {
    knowledge += amount;
    updateStats();
}

function addMoney(amount) {
    money += amount;
    updateStats();
}

function reduceStress(amount) {
    stress -= amount;
    if (stress < 0) stress = 0;
    updateStats();
}

function heal(amount) {
    health += amount;
    if (health > 100) health = 100;
    updateStats();
}

function instantCareer() {
    careerLevel++;
    updateStats();
}

function disableExpenses() {
    expensesEnabled = false;
    showMessage("Wydatki zostały wyłączone!");
}

function addSuperFriend() {
    energy += 20;
    stress -= 20;
    if (stress < 0) stress = 0;
    showMessage("Super przyjaciel pomógł Ci się zrelaksować!");
    updateStats();
}

function healAll() {
    health = 100;
    stress = 0;
    showMessage("Wszystkie choroby uleczone!");
    updateStats();
}

function jackpot() {
    money += 1000;
    showMessage("Jackpot! +1000 zł!");
    updateStats();
}

// Na starcie
updateStats();
