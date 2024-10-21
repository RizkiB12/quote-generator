"use strict";

const quoteTxt = document.querySelector(".quote");
const btnQuote = document.querySelector(".btn-quote");
const authorEl = document.querySelector(".author");
const copyEl = document.querySelector(".copy");
const twitterEl = document.querySelector(".twitter");
const messageEl = document.querySelector(".message");

//=============== Random Quote Generator================
async function randomQuote() {
  btnQuote.textContent = "loading";

  try {
    const data = await fetch("http://api.quotable.io/random");
    console.log(data);
    const result = await data.json();
    const { content, author } = result;
    quoteTxt.textContent = content;
    authorEl.textContent = author;
  } catch (error) {
    quoteTxt.textContent = "Failed to load Quote";
  } finally {
    btnQuote.textContent = "New Quote";
  }
}

//================ Load quote on page load ================
document.addEventListener("DOMContentLoaded", randomQuote);

//============== Btn Events==================
copyEl.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteTxt.innerText);
  messageEl.classList.add("active");

  setInterval(() => {
    messageEl.classList.remove("active");
  }, 2500);
});

twitterEl.addEventListener("click", () => {
  let tweet = `https://twitter.com/intent/tweet?url=${quoteTxt.innerText}`;
  window.open(tweet, "_blank");
});

btnQuote.addEventListener("click", randomQuote);
