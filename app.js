// DOM Selectors
const containerEl = document.querySelector('.container');
const headerEl = document.querySelector('.header');
const headerBtn = document.querySelector('.header__btn');
const quoteEl = document.querySelector('.quote');
const quoteAuthorEl = document.querySelector('.quote__author');
const copyBtn = document.querySelector('.menu__btn');

// API Call
const API = 'https://quotes15.p.rapidapi.com/quotes/random/';
const API_KEY = env.API_KEY;

function fetchRandomQuote() {
  fetch(`${API}?rapidapi-key=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        setQuoteToDOM(
          'Ooops something went wrong, try to refresh page :)',
          'This page'
        );
        throw Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => {
      setQuoteToDOM(data.content, data.originator.name);
    });
}

fetchRandomQuote();

// Set Quote To DOM
function setQuoteToDOM(quoteText, quoteAuthor) {
  const markElement = document.createElement('mark');
  markElement.classList.add('quote_mark');
  quoteEl.appendChild(markElement);
  setHslColorToElement(markElement, randomHue + 180, '75%', '50%');
  markElement.textContent = `"${quoteText}"`;

  quoteAuthorEl.textContent = `\u2014 ${quoteAuthor}`;
}

// Generate And Set Colors
const getRandomHue = () => Math.floor(Math.random() * 360);
let randomHue = getRandomHue();

function setHslColorToElement(el, hue, saturation, ligtness) {
  el.style.backgroundColor = `hsl(${hue}, ${saturation}, ${ligtness})`;
}

setHslColorToElement(containerEl, randomHue, '75%', '50%');
setHslColorToElement(headerEl, randomHue, '70%', '40%');
setHslColorToElement(headerBtn, randomHue + 180, '75%', '50%');
setHslColorToElement(copyBtn, randomHue, '75%', '40%');

// Copy To Clipboard
function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

// Listeners
copyBtn.addEventListener('click', () => {
  const quoteWithAuthorString = `${quoteEl.textContent} ${quoteAuthorEl.textContent}`;
  copyToClipboard(quoteWithAuthorString);
});

headerBtn.addEventListener('click', () => {
  quoteEl.removeChild(document.querySelector('mark'));
  quoteAuthorEl.textContent = '';

  randomHue = getRandomHue();
  setHslColorToElement(containerEl, randomHue, '75%', '50%');
  setHslColorToElement(headerEl, randomHue, '70%', '40%');
  setHslColorToElement(headerBtn, randomHue + 180, '75%', '50%');
  setHslColorToElement(copyBtn, randomHue, '75%', '40%');
  fetchRandomQuote();
});
