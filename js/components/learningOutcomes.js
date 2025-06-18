// Learning Outcomes component functionality - FIXED VERSION
const LearningOutcomes = {
  init: function() {
    // Load default learning outcome
    this.loadLearningOutcome('interactive-media');
    
    // Set up learning outcome menu items
    const learningOutcomeItems = document.querySelectorAll('.learning-outcomes-window .menu-item');
    if (learningOutcomeItems) {
      learningOutcomeItems.forEach(item => {
        item.addEventListener('click', () => {
          learningOutcomeItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          
          const outcomeKey = item.getAttribute('data-outcome');
          this.loadLearningOutcome(outcomeKey);
        });
      });
    }

    // Set up evidence button functionality
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('evidence-button')) {
        e.preventDefault();
        const project = e.target.getAttribute('data-project');
        const section = e.target.getAttribute('data-section');
        
        console.log(`Evidence button clicked: project=${project}, section=${section}`);
        
        // Create URL with hash parameters for the new tab
        const currentUrl = window.location.href.split('#')[0]; // Get base URL without hash
        const newTabUrl = `${currentUrl}?project=${project}&section=${section}#projects`;
        
        // Open in new tab
        window.open(newTabUrl, '_blank');
      }
      
      // Handle feedback PDF button
      if (e.target.classList.contains('feedback-pdf-button')) {
        e.preventDefault();
        console.log("Feedback PDF button clicked!");
        window.open('pdfs/feedpulses.pdf', '_blank');
      }
      
      // Handle dashboard link button
      if (e.target.classList.contains('dashboard-link-button')) {
        e.preventDefault();
        console.log("Dashboard link button clicked!");
        window.open('https://i554530.hera.fontysict.net', '_blank');
      }
      
      // Handle version control button
      if (e.target.classList.contains('version-control-button')) {
        e.preventDefault();
        console.log("Version control button clicked!");
        window.open('https://github.com/BerkanHRGL?tab=repositories', '_blank');
      }
      
      // Handle user testing button
      if (e.target.classList.contains('user-testing-button')) {
        e.preventDefault();
        console.log("User testing button clicked!");
        window.open('pdfs/petchi-user-test.pdf', '_blank');
      }
      
      // Handle live demo button
      if (e.target.classList.contains('live-demo-button')) {
        e.preventDefault();
        console.log("Live demo button clicked!");
        window.open('https://i554530.hera.fontysict.net/pet-chi/', '_blank');
      }
    });

    // Check if page was opened with project parameters (for new tab functionality)
    this.checkUrlParameters();
  },

  loadLearningOutcome: function(outcomeKey) {
    const outcome = learningOutcomeData[outcomeKey];
    if (outcome) {
      const learningOutcomeTypeElement = document.getElementById('learning-outcome-type');
      const learningOutcomeContentElement = document.getElementById('learning-outcome-content');
      
      if (learningOutcomeTypeElement) learningOutcomeTypeElement.textContent = outcome.type;
      if (learningOutcomeContentElement) {
        learningOutcomeContentElement.innerHTML = outcome.content;
        
        learningOutcomeContentElement.scrollTop = 0;
        
        // Re-attach event listeners after content load
        this.attachAdditionalButtonListeners();
      }
    }
  },

  attachAdditionalButtonListeners: function() {
    // This function can be used for any additional button setup that needs to happen after content loads
    console.log('Additional button listeners attached');
  },

  // Method to handle URL parameters when page loads in new tab
  checkUrlParameters: function() {
    const urlParams = new URLSearchParams(window.location.search);
    const project = urlParams.get('project');
    const section = urlParams.get('section');
    const hash = window.location.hash;

    console.log("Checking URL params:", { project, section, hash });

    if (project && section && hash === '#projects') {
      console.log("URL parameters detected, opening project window");
      
      // Clean the URL to prevent repeated execution
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Wait for page to fully load, then open projects window and scroll
      setTimeout(() => {
        const projectsWindow = document.querySelector('.projects-window');
        if (projectsWindow) {
          console.log("Opening projects window for:", project);
          
          // Show projects window
          WindowManager.openWindow(projectsWindow, true);

          // Select the appropriate project tab
          let menuItem;
          switch(project) {
            case 'branding':
              menuItem = document.querySelector('.projects-window .menu-item[data-project="branding"]');
              break;
            case 'ux':
              menuItem = document.querySelector('.projects-window .menu-item[data-project="ux"]');
              break;
            case 'development':
              menuItem = document.querySelector('.projects-window .menu-item[data-project="development"]');
              break;
            case 'portfolio':
              menuItem = document.querySelector('.projects-window .menu-item[data-project="portfolio"]');
              break;
            case 'projectx':
              menuItem = document.querySelector('.projects-window .menu-item[data-project="projectx"]');
              break;
          }
          
          if (menuItem) {
            console.log("Found menu item, loading project:", project);
            
            // Deactivate all menu items and activate the target one
            document.querySelectorAll('.projects-window .menu-item').forEach(item => item.classList.remove('active'));
            menuItem.classList.add('active');
            
            const projectKey = menuItem.getAttribute('data-project');
            Projects.loadProject(projectKey);
            
            // Scroll to the target section after content loads
            setTimeout(() => {
              let targetSectionElement;
              const projectContentArea = projectsWindow.querySelector('#project-content');

              if (!projectContentArea) {
                console.error("Project content area not found for scrolling.");
                return;
              }

              console.log("Looking for section:", section, "in project:", project);

              // Find the target section
              if (project === 'branding' && section === 'survey') {
                targetSectionElement = projectContentArea.querySelector('.survey-container');
              } else if (project === 'ux' && section === 'presenting') {
                targetSectionElement = projectContentArea.querySelector('.presenting-section h2');
              } else if (project === 'ux' && section === 'user-test') {
                targetSectionElement = projectContentArea.querySelector('.wireframe-container') || projectContentArea.querySelector('.design-process-section');
              } else if (project === 'development' && section === 'prototype-testing') {
                const headings = Array.from(projectContentArea.querySelectorAll('h2'));
                targetSectionElement = headings.find(h => h.textContent.trim().toUpperCase() === "PROTOTYPE TESTING")?.closest('.stylescape-section');
              } else if (project === 'portfolio' && section === 'ab-test') {
                const headings = Array.from(projectContentArea.querySelectorAll('h2'));
                targetSectionElement = headings.find(h => h.textContent.trim().toUpperCase() === "A/B TEST")?.closest('.stylescape-section');
              } else if (project === 'projectx' && section === 'user-testing') {
                const headings = Array.from(projectContentArea.querySelectorAll('h2'));
                targetSectionElement = headings.find(h => h.textContent.trim().toUpperCase() === "USER TESTING")?.closest('.user-testing-section');
              } else if (project === 'projectx' && section === 'development') {
                const headings = Array.from(projectContentArea.querySelectorAll('h2'));
                targetSectionElement = headings.find(h => h.textContent.trim().toUpperCase() === "DEVELOPMENT")?.closest('.development-section');
              } else if (project === 'projectx' && section === 'character-design') {
                const headings = Array.from(projectContentArea.querySelectorAll('h3'));
                targetSectionElement = headings.find(h => h.textContent.trim().toUpperCase() === "CHARACTER DESIGN")?.closest('.character-design-container');
              } else if (project === 'projectx' && section === 'research') {
                const headings = Array.from(projectContentArea.querySelectorAll('h2'));
                targetSectionElement = headings.find(h => h.textContent.trim().toUpperCase() === "RESEARCH PROCESS")?.closest('.research-section');
              } else {
                // Generic fallback
                targetSectionElement = projectContentArea.querySelector(`.${section}-container, .${section}-section`);
              }
              
              if (targetSectionElement) {
                console.log('Scrolling to:', targetSectionElement);
                targetSectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                console.warn(`Target section '.${section}-container' or '.${section}-section' not found in project: ${projectKey}`);
              }
            }, 800); // Increased delay to ensure content is fully loaded
          } else {
            console.error("Menu item not found for project:", project);
          }
        } else {
          console.error("Projects window not found");
        }
      }, 500); // Wait for initialization
    }
  }
};