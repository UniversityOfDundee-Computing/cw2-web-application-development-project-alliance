const filterMovies = () => {
// generate a random page number between 1 and 72
const randomPage = Math.floor(Math.random() * 72) + 1;

const genre = localStorage.getItem("genre");

const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${randomPage}&sort_by=popularity.desc&with_genres=${Number(
  genre
)}`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTgzZmI3ZjBiNTYxOWYwZGFmYmExYzAzNzkyM2EwMyIsIm5iZiI6MTY5MjczMDU4Ni42NzcsInN1YiI6IjY0ZTUwNGRhYzNjODkxMDBlMzVlYjNmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEhEB_vVgFSZ-9E5ACDJ54vsmxT9PMBwXqo7V5GuklY",
  },
};

const containers = document.getElementById("movieList");
containers.innerHTML = ""; // Clear previous results

fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
    const movies = json.results;

    // console.log(movies);

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add(
        // "w-full",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        // "bg-gray-800",
        "rounded-lg",
        "p-5",
        "mt-5"
      );

      const movieImage = document.createElement("img");
      movieImage.classList.add(
        "w-[220px]",
        "h-[330px]",
        "rounded-lg",
        "cursor-pointer"
      );
      movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      //use to show modal upon image click
      movieImage.addEventListener("click", () => {
        // console.log(`Clicked on: ${movie.title}`);
        // You can call another function here if you want to show more info or do something fancy
        poppingFnc(movie);
      });

      // console.log(movies, "refresh");

      containers.appendChild(movieCard);
      movieCard.appendChild(movieImage);
    });
  })
  .catch((err) => console.error(err));
};