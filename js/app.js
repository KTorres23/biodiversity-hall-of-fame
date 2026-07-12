document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Light/Dark Theme
  initTheme();
  
  // 2. Load Content dynamically from content.js
  loadDynamicContent();

  // 3. Onboarding Tabs (High School vs College)
  initOnboardingTabs();

  // 4. Load Dynamic Schools Map
  initNetworkMap();

  // 5. Responsive Mobile Menu Drawer
  initMobileMenu();

  // 6. Initialize Leaderboard dynamic content
  initLeaderboard();

  // 7. Initialize Floating Pilot Banner
  initPilotBanner();
});

function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleIcon(currentTheme, themeToggleBtn);

  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let targetTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateToggleIcon(targetTheme, themeToggleBtn);
  });
}

function updateToggleIcon(theme, button) {
  // Inline SVGs for Sun and Moon
  const sunIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
  `;
  const moonIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  `;
  
  button.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
}

function loadDynamicContent() {
  const data = window.BHOF_CONTENT;
  if (!data) {
    console.error('BHOF_CONTENT data is not loaded.');
    return;
  }

  // --- Load Hero & Mission Section ---
  const heroTitle = document.getElementById('hero-title');
  const heroLead = document.getElementById('hero-lead');
  const heroDesc = document.getElementById('hero-desc');
  
  if (heroTitle && data.mission.title) heroTitle.textContent = data.mission.title;
  if (heroLead && data.mission.lead) heroLead.textContent = data.mission.lead;
  if (heroDesc && data.mission.description) heroDesc.textContent = data.mission.description;

  // --- Load Criteria Section ---
  const criteriaGrid = document.getElementById('criteria-grid');
  if (criteriaGrid && data.criteria) {
    criteriaGrid.innerHTML = data.criteria.map(item => {
      let iconSvg = '';
      if (item.icon === 'shield') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
      } else if (item.icon === 'leaf') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2zm0 0v-5m-2.5 1.5H11"></path></svg>`;
      } else if (item.icon === 'award') {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
      }
      
      return `
        <div class="card">
          <div class="card-icon">${iconSvg}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${item.description}</p>
        </div>
      `;
    }).join('');
  }

  // --- Load Resources Section ---
  const resourcesGrid = document.getElementById('resources-grid');
  if (resourcesGrid && data.resources) {
    resourcesGrid.innerHTML = data.resources.map(res => `
      <div class="card">
        <span class="resource-tag">${escapeHtml(res.category)}</span>
        <h3>${escapeHtml(res.title)}</h3>
        <p>${escapeHtml(res.description)}</p>
        <a href="${escapeHtml(res.link)}" class="card-link" target="_blank" rel="noopener noreferrer">${escapeHtml(res.linkLabel)}</a>
      </div>
    `).join('');
  }

  // --- Load Bioblitz Section ---
  const bioblitzGrid = document.getElementById('bioblitz-grid');
  if (bioblitzGrid && data.bioblitzes) {
    bioblitzGrid.innerHTML = data.bioblitzes.map(bb => {
      const isUpcoming = bb.status.toLowerCase() === 'upcoming';
      const badgeClass = isUpcoming ? 'status-upcoming' : 'status-completed';
      return `
        <div class="card">
          <span class="status-badge ${badgeClass}">${escapeHtml(bb.status)}</span>
          <h3>${escapeHtml(bb.name)}</h3>
          <div class="date-text">${escapeHtml(bb.date)}</div>
          <p>${escapeHtml(bb.description)}</p>
          <a href="${escapeHtml(bb.link)}" class="btn btn-secondary" style="margin-top: 1.5rem; text-align: center;">${escapeHtml(bb.linkLabel)}</a>
        </div>
      `;
    }).join('');
  }

  // --- Load Mission Statement ---
  const missionStatementText = document.getElementById('mission-statement-text');
  if (missionStatementText && data.missionStatement) {
    missionStatementText.textContent = data.missionStatement;
  }

  // --- Load Goals List ---
  const goalsList = document.getElementById('goals-list');
  if (goalsList && data.goals) {
    goalsList.innerHTML = data.goals.map((goal, index) => `
      <li><strong>Goal ${index + 1}:</strong> ${escapeHtml(goal)}</li>
    `).join('');
  }

  // --- Load Contact Info ---
  const contactText = document.getElementById('contact-text');
  const contactMail = document.getElementById('contact-mail');
  if (data.contact) {
    if (contactText) contactText.textContent = data.contact.text;
    if (contactMail) {
      if (data.contact.email) {
        contactMail.href = `mailto:${data.contact.email}`;
        contactMail.textContent = data.contact.email;
        contactMail.style.display = 'inline-flex';
      } else {
        contactMail.style.display = 'none';
      }
      
      // Render extra contact profile links if present
      if (data.contact.links && data.contact.links.length > 0) {
        // Remove existing link list if already rendered
        const existingLinks = contactMail.parentNode.querySelector('.contact-profile-links');
        if (existingLinks) existingLinks.remove();

        const isSubpage = window.location.pathname.includes('/pages/');
        const assetPrefix = isSubpage ? '../' : '';

        const linksContainer = document.createElement('div');
        linksContainer.className = 'contact-profile-links';
        linksContainer.style.display = 'flex';
        linksContainer.style.justifyContent = 'center';
        linksContainer.style.gap = '1.5rem';
        linksContainer.style.marginTop = '1.5rem';
        linksContainer.style.flexWrap = 'wrap';

        // Use btn-primary for profile buttons if no email exists, otherwise btn-secondary
        const btnClass = data.contact.email ? 'btn-secondary' : 'btn-primary';

        linksContainer.innerHTML = data.contact.links.map(link => `
          <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="btn ${btnClass}" style="font-size: 0.95rem; padding: 0.8rem 1.6rem; display: inline-flex; align-items: center; gap: 0.5rem;">
            <img src="${assetPrefix}assets/inat_logo_icon.png" alt="iNaturalist" style="width: 20px; height: 20px; object-fit: contain;">
            <span>${escapeHtml(link.name)}</span>
          </a>
        `).join('');

        contactMail.parentNode.insertBefore(linksContainer, contactMail.nextSibling);
      }
    }
  }

  // --- Load Contributors Section ---
  const contributorsGrid = document.getElementById('contributors-grid');
  if (contributorsGrid && data.contributors) {
    const isSubpage = window.location.pathname.includes('/pages/');
    const assetPrefix = isSubpage ? '../' : '';
    
    contributorsGrid.innerHTML = data.contributors.map(c => {
      // Build dynamic links HTML
      let linksHtml = `
        <a href="${escapeHtml(c.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 0.9rem; font-size: 0.85rem;">
          <img src="${assetPrefix}assets/inat_logo_icon.png" alt="iNaturalist" style="width: 16px; height: 16px; object-fit: contain;">
          <span>iNaturalist</span>
        </a>
      `;
      
      if (c.website) {
        linksHtml += `
          <a href="${escapeHtml(c.website)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 0.9rem; font-size: 0.85rem;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>Website</span>
          </a>
        `;
      }
      
      if (c.linkedin) {
        linksHtml += `
          <a href="${escapeHtml(c.linkedin)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.6rem 0.9rem; font-size: 0.85rem;">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        `;
      }

      return `
        <div class="card" style="text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span class="resource-tag">${escapeHtml(c.role)}</span>
            <h3 style="margin-top: 0.5rem; margin-bottom: 0.25rem;">${escapeHtml(c.name)}</h3>
            <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem; font-weight: 600;">@${escapeHtml(c.username)}</div>
            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${escapeHtml(c.bio)}</p>
          </div>
          <div style="margin-top: 2rem; display: flex; flex-wrap: wrap; gap: 0.75rem;">
            ${linksHtml}
          </div>
        </div>
      `;
    }).join('');
  }
}

