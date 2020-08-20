// DOM Selectors
const container = document.querySelector('.container');
const quote_mark = document.querySelector('.quote__mark');
const quote_author = document.querySelector('.quote__author');

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
function generateHslaColors(saturation, ligtness) {
  const randomColor = Math.floor(Math.random() * 360);

  container.style.backgroundColor = `hsl(${randomColor}, ${saturation}, ${ligtness})`;
  quote_mark.style.backgroundColor = `hsl(${
    randomColor + 90
  }, ${saturation}, ${ligtness})`;
}

generateHslaColors('75%', '50%');
