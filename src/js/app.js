document.addEventListener("DOMContentLoaded", () => {


  if (!window.location.hash) {
    history.replaceState(null, null, "#accueil"); // Force le hash #accueil si inexistant
  }
  handleHashChange(location.hash); // Charge la page correspondante

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
   * SECTION 1: Navigation - Gestion des liens actifs
   * Met à jour l'état actif des liens de navigation en fonction du hash de l'URL.
   */
  
  function updateActiveLink() {
    const links = document.querySelectorAll(".nav-item"); // Sélectionne tous les liens dans la barre de navigation
    const currentHash = window.location.hash || "/"; // Utilise le hash de l'URL ou "/" si aucun hash n'est présent.

    // Réinitialiser les classes "active" sur les spans et icônes
    links.forEach(link => {
        const span = link.querySelector('span'); // Sélectionne le span dans le lien
        const icon = link.querySelector('i'); // Sélectionne l'icône dans le lien

        if (span) {
            span.classList.remove("active"); // Supprime uniquement la classe "active" du span
        }
        if (icon) {
            icon.classList.remove("active"); // Supprime uniquement la classe "active" de l'icône
        }
    });

    // Activer le lien correspondant au hash
    links.forEach(link => {
        if (link.getAttribute("href") === currentHash) {
            const span = link.querySelector('span'); // Sélectionne le span dans le lien
            const icon = link.querySelector('i'); // Sélectionne l'icône dans le lien

            if (span) {
                span.classList.add("active"); // Ajoute uniquement la classe "active" au span
            }
            if (icon) {
                icon.classList.add("active"); // Ajoute uniquement la classe "active" à l'icône
            }
        }
    });
}




  /**
   * SECTION 2: Filtrage des projets
   * Cette section est commentée, mais voici ce qu'elle ferait si elle était activée :
   * Permet de filtrer les projets affichés en fonction de la catégorie sélectionnée.
   */
  // const filterButtons = document.querySelectorAll(".filter-btn"); // Sélectionne tous les boutons de filtrage
  // const projects = document.querySelectorAll(".project"); // Sélectionne tous les projets à filtrer

  // // Ajoute un gestionnaire d'événements pour chaque bouton de filtre
  // filterButtons.forEach(button => {
  //   button.addEventListener("click", () => {
  //     const category = button.getAttribute("data-category"); // Récupère la catégorie sélectionnée

  //     // Affiche ou masque les projets en fonction de leur catégorie
  //     projects.forEach(project => {
  //       if (category === "all" || project.getAttribute("data-category") === category) {
  //         project.style.display = "block"; // Affiche les projets correspondant à la catégorie
  //       } else {
  //         project.style.display = "none"; // Masque les projets qui ne correspondent pas
  //       }
  //     });
  //   });
  // });

  function activeCardsProject (){
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const isActive = card.classList.contains("active");
  
        // Désactiver toutes les cartes
        cards.forEach((c) => {
          c.classList.remove("active");
          const details = c.querySelector(".card-details");
          details.classList.add("opacity-0", "pointer-events-none"); // Masquer le contenu
        });
  
        // Activer la carte cliquée si elle n'était pas active
        if (!isActive) {
          card.classList.add("active");
          const details = card.querySelector(".card-details");
          details.classList.remove("opacity-0", "pointer-events-none"); // Afficher le contenu
          details.classList.add("opacity-100", "pointer-events-auto"); // Rendre interactif
        }
      });
    });
  
    // Fermer les cartes si clic en dehors
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".card")) {
        cards.forEach((card) => {
          card.classList.remove("active");
          const details = card.querySelector(".card-details");
          details.classList.add("opacity-0", "pointer-events-none"); // Masquer le contenu
        });
      }
    });
  }

 /**
   * SECTION 2: Gestion des vidéos
   */
 function initializeVideoHandlers() {
  document.querySelectorAll(".play-video").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const videoSrc = button.getAttribute("data-video");
      document.getElementById("video-source").setAttribute("src", videoSrc);
      document.getElementById("video-modal").classList.remove("hidden");
      document.body.classList.add("modal-open");
      document.getElementById("video-player").load();
    });
  });

  document.getElementById("close-modal").addEventListener("click", () => {
    const videoPlayer = document.getElementById("video-player");
    document.getElementById("video-modal").classList.add("hidden");
    document.body.classList.remove("modal-open");
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  });
 } 

