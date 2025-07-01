let endscrollvalue=0
const header=document.querySelector('.header')
window.addEventListener("scroll",()=>{
    if(window.scrollY>endscrollvalue){
        header.style.top='-80px'
    }else{
        header.style.top='0px'        
    }
    endscrollvalue=window.scrollY
})
// Charger les pages web
function chargerPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok)
        throw new Error(`Fichier introuvable : ${page}.html`);
      return res.text();
    })
    .then(data => {
      // Injecte le HTML dans la balise <main>
      document.querySelector("main").innerHTML = data;

      // Sauvegarde la page dans sessionStorage
      sessionStorage.setItem("currentPage", page);

      const styleLink = document.getElementById("style-page");
      if (styleLink) {
        styleLink.setAttribute("href", `styles/${page}.css`);
      }

      // Délai pour s'assurer que le DOM est prêt
      setTimeout(() => {
        if (typeof initialiserLightbox === 'function') initialiserLightbox();
        if (typeof initialiserFormulaire === 'function') initialiserFormulaire();
        // Mise à jour du fichier CSS lié à la page
      
      }, 100);
    })
    .catch(err => {
      console.error("Erreur de chargement :", err);
      document.querySelector("main").innerHTML = "<p>Erreur de chargement de la page.</p>";
    });
}
  // Quand la page se charge
window.addEventListener('DOMContentLoaded', () => {
  // Vérifie s'il y a une page enregistrée
  const savedPage = sessionStorage.getItem("currentPage") || "page1";
  
  // Charge cette page
  chargerPage(savedPage);
});

// Fonction d'initialisation du formulaire
function initialiserFormulaire() {
  const form = document.querySelector('form');
  if (!form) return; // si pas de formulaire, on quitte

  const btn = form.querySelector('button[type="submit"]');
  const noms = form.querySelectorAll('input[type="text"]');
  const email = form.querySelector('input[type="email"]');
  const mobile = form.querySelector('input[type="tel"]');
  const checkbox = form.querySelector('input[type="checkbox"]');
  const message = form.querySelector('textarea');

  const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const regexMobile = /^(06|04|05)\d{7}$/;
  const regexMessage = /^\s*(\S.{8,}\S)\s*$/;

  // NOM
  noms.forEach(nom=>{
  nom.addEventListener('focus', () => {
    if (nom.value.trim() === "") focusMessage(nom, "Veuillez entrer un nom");
  });
  nom.addEventListener('input', () => {
    if (!regexNom.test(nom.value.trim())) inputMessage(nom, "Nom invalide");
    else SavedData("Nom", nom.value.trim())
    clearMessage(nom)
;
  });
  nom.addEventListener('blur', () => {
    if (!regexNom.test(nom.value.trim())) blurMessage(nom, "Ce champ est obligatoire");

  });
})
  // EMAIL
  email.addEventListener('focus', () => {
    if (email.value.trim() === "") focusMessage(email, "Veuillez entrer votre adresse mail");
  });
  email.addEventListener('input', () => {
    if (!regexEmail.test(email.value.trim())) inputMessage(email, "Email invalide");
    else SavedData("Email", email.value.trim())
    clearMessage(email);
  });
  email.addEventListener('blur', () => {
    if (!regexEmail.test(email.value.trim())) blurMessage(email, "Ce champ est obligatoire")

  });
      btn.setAttribute("disabled", "");

  // MOBILE
  mobile.addEventListener('focus', () => {
    if (mobile.value.trim() === "") focusMessage(mobile, "Veuillez entrer votre numéro de téléphone");
  });
  mobile.addEventListener('input', () => {
    if (!regexMobile.test(mobile.value.trim())) inputMessage(mobile, "Numéro invalide");
    else if (mobile.value.trim().length > 9) inputMessage(mobile, "Trop long !");
    else SavedData("Mobile", mobile.value.trim())
    clearMessage(mobile);
  });
  mobile.addEventListener('blur', () => {
    if (!regexMobile.test(mobile.value.trim())) blurMessage(mobile, "Ce champ est obligatoire");
    else{clearMessage(mobile)}

  });

  // MESSAGE
  message.addEventListener('focus', () => {
    if (message.value.trim() === "") focusMessage(message, "Veuillez entrer votre message");
  });
  message.addEventListener('input', () => {
    if (!regexMessage.test(message.value.trim())) inputMessage(message, "Entrer au moins 10 caractères");
    else SavedData("Message", message.value.trim())
    clearMessage(message);
  });
  message.addEventListener('blur', () => {
    if (!regexMessage.test(message.value.trim())) blurMessage(message, "Ce champ est obligatoire");
    else{clearMessage(message)}
  });

  // CHECKBOX
  checkbox.addEventListener('change', (e) => {
    if (!e.currentTarget.checked) blurMessage(checkbox, "Ce champ est obligatoire");
    else SavedData("checkbox", true)
    clearMessage(checkbox);
  });

  // SOUMISSION
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // toujours l’empêcher d'abord

    let isValid = true;

    noms.forEach(nom=>{if (!regexNom.test(nom.value.trim())) {
      blurMessage(nom, "Nom invalide");
      isValid = false;}})

    if (!regexEmail.test(email.value.trim())) {
      blurMessage(email, "Email invalide");
      isValid = false;
    }

    if (!regexMobile.test(mobile.value.trim())) {
      blurMessage(mobile, "Numéro invalide");
      isValid = false;
    }

    if (!regexMessage.test(message.value.trim())) {
      blurMessage(message, "Message trop court");
      isValid = false;
    }

    if (!checkbox.checked) {
      blurMessage(checkbox, "Ce champ est obligatoire");
      isValid = false;
    }

    if (isValid) {
      form.submit(); // tout est valide → envoi
      alert('✅ formulaire envoyé ')
      
    } 
  });
}
// Fonctions utilitaires
function SavedData(cle, valeur) {
  localStorage.setItem(cle, JSON.stringify(valeur));
}

