// Main application file

// Sound setup
function initializeSound() {
  STATE.typeSound = new Howl({
    src: CONFIG.sounds.typing.src,
    volume: CONFIG.sounds.typing.volume,
    preload: CONFIG.sounds.typing.preload
  });
}

// Startup sequences
function startBootSequence() {
  setTimeout(() => {
    ELEMENTS.headerContainer.classList.add('visible');
    setTimeout(() => {
      ELEMENTS.infoSections[0].classList.add('visible');
      setTimeout(() => {
        ELEMENTS.infoSections[1].classList.add('visible');
        setTimeout(() => {
          ELEMENTS.enterPrompt.classList.add('visible');
        }, CONFIG.animation.infoSectionDelay);
      }, CONFIG.animation.infoSectionDelay);
    }, CONFIG.animation.infoSectionDelay);
  }, CONFIG.animation.bootSequenceDelay);
}

function goToLoginScreen() {
  ELEMENTS.bootScreen.style.display = "none";
  ELEMENTS.loginScreen.style.display = "flex";
  setTimeout(typePassword, 500);
}

function goToMainContent() {
  STATE.typeSound.stop();
  ELEMENTS.loginScreen.style.display = "none";
  ELEMENTS.mainContent.style.display = "block";
  
  const aboutWindow = document.querySelector('.about-me-window');
  aboutWindow.style.display = "block";
  STATE.openWindowsCount = 1;
  
  WindowManager.setActiveWindow(aboutWindow);
  ELEMENTS.blurOverlay.style.display = 'none';
}

async function typePassword() {
  ELEMENTS.passwordDisplay.textContent = "";
  for (let i = 0; i < CONFIG.password.length; i++) {
    await new Promise(resolve => setTimeout(resolve, CONFIG.animation.passwordTypingDelay));
    STATE.typeSound.play();
    ELEMENTS.passwordDisplay.textContent += "*";
  }
  STATE.typeSound.stop();
}

