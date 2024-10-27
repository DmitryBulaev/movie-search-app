const searchSectionNode = document.getElementById("searchSection");
const inputNode = document.getElementById("input");

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
      console.log(filmRequest);
      console.log(data);
    });

  cleatInput(inputNode);
});

function cleatInput(input) {
  input.value = "";
}
