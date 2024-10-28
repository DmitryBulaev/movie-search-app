const searchSectionNode = document.getElementById("searchSection");
const inputNode = document.getElementById("input");
const filmListNode = document.getElementById("filmList");

// const params = new URLSearchParams(location.search);
searchSectionNode.addEventListener("submit", (event) => {
  event.preventDefault();

  const userReauest = inputNode.value;

  if (!userReauest) {
    return;
  }

  addFilmsFromApi(userReauest);

  cleatInput(inputNode);
});

function addFilmsFromApi(userReauest) {
  fetch(`http://www.omdbapi.com/?s=${userReauest}&apikey=218d497b`)
    .then((response) => response.json())
    .then((data) => {
      const films = data.Search;
      films.forEach((film) => {
        const filmItem = document.createElement("li");
        filmItem.className = "film-item";
        filmItem.innerHTML = `<img class='film-item__poster' src=${film.Poster} alt='Постер фильма' />
                              <div class='description-wrapper'>
                                <span class="film-item__title">${film.Title}</span>
                                <span class="film-item__year">${film.Year}</span>
                                <span class="film-item__type">${film.Type}</span>
                              </div>`;
        filmListNode.insertAdjacentElement("beforeend", filmItem);
      });
    });
}

function cleatInput(input) {
  input.value = "";
  input.focus();
}