// Navigation handlers
function setupNavigation() {
  ELEMENTS.navIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      const sections = ['projects', 'learning-outcomes', 'about-me', 'contact'];
      const clickedSection = sections[index];
      
      console.log(`Navigation to: ${clickedSection}`);
      
      switch(clickedSection) {
        case 'projects':
          const projectsWindow = document.querySelector('.projects-window');
          WindowManager.openWindow(projectsWindow, true);
          break;
        case 'learning-outcomes':
          const learningOutcomesWindow = document.querySelector('.learning-outcomes-window');
          WindowManager.openWindow(learningOutcomesWindow, true);
          LearningOutcomes.loadLearningOutcome('interactive-media');
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
}

// Load window templates
function loadWindowTemplates() {
  const windowTemplatesContainer = document.getElementById('window-templates');
  windowTemplatesContainer.innerHTML = `
    <!-- About Me Windows -->
    <div class="about-me-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">LIL' ABOUT ME</div>
        <div class="window-close">✕</div>
      </div>
      <div class="window-content">
        <p>HEY, I'M BERKAN, A MEDIA DESIGN STUDENT BASED IN THE NETHERLANDS WHO LOVES BLENDING CREATIVITY WITH PURPOSE. I'M ALL ABOUT CRAFTING DESIGNS THAT NOT ONLY LOOK GOOD BUT ALSO FEEL RIGHT TO USE.</p>
      </div>
      <div class="window-footer">
        <div class="about-button">MORE ABOUT ME</div>
      </div>
    </div>

    <div class="full-about-me-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">ABOUT ME</div>
        <div class="window-close">✕</div>
      </div>
      <div class="window-content">
        <div class="about-header">
          <h1>BERKAN<br>HERGUL</h1>
          <h2>ABOUT ME</h2>
        </div>
        <p>HEY, I'M BERKAN, A MEDIA DESIGN STUDENT BASED IN THE NETHERLANDS WHO LOVES BLENDING CREATIVITY WITH PURPOSE. I'M ALL ABOUT CRAFTING DESIGNS THAT NOT ONLY LOOK GOOD BUT ALSO FEEL RIGHT TO USE.</p>
        <p>As a passionate media designer, I've been developing my skills in UX/UI, front-end development, and visual design. My approach combines technical precision with creative vision, always aiming to create intuitive and engaging user experiences.</p>
        <p>Education: Currently pursuing a degree in Media Design at Fontys University of Applied Sciences, where I'm developing both my technical and creative abilities.</p>
        <p>Skills:</p>
        <ul>
          <li>UX/UI Design</li>
          <li>Front-End Development (HTML, CSS, JavaScript)</li>
          <li>Visual Design</li>
          <li>Prototyping</li>
          <li>User Research</li>
        </ul>
      </div>
    </div>

    <!-- Projects Window -->
    <div class="projects-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">PROJECT</div>
        <div class="window-close">✕</div>
      </div>
      
      <div class="project-header">
        <div class="header-left">
          <h1>BERKAN<br>HERGUL</h1>
        </div>
        <div class="header-right">
          <h2 id="project-type">Branding</h2>
          <h2 id="project-client">Client: Boris Schmidt</h2>
        </div>
      </div>
      
      <div class="project-content-container">
        <div class="project-menu">
          <div class="menu-item active" data-project="branding">PROJECT 1<br>Branding</div>
          <div class="menu-item" data-project="ux">PROJECT 2<br>UX</div>
          <div class="menu-item" data-project="development">PROJECT 3<br>DEVELOPMENT</div>
          <div class="menu-item" data-project="portfolio">PROJECT 4<br>PORTFOLIO</div>
          <div class="menu-item" data-project="projectx">PROJECT 5<br>PROJECT X</div>
        </div>
        
        <!-- Project Content Container -->
        <div class="project-content" id="project-content">
          <!-- Content will be loaded here based on selected project -->
        </div>
      </div>
    </div>

    <!-- Learning Outcomes Window -->
    <div class="learning-outcomes-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">LEARNING OUTCOMES</div>
        <div class="window-close">✕</div>
      </div>
      
      <div class="project-header">
        <div class="header-left">
          <h1>BERKAN<br>HERGUL</h1>
        </div>
        <div class="header-right">
          <h2 id="learning-outcome-type">Interactive Media</h2>
        </div>
      </div>
      
      <div class="project-content-container">
        <div class="project-menu">
          <div class="menu-item active" data-outcome="interactive-media">Interactive Media</div>
          <div class="menu-item" data-outcome="design">Design</div>
          <div class="menu-item" data-outcome="development">Development</div>
          <div class="menu-item" data-outcome="professional-standard">Professional Standard</div>
          <div class="menu-item" data-outcome="personal-leadership">Personal Leadership</div>
        </div>
        
        <!-- Learning Outcome Content Container -->
        <div class="project-content" id="learning-outcome-content">
          <!-- Content will be loaded here based on selected learning outcome -->
        </div>
      </div>
    </div>

    <!-- Additional Windows -->
    <div class="logo-iterations-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">LOGO DESIGN PROCESS</div>
        <div class="window-close">✕</div>
      </div>
      <div class="window-content">
        <div class="iterations-header">
          <h2>LOGO ITERATIONS</h2>
        </div>
        <p>Here you can see the complete design process from the first ideas to the final logo. Each step helped me understand what worked and what didn't, leading to the final design that perfectly represents Boris Schmidt's brand.</p>
        
        <div class="iterations-grid">
          <div class="iteration-stage">
            <h3>STAGE 1: GLITCH CONCEPTS</h3>
            <div class="stage-images">
              <img src="imgs/logo_1.png" alt="Logo Iteration 1" class="clickable-image">
              <img src="imgs/logo_2_boris.png" alt="Logo Iteration 2" class="clickable-image">
            </div>
            <p>I started by trying out different glitch-style designs to show the techno music feeling. I played with broken text effects, using lines and static to distort the letters. I tested both the full name 'Boris Schmidt' and short versions like 'BS' and 'ST' to see what worked best. The green and black colors were picked to match the mysterious forest feel Boris wanted, mixing techno energy with nature.</p>
          </div>

          <div class="iteration-stage">
            <h3>STAGE 2: GOTHIC STYLE EXPLORATION</h3>
            <div class="stage-images">
              <img src="imgs/logo_3_boris.png" alt="Logo Iteration 3" class="clickable-image">
              <img src="imgs/logo_boris_4.png" alt="Logo Iteration 4" class="clickable-image">
            </div>
            <p>I moved away from glitch effects and tried a gothic style approach. I made bold, dark letters for 'BORIS' and kept 'SCHMIDT' lighter to create contrast. I added flowing organic shapes around the text to represent the nature side of Boris's brand. This style felt more mysterious and connected to the dark forest theme he wanted, while still looking strong and bold like techno music.</p>
          </div>

          <div class="iteration-stage">
            <h3>STAGE 3: TYPOGRAPHY TESTING</h3>
            <div class="stage-images">
              <img src="imgs/logo_boris_5.png" alt="Logo Iteration 5" class="clickable-image">
              <img src="imgs/logo_boris_7.png" alt="Logo Iteration 6" class="clickable-image">
            </div>
            <p>I stepped back and tried a cleaner approach with different typography styles. I tested various fonts and layouts to see what would work best for readability and impact. I tried everything from simple sans-serif fonts to more technical-looking typefaces. I also experimented with broken letters and different spacing to find the right balance between clean design and the edgy techno feeling Boris wanted.</p>
          </div>

          <div class="iteration-stage">
            <h3>STAGE 4: NATURE CONCEPTS</h3>
            <img src="imgs/logo_boris_8.png" alt="Logo Iteration 7" class="clickable-image">
            <p>I explored a completely different direction by focusing on the nature side of Boris's identity. I created mountain and landscape symbols with horizontal lines to show depth and texture. I tested different color variations from black to brown to see what felt most natural. This concept was about showing Boris's connection to the outdoors and natural world, moving away from the digital techno look.</p>
          </div>

          <div class="iteration-stage">
            <h3>STAGE 5: SOUNDWAVE BREAKTHROUGH</h3>
            <div class="stage-images">
              <img src="imgs/logo_boris_10.png" alt="Logo Iteration 8" class="clickable-image">
              <img src="imgs/logo_boris_12.png" alt="Logo Iteration 9" class="clickable-image">
            </div>
            <p>This was where everything came together. I combined sound waves with organic flowing shapes to represent both the techno music and nature elements like. The sound wave pattern in the center shows the music side, while the flowing blue shapes around it represent natural forms like water or wind. This design finally captured both sides of Boris's identity in one strong symbol.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="interview-details-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">INTERVIEW DETAILS</div>
        <div class="window-close">✕</div>
      </div>
      <div class="window-content">
        <div class="interview-header">
          <h1>TARGET AUDIENCE RESEARCH</h1>
        </div>
        <p>I did research about the target audience through tests and interviews to better understand techno fans and what they want from artists and brands.</p>
        
        <h3>INTERVIEW WITH SOPHIE (20 YEARS OLD)</h3>
        
        <div class="interview-qa">
          <p><strong>What genre of techno do you listen to?</strong><br>
          More towards melodic and minimal techno. I love the deep sound of artists like Tale of Us and Adriatique.</p>
          
          <p><strong>Why do you listen to this music?</strong><br>
          It helps me relax and get into a certain mood. Sometimes it's even a bit calming.</p>
          
          <p><strong>When do you listen to this music?</strong><br>
          Often in the car, at work, or just at home.</p>
          
          <p><strong>Who is your favorite techno artist?</strong><br>
          Tale of Us and Mind Against.</p>
          
          <p><strong>Which platform do you use most for music?</strong><br>
          Spotify, because I can easily make playlists there and discover new songs through the algorithms.</p>
          
          <p><strong>Do you make your own playlists or listen to ready-made ones?</strong><br>
          I always make my own playlists. Spotify's playlists are sometimes too mainstream for my taste.</p>
          
          <p><strong>Do you go to festivals?</strong><br>
          Yes, but I prefer festivals with a relaxed atmosphere like DGTL and Afterlife events.</p>
          
          <p><strong>Do you pay attention to album covers?</strong><br>
          Yes, I think a cover can really say something about the music.</p>
          
          <p><strong>Do you follow artists on social media?</strong><br>
          Yes, especially on Instagram. I like to see what their inspiration is and how they build their sets.</p>
        </div>
        
        <h3>CONCLUSION BASED ON SOPHIE</h3>
        <p>Sophie loves techno, but especially the calm and melodic side, like Tale of Us and Mind Against. For her, it's not just about hard beats, but about atmosphere and emotion. She listens to techno to relax, for example at home or in the car.</p>
        
        <p>She uses Spotify to listen to music and likes to discover new songs through the algorithms. She makes her own playlists because she finds ready-made playlists often too popular or not quite her taste.</p>
        
        <p>When it comes to festivals, Sophie chooses parties with a relaxed atmosphere, like DGTL and Afterlife events. This shows that she prefers beautiful light shows and a nice environment over hard, industrial techno.</p>
        
        <p>She also looks at album covers. A beautiful, minimalist cover makes her curious about the music. This means that the appearance of an album or track influences whether she will listen to it.</p>
        
        <p>On social media, she follows artists mainly on Instagram. She finds it interesting to see how they make their music and prepare. Artists who show what inspires them and how they work get her attention.</p>
        
        <h3>HOW I USED THIS FOR MY DESIGN</h3>
        <p>Based on Sophie's interview, I learned that techno fans want more than just music - they want atmosphere, emotion, and beautiful visuals. This helped me design Boris Schmidt's brand to focus on:</p>
        
        <ul>
          <li>Creating a mysterious and atmospheric visual style that matches the mood Sophie and similar fans are looking for</li>
          <li>Designing clean, minimalist covers that would catch Sophie's attention on Spotify</li>
          <li>Building a brand that works well on Instagram, where Sophie discovers and follows artists</li>
          <li>Focusing on the connection between nature and techno, which appeals to fans who want relaxed, atmospheric experiences</li>
        </ul>
        
        <p>The interview confirmed that Boris Schmidt's vision of combining techno with nature and mystery would appeal to this target audience.</p>
      </div>
    </div>

    <div class="content-strategy-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">CONTENT STRATEGY</div>
        <div class="window-close">✕</div>
      </div>
      <div class="window-content">
        <div class="strategy-header">
          <h1>CONTENT STRATEGY</h1>
        </div>
        
        <p>I created this content strategy because it's important to present the brand in a consistent way. With a clear strategy, I know what tone, style, and type of content we should use to reach the right target audience. It helps me convey the message effectively and increase brand visibility.</p>
    
        <h3>1. BEST DAYS AND TIMES TO POST</h3>
        <p>Optimizing posting times increases visibility and engagement. For Boris, the following moments are ideal:</p>
        
        <h4>Instagram:</h4>
        <p>Best Days: Friday, followed by Saturday and Tuesday<br>
        Time: Between 6:00 PM and 8:59 PM, with a peak around 8:00 PM</p>
        
        <h4>TikTok:</h4>
        <p>Monday: 6:00 AM, 10:00 AM, 10:00 PM<br>
        Tuesday: 2:00 AM, 4:00 AM, 6:00 AM<br>
        Wednesday: 8:00 AM, 9:00 AM, 11:00 PM<br>
        Thursday: 9:00 AM, 12:00 PM, 6:00 PM<br>
        Friday: 6:00 AM, 1:00 PM, 4:00 PM<br>
        Saturday: 11:00 AM, 7:00 PM, 8:00 PM<br>
        Sunday: 7:00 AM, 9:00 AM, 4:00 PM</p>
    
        <h3>2. RECOMMENDED CONTENT TYPES</h3>
        <p>Diversifying content keeps the target audience engaged and interested:</p>
        <ul>
          <li>Behind the Scenes (BTS): Show the creative process, studio recordings, and rehearsals</li>
          <li>Q&A Sessions: Answer fan questions through live videos or stories</li>
          <li>Polls and Surveys: Ask about fan preferences for setlists, merchandise, or future releases</li>
          <li>Skits: These often work well with this generation if done properly</li>
          <li>User-Generated Content (UGC): Share fan content like photos or videos from performances</li>
        </ul>
    
        <h3>3. COMPETITOR RESEARCH</h3>
        <p>Learning from other techno artists can provide valuable insights:</p>
        <ul>
          <li>Collaborations: Work with other artists or influencers to reach a broader audience</li>
          <li>Live Sessions: Organize live streams on platforms like Instagram and TikTok for direct fan interaction</li>
          <li>Hashtag Usage: Use relevant hashtags to increase post visibility and attract new followers</li>
          <li>Visual Consistency: Maintain a cohesive aesthetic on platforms like Instagram to strengthen the brand</li>
        </ul>
    
        <h3>4. PLATFORM-SPECIFIC CONTENT RECOMMENDATIONS</h3>
        
        <h4>TikTok:</h4>
        <p>Content: Short, trend-focused videos with quick edits and catchy music<br>
        Strategy: Share snippets of new tracks, challenges, and collaborations with other creators</p>
        
        <h4>Instagram:</h4>
        <p>Content: Visually appealing photos, reels, and stories that give a glimpse into Boris' personal life and career<br>
        Strategy: Share BTS moments, announcements, and fan interaction through polls and Q&As</p>
    
        <h3>5. PROMOTION INITIATIVES</h3>
        <ul>
          <li>Tagging Labels and Events: Increase visibility by tagging relevant labels and events</li>
          <li>Collaborations: Work with other artists or influencers for cross-promotion</li>
          <li>Live Sessions: Organize live streams for real-time fan interaction</li>
          <li>Hashtag Campaigns: Create brand-related hashtags and encourage fans to use them</li>
          <li>User-Generated Content: Encourage fans to share their experiences</li>
          <li>Advertisements: Invest in targeted ads on TikTok and Instagram</li>
        </ul>
    
        <h3>6. HASHTAGS</h3>
        
        <h4>General Techno Hashtags:</h4>
        <p>#techno #technomusic #undergroundtechno #technodj #technoset #electronicmusic #edmcommunity #raveculture</p>
        
        <h4>Festival and Club Hashtags:</h4>
        <p>#technofestival #clubculture #warehouserave #technorave #berlintechno #ibizatechno #technoscene</p>
        
        <h4>For DJs and Producers:</h4>
        <p>#djlife #musicproducer #technoproducer #studiosessions #undergroundmusic #modularsynths #drummachines</p>
        
        <h4>Trending Hashtags:</h4>
        <p>#technovibes #technolovers #hardtechno #acidtechno #melodictechno #technocommunity</p>
        
        <h4>Events and Labels:</h4>
        <p>#awakenings #timewarp #ade #drumcode #afterlife #boilerroom #berghain</p>
        
        <h4>Personal Hashtags:</h4>
        <p>#boristechno #borislive</p>
      </div>
    </div>

    <div class="research-details-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">RESEARCH DETAILS</div>
        <div class="window-close">✕</div>
      </div>
      <div class="window-content">
        <div class="research-header">
          <h1>DIGITAL ACCESSIBILITY RESEARCH</h1>
        </div>
        
        <h3>FIELD RESEARCH - COMPETITIVE ANALYSIS</h3>
        <p><strong>Research method:</strong> libary research</p>
        <p>I conducted research to identify existing companies specializing in digital accessibility for people with disabilities, similar to Cardan's mission.</p>
        
        <h4>Competitor: Stuurlui</h4>
        <p>Stuurlui is a Wordpress agency from Utrecht specializing in digital accessibility. They design, build, and maintain websites that comply with WCAG 2.2 standards, making them accessible to everyone, including people with disabilities.</p>

        <p>Stuurlui not only builds accessible websites but also shares helpful guides and articles. These guides explain the WCAG 2.2 rules in simple words so other organizations can learn how to follow them more easily.</p>
        
        <p>Their research showed significant accessibility gaps in the Dutch market:</p>
        <ul>
          <li>Evaluated homepages of all 73 public hospitals in the Netherlands for accessibility compliance</li>
          <li>Found that only 23% of 355 municipal websites met established accessibility guidelines</li>
          <li>Provide practical guides and articles to help organizations improve digital accessibility</li>
        </ul>
        
        <h3>VISUAL IMPAIRMENT RESEARCH</h3>
        
        <h4>What is visual impairment?</h4>
        <p>Visual impairment means someone sees less than 30% or has a visual field smaller than 30 degrees. A normal visual field with both eyes is approximately 180 degrees (150 degrees with one eye). The visual limitation cannot be corrected by wearing glasses or contact lenses.</p>
        
        <h4>Types of Visual Impairments:</h4>
        <ul>
          <li><strong>Blurred Vision</strong> - Has hazy or unclear sight</li>
          <li><strong>Tunnel Vision</strong> - Vision appears as if looking through a tube</li>
          <li><strong>Central Vision Loss</strong> - Sees a black spot centrally in their vision</li>
        </ul>
        
        <h4>Web accesibility problems for visually impaired users:</h4>
        <ul>
          <li><strong>Poor color contrast</strong> - Reading becomes difficult due to insufficient contrast between text and background</li>
          <li><strong>Small or non-scalable text</strong> - Some websites block zooming functionality</li>
          <li><strong>Images without descriptions</strong> - Images without alt-text are useless for screen readers</li>
          <li><strong>Illogical structure and navigation</strong> - Lack of clear headings and logical layout makes quick page navigation difficult</li>
          <li><strong>Moving or flashing content</strong> - Animations, carousels, and auto-moving content can be distracting and harder to read</li>
          <li><strong>Forms and input fields</strong> - Forms can be problematic without clear labels explaining their purpose</li>
          <li><strong>No screen reader support</strong> - Interactive elements like buttons and dropdowns may not work properly with screen readers</li>
        </ul>
        
        <h4>Solutions for better accessibility:</h4>
        <ul>
          <li><strong>Screen reader/TTS</strong> - Text on web pages is read aloud by a voice</li>
          <li><strong>Alt-Text</strong> - Adding alt-text to sources like images allows screen readers to describe them</li>
          <li><strong>Logical structure and navigation</strong> - Use clear buttons and ensure good structure</li>
          <li><strong>Avoid moving and flashing content</strong> - Reduce distracting animations</li>
          <li><strong>Accessible forms</strong> - Input fields must have clear labels and avoid disappearing placeholders</li>
        </ul>
        
        <h3>TARGET AUDIENCE RESEARCH</h3>
        
        <h4>Research goal</h4>
        <p>The goal of this research was to gain insight into the needs, problems, and desires of professionals within government institutions who work with digital accessibility.</p>
        
        <h4>Target Group Description</h4>
        <p>The primary target group consists of policy advisors, project leaders, and communication professionals within municipalities, ministries, or other government organizations. They work on improving digital services and must comply with the Digital Government Act (WCAG) guidelines.</p>
        
        <h4>Research Methods</h4>
        <p><strong>Literature research:</strong> I researched existing information about digital accessibility, the Digital Government Act, and WCAG guidelines. I also analyzed Cardan's website to understand their approach to digital accessibility.</p>
        
        <p><strong>Case study analysis:</strong> To understand how Cardan applies digital accessibility in practice, I analyzed their website and other digital platforms, evaluating their compliance with accessibility standards like WCAG guidelines.</p>
        

        <h3>WHY THIS RESEARCH?</h3>
        <p>This research was based on three main questions:</p>
     <ol>
    <li>What is already happening in the field of digital accessibility?</li>
    <li>What problems do people with visual impairments face online?</li>
    <li>Who is the target audience and what do they need?</li>
      </ol>

      <h3>CASE STUDY: CARDAN'S WEBSITE</h3>
  <p>To see how digital accessibility is used in real life, I also looked at Cardan's website. I checked how well it follows the WCAG rules. This helped me understand what they are doing well and where they could improve. It gave me ideas about how these guidelines work in practice.</p>

        <h3>CONCLUSION</h3>
        <p>The research revealed a significant gap between legal requirements and actual implementation of digital accessibility. With only 23% of government websites meeting basic accessibility standards, there's a clear need for better tools, training, and support systems for government professionals responsible for digital accessibility compliance.</p>
        
        <p>Understanding the specific challenges faced by visually impaired users provided crucial insights for developing more effective accessibility solutions that go beyond mere compliance to create truly inclusive digital experiences.</p>
      </div>
    </div>

    <!-- Wireframe Details Window -->
    <div class="wireframe-details-window" style="display: none;">
      <div class="window-header">
        <div class="window-title">WIREFRAME PROCESS</div>
        <div class="window-close">✕</div>
      </div>
      <div class="window-content">
        <div class="wireframe-process-header">
          <h1>WIREFRAMING & PROTOTYPING PROCESS</h1>
        </div>
        
        <p>This section shows the complete wireframing and prototyping process for creating accessible government websites. Each stage built upon accessibility principles to ensure the final design would work effectively for users with visual impairments.</p>
        
        <div class="wireframe-stage">
          <h3>STAGE 1: LOW-FIDELITY WIREFRAMES</h3>
          <div class="stage-images">
            <img src="imgs/wireframe_lowfi_1.png" alt="Low-fidelity wireframe 1" class="clickable-image">
            <img src="imgs/wireframe_lowfi_2.png" alt="Low-fidelity wireframe 2" class="clickable-image">
          </div>
          <p>I started with basic wireframes focusing on information architecture and content hierarchy. These early sketches established the foundation for accessible navigation patterns and ensured logical content flow that would work well with screen readers. The wireframes prioritized clear section divisions and consistent layout patterns.</p>
        </div>

        <div class="wireframe-stage">
          <h3>STAGE 2: ACCESSIBILITY-FOCUSED WIREFRAMES</h3>
          <div class="stage-images">
            <img src="imgs/wireframe_accessible_1.png" alt="Accessibility wireframe 1" class="clickable-image">
            <img src="imgs/wireframe_accessible_2.png" alt="Accessibility wireframe 2" class="clickable-image">
          </div>
          <p>The next iteration specifically addressed accessibility requirements. I incorporated proper heading hierarchies, skip navigation links, and clear focus indicators. These wireframes showed how form elements would be labeled, how images would be described, and how interactive elements would provide feedback to assistive technologies.</p>
        </div>

        <div class="wireframe-stage">
          <h3>STAGE 3: HIGH-FIDELITY PROTOTYPES</h3>
          <div class="stage-images">
            <img src="imgs/prototype_highfi_1.png" alt="High-fidelity prototype 1" class="clickable-image">
            <img src="imgs/prototype_highfi_2.png" alt="High-fidelity prototype 2" class="clickable-image">
          </div>
          <p>The high-fidelity prototypes brought together visual design with accessibility features. I implemented proper color contrast ratios, scalable typography, and interactive states that meet WCAG guidelines. These prototypes demonstrated how the interface would look and function while maintaining full accessibility compliance.</p>
        </div>
      </div>
    </div>
  `;
}

// Keyboard event handlers
function setupKeyboardEvents() {
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      if (ELEMENTS.loginScreen.style.display === 'none' && ELEMENTS.mainContent.style.display === 'none') {
        goToLoginScreen();
      } else if (ELEMENTS.loginScreen.style.display !== 'none') {
        goToMainContent();
      }
    }
  });
}

