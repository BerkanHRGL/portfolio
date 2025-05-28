const password = "********";

// Initialize window elements
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
const logoIterationsWindow = document.querySelector('.logo-iterations-window');
const interviewDetailsWindow = document.querySelector('.interview-details-window');
const contentStrategyWindow = document.querySelector('.content-strategy-window');
const researchDetailsWindow = document.querySelector('.research-details-window');
const wireframeDetailsWindow = document.querySelector('.wireframe-details-window');
const learningOutcomesWindow = document.querySelector('.learning-outcomes-window');

// Image popup elements
const imagePopup = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');
const closePopup = document.getElementById('closePopup');

// Hide initial screens
loginScreen.style.display = "none";
mainContent.style.display = "none";

let openWindowsCount = 0;

// Sound setup
const typeSound = new Howl({
  src: ['sounds/typing-sound.mp3'],
  volume: 0.3,
  preload: true
});

// Window Manager Object - Centralized window management system
const WindowManager = {
  windows: [],
  
  initialize: function() {
    // Get all windows
    this.windows = document.querySelectorAll('.about-me-window, .projects-window, .learning-outcomes-window, .full-about-me-window, .logo-iterations-window, .interview-details-window, .content-strategy-window, .research-details-window, .wireframe-details-window');
    
    // Set up close buttons for all windows - use event delegation
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('window-close')) {
        e.stopPropagation();
        e.preventDefault();
        const windowElement = e.target.closest(
          '.about-me-window, .projects-window, .learning-outcomes-window, .full-about-me-window, ' +
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
    openWindowsCount++;
    console.log("WindowManager: Opened window, count:", openWindowsCount);
    
    if (fromNavbar) {
      blurOverlay.style.display = 'block';
    }
    
    // Set the opened window as active
    windowElement.style.opacity = "1";
    windowElement.style.filter = "none";
    this.setActiveWindow(windowElement);
  },
  
  closeWindow: function(windowElement) {
    windowElement.style.display = 'none';
    windowElement.classList.remove('window-active', 'window-inactive');
    openWindowsCount--;
    console.log("WindowManager: Closed window, count:", openWindowsCount);
    
    // Find visible windows
    const visibleWindows = Array.from(this.windows).filter(win => 
      win.style.display !== 'none' && win !== windowElement
    );
    
    // Check if overlay should be hidden
    const aboutMeWindow = document.querySelector('.about-me-window');
    const isOnlyAboutMeOpen = visibleWindows.length === 1 && visibleWindows[0] === aboutMeWindow;
    
    if (openWindowsCount <= 1 || isOnlyAboutMeOpen) {
      blurOverlay.style.display = 'none';
      
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

// Project data
const projectData = {
  branding: {
    type: "Branding",
    client: "Client: Boris Schmidt",
    content: `
      <h2>PROJECT OVERVIEW</h2>
      <p>In this project I had to create a complete visual look for a techno artist named Boris Schmidt. I worked with my team to make visual designs that matched his music style and personality. My goal was to build a unique and easy-to-remember visual brand that would represent Boris Schmidt well.</p>
      
      <div class="project-info-row">
        <div class="tools-section">
          <h2>TOOLS USED</h2>
          <ul>
            <li>Figma</li>
            <li>Adobe Illustrator</li>
            <li>Adobe Photoshop</li>
          </ul>
        </div>
        
        <div class="date-section">
          <h3>DATE</h3>
          <p>February 2025 - March 2025</p>
        </div>
      </div>

      <div class="research-section">
        <h2>RESEARCH PROCESS</h2>
        <p>I started by studying the techno music scene and Boris Schmidt's music style. I looked at what other techno artists were doing and created mood boards to gather ideas. I interviewed Boris to learn what he wanted for his brand, and also talked to a techno music fan to understand what the audience likes. Using what I learned from these interviews and creating a user persona, I designed visuals that truly represent Boris as an artist. My goal was to create a brand that both Boris and his fans would connect with.</p>
        
        <h3>INTERVIEW</h3>
        <p>I interviewed Sophie, a 20-year-old techno fan, to better understand the target audience. She listens to melodic and minimal techno, especially artists like Tale of Us and Mind Against. Sophie uses techno music to relax and create a certain mood. She prefers festivals with a relaxed atmosphere and pays attention to album covers when choosing music.</p>
        <p>The interview helped me understand that techno fans like Sophie want more than just hard beats - they want atmosphere, emotion, and beautiful visuals. This insight shaped how I designed Boris Schmidt's brand to appeal to this audience.</p>
        <button class="interview-details-button">VIEW FULL INTERVIEW</button>
        
        <h3>PERSONA</h3>
        <div class="persona-container">
          <div class="persona-image">
            <img src="imgs/persona_sophie_boris.png" alt="Sophie de Jong Persona" class="clickable-image">
          </div>
          <div class="persona-text">
            <p>Based on my interview with Sophie, I created this persona that represents the target audience for Boris Schmidt's brand. This persona helps me understand who I'm designing for and what they really want.</p>
            <p>This persona helps me make better design choices because I know exactly what the target audience wants. It shows me that I need to focus on beautiful visuals and make sure the brand works well on social media platforms.</p>
          </div>
        </div>

        <h3>SURVEY A/B TEST</h3>
        <div class="survey-container">
          <div class="survey-image">
            <img src="imgs/boris_poster.png" alt="A/B Test Survey Results" class="clickable-image">
          </div>
          <div class="survey-text">
            <p>I conducted an A/B test survey with 12 participants to test two different poster designs for Boris Schmidt. The survey helped me understand which design better communicates energy and mystery to the target audience.</p>
            <p>The results showed that Version 2 was preferred because it felt more mysterious and creative. People said Version 1 looked too direct and normal, while Version 2 created intrigue with its abstract design and hidden elements. This confirmed that the mysterious approach I chose for Boris Schmidt's brand appeals more to the target audience than straightforward designs.</p>
          </div>
        </div>
        
        <h3>CONTENT STRATEGY</h3>
        <p>I created this content strategy because it's important to present the brand in a consistent way. With a clear strategy, I know what tone, style, and type of content we should use to reach the right target audience. It helps me convey the message effectively and increase brand visibility.</p>
        <button class="content-strategy-button">VIEW FULL STRATEGY</button>
      </div>

      <div class="moodboard-section">
        <h2>MOODBOARD</h2>
        <div class="moodboard-container">
          <div class="moodboard-image">
            <img src="imgs/moodboard_boris.png" alt="Boris Schmidt Moodboard" class="clickable-image">
          </div>
          <div class="moodboard-text">
            <p>As a first step, we made a moodboard together. This helped us see what style and feeling we wanted for the brand. It gave us a clear direction and helped us check if Boris liked our ideas.</p>
            <p>I picked these images because they capture exactly what Boris wanted, a mysterious vibe with a strong connection to nature. The dark forest photos and abstract patterns create that mysterious feeling he was looking for. The nature images were important because Boris wanted to show his connection to the natural world, not just the club scene. The green lights and black-and-white visuals bring in the techno energy while keeping that mysterious atmosphere. For the typography, I chose bold, technical fonts that look both modern and industrial, matching the techno music style.</p>
          </div>
        </div>
      </div>

      <div class="stylescape-section">
        <h2>STYLE SCAPE</h2>
        
        <div class="stylescape-container">
          <div class="stylescape-image">
            <img src="imgs/stylescape_3.png" alt="Final Style Scape for Boris Schmidt" class="clickable-image">
          </div>
          <div class="stylescape-text">
            <p>This is the final style scape that shows the complete visual look for Boris Schmidt. It brings together all the parts we worked on - the dark forest look, bold fonts, and the mix between nature and techno music culture.</p>
            <p>The final design gives Boris exactly what he wanted: a brand that feels connected to nature and fits perfectly in the underground techno scene. The dark colors and strong geometric logo create the mysterious but friendly identity he was looking for.</p>
            <p>During the design work, I made different style scape versions to try out ideas and make the visual style better. Below are two important versions that helped create the final design:</p>
          </div>
        </div>

        <div class="iteration-images">
          <div class="iteration-item">
            <img src="imgs/stylescape_1.png" alt="Style Scape Iteration 1" class="clickable-image">
            <p class="iteration-caption">Iteration 1: Initial exploration of the visual direction</p>
          </div>
          <div class="iteration-item">
            <img src="imgs/stylescape_2.png" alt="Style Scape Iteration 2" class="clickable-image">
            <p class="iteration-caption">Iteration 2: Refined approach with stronger nature elements</p>
          </div>
        </div>
      </div>

      <div class="logo-section">
        <h2>LOGO DESIGN</h2>
        <div class="logo-container">
          <div class="final-logo">
            <img src="imgs/logo_boris_14.png" alt="Final Boris Schmidt Logo" class="clickable-image">
          </div>
          <div class="logo-text">
            <p>The final logo combines sound waves with geometric shapes to represent Boris's connection between techno music and nature. The sound wave pattern in the center shows the music element, while the organic flowing shapes around it represent the natural world he draws inspiration from.</p>
            <p>The logo works well in different sizes and can be used across all brand materials. The black and white version ensures it works in any situation, while the design captures both the technical and natural sides of Boris's identity.</p>
            <button class="logo-iterations-button">VIEW DESIGN PROCESS</button>
          </div>
        </div>
      </div>

      <div class="mockups-section">
        <h2>MOCKUPS</h2>
        
        <div class="mockups-images">
          <div class="mockup-item">
            <img src="imgs/mockup.png" alt="Boris Schmidt Mockup 1" class="clickable-image">
          </div>
          <div class="mockup-item">
            <img src="imgs/mockup2.png" alt="Boris Schmidt Mockup 2" class="clickable-image">
          </div>
          <div class="mockup-item">
            <img src="imgs/mockup3.png" alt="Boris Schmidt Mockup 3" class="clickable-image">
          </div>
        </div>
        
        <div class="mockups-text">
          <p>These mockups show how Boris Schmidt's brand looks in real life. The first shows a framed poster that could hang in a gallery or someone's home. The second shows how the logo works as street art or stickers in the city. The third shows t-shirt designs with both the text logo and sound wave symbol.</p>
          <p>Each design keeps the same brand feeling but works in different places, from nice framed art to street promotion to clothes. This shows how the logo works everywhere while keeping the mysterious and professional look that fits Boris Schmidt's music style.</p>
        </div>
      </div>

      <div class="presentation-section">
        <h2>PRESENTATION</h2>
        <p>We created a clean and professional presentation using the brand style we developed for Boris Schmidt. At Rock Academy in Tilburg, we were able to present our work to Boris.</p>
        <p>I presented the content strategy section of the presentation. Everyone in the project group presented the part they were most responsible for. The design was created together as a team. I was responsible for designing the content strategy slides.</p>
        
        <div class="presentation-image">
          <img src="imgs/BS-Presentatie.png" alt="Boris Schmidt Presentation" class="clickable-image">
        </div>
      </div>
    `
  },
  ux: {
    type: "UX Design",
    client: "Client: Cardan",
    content: `
      <h2>PROJECT OVERVIEW</h2>
      <p>In the UX project, my team and I created an online simulation for Cardan, a company that helps organizations make their websites accessible for people with visual impairments. We researched, made prototypes, got feedback, and presented our work to the client.</p>
      
      <div class="project-info-row">
        <div class="tools-section">
          <h2>TOOLS USED</h2>
          <ul>
            <li>Figma</li>
            <li>Adobe Illustrator</li>
            <li>Adobe Photoshop</li>
            <li>WCAG 2.2 Guidelines</li>
            <li>ChatGPT for research</li>
          </ul>
        </div>
        
        <div class="date-section">
          <h3>DATE</h3>
          <p>March 2025 - April 2024</p>
        </div>
      </div>

      <div class="planning-section">
        <h2>COMMUNICATION AND PLANNING</h2>
        <div class="planning-container">
          <div class="planning-image">
            <img src="imgs/discord-communication.png" alt="Cardan Planning Process" class="clickable-image">
          </div>
          <div class="planning-text">
<p>At the start of our project, we set up a Discord group with different channels to make communication easy between team members. We also used this space to share documents and important information with each other.</p>
          </div>
        </div>
        
        <div class="planning-container">
          <div class="planning-image">
            <img src="imgs/planning.png" alt="Communication Strategy" class="clickable-image">
          </div>
          <div class="planning-text">
<p>We created a weekly schedule with different tasks we needed to do. We shared these tasks among our team members, and everyone could choose which tasks they wanted to work on from the planning.</p>

<p>This clear schedule helped everyone understand what work needed to be done and who was responsible for each task. It made sure we all knew our roles and could work together effectively.</p>          </div>
        </div>
      </div>

      <div class="research-section">
        <h2>RESEARCH PROCESS</h2>
        <p>I conducted comprehensive research to understand the current state of digital accessibility and the specific challenges faced by visually impaired users. The research focused on three key areas: competitive analysis of existing accessibility solutions, understanding visual impairments and their impact on web usage, and identifying the target audience within government institutions.</p>
        
        <p>Through literature research and case study analysis, I discovered that many websites still fail to meet basic accessibility standards. For example, only 23% of Dutch municipal websites comply with established accessibility guidelines, highlighting the urgent need for better accessibility solutions.</p>
                
        <button class="research-details-button">VIEW FULL RESEARCH</button>
      </div>

      <div class="persona-section">
        <h2>USER PERSONA</h2>
        <div class="persona-container">
          <div class="persona-image">
            <img src="imgs/persona_mirthe.png" alt="Government Professional Persona" class="clickable-image">
          </div>
          <div class="persona-text">
      <p>I made a main persona based on my research to better understand government workers who work on digital accessibility. This includes people who give advice on policies, project leaders, and communication staff in government organizations.</p>
      <p>The persona shows people who are responsible for making sure websites and digital tools follow WCAG rules and the Dutch Digital Government Act.</p>
          </div>
        </div>
      </div>

      <div class="design-process-section">
        <h2>DESIGN PROCESS</h2>
        <p>The design process began with analyzing current accessibility issues and developing solutions that address the specific challenges identified in my research. I focused on creating design patterns and guidelines that could be easily implemented by government organizations.</p>
        <button class="design-process-button">VIEW DESIGN PROCESS PDF</button>

        <h3>WIREFRAMING AND PROTOTYPING</h3>
        <div class="wireframe-container">
          <div class="wireframe-image">
            <img src="imgs/wireframes.png" alt="Cardan Wireframe Process" class="clickable-image">
          </div>
          <div class="wireframe-text">
<p>The left side shows the first wireframe my classmate worked on, based on an initial design I created. This wireframe established the basic structure and layout for accessible web interfaces. On this design, my classmate applied visual impairment simulations including tunnel vision, blurry vision, and central vision loss to create examples of how people with those visual impairments engage with digital accessibility. This approach helped us understand the real problems users face.</p>
          </div>
        </div>
        
<h3>WEBSITE FINAL PROTOTYPE</h3>
<p>We designed a website that serves as a simulation tool. The concept is to integrate templates that mimic visual impairments into this website.</p>

<div class="prototype-full-image">
  <img src="imgs/maison.png" alt="Maison de Couture Prototype" class="clickable-image">
</div>

<p>I came up with the initial concept called "maison de couture" - an online fashion magazine specifically developed for Cardan's simulation. After developing the concept, I created the initial design for a 'game' that users can interact with within the simulation.</p>

<p>The game within the simulation involves creating an outfit. I designed the initial prototype and concept using Adobe Illustrator, Adobe Photoshop, and Figma. My teammate then further developed and refined this design into three functional pages, where users can: choose a model, select clothing items, and swap clothes or change colors.</p>

<p>When the simulation starts, the goal is to put together an outfit while experiencing the challenges of a visual impairment. The templates provide a realistic experience of visual limitations. Beyond being a digital experience, the game also gives users insight into what it's like for someone with, for example, color blindness to choose an outfit. This creates a connection to physical reality as well.</p>

<div class="presenting-section">
  <h2>PRESENTING</h2>
  <p>We prepared a presentation for our meeting with Carolina from Cardan. During this session, we showcased our research findings, the "maison de couture" simulation concept, and demonstrated how our visual impairment templates provide users with realistic accessibility experiences.</p>
    <div class="presentation-image">
    <img src="imgs/presentatie-cardan.png" alt="Cardan Accessibility Presentation" class="clickable-image">
  </div>
  
<p>We explained our design process and how the fashion magazine simulation helps users understand the daily problems that people with visual impairments face. Carolina and the Cardan team liked our approach and thought it was a good way to teach people about accessibility through real-life situations.</p>
  <h3>FEEDBACK AND ITERATIONS</h3>
<p>After the presentation, Carolina and our teachers Frank and Anke gave us helpful feedback. A classmate wrote down their suggestions to understand what we did well and what we needed to improve.</p>

<p>Carolina's feedback was really important for creating the outfit game. She wanted users to actually do something in the simulation, not just look at it. This is why I made the interactive fashion game where people can create outfits while experiencing visual problems.</p>

<h3>FINAL PRESENTATION</h3>
<p>In our final presentation, we showed how we added the outfit game to the fashion magazine design. We showed the complete simulation where users can experience different visual impairments while trying to pick outfits and use the magazine website.</p>

<p>We made the outfit game because of the feedback we got in our first presentation. Carolina asked for something interactive, so we created this fun feature that makes users actually do things instead of just looking at the simulation.</p>

<div class="final-presentation-image">
  <img src="imgs/final-presentation.png" alt="Cardan Final Presentation" class="clickable-image">
</div>
</div>
    `
  },
development: {
  type: "Front-End Development",
  client: "Client: Cardan",
  content: `
    <h2>PROJECT OVERVIEW</h2>
    <p>This development project involved creating interactive visual impairment simulations for Cardan, a company that helps organizations make their websites accessible for people with disabilities. I developed web-based games that simulate different types of visual impairments to help users understand accessibility challenges.</p>
    
    <div class="project-info-row">
      <div class="tools-section">
        <h2>TOOLS USED</h2>
        <ul>
          <li>Visual Studio Code</li>
          <li>GitHub Copilot</li>
          <li>Figma</li>
          <li>Adobe Photoshop</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript</li>
        </ul>
      </div>
      
      <div class="date-section">
        <h3>DATE</h3>
        <p>April 2025 - May 2025</p>
      </div>
    </div>

    <div class="research-section">
      <h2>PROJECT PLAN</h2>
      <p>Our project plan outlined the complete development process, including team roles, timeline, and deliverables. The plan detailed our approach to creating three different visual impairment simulations and the technical requirements for each game.</p>
      <button class="project-plan-button">VIEW PROJECT PLAN PDF</button>
    </div>

    <div class="moodboard-section">
      <h2>RESEARCH PROGRESS</h2>     
      <p>The concept we developed into a digital (impairment) simulation for Cardan's website consists of three games. We came up with three different games, each containing a different simulation for a visual impairment: 'tunnel vision', 'blurry vision', and 'central vision loss'.</p>
      
      <p>We recreated a Cardan page where we integrated a choice menu for the three simulations (games). Since our project group consisted of three people, the task division was quickly made and the different visual impairment types were divided. We then individually came up with a matching game that we also individually developed into a new prototype in Figma and into a working website in HTML, CSS, and Javascript.</p>
      
      <h3>My Simulation Concept</h3>
      <p>I chose the type: blurry vision. My concept development went through several iterations to create the most effective simulation for understanding the challenges of blurry vision in everyday situations.</p>
      
      <p><strong>First Concept:</strong> I created a blurry maze game where users needed to navigate out of a maze while experiencing blurred vision. The game included a slider that allowed users to adjust the level of blurriness to understand different degrees of visual impairment.</p>
      
      <p><strong>Second Concept:</strong> I developed a menu reading quiz game where users had to read a blurry restaurant menu card and answer questions about it. This simulated the real-world challenge of reading text with blurry vision, making it a practical learning experience.</p>
      
      <p><strong>Final Concept "Blurred":</strong> After testing both concepts, I combined the best elements to create my final game. The concept involves showing users blurry images of everyday scenarios with tasks like "Where is the alarm clock?" that they need to shut down. This game effectively demonstrates how blurry vision affects daily activities and decision-making, providing valuable insight into the real challenges people with visual impairments face.</p>
      
      <h3>Summary</h3>
      <p>A choice page for the simulations is created. Here three simulations are displayed for the three types of visual impairment. Each simulation consists of a game, in which the user experiences the impairment as realistically as possible through hindering elements.</p>
    </div>

 <div class="stylescape-section">
      <h2>PROTOTYPE TESTING</h2>
      
      <div class="stylescape-container">
        <div class="stylescape-image">
          <img src="imgs/doolhof.png" alt="Maze Game Prototype Test" class="clickable-image">
        </div>
        <div class="stylescape-text">
          <h3>Testing the Maze Game</h3>
          <p>Users liked the blurry maze game and thought the blur slider was helpful to see different levels of blurry vision. But they said that walking through a maze doesn't feel like real life and it was not that hard. They wanted something that shows what it's actually like to have blurry vision every day.</p>
        </div>
      </div>
      
      <div class="stylescape-container">
        <div class="stylescape-image">
          <img src="imgs/restaurant.png" alt="Restaurant Menu Game Test" class="clickable-image">
        </div>
        <div class="stylescape-text">
          <h3>Testing the Restaurant Menu Game</h3>
          <p>People  liked the menu reading game because it felt real, everyone has tried to read a menu before. They could easily understand how blurry vision makes dining out hard. But they said it was too limited to just menus and wanted to see more everyday situations.</p>
        </div>
      </div>
      
      <div class="stylescape-text">
        <h3>WHAT I LEARNED</h3>
        <p>The testing showed me that users wanted both things, real everyday situations like the menu game and fun interactive parts like the maze game. This feedback helped me create my final game that puts together everyday scenarios with interactive elements, making a better way to learn about living with blurry vision.</p>
      </div>
    </div>

    <div class="logo-section">
      <h2>USER TEST FEEDBACK</h2>
      <div class="logo-container">
        <div class="logo-text">
          <p>I tested my "Blurred" game with 4 college students to see if it really shows what it's like to have blurry vision. I watched them play through all 6 scenarios and asked them questions after.</p>
          
          <p>The results were really good! Everyone finished the game and said it felt realistic (average score 8.8/10). The transport scene with the buses was the hardest for everyone. People got frustrated at first but understood better by the end how hard daily tasks can be with vision problems.</p>
          
          <p>All users started clicking randomly but learned to be more careful as they played. The game took about 1-2 minutes to complete, and everyone said the difficulty was just right, challenging but not impossible.</p>
          
          <button class="user-test-button">VIEW FULL USER TEST</button>
        </div>
      </div>
    </div>

     <div class="mockups-section">
      <h2>DESIGN PROCESS</h2>
      
      <div class="mockups-images">
        <div class="mockup-item">
          <img src="imgs/cardandev_design.png" alt="Design Process - Maze and Restaurant Concepts" class="clickable-image">
        </div>
      </div>
      
      <div class="mockups-text">
        <p>I started my design process by creating wireframes and prototypes in Figma. My first concept was a simple maze game where users had to navigate through a blurry maze to test how they deal with unclear vision.</p>
        
        <p>After testing the maze concept, I realized people wanted something more realistic and relatable to daily life. So I moved on to designing a restaurant menu game where users had to read blurry menu items and answer questions about them. For this concept, I used Adobe Illustrator to create detailed menu layouts with different food items and prices.</p>
        
        <p>The maze design used simple geometric shapes that I created directly in Figma, while the restaurant game needed more polished graphics which is why I switched to Illustrator for that part.</p>
        
<p>Through user feedback, I learned that people wanted both the challenge aspect of the maze and the real-world connection of the restaurant game. This led me to develop my final concept that combined everyday scenarios with interactive challenges, creating a more complete learning experience about living with blurry vision.</p>
      </div>
    </div>

    <div class="presentation-section">
      <h2>DEVELOPMENT</h2>
      <p>Most of the project was about building the simulations with code. I used HTML, CSS, and JavaScript to create the interactive game. The biggest challenge was making the blur effects work properly and creating smooth user interactions.</p>
      
      <p>For parts I didn't understand yet, I used GitHub Copilot as a learning tool. Instead of just copying code, I asked it to explain how things worked so I could understand the logic behind it. This helped me learn new Javascript techniques, especially for handling image filters and click events.</p>
      
      <p>The game tracks user clicks, measures time for each scenario, and gives feedback based on their choices. All the blur effects are created using CSS filters, and Javascript handles the game logic and user interactions.</p>
      
      <div class="prototype-full-image">
        <img src="imgs/dev_cardanprogress.png" alt="Blurred Game Development Process" class="clickable-image">
      </div>

      <h3>VERSION CONTROL</h3>
      <div class="version-control-container">
        <div class="version-control-text">
          <p>After finishing the prototype in Figma, we created a shared GitLab repository to start coding the game together. We used GitLab instead of GitHub because that was the preference of the teammate who set up the repository.</p>
          
          <p>Through GitLab we could work together on the code without problems. We organized our project with separate HTML, CSS, and JavaScript files for each team member, so we couldn't interfere with each other's work. Each person had their own CSS file to avoid conflicts.</p>
          
          <p>We made sure to commit all our changes regularly and kept the GitLab repository well organized with clear commit messages. This made it easy to track progress and collaborate effectively as a team.</p>
          
          <button class="gitlab-repo-button">VIEW GITLAB REPOSITORY</button>
        </div>
      </div>
    </div>
      
  `
  },
  portfolio: {
    type: "Portfolio",
    content: `
    <h2>PROJECT OVERVIEW</h2>
    <p>This portfolio website development project involved creating a personal digital showcase to present my work as a media design student. The project demonstrates my skills in front-end development, UX/UI design, and creative coding while providing an interactive platform to display my projects and achievements.</p>    
    <div class="project-info-row">
      <div class="tools-section">
        <h2>TOOLS USED</h2>
        <ul>
          <li>Visual Studio Code</li>
          <li>GitHub Copilot</li>
          <li>Figma</li>
          <li>Adobe Photoshop</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript</li>
        </ul>
      </div>
      
      <div class="date-section">
        <h3>DATE</h3>
        <p>April 2025 - May 2025</p>
      </div>
    </div>

       <div class="research-section">
      <h2>RESEARCH PROGRESS</h2>
      <p>For my portfolio website I got inspiration from many other websites. I looked closely at what they did well, but also what didn't work so great. By comparing them, I got a better idea of what I wanted to make, and especially what I didn't want.</p>
      
      <p>Some sites looked very clean and neat, but felt a bit boring or impersonal. Others were very creative and playful, but sometimes messy or unclear. By looking at all of this, I knew better which direction I wanted to go.</p>
      
      <p>I wanted to make something that really fits me, something that shows my style and feels personal. By learning from other websites I could make better choices and finally ended up with a design that I'm really happy with.</p>
      
      <h3>INSPIRATION SOURCES</h3>
      <div class="moodboard-container">
        <div class="moodboard-image">
          <img src="imgs/inspiration_1.png" alt="Website Inspiration 1" class="clickable-image">
          <img src="imgs/inspiration_2.png" alt="Website Inspiration 2" class="clickable-image">

        </div>
        <div class="moodboard-text">
          <p>The first one caught my eye because it's super clean and easy to read, nothing fancy but it works really well. The second one showed me how you can add your personality to a website without making it look unprofessional.</p>
        </div>
      </div>
    </div>

 <div class="stylescape-section">
  <h2>5 SECOND TEST</h2>
  
  <div class="mockups-text">
    <p>I wanted to make sure my portfolio actually works before showing it to others. So I did a 5-second test with three people to see what they noticed right away and if they understood what my website was about.</p>
    
    <p>The good news is that everyone immediately caught the retro style and thought it looked creative and unique. They all remembered my name, that I'm a media design student, and that I'm from the Netherlands. Meaning the visual style was good.</p>
    
    <p>But here's what didn't work so well: people weren't sure exactly what kind of design work I do. Some wondered if I focus on websites, visual design, or something else. A few also mentioned they weren't sure where to click or what they were supposed to do on the site.</p>
    
    <p>So the takeaway is pretty clear, my portfolio grabs attention with its style, but I need to make it clearer what I actually do and guide visitors better on how to navigate the site.</p>
    
    <button class="five-second-test-button">VIEW FULL 5-SECOND TEST</button>
  </div>
</div>

<div class="stylescape-section">
  <h2>A/B TEST</h2>
  
  <div class="mockups-text">
    <p>After the 5-second test, I wanted to figure out which navigation style would work best for my portfolio. So I created two versions of my homepage to compare, version A had simple text buttons at the bottom, and version B used retro icons that really stood out.</p>
    
    <p>I was curious to see which one people would find easier to understand and use. Would they prefer the clean, simple text buttons or the more visual retro icons that matched my website's style?</p>
    
    <p>The results were pretty interesting! Two out of three people preferred version B with the retro icons. They said the icons immediately caught their attention and made navigation much easier to find. The visual style also felt more alive and fit better with the rest of the website.</p>
    
    <p>One person did prefer version A though, saying the text buttons were clearer and less overwhelming. They found the icons a bit too big and sometimes confusing.</p>
    
    <p>In the end, most people liked the retro icons better because they made the site more visually appealing and the navigation was clearer. So I decided to go with version B for my final design.</p>
    
    <button class="ab-test-button">VIEW FULL A/B TEST</button>
  </div>
</div>

<div class="mockups-section">
  <h2>DESIGN PROCESS</h2>
  
  <div class="carousel-layout">
    <div class="carousel-left">
      <div class="image-carousel">
        <button class="carousel-arrow carousel-prev">‹</button>
        <div class="carousel-container">
          <img id="carousel-image" src="imgs/design-process-1.png" alt="Design Process Step 1" class="clickable-image">
        </div>
        <button class="carousel-arrow carousel-next">›</button>
      </div>
      <div class="carousel-counter">
        <span id="current-image">1</span> / <span id="total-images">7</span>
      </div>
    </div>
    
    <div class="carousel-right">
      <p>This shows my complete design process from the first sketches to the final website. Each step helped me understand what worked and what needed improvement, leading to the final design you see today.</p>
      
      <p>The process included wireframing, visual design exploration, color scheme testing, typography choices, layout iterations, responsive design considerations, and final polishing. Each image represents a different stage of development that brought the portfolio to life.</p>
    </div>
  </div>
</div>  
</div>

<div class="logo-section">
  <h2>LOGO DESIGN</h2>
  <div class="logo-container">
    <div class="final-logo">
      <img src="imgs/design-process-3.png" alt="Portfolio Logo Design" class="clickable-image">
    </div>
    <div class="logo-text">
      <p>I made my portfolio logo to match the retro gaming vibe I was going for. I wanted something that felt personal but also looked professional at the same time.</p>
      <p>I created it in Photoshop first, trying out different ideas and fonts until I found something that clicked. Then I brought it into Figma to clean it up and make sure it worked well with the rest of my design.</p>
    </div>
  </div>
</div>

<div class="pixel-art-section">
  <h2>PIXEL ART DESIGN</h2>
  <div class="pixel-art-container">
    <div class="pixel-art-image">
      <img src="imgs/pixel-art.png" alt="Pixel Art Design Elements" class="clickable-image">
    </div>
    <div class="pixel-art-text">
      <p>All the pixel art icons and graphics were made from scratch to get that authentic retro look. I spent time making sure each pixel was in the right place so everything looked consistent.</p>
      <p>I designed them in Photoshop pixel by pixel, then imported everything into Figma to organize and implement in my design. It was pretty time-consuming but totally worth it for the final result.</p>
    </div>
  </div>
</div>
<div class="presentation-section">
  <h2>DEVELOPMENT</h2>
  <p>Building this portfolio was the fun part where I got to bring all my designs to life with code. I used HTML, CSS, and JavaScript to create the interactive retro experience you're seeing right now.</p>
  
  <p>The trickiest part was definitely getting all the window interactions working properly. Making windows draggable, managing which one is active, and getting the blur effects right took some time to figure out. I also spent a lot of effort making sure the pixel art elements stayed crisp and the retro button effects felt authentic.</p>
  
  <p>I used GitHub Copilot to help me with some of the more complex JavaScript functions, especially the window management system. It was really helpful for explaining how certain code worked so I could understand it better instead of just copying it.</p>
  
  <p>The typing animation on the login screen and the boot sequence were probably my favorite parts to code. Getting the timing right and making it feel like an old computer starting up was really satisfying.</p>

  <h3>VERSION CONTROL</h3>
  <div class="version-control-container">
    <div class="version-control-text">
      <p>I used GitHub Desktop to keep track of all my changes while building the portfolio.</p>
      
      <p>GitHub Desktop made it easy to commit changes and see what I was working on. I tried to make good commit messages so I could remember what I changed and why.</p>

      <button class="github-repo-button">VIEW GITHUB REPOSITORY</button>
    </div>
  </div>
</div>
  `
  }
};

const learningOutcomeData = {
 'interactive-media': {
type: "Interactive Media",
content: `
 <h2>LEARNING OUTCOME: INTERACTIVE MEDIA</h2>
<div class="learning-outcome-description">
 <p><strong>Description:</strong> You orient in the relevant tech, media and design landscape and create interactive media products that you have tested with users and stakeholders.</p>
</div>
<div class="learning-outcome-evidence">
 <h3>MY EVIDENCE</h3>
 <p>When I work on projects, I always want to test my ideas with real people to see if they actually work. I think this is really important because you can't know if something is good until you try it with users. Let me show you how I do this in my work:</p>
 <div class="evidence-item">
 <h4>User Testing in the Cardan UX Project</h4>
 <p>For the Cardan project, I wanted to make sure our visual impairment simulations were actually helpful for people. I made interactive prototypes and asked users to try them out. I paid attention to their feedback and changed things based on what they told me.</p>
 <p>When users said my first maze idea wasn't realistic enough, I listened and made it better. I changed it to show real everyday situations instead, which worked much better for teaching people about accessibility problems.</p>
 <button class="evidence-button" data-project="ux" data-section="user-test">VIEW USER TEST DETAILS</button>
 </div>
 <div class="evidence-item">
 <h4>A/B Testing for Portfolio Design</h4>
 <p>When I was working on my portfolio, I wasn't sure which navigation style would work better. So I made two different versions and tested them with users. One had text buttons and one had retro-style icons.</p>
 <p>Most users liked the retro icons better because they looked more interesting and fit with the whole design. I'm glad I tested this instead of just guessing, because now I know the portfolio works better for people who visit it.</p>
 <button class="evidence-button" data-project="portfolio" data-section="ab-test">VIEW A/B TEST DETAILS</button>
 </div>
 <div class="evidence-item">
 <h4>Interactive Prototyping for Boris Schmidt's Brand</h4>
 <p>For the Boris Schmidt branding project, I made surveys to test different poster designs with people who like techno music. I wanted to make sure the designs actually communicated the right feeling for his music.</p>
 <p>The survey results helped me understand that people preferred designs that mixed abstract and organic shapes. This feedback directly changed how I made the final brand design.</p>
 <button class="evidence-button" data-project="branding" data-section="survey">VIEW SURVEY RESULTS</button>
 </div>
 <div class="evidence-item">
 <h4>Development of Accessibility Simulations</h4>
 <p>I think the best example of my interactive media work is the accessibility simulations I made for Cardan. I created web games that let people experience what it's like to have visual impairments.</p>
 <p>After testing showed my first maze game wasn't realistic enough, I completely redesigned it to focus on everyday situations. When I tested the final version with college students, they gave it an average realism score of 8.8/10. This made me really happy because it showed the simulation actually worked as an educational tool.</p>
 <button class="evidence-button" data-project="development" data-section="prototype-testing">VIEW SIMULATION DEVELOPMENT</button>
 </div>
 <div class="evidence-item">
 <h4>Working with Stakeholder Feedback</h4>
 <p>When I presented our simulations to Carolina from Cardan, she gave me important feedback. She said users should actively do something in the simulation instead of just watching passively.</p>
 <p>I took this feedback seriously and created the interactive fashion game where users make outfits while experiencing visual impairments. This shows that I can change my designs based on what stakeholders need.</p>
 <button class="evidence-button" data-project="ux" data-section="presenting">VIEW STAKEHOLDER FEEDBACK</button>
 </div>
</div>
<div class="learning-outcome-conclusion">
 <h3>CONCLUSION</h3>
 <p>Through these projects, I've learned that creating interactive media isn't just about making something that works - it's about making something that actually helps people. I always test my ideas with users and change them based on feedback. This way of working has helped me create better products that people actually want to use.</p>
</div>
`
 
 },
'development': {
type: "Development",
content: `
 <h2>LEARNING OUTCOME: DEVELOPMENT</h2>
<div class="learning-outcome-description">
 <p><strong>Description:</strong> You explore front-end development languages, you write code and document in a version control environment.</p>
</div>
<div class="learning-outcome-evidence">
 <h3>MY EVIDENCE</h3>
 <p>I really enjoy coding and learning new ways to build things. When I work on projects, I always try to understand how the code works instead of just copying things. I also make sure to keep track of my work using version control. Here's how I've been learning and improving:</p>
 <div class="evidence-item">
 <h4>Portfolio Website Development</h4>
 <p>Building this portfolio website was my biggest coding challenge so far. I used HTML, CSS, and JavaScript to create everything you see - the retro boot screen, the draggable windows, and all the interactive parts.</p>
 <p>The hardest part was making the window system work properly. I had to figure out how to make windows draggable, manage which one is active, and get all the visual effects working. It took me some time to understand, but I'm really proud of how it works now.</p>
 <button class="evidence-button" data-project="portfolio" data-section="development">VIEW DEVELOPMENT DETAILS</button>
 </div>
 <div class="evidence-item">
 <h4>Visual Impairment Simulation Games</h4>
 <p>For the Cardan project, I made three different web games that simulate visual impairments. I focused on the blurry vision simulation, where I had to create realistic blur effects using CSS and JavaScript.</p>
 <p>The tricky part was making the blur effects look real while keeping the game playable. I tried different CSS filter values and JavaScript events to create scenarios like reading bus schedules or finding alarm clocks when everything is blurry.</p>
 <button class="evidence-button" data-project="development" data-section="prototype-testing">VIEW SIMULATION CODE</button>
 </div>
 <div class="evidence-item">
 <h4>Using Version Control Properly</h4>
 <p>I've learned to use both GitHub and GitLab for my projects. At first I didn't understand why version control was important, but now I can't imagine working without Git. It helps me keep track of changes and work together with teammates without problems.</p>
 <p>For my portfolio, I used GitHub Desktop to manage all my commits. In the Cardan development project, our team used GitLab and we organized our code so everyone had their own CSS file. We made sure to commit changes regularly and write clear messages about what we changed.</p>
 <button class="version-control-button" data-project="development" data-section="version-control">VIEW VERSION CONTROL</button>
 </div>
 <div class="evidence-item">
 <h4>Learning New Technologies</h4>
 <p>In my projects, I often need to learn new coding techniques. When I don't understand something, I use GitHub Copilot as a learning tool - but I don't just copy the code. I ask it to explain how things work so I can actually understand the logic.</p>
 <p>This way of learning has helped me understand new JavaScript techniques, especially for handling image filters, click events, and working with the DOM. I can honestly say I understand how my code works instead of just making things that seem to work.</p>
 <button class="evidence-button" data-project="portfolio" data-section="development">VIEW LEARNING PROCESS</button>
 </div>
 <div class="evidence-item">
 <h4>Extra Development Work</h4>
 <p>Besides my main projects, I also work on extra development challenges from workshops. You can see these on my dashboard where I try out new coding ideas and techniques.</p>
 <button class="dashboard-link-button" data-project="development" data-section="development">VIEW DASHBOARD</button>
 </div>
</div>
<div class="learning-outcome-conclusion">
 <h3>CONCLUSION</h3>
 <p>My development work shows that I've grown from basic HTML and CSS to building complex interactive applications. I always try to understand what I'm building instead of just making things work. Using version control has become natural for me - I use it to track my progress, work with others, and keep my code organized so other people can understand it too.</p>
</div>
    `
  },
  'design': {
    type: "Design",
    content: `
      <h2>LEARNING OUTCOME: DESIGN</h2>
<div class="learning-outcome-description">
  <p><strong>Description:</strong> You explore and use professional design tools and you iteratively design visual works.</p>
</div>

<div class="learning-outcome-evidence">
  <h3>MY EVIDENCE</h3>
  <p>Throughout my projects, I've consistently used professional design tools and followed iterative design processes to create visual works. Let me show you how I've developed my design skills and workflow:</p>
  
  <div class="evidence-item">
    <h4>Complete Brand Identity Design for Boris Schmidt</h4>
    <p>TDuring the Boris Schmidt branding project, I worked on creating a complete visual identity from the ground up. I used Figma, Adobe Illustrator, and Photoshop to explore different design directions. The process started with mood boards and style scapes to define the visual tone. From there, I developed and refined multiple logo concepts while documenting each step to reflect on what worked and what could be improved.</p>
    <p>Throughout the project, I continuously iterated based on feedback. I explored at least 14 different logo directions, experimenting with glitch effects, gothic typography, and various visual elements, before finding the right balance between techno energy and natural influences that aligned with Boris' vision.</p>
    <button class="evidence-button" data-project="branding" data-section="logo-design">VIEW DESIGN PROCESS</button>
  </div>
  
  <div class="evidence-item">
    <h4>UX Design and Wireframing for Cardan</h4>
    <p>For the Cardan accessibility project, I worked in Figma to design wireframes and prototypes with accessibility in mind from the start. This project was not just about making something look good, but about making sure every part worked well for people with visual impairments. I started with simple wireframes to set up the structure, then focused on designs with correct heading levels and clear focus indicators.</p>
    <p>Throughout the project, I tested and improved the designs based on feedback. I looked at what worked well and what needed changes. In the final version, the high-fidelity prototypes showed that good visual design and accessibility can go hand in hand. This project helped me understand how to create designs that are both clear and inclusive.</p>
    <button class="evidence-button" data-project="ux" data-section="design-process">VIEW UX DESIGN PROCESS</button>
  </div>
  
  <div class="evidence-item">
    <h4>Portfolio Design and Visual Identity</h4>
    <p>Creating this portfolio was a chance to really showcase my personal design style. I designed everything from scratch in Photoshop and Figma - the retro pixel art, the custom logo, the window interface design, and all the visual elements you see.</p>
    <p>The design went through multiple iterations based on user testing. I conducted A/B tests to determine which navigation style worked better, and did 5-second tests to make sure the visual hierarchy was clear. Each round of feedback helped me refine the design further.</p>
    <button class="evidence-button" data-project="portfolio" data-section="design-process">VIEW PORTFOLIO DESIGN</button>
  </div>
  
  <div class="evidence-item">
    <h4>Iterative Design Process and Tool Mastery</h4>
    <p>Across all my projects, you can see how I've developed a solid iterative design process. I always start with research and mood boards, move through multiple concept variations, test with users, and refine based on feedback. It's become natural for me to create multiple versions and not get attached to the first idea.</p>
    <p>I've also become proficient with tools like Photoshop, Illustrator and Figma. Each tool has its strengths, Illustrator for logos and vector work, Photoshop for pixel art and image manipulation, Figma for prototyping and collaboration. Knowing when to use which tool has made my workflow much more efficient.</p>
    <button class="evidence-button" data-project="branding" data-section="logo-iterations">VIEW ITERATION EXAMPLES</button>
  </div>
  
  <div class="evidence-item">
    <h4>Visual Research and Concept Development</h4>
    <p>I've learned that good design starts with good research. For every project, I spend time understanding the target audience, analyzing competitors, and creating mood boards that capture the right feeling before I start designing.</p>
    <p>The Boris Schmidt project is a perfect example - I interviewed techno fans, researched the music scene, and created detailed personas before designing anything. This research foundation made all the difference in creating a brand that actually resonated with the target audience.</p>
    <button class="evidence-button" data-project="branding" data-section="research">VIEW RESEARCH PROCESS</button>
  </div>
</div>

<div class="learning-outcome-conclusion">
  <h3>CONCLUSION</h3>
  <p>My design work shows a clear progression from basic tool usage to sophisticated visual problem-solving. I've mastered the professional design tools and, more importantly, developed a design process that consistently produces effective results.</p>
  <p>The iterative approach has become second nature to me - I know that the first idea is rarely the best idea, and I'm comfortable creating multiple versions, testing them, and refining based on feedback. This process, combined with strong tool skills, allows me to create visual works that not only look professional but actually solve real problems for users and clients.</p>
</div>
    `
  },
  'professional-standard': {
    type: "Professional Standard",
    content: `
      <h2>LEARNING OUTCOME: PROFESSIONAL STANDARD</h2>
<div class="learning-outcome-description">
  <p><strong>Description:</strong> You apply professional practice, both individually and in teams, in the areas of project organisation, communication with stakeholders, exploratory research, and reporting.</p>
</div>

<div class="learning-outcome-evidence">
  <h3>MY EVIDENCE</h3>
  <p>Throughout my projects, I've consistently demonstrated professional standards in how I organize work, communicate with clients and teammates, conduct research, and present results. Here's how I've applied these practices:</p>
  
  <div class="evidence-item">
    <h4>Client Communication and Stakeholder Management</h4>
    <p>Working with Boris Schmidt for the branding project taught me how to communicate professionally with real clients. I conducted interviews to understand his vision, presented concepts clearly, and incorporated his feedback into the design process. The final presentation at Rock Academy was a formal client delivery where I presented the content strategy section professionally.</p>
    <p>For the Cardan project, I learned how to present to corporate stakeholders. When Carolina gave us feedback that our simulation needed more interactivity, I took that input seriously and redesigned the concept to meet her requirements - showing I can adapt professionally when client needs change.</p>
    <button class="evidence-button" data-project="ux" data-section="presenting">VIEW CLIENT PRESENTATIONS</button>
  </div>
  
  <div class="evidence-item">
    <h4>Team Project Organization and Collaboration</h4>
    <p>The Cardan development project was my biggest team collaboration challenge. We set up clear communication channels using Discord with different channels for different types of discussions. I helped create weekly planning schedules where we divided tasks fairly and everyone could choose what they wanted to work on.</p>
    <p>What made this work was our clear task division and regular check-ins. Everyone knew their responsibilities, and we used version control properly so we could work together without stepping on each other's code. It felt like a real professional development team.</p>
    <button class="evidence-button" data-project="ux" data-section="planning">VIEW TEAM ORGANIZATION</button>
  </div>
  
  <div class="evidence-item">
    <h4>Comprehensive Research and Documentation</h4>
    <p>I've learned to conduct thorough exploratory research before starting any project. For the Cardan accessibility project, I researched digital accessibility standards, analyzed competitor approaches, and studied the specific challenges faced by visually impaired users. This wasn't just surface-level research - I dug into WCAG guidelines and real user needs.</p>
    <p>For Boris Schmidt, I conducted target audience interviews and created detailed personas based on real data. I documented everything properly so the research could inform design decisions throughout the project. Good research documentation has become a cornerstone of how I approach projects.</p>
    <button class="evidence-button" data-project="ux" data-section="research">VIEW RESEARCH DOCUMENTATION</button>
  </div>
  
  <div class="evidence-item">
    <h4>Professional Reporting and Presentation</h4>
    <p>I've developed strong skills in creating professional presentations and reports. For each project, I created comprehensive documentation that explained not just what I designed, but why I made those decisions and how they solved the client's problems.</p>
    <p>My user testing reports include proper methodology, clear findings, and recommendations. When I present to clients or classmates, I structure my presentations logically and focus on the value I'm delivering rather than just showing pretty pictures.</p>
    <button class="evidence-button" data-project="development" data-section="user-test">VIEW PROFESSIONAL REPORTING</button>
  </div>
  
  <div class="evidence-item">
    <h4>Project Planning and Time Management</h4>
    <p>I've learned to break down complex projects into manageable phases with clear deliverables. Whether working alone or in teams, I create realistic timelines and stick to them. For the portfolio project, I planned everything from initial research through final development, making sure each phase built logically on the previous one.</p>
    <p>When working in teams, I contribute to project planning and make sure everyone understands the timeline and their role in meeting deadlines. I've learned that good project organization is what separates professional work from student work.</p>
    <button class="evidence-button" data-project="development" data-section="project-plan">VIEW PROJECT PLANNING</button>
  </div>
</div>

<div class="learning-outcome-conclusion">
  <h3>CONCLUSION</h3>
  <p>Working on these projects has taught me that professional standards aren't just about producing good work - they're about how you organize, communicate, and collaborate throughout the entire process. I've learned to approach every project with proper planning, clear communication, and thorough documentation.</p>
  <p>Whether I'm working with external clients like Boris Schmidt and Cardan, or collaborating with classmates on team projects, I consistently apply professional practices that ensure projects run smoothly and deliver real value.</p>
</div>
    `
  },
  'personal-leadership': {
    type: "Personal Leadership",
    content: `
       <h2>LEARNING OUTCOME: PERSONAL LEADERSHIP</h2>
<div class="learning-outcome-description">
  <p><strong>Description:</strong> You take the initiative in asking for, and reflecting on, feedback. You identify your own core values as the basis for your study career and professional development.</p>
</div>

<div class="learning-outcome-evidence">
  <h3>MY EVIDENCE</h3>
  <p>When I work on a project (individually or in a group),I take notes of the feedback to reflect as well as possible so that the work (work attitude, planning, etc.) is improved. I usually process feedback from both teachers and test results immediately, this is reflected in my work.</p>
  
  <div class="evidence-item">
    <h4>Taking Initiative in Feedback and Reflection</h4>
    <p>Besides showing initiative for feedback and reflections, I also do this for other things such as: presenting, documenting or taking on important tasks. When an important assignment needs to be carried out, I like to be directly involved in this, or at least be aware of how this is being carried out. I am always aware of deadlines and want to have my/our work submitted on time and well.</p>
    <p>For my portfolio, I conducted 5-second tests and A/B testing with multiple users to understand what was working and what wasn't. When users told me my navigation wasn't clear enough, I didn't get defensive, I took that feedback and improved the design immediately.</p>
    <button class="evidence-button" data-project="portfolio" data-section="ab-test">VIEW FEEDBACK INTEGRATION</button>
    <button class="feedback-pdf-button">VIEW FEEDBACK PDF</button>
  </div>
  
  <div class="evidence-item">
    <h4>Project Planning and Team Leadership</h4>
    <p>In a project group, I help with creating a project plan that also includes work agreements and a schedule for the group. This ensures good cooperation and a professional work attitude. For the Cardan project, I helped set up our Discord communication channels and weekly planning schedules where we divided tasks fairly.</p>
    <p>I always make sure everyone understands their responsibilities and that we have clear deadlines. When working in teams, I often take the lead in organizing meetings, documenting decisions, and making sure we stay on track with our timeline.</p>
    <button class="evidence-button" data-project="ux" data-section="planning">VIEW PROJECT LEADERSHIP</button>
  </div>
  
  <div class="evidence-item">
    <h4>Processing Feedback Immediately</h4>
    <p>I process feedback from both teachers and test results usually immediately, this is reflected in my work. When Carolina from Cardan gave us feedback that our simulation needed more interactivity, I took that input seriously and redesigned the concept to meet her requirements right away.</p>
    <p>The same approach applied to the Cardan simulations. When my initial maze concept got lukewarm responses in testing, I listened to the feedback and completely redesigned the experience to be more realistic and educational. This immediate response to feedback has become a key part of my work process.</p>
    <button class="evidence-button" data-project="development" data-section="prototype-testing">VIEW FEEDBACK IMPLEMENTATION</button>
    <button class="feedback-pdf-button">VIEW FEEDBACK PDF</button>
  </div>
  
  <div class="evidence-item">
    <h4>Taking on Important Tasks and Documentation</h4>
    <p>When important tasks need to be done, I like to be directly involved or at least know how they're being executed. In the Boris Schmidt project, I took responsibility for presenting the content strategy section during our client presentation at Rock Academy. I made sure I was well-prepared and could explain our approach professionally.</p>
    <p>I also take initiative in documenting our work and decisions. For the Cardan development project, I helped create comprehensive documentation of our research findings and user testing results, making sure everything was properly recorded for future reference.</p>
    <button class="evidence-button" data-project="branding" data-section="presentation">VIEW TASK LEADERSHIP</button>
  </div>

<div class="learning-outcome-conclusion">
  <h3>CONCLUSION</h3>
  <p>Personal leadership, for me, has been about taking ownership of my learning journey and staying true to my values while continuously growing. I consistently take initiative in asking for feedback, documenting work, and taking on important responsibilities in both individual and group projects.</p>
  <p>I've learned that processing feedback immediately and reflecting on it properly is what leads to real improvement. Whether it's through Feedpulse reflections, user testing, or client feedback sessions, I make sure to act on input quickly and document the changes..</p>
</div>
    `
  }
};

// Startup sequences
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
  
  WindowManager.setActiveWindow(aboutWindow);
  
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

// Project and Learning Outcome Loaders
function loadProject(projectKey) {
  const project = projectData[projectKey];
  if (project) {
    document.getElementById('project-type').textContent = project.type;
    document.getElementById('project-client').textContent = project.client;
    document.getElementById('project-content').innerHTML = project.content;

    // Re-attach event listeners for buttons that might have been added
    attachProjectEventListeners();
  }
}

function loadLearningOutcome(outcomeKey) {
  const outcome = learningOutcomeData[outcomeKey];
  if (outcome) {
    document.getElementById('learning-outcome-type').textContent = outcome.type;
    document.getElementById('learning-outcome-content').innerHTML = outcome.content;
    // ---- ADD THIS LINE ----
    attachProjectEventListeners(); // Crucial: Re-attach listeners after new HTML is injected
    // -----------------------
  }
}

// Event Listeners and Button Handlers
function attachProjectEventListeners() {
  // Interview details button (for branding project)
  const interviewDetailsButton = document.querySelector('.interview-details-button');
  if (interviewDetailsButton) {
    interviewDetailsButton.addEventListener('click', () => {
      WindowManager.openWindow(interviewDetailsWindow, true);
    });
  }

  // Content strategy button (for branding project)
  const contentStrategyButton = document.querySelector('.content-strategy-button');
  if (contentStrategyButton) {
    contentStrategyButton.addEventListener('click', () => {
      WindowManager.openWindow(contentStrategyWindow, true);
    });
  }

  // Logo iterations button (for branding project)
  const logoIterationsButton = document.querySelector('.logo-iterations-button');
  if (logoIterationsButton) {
    logoIterationsButton.addEventListener('click', () => {
      WindowManager.openWindow(logoIterationsWindow, true);
    });
  }

  // Research details button (for UX project)
  const researchDetailsButton = document.querySelector('.research-details-button');
  if (researchDetailsButton) {
    researchDetailsButton.addEventListener('click', () => {
      WindowManager.openWindow(researchDetailsWindow, true);
    });
  }

  // Wireframe details button (for UX project)
  const wireframeDetailsButton = document.querySelector('.wireframe-details-button');
  if (wireframeDetailsButton) {
    wireframeDetailsButton.addEventListener('click', () => {
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

  const feedbackPdfButtons = document.querySelectorAll('.feedback-pdf-button'); // Use querySelectorAll for safety
  feedbackPdfButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log("Feedback PDF button clicked!"); // For debugging
      window.open('pdfs/feedpulses.pdf', '_blank');
    });
  });

const dashboardLinkButton = document.querySelector('.dashboard-link-button');
if (dashboardLinkButton) {
  dashboardLinkButton.addEventListener('click', () => {
    window.open('https://i554530.hera.fontysict.net', '_blank');
  });


const versionControlButton = document.querySelector('.version-control-button');
if (versionControlButton) {
  versionControlButton.addEventListener('click', () => {
    window.open('https://github.com/BerkanHRGL?tab=repositories', '_blank');
  });
}
}


  
  // Image carousel for portfolio project
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
      currentImageSpan.textContent = currentIndex + 1;
      totalImagesSpan.textContent = carouselImages.length;
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

  // GitHub repository button (for portfolio project)
  const githubRepoButton = document.querySelector('.github-repo-button');
  if (githubRepoButton) {
    githubRepoButton.addEventListener('click', () => {
      window.open('https://github.com/BerkanHRGL/portfolio', '_blank');
    });
  }
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('evidence-button')) {
    e.preventDefault(); // Good practice for buttons that trigger JS actions
    const project = e.target.getAttribute('data-project');
    const section = e.target.getAttribute('data-section');
    
    console.log(`Evidence button clicked: project=${project}, section=${section}`);
    
    const learningOutcomesWindow = document.querySelector('.learning-outcomes-window');
    if (learningOutcomesWindow && learningOutcomesWindow.style.display !== 'none') {
      WindowManager.closeWindow(learningOutcomesWindow);
    }
    
    // Use requestAnimationFrame to allow the browser to process the closing of the previous window
    requestAnimationFrame(() => {
      // A second requestAnimationFrame can help ensure the previous frame's updates are committed
      requestAnimationFrame(() => {
        const projectsWindow = document.querySelector('.projects-window');
        if (projectsWindow) {
          WindowManager.openWindow(projectsWindow, true); // Open the project window

          // Select the appropriate project tab and load content
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
          }
          
          if (menuItem) {
            // Deactivate all menu items in this specific window first
            document.querySelectorAll('.projects-window .menu-item').forEach(item => item.classList.remove('active'));
            menuItem.classList.add('active');
            
            const projectKey = menuItem.getAttribute('data-project');
            loadProject(projectKey); // Load the project content
            
            // Scroll to the target section after a delay to ensure content is loaded and rendered
            setTimeout(() => {
              let targetSectionElement;
              const projectContentArea = projectsWindow.querySelector('#project-content');

              if (!projectContentArea) {
                console.error("Project content area not found for scrolling.");
                return;
              }

              // Updated and more robust section finding logic
              if (project === 'branding' && section === 'survey') {
                targetSectionElement = projectContentArea.querySelector('.survey-container');
              } else if (project === 'ux' && section === 'presenting') {
                targetSectionElement = projectContentArea.querySelector('.presenting-section h2'); // Target heading for better visibility
              } else if (project === 'ux' && section === 'user-test') {
                // Prefer more specific selector if available, otherwise general section.
                targetSectionElement = projectContentArea.querySelector('.wireframe-container') || projectContentArea.querySelector('.design-process-section');
              } else if (project === 'development' && section === 'prototype-testing') {
                // The h2 for "PROTOTYPE TESTING" is inside a stylescape-section
                const headings = Array.from(projectContentArea.querySelectorAll('h2'));
                targetSectionElement = headings.find(h => h.textContent.trim().toUpperCase() === "PROTOTYPE TESTING")?.closest('.stylescape-section');
              } else if (project === 'portfolio' && section === 'ab-test') {
                const headings = Array.from(projectContentArea.querySelectorAll('h2'));
                targetSectionElement = headings.find(h => h.textContent.trim().toUpperCase() === "A/B TEST")?.closest('.stylescape-section');
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
            }, 350); // Slightly increased delay
          } else {
            console.warn(`Menu item for project '${project}' not found.`);
          }
        } else {
          console.error("Projects window not found.");
        }
      });
    });
  }
});

// Main DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");
  
  // Initialize the window manager
  WindowManager.initialize();
  
  startBootSequence();
  
  const confirmButton = document.getElementById('confirm-button');
  const navIcons = document.querySelectorAll('.navbar-icon');
  const moreAboutButton = document.querySelector('.about-button');
  const menuItems = document.querySelectorAll('.menu-item');
  const fullAboutWindow = document.querySelector('.full-about-me-window');
  const learningOutcomeItems = document.querySelectorAll('.learning-outcomes-window .menu-item');
  
  // Load default project (branding)
  loadProject('branding');
  
  
  // Load default learning outcome
  if (learningOutcomeItems) {
    learningOutcomeItems.forEach(item => {
      item.addEventListener('click', () => {
        learningOutcomeItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const outcomeKey = item.getAttribute('data-outcome');
        loadLearningOutcome(outcomeKey);
      });
    });
  }
  
  if (confirmButton) {
    confirmButton.addEventListener('click', goToMainContent);
  }
  
  if (moreAboutButton) {
    moreAboutButton.addEventListener('click', () => {
      WindowManager.openWindow(fullAboutWindow, true);
    });
  }
  
  // Navigation icons
  navIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      const sections = ['projects', 'learning-outcomes', 'about-me', 'contact'];
      const clickedSection = sections[index];
      
      console.log(`Navigation to: ${clickedSection}`);
      
      switch(clickedSection) {
        case 'projects':
          WindowManager.openWindow(projectsWindow, true);
          break;
        case 'learning-outcomes':
          WindowManager.openWindow(learningOutcomesWindow, true);
          loadLearningOutcome('interactive-media'); // Load default outcome
          break;
        case 'about-me':
          const fullAboutWindow = document.querySelector('.full-about-me-window');
          if (fullAboutWindow) {
            WindowManager.openWindow(fullAboutWindow, true);
          }
          break;
        case 'contact':
          // Implement contact functionality
          break;
      }
    });
  });
  
  // Project menu items
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const projectKey = item.getAttribute('data-project');
      loadProject(projectKey);
    });
  });

  // Image popup functionality
  function openImagePopup(imageSrc) {
    popupImage.src = imageSrc;
    imagePopup.style.display = 'flex';
  }

  function closeImagePopup() {
    imagePopup.style.display = 'none';
    popupImage.src = '';
  }