function focusMessage(input, Message) {
  const input_box = input.parentElement;
  const small = input_box.querySelector('small');
  if (small) {
    small.textContent = Message;
    small.style.color = "gray";
    small.style.visibility = "visible";
  }
}

function inputMessage(input, Message) {
  const input_box = input.parentElement;
  const small = input_box.querySelector('small');
  if (small) {
    small.textContent = Message;
    small.style.color = "red";
    small.style.visibility = "visible";
  }
}

function blurMessage(input, Message) {
  const input_box = input.parentElement;
  const small = input_box.querySelector('small');
  if (small) {
    small.textContent = Message;
    small.style.color = "red";
    small.style.visibility = "visible";
  }
}
function clearMessage(input){
  const input_box = input.parentElement;
  const small = input_box.querySelector('small');
  small.style.visibility = "hidden";
}

// Creation du Menu
const body = document.body;
// Ajoute le menu au DOM

const nav=document.querySelector('nav')
const select=document.querySelector('.header__call__select')
const menu=document.createElement('div')
header.appendChild(menu)
menu.classList.add('menu')

// cloner navbar et le select
const navbar=document.createElement('div')
navbar.innerHTML=nav.innerHTML
const select_clone=select.cloneNode(true)
menu.appendChild(navbar)
menu.appendChild(select_clone)
select_clone.classList.add('select_clone')
navbar.classList.add('navbar')

// cacher ou apparaitre le menu
const burger=document.querySelector('.burger')
burger.addEventListener('click',()=>{
  menu.classList.toggle('active')
  burger.classList.toggle('active')
  document.body.classList.toggle('active')
})
const main=document.querySelector('main')
main.addEventListener('click',()=>{
  menu.classList.remove('active')
  burger.classList.remove('active')
  document.body.classList.remove('active')
})
// Click sur image
let currentIndex = 0;
let imagesArray = [];

function initialiserLightbox() {
  // Création si pas déjà dans le DOM
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);
  }
const footer=document.querySelector('footer')
  // Contenu HTML
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="" alt="image en grand">
    <button class="lightbox-prev"><i class="fa-solid fa-arrow-left"></i></button>
    <button class="lightbox-next"><i class="fa-solid fa-arrow-right"></i></button>
  `;

  const imgLightbox = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const prevBtn = lightbox.querySelector('.lightbox-prev');

  // Récupère toutes les images visibles (hors logo, etc.)
imagesArray = Array.from(document.querySelectorAll('img')).filter(img => {
  return !img.closest('header') && !img.closest('footer');
});

  // Ajout des événements sur chaque image
  imagesArray.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage();
      lightbox.style.display = 'flex';
    });
  });

  // Fonction pour afficher une image
  function showImage() {
    imgLightbox.src = imagesArray[currentIndex].src;
  }

  // Navigation
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imagesArray.length;
    showImage();
  });
  nextBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
    e.preventDefault(); // Évite le scroll sur "espace"
    currentIndex = (currentIndex + 1) % imagesArray.length;
    showImage();
  }
});


  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
    showImage();
  });
prevBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
    e.preventDefault(); // Évite le scroll sur "espace"
    currentIndex = (currentIndex + 1) % imagesArray.length;
    showImage();
  }
});

  // Fermeture
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
}
let lcp;
const observer = new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  lcp = entries[entries.length - 1];
});
observer.observe({ type: 'largest-contentful-paint', buffered: true });