// Click outside window to close
function setupClickOutsideToClose() {
  document.addEventListener('click', function(event) {
    // Check if click is outside any window but inside the blur overlay
    if (event.target === ELEMENTS.blurOverlay) {
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
}

// Setup "More About Me" button
function setupMoreAboutButton() {
  const moreAboutButton = document.querySelector('.about-button');
  if (moreAboutButton) {
    moreAboutButton.addEventListener('click', () => {
      const fullAboutWindow = document.querySelector('.full-about-me-window');
      WindowManager.openWindow(fullAboutWindow, true);
    });
  }
}

// Main DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");
  
  // Initialize DOM elements
  initializeElements();
  
  // Initialize sound
  initializeSound();
  
  // Check if this is a direct link to projects (skip boot sequence)
  const urlParams = new URLSearchParams(window.location.search);
  const isDirectProjectLink = urlParams.get('project') && urlParams.get('section') && window.location.hash === '#projects';
  
  console.log("Direct project link detected:", isDirectProjectLink);
  
  if (isDirectProjectLink) {
    // Skip boot sequence for direct project links
    ELEMENTS.bootScreen.style.display = "none";
    ELEMENTS.loginScreen.style.display = "none";
    ELEMENTS.mainContent.style.display = "block";
    
    // Load window templates first
    loadWindowTemplates();
    
    // Initialize the window manager
    WindowManager.initialize();
    
    // Initialize components
    Projects.init();
    LearningOutcomes.init();
    ImagePopup.init();
    
    // Show about window immediately
    setTimeout(() => {
      const aboutWindow = document.querySelector('.about-me-window');
      aboutWindow.style.display = "block";
      STATE.openWindowsCount = 1;
      WindowManager.setActiveWindow(aboutWindow);
      ELEMENTS.blurOverlay.style.display = 'none';
      
      // Now handle the URL parameters
      LearningOutcomes.checkUrlParameters();
    }, 100);
    
  } else {
    // Normal boot sequence for regular visits
    ELEMENTS.loginScreen.style.display = "none";
    ELEMENTS.mainContent.style.display = "none";
    
    // Load window templates
    loadWindowTemplates();
    
    // Initialize the window manager
    WindowManager.initialize();
    
    // Initialize components
    Projects.init();
    LearningOutcomes.init();
    ImagePopup.init();
    
    // Start the boot sequence
    startBootSequence();
  }
  
  // Setup event handlers (always needed)
  setupNavigation();
  setupKeyboardEvents();
  setupClickOutsideToClose();
  setupMoreAboutButton();
  
  // Setup confirm button
  if (ELEMENTS.confirmButton) {
    ELEMENTS.confirmButton.addEventListener('click', goToMainContent);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const cdPlayer = document.getElementById('cd-player');
  const cdDisc = document.getElementById('cd-disc');
  
  let isPlaying = false;
  let currentSongIndex = 0;
  
  const songs = [
    { src: 'sounds/gorillaz.mp3', title: 'Song 1' }
  ];
  
  let audio = new Audio(songs[currentSongIndex].src);
  audio.loop = true;
  audio.volume = 0.3;
  
  cdPlayer.addEventListener('click', () => {
    if (!isPlaying) {
      // Start playing
      cdDisc.classList.add('spinning');
      audio.play();
      isPlaying = true;
    } else {
      // Pause
      cdDisc.classList.remove('spinning');
      audio.pause();
      isPlaying = false;
    }
  });
  
  cdPlayer.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex].src;
    
    if (isPlaying) {
      audio.play();
    }
  });
});