// Image popup event listeners
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('clickable-image')) {
      e.preventDefault();
      openImagePopup(e.target.src);
    }
  });

  // Close popup when clicking the close button
  closePopup.addEventListener('click', closeImagePopup);

  // Close popup when clicking outside the image
  imagePopup.addEventListener('click', function(e) {
    if (e.target === imagePopup) {
      closeImagePopup();
    }
  });

  // Close popup with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imagePopup.style.display === 'flex') {
      closeImagePopup();
    }
  });

  // Attach project event listeners
  attachProjectEventListeners();
});

// Keyboard event handlers
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (loginScreen.style.display === 'none' && mainContent.style.display === 'none') {
      goToLoginScreen();
    } else if (loginScreen.style.display !== 'none') {
      goToMainContent();
    }
  }
});

// Image popup functions
function openImagePopup(imageSrc) {
  popupImage.src = imageSrc;
  imagePopup.style.display = 'flex';
}

function closeImagePopup() {
  imagePopup.style.display = 'none';
  popupImage.src = '';
}


// Click outside window to close
document.addEventListener('click', function(event) {
  // Check if click is outside any window but inside the blur overlay
  if (event.target === blurOverlay) {
    // Find all visible windows except the about-me-window (which should stay open)
    const visibleWindows = Array.from(WindowManager.windows).filter(win => 
      win.style.display !== 'none' && !win.classList.contains('about-me-window')
    );
    
    // Close the most recently opened window (highest z-index)
    if (visibleWindows.length > 0) {
      let topWindow = visibleWindows[0];
      let highestZIndex = parseInt(topWindow.style.zIndex) || 0;
      
      visibleWindows.forEach(win => {
        const zIndex = parseInt(win.style.zIndex) || 0;
        if (zIndex > highestZIndex) {
          highestZIndex = zIndex;
          topWindow = win;
        }
      });
      
      console.log('Closing window via click outside:', topWindow.className);
      WindowManager.closeWindow(topWindow);
    }
  }
});