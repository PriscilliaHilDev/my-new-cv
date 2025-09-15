document.addEventListener("DOMContentLoaded", () => {
  /**
   * THEME TOGGLE - Dark/Light
   */
const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  // Vérifie le choix sauvegardé ou le système
  const stored = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored === "dark" || (!stored && systemPrefersDark);

  setTheme(isDark);
  toggle.checked = isDark;

  toggle.addEventListener("change", () => {
    setTheme(toggle.checked);
  });

  function setTheme(isDark) {
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
  /**
   * SECTION 1: Navigation - liens actifs
   */
  function updateActiveLink() {
    const links = document.querySelectorAll(".nav-item");
    let currentHash = window.location.hash || "/";

    links.forEach((link) => {
      const span = link.querySelector("span");
      const icon = link.querySelector("i");
      if (span) span.classList.remove("active");
      if (icon) icon.classList.remove("active");
    });

    links.forEach((link) => {
      if (link.getAttribute("href") === currentHash) {
        const span = link.querySelector("span");
        const icon = link.querySelector("i");
        if (span) span.classList.add("active");
        if (icon) icon.classList.add("active");
      }
    });
  }

  /**
   * SECTION cartes projets
   */
  function activeCardsProject() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const isActive = card.classList.contains("active");

        cards.forEach((c) => {
          c.classList.remove("active");
          const details = c.querySelector(".card-details");
          if (details) {
            details.classList.add("opacity-0", "pointer-events-none");
          }
        });

        if (!isActive) {
          card.classList.add("active");
          const details = card.querySelector(".card-details");
          if (details) {
            details.classList.remove("opacity-0", "pointer-events-none");
            details.classList.add("opacity-100", "pointer-events-auto");
          }
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".card")) {
        cards.forEach((card) => {
          card.classList.remove("active");
          const details = card.querySelector(".card-details");
          if (details) {
            details.classList.add("opacity-0", "pointer-events-none");
          }
        });
      }
    });
  }

  /**
   * SECTION vidéos
   */
  function initializeVideoHandlers() {
    document.querySelectorAll(".play-video").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const videoSrc = button.getAttribute("data-video");
        document.getElementById("video-source").setAttribute("src", videoSrc);
        document.getElementById("video-modal").classList.remove("hidden");
        document.body.classList.add("modal-open");
        document.getElementById("video-player").load();
      });
    });

    const closeBtn = document.getElementById("close-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const videoPlayer = document.getElementById("video-player");
        document.getElementById("video-modal").classList.add("hidden");
        document.body.classList.remove("modal-open");
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
      });
    }
  }

  /**
   * SECTION filtres parcours
   */
  function initializeFilterExp() {
    const btnProfessionnel = document.getElementById("btn-professionnel");
    const btnAcademique = document.getElementById("btn-academique");
    const pageProfessionnel = document.getElementById("page-professionnel");
    const pageAcademique = document.getElementById("page-academique");

    function toggleState(activeButton, inactiveButton, activePage, inactivePage) {
      activePage.classList.remove("hidden");
      inactivePage.classList.add("hidden");

      activeButton.classList.add("bg-gray-700", "text-white");
      activeButton.classList.remove("bg-gray-100", "text-gray-800");

      inactiveButton.classList.add("bg-gray-100", "text-gray-800");
      inactiveButton.classList.remove("bg-gray-700", "text-white");
    }

    if (btnProfessionnel && btnAcademique) {
      btnProfessionnel.addEventListener("click", () => {
        toggleState(btnProfessionnel, btnAcademique, pageProfessionnel, pageAcademique);
      });

      btnAcademique.addEventListener("click", () => {
        toggleState(btnAcademique, btnProfessionnel, pageAcademique, pageProfessionnel);
      });
    }
  }

  /**
   * SECTION chargement dynamique
   */
  function loadPage(page) {
    const contentDiv = document.getElementById("main-content");
    fetch(`${page}.html`)
      .then((response) => {
        if (!response.ok) throw new Error("Page non trouvée");
        return response.text();
      })
      .then((html) => {
        contentDiv.innerHTML = html;

        if (typeof initFlowbite === "function") {
          initFlowbite();
        }

        if (page === "realisations") {
          activeCardsProject();
          initializeVideoHandlers();
        }

        if (page === "parcours") {
          initializeFilterExp();
        }
      })
      .catch(() => {
        fetch("404.html")
          .then((response) => {
            if (!response.ok) throw new Error("Erreur 404");
            return response.text();
          })
          .then((html) => {
            contentDiv.innerHTML = html;
          })
          .catch((error) => {
            console.error("Erreur 404 :", error);
            contentDiv.innerHTML = `<p class="text-red-500 text-center">Une erreur est survenue.</p>`;
          });
      });
  }

  /**
   * SECTION hash navigation
   */
  function handleHashChange(hash) {
    let currentHash = hash.replace("#", "").trim();
    const validHashes = ["accueil", "realisations", "parcours", "contact"];

    if (currentHash && validHashes.includes(currentHash)) {
      loadPage(currentHash);
      updateActiveLink();
      history.pushState(null, null, `#${currentHash}`);
    } else {
      currentHash = "accueil";
      loadPage(currentHash);
      updateActiveLink();
      history.replaceState(null, null, `#${currentHash}`);
    }
  }

  // Initialisation
  window.addEventListener("load", () => {
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash) {
      handleHashChange(currentHash);
    }
  });

  window.addEventListener("hashchange", () => {
    const currentHash = window.location.hash.replace("#", "");
    handleHashChange(currentHash);
  });

  updateActiveLink();
});
