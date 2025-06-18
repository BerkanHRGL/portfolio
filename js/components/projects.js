// Projects component functionality
const Projects = {
  init: function() {
    // Load default project (branding)
    this.loadProject('branding');
    
    // Set up project menu items
    const menuItems = document.querySelectorAll('.projects-window .menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const projectKey = item.getAttribute('data-project');
        this.loadProject(projectKey);
      });
    });
  },

loadProject: function(projectKey) {
  const project = projectData[projectKey];
  if (project) {
    const projectTypeElement = document.getElementById('project-type');
    const projectClientElement = document.getElementById('project-client');
    
    if (projectTypeElement) projectTypeElement.textContent = project.type;
    if (projectClientElement) projectClientElement.textContent = project.client;
    
    const projectContentElement = document.getElementById('project-content');
    if (projectContentElement) {
      projectContentElement.innerHTML = project.content;
      
      projectContentElement.scrollTop = 0;
      
      this.attachProjectEventListeners();
    }
  }
},

  attachProjectEventListeners: function() {
    // Interview details button (for branding project)
    const interviewDetailsButton = document.querySelector('.interview-details-button');
    if (interviewDetailsButton) {
      interviewDetailsButton.addEventListener('click', () => {
        const interviewDetailsWindow = document.querySelector('.interview-details-window');
        WindowManager.openWindow(interviewDetailsWindow, true);
      });
    }

    // Content strategy button (for branding project)
    const contentStrategyButton = document.querySelector('.content-strategy-button');
    if (contentStrategyButton) {
      contentStrategyButton.addEventListener('click', () => {
        const contentStrategyWindow = document.querySelector('.content-strategy-window');
        WindowManager.openWindow(contentStrategyWindow, true);
      });
    }

    // Logo iterations button (for branding project)
    const logoIterationsButton = document.querySelector('.logo-iterations-button');
    if (logoIterationsButton) {
      logoIterationsButton.addEventListener('click', () => {
        const logoIterationsWindow = document.querySelector('.logo-iterations-window');
        WindowManager.openWindow(logoIterationsWindow, true);
      });
    }

    // Research details button (for UX project)
    const researchDetailsButton = document.querySelector('.research-details-button');
    if (researchDetailsButton) {
      researchDetailsButton.addEventListener('click', () => {
        const researchDetailsWindow = document.querySelector('.research-details-window');
        WindowManager.openWindow(researchDetailsWindow, true);
      });
    }

    // Field research button (for Petchi project)
   const fieldResearchButton = document.querySelector('.research-details-button');
   if (fieldResearchButton) {
    fieldResearchButton.addEventListener('click', () => {
    window.open('pdfs/field-research-petchi.pdf', '_blank');
    });
}

    // Wireframe details button (for UX project)
    const wireframeDetailsButton = document.querySelector('.wireframe-details-button');
    if (wireframeDetailsButton) {
      wireframeDetailsButton.addEventListener('click', () => {
        const wireframeDetailsWindow = document.querySelector('.wireframe-details-window');
        WindowManager.openWindow(wireframeDetailsWindow, true);
      });
    }
    
    // Design process PDF button (for UX project)
    const designProcessButton = document.querySelector('.design-process-button');
    if (designProcessButton) {
      designProcessButton.addEventListener('click', () => {
        window.open('pdfs/design-process.pdf', '_blank');
      });
    }
    
    // User test button (for development project)
    const userTestButton = document.querySelector('.user-test-button');
    if (userTestButton) {
      userTestButton.addEventListener('click', () => {
        window.open('pdfs/usertest_blurredgame.pdf', '_blank');
      });
    }

    // Project plan button (for development project)
    const projectPlanButton = document.querySelector('.project-plan-button');
    if (projectPlanButton) {
      projectPlanButton.addEventListener('click', () => {
        window.open('pdfs/projectplan.pdf', '_blank');
      });
    }

    // GitLab repository button (for development project)
    const gitlabRepoButton = document.querySelector('.gitlab-repo-button');
    if (gitlabRepoButton) {
      gitlabRepoButton.addEventListener('click', () => {
        window.open('https://git.fhict.nl/I463567/cardandev', '_blank');
      });
    }
    
    // 5-second test button (for portfolio project)
    const fiveSecondTestButton = document.querySelector('.five-second-test-button');
    if (fiveSecondTestButton) {
      fiveSecondTestButton.addEventListener('click', () => {
        window.open('pdfs/5sectest.pdf', '_blank');
      });
    }
    
    // A/B test button (for portfolio project)
    const abTestButton = document.querySelector('.ab-test-button');
    if (abTestButton) {
      abTestButton.addEventListener('click', () => {
        window.open('pdfs/abtest.pdf', '_blank');
      });
    }

    const userTestingButton = document.querySelector('.user-testing-button');
    if (userTestingButton) {
      userTestingButton.addEventListener('click', () => {
    window.open('pdfs/petchi-user-test.pdf', '_blank');
    });
}

    // GitHub repository button (for portfolio project)
    const githubRepoButton = document.querySelector('.github-repo-button');
    if (githubRepoButton) {
      githubRepoButton.addEventListener('click', () => {
        window.open('https://github.com/BerkanHRGL/portfolio', '_blank');
      });
    }

        const githubpetchiRepoButton = document.querySelector('.github-repo-petchi-button');
    if (githubpetchiRepoButton) {
      githubpetchiRepoButton.addEventListener('click', () => {
        window.open('https://github.com/BerkanHRGL/pet-chi', '_blank');
      });
    }

    // Dashboard link button
    const dashboardLinkButton = document.querySelector('.dashboard-link-button');
    if (dashboardLinkButton) {
      dashboardLinkButton.addEventListener('click', () => {
        window.open('https://i554530.hera.fontysict.net', '_blank');
      });
    }

    // Version control button
    const versionControlButton = document.querySelector('.version-control-button');
    if (versionControlButton) {
      versionControlButton.addEventListener('click', () => {
        window.open('https://github.com/BerkanHRGL?tab=repositories', '_blank');
      });
    }

    const liveDemoButton = document.querySelector('.live-demo-button');
    if (liveDemoButton) {
      liveDemoButton.addEventListener('click', () => {
        window.open('https://i554530.hera.fontysict.net/pet-chi/', '_blank');
      });
    }
    
    // Image carousel for portfolio project
    this.initializeCarousel();
    this.initializePetchiCarousel();

  },

  initializeCarousel: function() {
    const carouselImage = document.getElementById('carousel-image');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const currentImageSpan = document.getElementById('current-image');
    const totalImagesSpan = document.getElementById('total-images');

    if (carouselImage && carouselPrev && carouselNext) {
      const carouselImages = [
        'imgs/design-process-1.png',
        'imgs/design-process-2.png',
        'imgs/design-process-3.png',
        'imgs/design-process-4.png',
        'imgs/design-process-5.png',
        'imgs/design-process-6.png'
      ];

      let currentIndex = 0;

      function updateCarousel() {
        carouselImage.src = carouselImages[currentIndex];
        carouselImage.alt = `Design Process Step ${currentIndex + 1}`;
        if (currentImageSpan) currentImageSpan.textContent = currentIndex + 1;
        if (totalImagesSpan) totalImagesSpan.textContent = carouselImages.length;
      }

      carouselNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        updateCarousel();
      });

      carouselPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
      });

      // Initialize
      updateCarousel();
    }
  },
  

  initializePetchiCarousel: function() {
    const carouselImage = document.getElementById('petchi-carousel-image');
    const carouselPrev = document.getElementById('petchi-carousel-prev');
    const carouselNext = document.getElementById('petchi-carousel-next');
    const currentImageSpan = document.getElementById('petchi-current-image');
    const totalImagesSpan = document.getElementById('petchi-total-images');

    if (carouselImage && carouselPrev && carouselNext) {
      const carouselImages = [
        'imgs/petchi-wireframe-1.png',
        'imgs/petchi-wireframe-2.png',
        'imgs/petchi-wireframe-3.png',
        'imgs/petchi-wireframe-4.png',
        'imgs/petchi-wireframe-5.png',
        'imgs/petchi-wireframe-6.png'
      ];

      let currentIndex = 0;

      function updateCarousel() {
        carouselImage.src = carouselImages[currentIndex];
        carouselImage.alt = `Petchi Wireframe Step ${currentIndex + 1}`;
        if (currentImageSpan) currentImageSpan.textContent = currentIndex + 1;
        if (totalImagesSpan) totalImagesSpan.textContent = carouselImages.length;
      }

      carouselNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        updateCarousel();
      });

      carouselPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
      });

      // Initialize
      updateCarousel();
    }
  }
  
};