function initializeFilterExp() {
  // Sélection des éléments
  const btnProfessionnel = document.getElementById('btn-professionnel');
  const btnAcademique = document.getElementById('btn-academique');
  const pageProfessionnel = document.getElementById('page-professionnel');
  const pageAcademique = document.getElementById('page-academique');

  // Fonction pour mettre à jour l'état des boutons et des pages
  function toggleState(activeButton, inactiveButton, activePage, inactivePage) {
    // Afficher la page active et masquer la page inactive
    activePage.classList.remove('hidden');
    inactivePage.classList.add('hidden');

    // Mettre à jour le style du bouton actif
    activeButton.classList.add('bg-gray-700', 'text-white');
    activeButton.classList.remove('bg-gray-100', 'text-gray-800', 'border-6', 'sm:border-8');

    // Réinitialiser le style du bouton inactif
    inactiveButton.classList.add('bg-gray-100', 'text-gray-800', 'border-6', 'sm:border-8');
    inactiveButton.classList.remove('bg-gray-700', 'text-white');
  }

  // Gestionnaires d'événements
  btnProfessionnel.addEventListener('click', () => {
    toggleState(btnProfessionnel, btnAcademique, pageProfessionnel, pageAcademique);
  });

  btnAcademique.addEventListener('click', () => {
    toggleState(btnAcademique, btnProfessionnel, pageAcademique, pageProfessionnel);
  });
}



  /**
   * SECTION 3: Chargement dynamique des pages
   * Charge dynamiquement les pages HTML en fonction du hash de l'URL.
   */
  function loadPage(page) {
    const contentDiv = document.getElementById("main-content"); // Conteneur principal du contenu
  
    // Charge le fichier HTML correspondant à la page
    fetch(`${page}.html`)
      .then(response => {
        if (!response.ok) throw new Error("Page non trouvée"); // Gère l'erreur si la page n'existe pas
        return response.text(); // Récupère le contenu HTML de la page
      })
      .then(html => {
        contentDiv.innerHTML = html; // Insère le contenu HTML dans le conteneur de contenu
  
        // Réinitialise les composants Flowbite après le chargement de la page
        if (typeof initFlowbite === "function") {
          initFlowbite(); // Initialisation des composants Flowbite si nécessaire
        }
  
        // Vérifie si la page est "realisations" et manipule les éléments après chargement
        if (page === "realisations") {
          activeCardsProject();
          initializeVideoHandlers(); // Appelle la gestion des vidéos après le chargement
        }

        if (page === "parcours") {
          initializeFilterExp(); // Appelle la gestion des vidéos après le chargement
        }
      })
      .catch(() => {
        // En cas d'erreur, charge une page d'erreur (404.html)
        fetch("404.html")
          .then(response => {
            if (!response.ok) throw new Error("Erreur lors du chargement de 404.html");
            return response.text(); // Récupère le contenu HTML de la page 404
          })
          .then(html => {
            contentDiv.innerHTML = html; // Insère la page 404 dans le conteneur
          })
          .catch(error => {
            // Message d'erreur générique si même la page 404 échoue
            console.error("Erreur lors du chargement de la page 404 :", error);
            contentDiv.innerHTML = `<p class="text-red-500 text-center">Une erreur est survenue.</p>`; // Affiche un message d'erreur
          });
      });
  }
  

  /**
   * SECTION 4: Gestion du hash et navigation
   * Gère les changements de hash dans l'URL pour charger les pages correspondantes.
   */
  function handleHashChange(hash) {
    const currentHash = hash.replace("#", "").trim(); // Extrait le nom de la page depuis le hash
    const validHashes = ["accueil","realisations", "parcours", "contact"]; // Liste des hashes valides

    if (currentHash && validHashes.includes(currentHash)) {
      loadPage(currentHash); // Charge la page correspondant au hash
      updateActiveLink(); // Met à jour l'état actif des liens de la navigation

      // Met à jour l'URL sans recharger la page (grâce à history.pushState)
      history.pushState(null, null, `#${currentHash}`);
    }

    if (!currentHash || !validHashes.includes(currentHash)) {
      currentHash = "accueil"; // Charge "accueil" si le hash est vide ou invalide
      loadPage(currentHash); // Charge la page correspondant au hash
    updateActiveLink(); // Met à jour l'état actif des liens de navigation
      history.replaceState(null, null, `#${currentHash}`); // Met à jour l'URL proprement
    }
  
    
  }

  /**
   * SECTION 5: Animation des barres de progression
   * Anime les barres de progression lorsque l'utilisateur les fait défiler dans la vue.
   */
  // const widthProgress = document.getElementsByClassName("progress"); // Sélectionne toutes les barres de progression
  // const sectionSkills = document.querySelector(".techno-skills"); // Section contenant les barres de progression

  /**
   * Met à jour une barre de progression avec une valeur donnée.
   * @param {HTMLElement} progressBar - Élément de la barre de progression
   * @param {number} value - Valeur de la progression (en %)
   */
  // const updateProgree = (progressBar, value) => {
  //   value = Math.round(value); // Arrondit la valeur de la progression
  //   progressBar.querySelector('.fill').style.width = `${value}%`; // Ajuste la largeur de la barre remplie
  // };

  /**
   * Anime toutes les barres de progression avec leurs valeurs.
   */
  // const animationSkills = () => {
  //   for (const item of widthProgress) {
  //     let valueProgress = item.getAttribute('data-progress'); // Récupère la valeur de progression de chaque barre
  //     updateProgree(item, valueProgress); // Met à jour chaque barre avec sa valeur
  //   }
  // };

  /**
   * Cache les animations des barres de progression (les remet à 0) si la section est hors de la vue.
   */
  // const hideAnimationSkills = () => {
  //   for (const item of widthProgress) {
  //     updateProgree(item, 0); // Réinitialise toutes les barres à 0%
  //   }
  // };

  /**
   * Détecte le défilement de la page pour animer les barres de progression.
   */
  // window.onscroll = () => {
  //   const sectionPosition = sectionSkills.getBoundingClientRect().top; // Récupère la position de la section des compétences
  //   const screenPosition = window.innerHeight; // Récupère la hauteur de l'écran visible

  //   // Si la section est visible, on anime les barres de progression, sinon on les cache
  //   if (sectionPosition < screenPosition) {
  //     animationSkills(); // Anime les barres
  //   } else {
  //     hideAnimationSkills(); // Cache les barres
  //   }
  // };

  /**
   * SECTION 6: Initialisation
   * Initialise l'application en fonction du hash actuel et gère les changements de hash.
   */
  window.addEventListener("load", () => {
    const currentHash = window.location.hash.replace("#", ""); // Récupère le hash actuel depuis l'URL

    if (currentHash) {
      handleHashChange(currentHash); // Charge la page correspondante si le hash est valide
    }
  });

  // Gère les changements de hash dans l'URL (navigation utilisateur)
  window.addEventListener("hashchange", () => {
    const currentHash = window.location.hash.replace("#", ""); // Récupère le nouveau hash
    handleHashChange(currentHash); // Charge la page correspondante
  });



 

  // Mise à jour initiale des liens actifs
  updateActiveLink();
  // animationSkills(); // Lance l'animation des barres de progression à l'initialisation
});