// Simple HTML escaping helper for security
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function initOnboardingTabs() {
  const tabLevelHs = document.getElementById('tab-level-hs');
  const tabLevelUniv = document.getElementById('tab-level-univ');
  const tabRoleStudent = document.getElementById('tab-role-student');
  const tabRoleEducator = document.getElementById('tab-role-educator');

  if (!tabLevelHs || !tabLevelUniv || !tabRoleStudent || !tabRoleEducator) return;

  let activeLevel = 'hs'; // 'hs' or 'univ'
  let activeRole = 'student'; // 'student' or 'educator'

  function updateActivePanel() {
    // Hide all onboarding panels
    document.querySelectorAll('.onboarding-panel').forEach(panel => {
      panel.style.display = 'none';
      panel.classList.remove('active');
    });

    // Show selected panel
    const targetId = `content-${activeLevel}-${activeRole}`;
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.style.display = 'flex';
      setTimeout(() => targetPanel.classList.add('active'), 50);
    }
  }

  // Event Listeners for Level Toggles
  tabLevelHs.addEventListener('click', () => {
    tabLevelHs.classList.add('active');
    tabLevelHs.style.background = 'var(--color-primary)';
    tabLevelHs.style.color = '#fff';
    tabLevelUniv.classList.remove('active');
    tabLevelUniv.style.background = 'transparent';
    tabLevelUniv.style.color = 'var(--text-secondary)';
    activeLevel = 'hs';
    updateActivePanel();
  });

  tabLevelUniv.addEventListener('click', () => {
    tabLevelUniv.classList.add('active');
    tabLevelUniv.style.background = 'var(--color-secondary)';
    tabLevelUniv.style.color = '#fff';
    tabLevelHs.classList.remove('active');
    tabLevelHs.style.background = 'transparent';
    tabLevelHs.style.color = 'var(--text-secondary)';
    activeLevel = 'univ';
    updateActivePanel();
  });

  // Event Listeners for Role Toggles
  tabRoleStudent.addEventListener('click', () => {
    tabRoleStudent.classList.add('active');
    tabRoleStudent.style.background = 'var(--bg-tertiary)';
    tabRoleStudent.style.color = 'var(--text-primary)';
    tabRoleEducator.classList.remove('active');
    tabRoleEducator.style.background = 'transparent';
    tabRoleEducator.style.color = 'var(--text-secondary)';
    activeRole = 'student';
    updateActivePanel();
  });

  tabRoleEducator.addEventListener('click', () => {
    tabRoleEducator.classList.add('active');
    tabRoleEducator.style.background = 'var(--bg-tertiary)';
    tabRoleEducator.style.color = 'var(--text-primary)';
    tabRoleStudent.classList.remove('active');
    tabRoleStudent.style.background = 'transparent';
    tabRoleStudent.style.color = 'var(--text-secondary)';
    activeRole = 'educator';
    updateActivePanel();
  });

  // Setup initial active styling
  tabLevelHs.style.background = 'var(--color-primary)';
  tabLevelHs.style.color = '#fff';
  tabRoleStudent.style.background = 'var(--bg-tertiary)';
  tabRoleStudent.style.color = 'var(--text-primary)';
}

function initNetworkMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  // Initialize Map centered on the USA
  const map = L.map('map').setView([39.8283, -98.5795], 4);

  // Add OpenStreetMap tile layer (supporting dark/light layers depending on active theme is a super premium wow touch!)
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const tileUrl = isDark 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  
  const attribution = isDark
    ? '&copy; <a href="https://carto.com/">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  L.tileLayer(tileUrl, { attribution }).addTo(map);

  // Custom leaf green marker icon representing BHOF
  const leafIcon = L.divIcon({
    html: `
      <div style="background-color: var(--color-primary); width: 14px; height: 14px; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 8px rgba(0,0,0,0.4);"></div>
    `,
    className: 'custom-map-marker',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  // Fetch school data from data/schools.json
  const isSubpage = window.location.pathname.includes('/pages/');
  const jsonPath = isSubpage ? '../data/schools.json' : 'data/schools.json';
  const assetPrefix = isSubpage ? '../' : '';

  fetch(jsonPath)
    .then(res => res.json())
    .then(schools => {
      const listContainer = document.getElementById('school-list-container');
      if (listContainer) listContainer.innerHTML = '';

      schools.forEach(school => {
        // 1. Add marker to map
        const popupContent = `
          <div style="font-family: var(--font-body); padding: 0.25rem;">
            <strong style="color: var(--color-primary);">${escapeHtml(school.name)}</strong><br>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(school.level)} - ${escapeHtml(school.city)}</span><br>
            <a href="${escapeHtml(school.projectUrl)}" target="_blank" class="btn btn-primary" style="font-size: 0.75rem; padding: 0.4rem 0.8rem; color: #fff; text-decoration: none; display: inline-block; margin-top: 0.5rem; border-radius: 4px;">
              View iNaturalist Project
            </a>
          </div>
        `;
        L.marker([school.lat, school.lng], { icon: leafIcon })
          .addTo(map)
          .bindPopup(popupContent);

        // 2. Add to text list for accessibility & lookup
        if (listContainer) {
          const schoolCard = document.createElement('div');
          schoolCard.style.cssText = 'background: var(--bg-primary); padding: 1rem; border-radius: var(--border-radius-sm); border: 1px solid var(--color-border); display: flex; flex-direction: column; justify-content: space-between;';
          schoolCard.innerHTML = `
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: ${school.level === 'University' ? 'var(--color-secondary)' : 'var(--color-primary)'};">${escapeHtml(school.level)}</span>
              <h5 style="margin-top: 0.25rem; font-size: 0.95rem; font-weight: 600;">${escapeHtml(school.name)}</h5>
              <p style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(school.city)}</p>
            </div>
            <a href="${escapeHtml(school.projectUrl)}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; margin-top: 0.75rem; color: var(--color-primary); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem;">
              <img src="${assetPrefix}assets/inat_logo_icon.png" alt="iNaturalist" style="width: 14px; height: 14px; object-fit: contain;">
              <span>Project Link</span>
            </a>
          `;
          listContainer.appendChild(schoolCard);
        }
      });
    })
    .catch(err => {
      console.warn('Could not load schools.json:', err);
      const listContainer = document.getElementById('school-list-container');
      if (listContainer) {
        listContainer.innerHTML = '<p style="color: var(--text-muted);">Please host BHOF on a server (e.g. localhost) to load the dynamic network schools list.</p>';
      }
    });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Close menu if clicking outside the navbar
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });

  // Close menu if a nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  // Handle window resizing (close mobile menu if resized to desktop width)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
      menuToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
}

