const quoteContainer = document.getElementById("quote-container"),
  quoteText = document.getElementById("quote"),
  authorText = document.getElementById("author"),
  twitterBtn = document.getElementById("twitter"),
  newQuoteBtn = document.getElementById("new-quote"),
  loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function showNewQuote() {
  showLoadingSpinner();
  const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Check if author field is blank and replace it with 'Unknown'
  author.textContent = !randomQuote.author ? "Unknown" : randomQuote.author;

  //Check quote length to determine the styling
  if (randomQuote.text.length > 80) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote, Hide Loader
  quoteText.textContent = randomQuote.text;
  removeLoadingSpinner();
}

async function getQuotesFromAPI() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    showNewQuote();
  } catch (error) {
    //Catch Error Here- Pass an alert
  }
}

//On Load
getQuotesFromAPI();

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", showNewQuote);
twitterBtn.addEventListener("click", tweetQuote);
