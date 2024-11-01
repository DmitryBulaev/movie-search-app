const ERROR_MESSAGE = "Такого нет. Попробуйте ещё раз";

const searchSectionNode = document.getElementById("searchSection");
const inputNode = document.getElementById("input");
const filmListNode = document.getElementById("filmList");
const wrapperNode = document.getElementById("wrapper");
const filmPageNode = document.getElementById("filmPage");

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
        return `<li id=${film.imdbID} data-class=filmItem class='film-item'>
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
    .catch(() => {
      filmListNode.innerHTML = `<li class="error-message">
                                  <span class="error-message__text"> ${ERROR_MESSAGE}</span>
                                </li> `;
    });
}

// function getMovieId() {
filmListNode.addEventListener("click", (event) => {
  const movieElement = event.target.closest("[data-class=filmItem]");
  if (event.target.dataset.class !== "filmItem") return;

  const id = movieElement.id;

  fetch(`http://www.omdbapi.com/?i=${id}&apikey=218d497b`)
    .then((response) => response.json())
    .then((data) => {
      wrapperNode.classList.toggle("display-none");
      filmPageNode.classList.toggle("display-none");
      filmPageNode.innerHTML = `<button id='backButton' class='film-page__back-button'>← Back to list</button>
                                <img class='film-page__poster' src=${data.Poster} alt='Постер фильма' />
                                <div class='profile-wrapper'>
                                  <h2 class='film-page__title'>${data.Title}</h2>
                                  <ul class="film-page__profile">
                                    <li class='film-page__profile-item'>Год: <span class='film-page__profile-item_blue'>${data.Year}</span></li>
                                    <li class='film-page__profile-item'>Рейтинг: <span class='film-page__profile-item_blue'>${data.Rated}</span></li>
                                    <li class='film-page__profile-item'>Дата выхода: <span class='film-page__profile-item_blue'>${data.Released}</span></li>
                                    <li class='film-page__profile-item'>Продолжительность:<span class='film-page__profile-item_blue'>${data.Runtime}</span></li>
                                    <li class='film-page__profile-item'>Жанр: <span class='film-page__profile-item_blue'>${data.Genre}</span></li>
                                    <li class='film-page__profile-item'>Режиссёр: <span class='film-page__profile-item_blue'>${data.Director}</span></li>
                                    <li class='film-page__profile-item'>Сценарий: <span class='film-page__profile-item_blue'>${data.Writer}</span></li>
                                    <li class='film-page__profile-item'>Актёры: <span class='film-page__profile-item_blue'>${data.Actors}</span></li>
                                  </ul>
                                </div>`;
    });
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    wrapperNode.classList.toggle("display-none");
    filmPageNode.classList.toggle("display-none");
  });
});
// }

function cleatInput(input) {
  input.value = "";
  input.focus();
}
