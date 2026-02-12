// ================= QUESTIONS =================

let questions = [
    {
        question: "Hum pehli baar kab mile the?",
        options: ["Std 4", "Std 5", "Std 6", "Yaad nahi"],
        answer: 1
    },
    {
        question: "Tera most memorable birthday gift kya tha?",
        options: ["Photo pillow", "Greeting card", "Chocolate", "None"],
        answer: 0
    },
    {
        question: "Prachi gadi pese kiske vajah se giri?",
        options: ["khud ke", "mohini ke", "patthar ke", "Yaad nahi"],
        answer: 1
    },
    {
        question: "Tere transformation ka secret kya tha? ",
        options: ["Gym membership", "Diet", "Dono", "Mummy ka magic tonic"],
        answer: 3
    },
    {
        question: "Group me sabko sabse zyada darr kis baat se lagta hai? ",
        options: ["Surprise test", "parents ka call", "mohini ke piche gadi pe baithna", "bhoot dekhna"],
        answer: 2
    }
];

// ================= VARIABLES =================

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 5;

// ================= HEARTS CONTROL =================

let heartInterval;

function createHearts() {
    const container = document.querySelector(".hearts");

    heartInterval = setInterval(() => {
        let heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (15 + Math.random() * 20) + "px";
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
    }, 500);
}

function stopHearts() {
    clearInterval(heartInterval);
    document.querySelector(".hearts").innerHTML = "";
}

// Hearts on start
createHearts();

// ================= GAME =================

function startGame() {
    stopHearts();

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.remove("hidden");

    currentQuestion = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, index) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });

    timeLeft = 5;
    document.getElementById("timer").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            showQuestion();
        }
    }, 1000);
}

function checkAnswer(selected) {
    clearInterval(timer);

    if (selected === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;
    showQuestion();
}

// ================= RESULT =================

function showResult() {
    document.getElementById("quizScreen").classList.add("hidden");

    if (score === questions.length) {
        document.getElementById("surpriseScreen").classList.remove("hidden");
        startSlideshow();
        typeMessage();
        launchConfetti();
        createHearts(); // hearts again

        // Play music only here
        let music = document.getElementById("bgMusic");
         music.currentTime = 0;
         music.play();
    } 
    else {
    document.getElementById("funnyScreen").classList.remove("hidden");

    // Stop birthday music if playing
    let music = document.getElementById("bgMusic");
    music.pause();
    music.currentTime = 0;

    // Play funny video with sound
    let vid = document.getElementById("funnyVideo");
    vid.muted = false;
    vid.currentTime = 0;
    vid.play();
}

}

function restartGame() {
    stopHearts();

    let music = document.getElementById("bgMusic");
    music.pause();
    music.currentTime = 0;

    document.getElementById("funnyScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");

    createHearts();

    let vid = document.getElementById("funnyVideo");
    vid.pause();
    vid.currentTime = 0;

    currentQuestion = 0;
    score = 0;
}


// ================= SLIDESHOW =================

let images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg",
    "images/photo11.jpg",
    "images/photo12.jpg",
    "images/photo13.jpg",
];

let index = 0;

function startSlideshow() {
    setInterval(() => {
        let img = document.getElementById("slide");
        img.style.opacity = 0;

        setTimeout(() => {
            index = (index + 1) % images.length;
            img.src = images[index];
            img.style.opacity = 1;
        }, 300);

    }, 2500);
}

// ================= TYPING MESSAGE =================

let messageText = "Happy Birthday to the strongest girl I know 💪\nRapid Fire bhi jeet liya, aur life me bhi har situation jeet leti hai tu.\nStrong, smart, thodi pagal… but definitely the bestest ❤️\nLucky to have you as my best friend, Mondi!";


function typeMessage() {
    let i = 0;
    let speed = 40;
    let element = document.getElementById("birthdayMessage");
    element.innerHTML = "";

    function typing() {
        if (i < messageText.length) {

            if (messageText.charAt(i) === "\n") {
                element.innerHTML += "<br>";
            } else {
                element.innerHTML += messageText.charAt(i);
            }

            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}


// ================= CONFETTI =================

function launchConfetti() {
    let duration = 3 * 1000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
