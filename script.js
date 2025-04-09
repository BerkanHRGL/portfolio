// Password that will be typed automatically
const password = "********";

// Main elements
const bootScreen = document.getElementById("boot-screen");
const loginScreen = document.getElementById("login-screen");
const mainContent = document.getElementById("main-content");
const passwordDisplay = document.getElementById("password-display");
const headerContainer = document.getElementById("header-container");
const infoSections = document.querySelectorAll(".info-section");
const enterPrompt = document.querySelector(".enter-prompt");

// Set initial states
loginScreen.style.display = "none";
mainContent.style.display = "none";

// Create typing sound
const typeSound = new Howl({
  src: ['sounds/typing-sound.mp3'],
  volume: 0.3,
  preload: true
});

// Control sequential appearance of boot screen elements
function startBootSequence() {
  setTimeout(() => {
    headerContainer.classList.add('visible');
    setTimeout(() => {
      infoSections[0].classList.add('visible');
      setTimeout(() => {
        infoSections[1].classList.add('visible');
        setTimeout(() => {
          enterPrompt.classList.add('visible');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 500);
}

// Handle navigation between screens
function goToLoginScreen() {
  bootScreen.style.display = "none";
  loginScreen.style.display = "flex";
  setTimeout(typePassword, 500);
}

function goToMainContent() {
  typeSound.stop();
  loginScreen.style.display = "none";
  mainContent.style.display = "block";
}

// Type password with sound effect
async function typePassword() {
  passwordDisplay.textContent = "";
  
  for (let i = 0; i < password.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 250));
    typeSound.play();
    passwordDisplay.textContent += "*";
  }
  
  typeSound.stop();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  startBootSequence();
  
  // Add confirm button functionality
  const confirmButton = document.getElementById('confirm-button');
  if (confirmButton) {
    confirmButton.addEventListener('click', goToMainContent);
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (loginScreen.style.display === 'none' && mainContent.style.display === 'none') {
      goToLoginScreen();
    } else if (loginScreen.style.display !== 'none') {
      goToMainContent();
    }
  }
});