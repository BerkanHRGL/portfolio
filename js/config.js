// Configuration and constants
const CONFIG = {
  password: "********",
  sounds: {
    typing: {
      src: ['sounds/typing-sound.mp3'],
      volume: 0.3,
      preload: true
    }
  },
  animation: {
    bootSequenceDelay: 500,
    infoSectionDelay: 1000,
    passwordTypingDelay: 250
  }
};

// DOM element references
const ELEMENTS = {
  bootScreen: null,
  loginScreen: null,
  mainContent: null,
  passwordDisplay: null,
  headerContainer: null,
  infoSections: null,
  enterPrompt: null,
  blurOverlay: null,
  imagePopup: null,
  popupImage: null,
  closePopup: null,
  confirmButton: null,
  navIcons: null
};

// Initialize DOM references
function initializeElements() {
  ELEMENTS.bootScreen = document.getElementById("boot-screen");
  ELEMENTS.loginScreen = document.getElementById("login-screen");
  ELEMENTS.mainContent = document.getElementById("main-content");
  ELEMENTS.passwordDisplay = document.getElementById("password-display");
  ELEMENTS.headerContainer = document.getElementById("header-container");
  ELEMENTS.infoSections = document.querySelectorAll(".info-section");
  ELEMENTS.enterPrompt = document.querySelector(".enter-prompt");
  ELEMENTS.blurOverlay = document.querySelector(".blur-overlay");
  ELEMENTS.imagePopup = document.getElementById('imagePopup');
  ELEMENTS.popupImage = document.getElementById('popupImage');
  ELEMENTS.closePopup = document.getElementById('closePopup');
  ELEMENTS.confirmButton = document.getElementById('confirm-button');
  ELEMENTS.navIcons = document.querySelectorAll('.navbar-icon');
}

// Global state
const STATE = {
  openWindowsCount: 0,
  typeSound: null
};