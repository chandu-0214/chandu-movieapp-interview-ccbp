let iconinput = document.getElementById("menu-bar-icon");
let logocontainer = document.getElementById("logo-id-container");
let linkContainerId = document.getElementById("link-container-id");

let crossiconElement = document.createElement("i");
crossiconElement.classList.add("fa", "fa-times", "icon-adjust");
crossiconElement.setAttribute("aria-hidden", "true");
crossiconElement.id = "crossid";

 let first() =>{
  logocontainer.removeChild(iconinput);
  logocontainer.appendChild(crossiconElement);
  linkContainerId.classList.toggle("new-class");
}

function secound() {
  logocontainer.appendChild(iconinput);
  logocontainer.removeChild(crossiconElement);
  linkContainerId.classList.toggle("new-class");
}
iconinput.addEventListener("click", first);
crossiconElement.addEventListener("click", secound);

let resultmovieContainer = document.getElementById("resultCountries");
let nextbutton = document.getElementById("nxtViewButton");
let previewbutton = document.getElementById("preViewButton");
let pageNo = 1;
let searchBar = document.getElementById("searchInput");

const genreNames = {
  28: "Action",
  12: "Adventure",
  16: "Adventure",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10762: "Kids",
  10759: "Action & Adventure",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10767: "Talk",
  10768: "War & Politics",
};
let searchInput = "";
let updateUrlWithPageNo = "";
let nextAndpreUrl = "";

function displaymovies(eachTitle) {
  let {
    original_title,
    overview,
    vote_average,
    poster_path,
    release_date,
    genre_ids,
  } = eachTitle;

  function getGenreNames(genre_ids) {
    let genreList = [];
    for (let eachItem of genre_ids) {
      let eachGenre = genreNames[eachItem];
      genreList.push(eachGenre);
    }
    return genreList;
  }
  let moviecard = document.createElement("div");
  moviecard.classList.add("movie-card");
  resultmovieContainer.appendChild(moviecard);

  let movieImage = document.createElement("img");
  movieImage.src = "https://image.tmdb.org/t/p/original/" + poster_path;
  movieImage.classList.add("image-adjust");
  moviecard.appendChild(movieImage);

  let descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("descriptionContainer");
  moviecard.appendChild(descriptionContainer);

  let titleName = document.createElement("h1");
  titleName.classList.add("titleName");
  titleName.textContent = original_title;
  descriptionContainer.appendChild(titleName);

  let moviedescriptionpara = document.createElement("p");
  moviedescriptionpara.classList.add("para-desp");
  moviedescriptionpara.textContent = overview;
  descriptionContainer.appendChild(moviedescriptionpara);

  let progressreport = document.createElement("p");
  progressreport.classList.add("rating");
  progressreport.textContent = "RATING:- " + vote_average;
  descriptionContainer.appendChild(progressreport);

  let releaseDate = document.createElement("p");
  releaseDate.classList.add("releasedDate");
  releaseDate.textContent = "Released Date:- " + release_date;
  descriptionContainer.appendChild(releaseDate);

  let genreblock = document.createElement("p");
  let genresNames = getGenreNames(genre_ids);
  genreblock.textContent = "Genre Category:- " + genresNames;
  genreblock.classList.add("genre-adjust");
  descriptionContainer.appendChild(genreblock);
}

function fetchingdata(inputurl) {
  let options = {
    method: "GET",
  };
  let url = inputurl;
  let mainData;
  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      mainData = jsonData.results;
      console.log(jsonData);
      for (let eachTitle of mainData) {
        displaymovies(eachTitle);
      }
    });
  console.log(`fetching url ${inputurl}`);
  return inputurl;
}

let openNextPage () =>{
  pageNo += 1;
  updateUrlWithPageNo = nextAndpreUrl + "&page=" + pageNo;
  if (pageNo <= 500) {
    resultmovieContainer.textContent = "";
    fetchingdata(updateUrlWithPageNo);
  } else {
    resultmovieContainer.textContent = "No page Found,Click PREVIEW button";
  }
}

function openPreViewPage() {
  pageNo -= 1;
  updateUrlWithPageNo = nextAndpreUrl + "&page=" + pageNo;
  console.log(updateUrlWithPageNo);
  if (pageNo >= 1) {
    resultmovieContainer.textContent = "";
    fetchingdata(updateUrlWithPageNo);
  } else {
    resultmovieContainer.textContent = "No page Found,Click NEXT button";
  }
}
nextbutton.addEventListener("click", openNextPage);
previewbutton.addEventListener("click", openPreViewPage);

function searchMovies(event) {
  if (event.key === "Enter") {
    if (event.target.value === "") {
      alert("ENTER MOVIE NAME");
    } else {
      resultmovieContainer.textContent = "";
      let searchInput = event.target.value;
      let Newurl =
        "https://api.themoviedb.org/3/search/movie?api_key=9c457fbb0eeb2c39456cac418a95e1cd&query=" +
        searchInput;
      nextAndpreUrl = fetchingdata(Newurl);
    }
  }
}

searchBar.addEventListener("keydown", searchMovies);

function topratedMovies() {
  let topratedUrl =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=9c457fbb0eeb2c39456cac418a95e1cd";
  resultmovieContainer.textContent = "";
  nextAndpreUrl = fetchingdata(topratedUrl);
  console.log(`fetching=${nextAndpreUrl}`);
}

function nowPlayingMovies() {
  let topratedUrl =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=9c457fbb0eeb2c39456cac418a95e1cd";
  resultmovieContainer.textContent = "";
  nextAndpreUrl = fetchingdata(topratedUrl);
}

function popularMovies() {
  let topratedUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=9c457fbb0eeb2c39456cac418a95e1cd";
  resultmovieContainer.textContent = "";
  nextAndpreUrl = fetchingdata(topratedUrl);
  console.log(`fetching=${nextAndpreUrl}`);
}

function upcommingMovies() {
  let topratedUrl =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=9c457fbb0eeb2c39456cac418a95e1cd";
  resultmovieContainer.textContent = "";
  nextAndpreUrl = fetchingdata(topratedUrl);
  console.log(`fetching=${nextAndpreUrl}`);
}

let TopRatedSection = document.getElementById("TopRatedSection");
let NowPlayingsection = document.getElementById("NowPlayingsection");
let PopularSection = document.getElementById("PopularSection");
let UpcomingSection = document.getElementById("UpcomingSection");

TopRatedSection.addEventListener("click", topratedMovies);
NowPlayingsection.addEventListener("click", nowPlayingMovies);
PopularSection.addEventListener("click", popularMovies);
UpcomingSection.addEventListener("click", upcommingMovies);

popularMovies();
