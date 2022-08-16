const searchInput = document.querySelector('input[type="search"');
const gridItems = document.querySelectorAll(".md-typeset .grid > :-webkit-any(.admonition, details)");
const cards = [];
const dNone = "d-none";
let counter = 1;

function keyupHandler() {
  for (const item of gridItems) {
    item.classList.add(dNone);
  }
  const text = this.value;
  const filteredCards = cards.filter(el => el.text.toLowerCase().includes(text.toLowerCase()));
  if (filteredCards.length > 0) {
    for (const el of filteredCards) {
      document.querySelector(`.md-typeset .grid div:nth-child(${el.id})`).classList.remove(dNone);
    }
  } 
  console.log(filteredCards.length);
}

if (searchInput && gridItems) {
  for (const card of gridItems) {
    cards.push({
      id: counter++,
      title: card.firstElementChild.textContent,
      text: card.textContent
    });
  }
  searchInput.addEventListener("keyup", keyupHandler); 
  searchInput.addEventListener("search", keyupHandler);
}