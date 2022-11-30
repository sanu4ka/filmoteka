import Notiflix from 'notiflix';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCzNfDORIKECOXx70pR7oyqYxQQXlNvw0I',
  authDomain: 'filmoteka-ee482.firebaseapp.com',
  projectId: 'filmoteka-ee482',
  storageBucket: 'filmoteka-ee482.appspot.com',
  messagingSenderId: '348964044133',
  appId: '1:348964044133:web:8806ca37db3ead82b0358c',
};
const refs = {
  modalCloseBtn: document.querySelector('.firebase-close'),
  backdrop: document.querySelector('[data-firebase]'),
  form: document.querySelector('.login-form'),
  showLoginForm: document.querySelector('#login'),
  login: document.querySelector('[data-login]'),
  singin: document.querySelector('[data-singin]'),
  logout: document.querySelector('#logout'),
  beforeSinginContainer: document.querySelector('.library-filter--logedout'),
  afterSinginContainer: document.querySelector('.library-filter'),
  logoutContainer: document.querySelector('.library-filter--logout'),
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

refs.modalCloseBtn.addEventListener('click', onModalOpenClose);
refs.showLoginForm.addEventListener('click', onModalOpenClose);
refs.form.addEventListener('submit', onLoginUserAction);
refs.singin.addEventListener('click', onCraetUserAction);
refs.logout.addEventListener('click', onExitUserAction);

function onModalOpenClose() {
  refs.backdrop.classList.toggle('is-hidden');
}

function onLoginUserAction(event) {
  event.preventDefault();
  const {
    elements: { email, password },
  } = event.currentTarget;

  const sendEmail = email.value;
  const sendPassword = password.value;
  signInWithEmailAndPassword(auth, sendEmail, sendPassword)
    .then(userCredential => {
      const user = userCredential.user.email;
      Notiflix.Notify.success(`User ${user} logged in.`);
      console.log(`User ${user} logged in.`);
      refs.beforeSinginContainer.classList.toggle('visually-hidden');
      refs.afterSinginContainer.classList.toggle('visually-hidden');
      refs.logoutContainer.classList.toggle('visually-hidden');
      onModalOpenClose();
    })
    .catch(onError);
}

function onCraetUserAction() {
  const {
    elements: { email, password },
  } = refs.form;

  const sendEmail = email.value;
  const sendPassword = password.value;
  createUserWithEmailAndPassword(auth, sendEmail, sendPassword)
    .then(userCredential => {
      var user = userCredential.user.email;
      Notiflix.Notify.success(
        `User ${user} was successfully created. Now you can login.`
      );
      console.log(`User ${user} was successfully created. Now you can login.`);
      refs.form.reset();
    })
    .catch(onError);
}

function onExitUserAction() {
  signOut(auth);
  Notiflix.Notify.failure('You are logged out.');
  refs.beforeSinginContainer.classList.toggle('visually-hidden');
  refs.afterSinginContainer.classList.toggle('visually-hidden');
  refs.logoutContainer.classList.toggle('visually-hidden');
}

function onError() {
  Notiflix.Notify.failure(
    'Error creating user. User exists or database error. Please try again.'
  );
  console.error(
    'Error creating user. User exists or database error. Please try again.'
  );
}
