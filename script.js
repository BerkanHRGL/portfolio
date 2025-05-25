const password = "********";

const bootScreen = document.getElementById("boot-screen");
const loginScreen = document.getElementById("login-screen");
const mainContent = document.getElementById("main-content");
const passwordDisplay = document.getElementById("password-display");
const headerContainer = document.getElementById("header-container");
const infoSections = document.querySelectorAll(".info-section");
const enterPrompt = document.querySelector(".enter-prompt");
const blurOverlay = document.querySelector(".blur-overlay");
const aboutWindow = document.querySelector('.about-me-window');
const projectsWindow = document.querySelector('.projects-window');

loginScreen.style.display = "none";
mainContent.style.display = "none";

let openWindowsCount = 0;

const typeSound = new Howl({
  src: ['sounds/typing-sound.mp3'],
  volume: 0.3,
  preload: true
});

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

function goToLoginScreen() {
  bootScreen.style.display = "none";
  loginScreen.style.display = "flex";
  setTimeout(typePassword, 500);
}

function goToMainContent() {
  typeSound.stop();
  loginScreen.style.display = "none";
  mainContent.style.display = "block";
  
  aboutWindow.style.display = "block";
  openWindowsCount = 1;
  
  setActiveWindow(aboutWindow);
  
  blurOverlay.style.display = 'none';
}

async function typePassword() {
  passwordDisplay.textContent = "";
  for (let i = 0; i < password.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 250));
    typeSound.play();
    passwordDisplay.textContent += "*";
  }
  typeSound.stop();
}

function setActiveWindow(activeWindow) {
  const windows = document.querySelectorAll('.about-me-window, .projects-window, .full-about-me-window');
  
  windows.forEach(window => {
    window.classList.remove('window-active');
    window.classList.add('window-inactive');
  });
  
  activeWindow.classList.remove('window-inactive');
  activeWindow.classList.add('window-active');
}

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  const header = element.querySelector('.window-header');
  if (header) {
    header.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    
    setActiveWindow(element);
    
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function openWindow(windowElement, fromNavbar = false) {
  windowElement.style.display = 'block';
  openWindowsCount++;
  console.log("Opened window, count:", openWindowsCount);
  
  if (fromNavbar) {
    blurOverlay.style.display = 'block';
  }
  
  setActiveWindow(windowElement);
}

function closeWindow(windowElement) {
  windowElement.style.display = 'none';
  openWindowsCount--;
  console.log("Closed window, count:", openWindowsCount);
  
  if (openWindowsCount <= 1) {
    blurOverlay.style.display = 'none';
    
    if (aboutWindow.style.display !== 'none') {
      aboutWindow.classList.remove('window-inactive');
      aboutWindow.classList.add('window-active');
    }
  }
}

function handleCloseButton(e) {
  e.stopPropagation();
  
  const window = e.target.closest('.about-me-window, .projects-window, .full-about-me-window');
  if (window) {
    console.log("Closing window", window.className);
    closeWindow(window);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");
  
  startBootSequence();
  
  const confirmButton = document.getElementById('confirm-button');
  const navIcons = document.querySelectorAll('.navbar-icon');
  const moreAboutButton = document.querySelector('.about-button');
  const menuItems = document.querySelectorAll('.menu-item');
  const fullAboutWindow = document.querySelector('.full-about-me-window');
  
  if (aboutWindow) makeDraggable(aboutWindow);
  
  document.querySelectorAll('.about-me-window, .projects-window, .full-about-me-window').forEach(window => {
    window.addEventListener('mousedown', () => {
      setActiveWindow(window);
    });
  });
  
  if (confirmButton) {
    confirmButton.addEventListener('click', goToMainContent);
  }
  
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('window-close')) {
      handleCloseButton(e);
    }
  }, true);
  
  if (moreAboutButton) {
    moreAboutButton.addEventListener('click', () => {
      alert('Hier komt meer informatie over jou!');
    });
  }
  
  navIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      const sections = ['projects', 'learning-outcomes', 'about-me', 'contact'];
      const clickedSection = sections[index];
      
      console.log(`Navigatie naar: ${clickedSection}`);
      
      switch(clickedSection) {
        case 'projects':
          openWindow(projectsWindow, true);
          break;
        case 'learning-outcomes':
          break;
        case 'about-me':
          const fullAboutWindow = document.querySelector('.full-about-me-window');
          if (fullAboutWindow) {
            openWindow(fullAboutWindow, true);
          }
          break;
        case 'contact':
          break;
      }
    });
  });
  
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
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