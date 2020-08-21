// DOM Selectors
const containerEl = document.querySelector('.container');
const quoteEl = document.querySelector('.quote');
const quoteAuthorEl = document.querySelector('.quote__author');
const copyBtn = document.querySelector('#copy');
const toolTips = document.querySelectorAll('[data-tooltip]');

// API Call
const API = 'https://quotes15.p.rapidapi.com/quotes/random/';
const API_KEY = '3bf398bdb6mshdc090e989c8ff4bp194aa4jsn310893005fe8';

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
      // console.log(data);
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
  markElement.innerText = `"${quoteText}"`;

  quoteAuthorEl.innerText = `\u2014 ${quoteAuthor}`;
}

// Generate And Set Colors
const randomHue = Math.floor(Math.random() * 360);

function setHslColorToElement(el, hue, saturation, ligtness) {
  el.style.backgroundColor = `hsl(${hue}, ${saturation}, ${ligtness})`;
}

setHslColorToElement(containerEl, randomHue, '75%', '50%');
toolTips.forEach((tooltip) => {
  setHslColorToElement(tooltip, randomHue + 180, '75%', '50%');
});

// Copy To Clipboard
function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

const quoteWithAuthorString = `${quoteEl.textContent} ${quoteAuthorEl.textContent}`;
copyBtn.addEventListener('click', () => copyToClipboard(quoteWithAuthorString));
