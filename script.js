const searchSectionNode = document.getElementById("searchSection");
const inputNode = document.getElementById("input");
const movieListNode = document.getElementById("movieList");

// const params = new URLSearchParams(location.search);
searchSectionNode.addEventListener("submit", (event) => {
  event.preventDefault();

  const filmRequest = inputNode.value;

  if (!filmRequest) {
    return;
  }

  fetch(`http://www.omdbapi.com/?s=${filmRequest}&apikey=218d497b`)
    .then((response) => response.json())
    .then((data) => {
      const films = data.Search;
      films.forEach((film) => {
        movieListNode.innerHTML = `<li>${film.Title}</li>`;
      });
      console.log(data.Search);
    });

  cleatInput(inputNode);
});

function cleatInput(input) {
  input.value = "";
  input.focus();
}
