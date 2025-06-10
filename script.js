let endscrollvalue=0
const header=document.querySelector('header')
window.addEventListener('scroll',()=>{
    if(window.scrollY>endscrollvalue){
        header.style.top='-80px'
    }else{
        header.style.top='0px'        
    }
    endscrollvalue=window.scrollY

})
// Charger les pages web
function chargerPage(page) {
      fetch(`${page}.html`)
        .then(res => res.text())
        .then(data => {
          document.querySelector("main").innerHTML = data;
        })
        .catch(err => {
          document.querySelector("main").innerHTML = "<p>Erreur de chargement</p>";
        });
    }
    

// FORMULAIRE

const nom = document.querySelector('#nom');
const email = document.querySelector('#email');
const numero = document.querySelector('#numero');
const message = document.querySelector('#message');
const form=document.querySelector('form')
const regexNom = /^[a-zA-ZÀ-ÿ\s'-]+$/;
const regexEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,5}$/;
const regexNumero = /^0[4-6][0-9]{7}$/;
form.addEventListener('submit',(e)=>{
    e.preventDefault
})
// === NOM ===
nom.addEventListener('focus', () => {
    if(nom)
    showInfo(nom, 'Entrez votre nom complet');
});
nom.addEventListener('blur', () => {
    if (nom.value.trim() === '') {
        showError(nom, 'Ce champ est obligatoire');
    }
});
nom.addEventListener('input', () => {
    if (!regexNom.test(nom.value.trim())) {
        showError(nom, 'Nom invalide');
    } else {
        clearError(nom);
    }
});

// === EMAIL ===
email.addEventListener('focus', () => {
    showInfo(email, 'Entrez une adresse email valide');
});
email.addEventListener('blur', () => {
    if (email.value.trim() === '') {
        showError(email, 'Ce champ est obligatoire');
    }
});
email.addEventListener('input', () => {
    if (!regexEmail.test(email.value.trim())) {
        showError(email, 'Adresse email invalide');
    } else {
        clearError(email);
    }
});

// === NUMÉRO ===
numero.addEventListener('focus', () => {
    showInfo(numero, 'Entrez un numéro commençant par 05, 06 ou 07');
});
numero.addEventListener('blur', () => {
    if (numero.value.trim() === '') {
        showError(numero, 'Ce champ est obligatoire');
    }
});
numero.addEventListener('input', () => {
    if (!regexNumero.test(numero.value.trim())) {
        showError(numero, 'Numéro invalide (ex: 0601020304)');
    } else {
        clearError(numero);
    }
});

// === MESSAGE ===
message.addEventListener('focus', () => {
    showInfo(message, 'Entrez votre message (au moins 10 caractères)');
});
message.addEventListener('blur', () => {
    if (message.value.trim() === '') {
        showError(message, 'Ce champ est obligatoire');
    }
});
message.addEventListener('input', () => {
    if (message.value.trim().length < 10) {
        showError(message, 'Veuillez entrer au moins 10 caractères');
    } else {
        clearError(message);
    }
});

// === Fonctions utilitaires ===
function showError(input, message) {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector('small');
    small.textContent = message;
    small.style.visibility = 'visible';
    small.style.color = 'red';
}

function showInfo(input, message) {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector('small');
    small.textContent = message;
    small.style.visibility = 'visible';
    small.style.color = 'gray';
}

function clearError(input) {
    const inputBox = input.parentElement;
    const small = inputBox.querySelector('small');
    small.textContent = '';
    small.style.visibility = 'hidden';
}


// localStorage
function Storage(cle,valeur){
    localStorage.setItem(cle,JSON.stringify(valeur))
}
// cacher et afficher le menu de navigation
const menu=document.querySelector('.menu')
const menuIcon=document.querySelector('.fa-bars')
menuIcon.addEventListener('click',()=>{
    menu.classList.toggle('menu-visible')
    
});

const closeWindow=document.querySelector('.fa-xmark')
closeWindow.addEventListener('click',()=>{
    menu.classList.remove('menu-visible')
})
// language select
const caret_down=document.querySelector('.fa-caret-down')
const caret_up=document.querySelector('.fa-caret-up')

// document.querySelector('select').addEventListener('click',()=>{
//     caret_down.
//     caret_up.style.display='inline'
// })
