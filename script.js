// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

function dodgeNoBtn() {
    const distance = Math.min(window.innerWidth, window.innerHeight) * 0.25;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

noBtn.addEventListener("mouseover", dodgeNoBtn);

// On touch devices there's no "hover before click", the finger lands
// straight on the button. So instead we watch the finger as it moves
// across the screen and make the button flee as soon as it gets close,
// mimicking the mouseover dodge.
let lastDodgeAt = 0;

function isFingerNearNoBtn(x, y) {
    const rect = noBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const proximity = Math.max(rect.width, rect.height);

    return Math.hypot(x - centerX, y - centerY) < proximity;
}

document.addEventListener(
    "touchmove",
    (e) => {
        const touch = e.touches[0];
        if (!touch) return;

        const now = Date.now();
        if (now - lastDodgeAt < 350) return;

        if (isFingerNearNoBtn(touch.clientX, touch.clientY)) {
            lastDodgeAt = now;
            dodgeNoBtn();
        }
    },
    { passive: true }
);

// Fallback for a direct tap that lands on it before touchmove ever fires
noBtn.addEventListener(
    "touchstart",
    (e) => {
        e.preventDefault();
        dodgeNoBtn();
    },
    { passive: false }
);

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