function initLeaderboard() {
  const tabInd = document.getElementById('tab-leaderboard-ind');
  const tabSchool = document.getElementById('tab-leaderboard-school');
  const tableHead = document.querySelector('#leaderboard-table thead');
  const tableBody = document.getElementById('leaderboard-body');
  const filterLevel = document.getElementById('filter-level');

  if (!tableBody || !window.BHOF_CONTENT || !window.BHOF_CONTENT.leaderboards) return;

  let currentTab = 'ind'; // 'ind' or 'school'
  let currentFilter = 'all';

  function render() {
    const data = window.BHOF_CONTENT.leaderboards;
    let html = '';
    let headerHtml = '';

    if (currentTab === 'ind') {
      headerHtml = `
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>School</th>
          <th>Level</th>
          <th>Research-Grade Obs</th>
          <th>Unique Species</th>
          <th>Badge</th>
        </tr>
      `;
      
      const filteredInd = data.individuals.filter(item => {
        return currentFilter === 'all' || item.level === currentFilter;
      });

      html = filteredInd.map((item, index) => {
        const rank = index + 1;
        let rankClass = '';
        if (rank === 1) rankClass = 'rank-1';
        else if (rank === 2) rankClass = 'rank-2';
        else if (rank === 3) rankClass = 'rank-3';

        let badgeClass = 'badge-active';
        if (item.badge.includes('Gold')) badgeClass = 'badge-gold';
        else if (item.badge.includes('Silver')) badgeClass = 'badge-silver';
        else if (item.badge.includes('Bronze')) badgeClass = 'badge-bronze';

        return `
          <tr>
            <td class="rank-cell"><span class="rank-badge ${rankClass}">${rank}</span></td>
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td>${escapeHtml(item.school)}</td>
            <td>${escapeHtml(item.level)}</td>
            <td>${item.observations}</td>
            <td>${item.species}</td>
            <td><span class="badge-tag ${badgeClass}">${escapeHtml(item.badge)}</span></td>
          </tr>
        `;
      }).join('');
    } else {
      headerHtml = `
        <tr>
          <th>Rank</th>
          <th>School Name</th>
          <th>Level</th>
          <th>Total Observations</th>
          <th>Unique Species</th>
          <th>Active Students</th>
        </tr>
      `;

      const filteredSchools = data.schools.filter(item => {
        return currentFilter === 'all' || item.level === currentFilter;
      });

      html = filteredSchools.map((item, index) => {
        const rank = index + 1;
        let rankClass = '';
        if (rank === 1) rankClass = 'rank-1';
        else if (rank === 2) rankClass = 'rank-2';
        else if (rank === 3) rankClass = 'rank-3';

        return `
          <tr>
            <td class="rank-cell"><span class="rank-badge ${rankClass}">${rank}</span></td>
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td>${escapeHtml(item.level)}</td>
            <td>${item.observations}</td>
            <td>${item.species}</td>
            <td>${item.activeStudents}</td>
          </tr>
        `;
      }).join('');
    }

    if (tableHead) tableHead.innerHTML = headerHtml;
    tableBody.innerHTML = html || `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No entries found matching filter.</td></tr>`;
  }

  if (tabInd) {
    tabInd.addEventListener('click', () => {
      currentTab = 'ind';
      tabInd.className = 'btn btn-primary';
      tabSchool.className = 'btn btn-secondary';
      render();
    });
  }

  if (tabSchool) {
    tabSchool.addEventListener('click', () => {
      currentTab = 'school';
      tabInd.className = 'btn btn-secondary';
      tabSchool.className = 'btn btn-primary';
      render();
    });
  }

  if (filterLevel) {
    filterLevel.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      render();
    });
  }

  // Initial render
  render();
}

