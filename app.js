// DOM Selectors
const container = document.querySelector('.container');
const quote_mark = document.querySelector('.quote__mark');
const quote_author = document.querySelector('.quote__author');
const copyBtn = document.querySelector('#copy');
const toolTips = document.querySelectorAll('[data-tooltip]');

// API Call
const API = 'https://quotes15.p.rapidapi.com/quotes/random/';
const API_KEY = '3bf398bdb6mshdc090e989c8ff4bp194aa4jsn310893005fe8';

function getRandomQuote() {
  fetch(`${API}?rapidapi-key=${API_KEY}`)
    .then((response) => {
      if (!response.ok) {
        throw Error('Error');
      }

      return response.json();
    })
    .then((data) => {
      // console.log(data);
      quote_mark.innerText = `"${data.content}"`;
      quote_author.innerText = `\u2014 ${data.originator.name}`;
    });
}

getRandomQuote();

// Generate Colors
function generateAndSetRandomColors(saturation, ligtness) {
  const randomColor = Math.floor(Math.random() * 360);

  container.style.backgroundColor = `hsl(${randomColor}, ${saturation}, ${ligtness})`;
  quote_mark.style.backgroundColor = `hsl(${
    randomColor + 180
  }, ${saturation}, ${ligtness})`;

  toolTips.forEach((tooltip) => {
    tooltip.style.backgroundColor = `hsl(${
      randomColor + 180
    }, ${saturation}, ${ligtness})`;
  });
}

generateAndSetRandomColors('75%', '50%');

// Copy To Clipboard
function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

copyBtn.addEventListener('click', () =>
  copyToClipboard(quote_mark.textContent)
);
