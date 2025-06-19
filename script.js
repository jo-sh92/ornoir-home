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
function chargerPage(page){

  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Fichier introuvable : ${page}.html`);
      return res.text();
    })
    .then(data => {
      document.querySelector("main").innerHTML = data;
      sessionStorage.setItem("currentPage", page);

      // ← Délai léger pour laisser le DOM se mettre à jour
      setTimeout(() => {
        if (typeof initialiserFormulaire === 'function') {
          initialiserFormulaire();
        }
      }, 5000); // 50 ms suffit souvent, tu peux augmenter à 100 si besoin
    })
    .catch(err => {
      console.error("Erreur de chargement :", err);
      document.querySelector("main").innerHTML = "<p>Erreur de chargement</p>";
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
  const nom = form.querySelector('input[type="text"]');
  const email = form.querySelector('input[type="email"]');
  const mobile = form.querySelector('input[type="number"]');
  const checkbox = form.querySelector('input[type="checkbox"]');
  const message = form.querySelector('textarea');

  const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const regexMobile = /^(06|04|05)\d{7}$/;
  const regexMessage = /^\s*(\S.{8,}\S)\s*$/;

  // NOM
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
    else{clearMessage(input)}

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
    else{clearMessage(input)}
  });

  // CHECKBOX
  checkbox.addEventListener('change', (e) => {
    if (!e.currentTarget.checked) blurMessage(checkbox, "Ce champ est obligatoire");
    else SavedData("checkbox", true)
    clearMessage(nom);
  });

  // SOUMISSION
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // toujours l’empêcher d'abord

    let isValid = true;

    if (!regexNom.test(nom.value.trim())) {
      blurMessage(nom, "Nom invalide");
      isValid = false;
    }

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
    } else {
      btn.setAttribute("disabled", "");
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
body.appendChild(menu);
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
})