function initPilotBanner() {
  // Check if user has already closed the banner in this session
  if (sessionStorage.getItem('pilot-banner-closed')) return;

  const banner = document.createElement('div');
  banner.id = 'pilot-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    max-width: 360px;
    background: var(--bg-glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
    transform: translateY(120%);
    opacity: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `;

  banner.innerHTML = `
    <button id="close-pilot-banner" style="
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1.1rem;
      line-height: 1;
      padding: 4px;
    " aria-label="Close Announcement">&times;</button>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.25rem;">📣</span>
      <strong style="color: var(--text-primary); font-size: 1rem; font-family: var(--font-heading);">Join the BHOF Pilot!</strong>
    </div>
    <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin: 0;">
      We are currently inviting educators and schools to help us pilot the Biodiversity Hall of Fame.
    </p>
    <a href="https://forms.gle/eRdYrgSZrgbA9EML6" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="
      font-size: 0.85rem;
      padding: 0.6rem 1.2rem;
      text-align: center;
      margin-top: 0.25rem;
    ">Express Interest</a>
  `;

  document.body.appendChild(banner);

  // Animate in after a short delay
  setTimeout(() => {
    banner.style.transform = 'translateY(0)';
    banner.style.opacity = '1';
  }, 1000);

  // Close event listener
  const closeBtn = document.getElementById('close-pilot-banner');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.style.transform = 'translateY(120%)';
      banner.style.opacity = '0';
      sessionStorage.setItem('pilot-banner-closed', 'true');
      setTimeout(() => {
        banner.remove();
      }, 400);
    });
  }

  // Mobile responsiveness adjustments via CSS style injection
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 480px) {
      #pilot-banner {
        bottom: 16px !important;
        right: 16px !important;
        left: 16px !important;
        max-width: calc(100% - 32px) !important;
      }
    }
  `;
  document.head.appendChild(style);
}
