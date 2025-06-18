// Window Manager Object - Centralized window management system
const WindowManager = {
  windows: [],
  
  initialize: function() {
    // Get all windows
    this.windows = document.querySelectorAll('.about-me-window, .projects-window, .learning-outcomes-window, .full-about-me-window, .logo-iterations-window, .interview-details-window, .content-strategy-window, .research-details-window, .wireframe-details-window, .contact-window');
    
    // Set up close buttons for all windows - use event delegation
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('window-close')) {
        e.stopPropagation();
        e.preventDefault();
        const windowElement = e.target.closest(
          '.about-me-window, .projects-window, .learning-outcomes-window, .full-about-me-window, .contact-window, ' +
          '.logo-iterations-window, .interview-details-window, .content-strategy-window, ' + 
          '.research-details-window, .wireframe-details-window'
        );
        
        if (windowElement) {
          console.log('Closing window via WindowManager:', windowElement.className);
          this.closeWindow(windowElement);
        }
      }
    }, true); // Use capturing phase for earliest processing
    
    // Prevent event propagation on window headers to avoid conflicts
    document.addEventListener('mousedown', (e) => {
      if (e.target.closest('.window-header')) {
        // Allow dragging but ensure close buttons work
        const closeBtn = e.target.closest('.window-close');
        if (closeBtn) {
          e.stopImmediatePropagation();
        }
      }
    }, true);
    
    // Set up click handlers to bring windows to front
    this.windows.forEach(window => {
      window.addEventListener('mousedown', (e) => {
        // Don't change active window if clicking close button
        if (!e.target.classList.contains('window-close')) {
          this.setActiveWindow(window);
        }
      });
      
      // Make windows draggable
      this.makeDraggable(window);
    });
  },
  
  openWindow: function(windowElement, fromNavbar = false) {
    windowElement.style.display = 'block';
    STATE.openWindowsCount++;
    console.log("WindowManager: Opened window, count:", STATE.openWindowsCount);
    
    if (fromNavbar) {
      ELEMENTS.blurOverlay.style.display = 'block';
    }
    
    // Set the opened window as active
    windowElement.style.opacity = "1";
    windowElement.style.filter = "none";
    this.setActiveWindow(windowElement);
  },
  
  closeWindow: function(windowElement) {
    windowElement.style.display = 'none';
    windowElement.classList.remove('window-active', 'window-inactive');
    STATE.openWindowsCount--;
    console.log("WindowManager: Closed window, count:", STATE.openWindowsCount);
    
    // Find visible windows
    const visibleWindows = Array.from(this.windows).filter(win => 
      win.style.display !== 'none' && win !== windowElement
    );
    
    // Check if overlay should be hidden
    const aboutMeWindow = document.querySelector('.about-me-window');
    const isOnlyAboutMeOpen = visibleWindows.length === 1 && visibleWindows[0] === aboutMeWindow;
    
    if (STATE.openWindowsCount <= 1 || isOnlyAboutMeOpen) {
      ELEMENTS.blurOverlay.style.display = 'none';
      
      if (visibleWindows.length > 0) {
        visibleWindows[0].classList.remove('window-inactive');
        visibleWindows[0].classList.add('window-active');
        visibleWindows[0].style.zIndex = "3500";
      }
    } else {
      if (visibleWindows.length > 0) {
        this.setActiveWindow(visibleWindows[visibleWindows.length - 1]);
      }
    }
  },
  
  setActiveWindow: function(activeWindow) {
    // Set all windows to inactive
    this.windows.forEach(window => {
      window.classList.remove('window-active');
      window.classList.add('window-inactive');
      window.style.zIndex = "3000";
    });
    
    // Set the active window
    activeWindow.classList.remove('window-inactive');
    activeWindow.classList.add('window-active');
    activeWindow.style.zIndex = "3500";
  },
  
  makeDraggable: function(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    const header = element.querySelector('.window-header');
    if (header) {
      header.onmousedown = (e) => {
        e = e || window.event;
        
        // Don't start dragging if clicking the close button
        if (e.target.classList.contains('window-close')) {
          return;
        }
        
        e.preventDefault();
        
        this.setActiveWindow(element);
        
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      };
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
};