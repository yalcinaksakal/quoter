const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorContainer = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector(".loader");

const showLoadingSpinner = function () {
  loader.hidden = false;
};

const hideLoadingSpinner = function () {
  loader.hidden = true;
};

const getQuote = async function () {
  const apiUrl = "https://goquotes-api.herokuapp.com/api/v1/random?count=1";

  showLoadingSpinner();
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    const { text, author } = data.quotes[0];

    if (!data) throw new Error("couldn't get quote from api");

    quoteText.innerText = text;

    // no author
    author
      ? (authorContainer.innerText = author)
      : (authorContainer.innerText = "Unknown");

    // reduce font size for long qotes
    text.length > 150
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    hideLoadingSpinner();
  } catch (error) {
    quoteText.innerText = `Please try again. Sth went wrong: ${error.message}`;
  }
};

const tweetQuote = function () {
  const quote = quoteText.innerText;
  const author = authorContainer.innerText;
  const twitterurl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterurl, "_blank");
};

// event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuote();
