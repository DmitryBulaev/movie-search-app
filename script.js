const ERROR_MESSAGE = "Такого нет. Попробуйте ещё раз";

const searchSectionNode = document.getElementById("searchSection");
const inputNode = document.getElementById("input");
const filmListNode = document.getElementById("filmList");
const filmPreviewNode = document.getElementById("filmPreview");
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
        return `
                <li id=${film.imdbID} data-class=filmItem class='film-item'>
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

// function getMovieId() {
filmListNode.addEventListener("click", (event) => {
  const movieElement = event.target.closest("[data-class=filmItem]");
  if (event.target.dataset.class !== "filmItem") return;

  const id = movieElement.id;

  fetch(`http://www.omdbapi.com/?i=${id}&apikey=218d497b`)
    .then((response) => response.json())
    .then((data) => {
      console.log(1);
      wrapperNode.classList.toggle("display-none");
      filmPageNode.classList.toggle("display-none");
      filmPreviewNode;
      const filmProfile = `
                          <div class></div>`;
    });
});
// }

function cleatInput(input) {
  input.value = "";
  input.focus();
}
