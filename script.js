const ERROR_MESSAGE = "Такого нет. Попробуйте ещё раз";

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
      const result = films.map((film) => {
        return `
                <li class='film-item'>
                  <img class='film-item__poster' src=${film.Poster} alt='Постер фильма' />
                  <div class='description-wrapper'>
                    <span class="film-item__title">${film.Title}</span>
                    <span class="film-item__year">${film.Year}</span>
                    <span class="film-item__type">${film.Type}</span>
                  </div>
                </li>`;
      });
      filmListNode.innerHTML = result.join("");
    })
    .catch((err) => {
      console.log(err);
      filmListNode.innerHTML = `<li class="error-message">
                                  <span class="error-message__text"> ${ERROR_MESSAGE}</span>
                                </li> `;
    });
}

function cleatInput(input) {
  input.value = "";
  input.focus();
}
