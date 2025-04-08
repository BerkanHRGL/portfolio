// Password that will be typed automatically
const password = "********";

// Main screen elements
const bootScreen = document.getElementById("boot-screen");
const loginScreen = document.getElementById("login-screen");
const mainContent = document.getElementById("main-content");
const passwordDisplay = document.getElementById("password-display");

// Elements for the loading effect
const headerContainer = document.getElementById("header-container");
const infoSections = document.querySelectorAll(".info-section");
const enterPrompt = document.querySelector(".enter-prompt");

// Set initial states, only boot screen visible at first
loginScreen.style.display = "none";
mainContent.style.display = "none";

// Controls the sequential appearance of boot screen elements
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

// Start the boot sequence when page is fully loaded
document.addEventListener('DOMContentLoaded', startBootSequence);

// Handle Enter key press to navigate between screens
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (loginScreen.style.display === 'none' && mainContent.style.display === 'none') {
      // Switch from boot screen to login screen
      bootScreen.style.display = "none";
      loginScreen.style.display = "flex";
      setTimeout(typePassword, 500);
    } else if (loginScreen.style.display !== 'none') {
      // Switch from login screen to main content
      loginScreen.style.display = "none";
      mainContent.style.display = "block";
    }
  }
});

// Creates typewriter effect for password field
async function typePassword() {
  for (let i = 0; i < password.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 150));
    passwordDisplay.textContent += "*";
  }
  
  // Automatically proceed to main content after password is typed
  setTimeout(() => {
    loginScreen.style.display = "none";
    mainContent.style.display = "block";
  }, 1000);
}