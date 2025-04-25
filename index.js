// this are the list of genres and their respective emojis
const genres = [
  { id: 28, genre: "Action", emoji: "🔫" },
  { id: 12, genre: "Adventure", emoji: "🗺️" },
  { id: 35, genre: "Comedy", emoji: "😂" },
  { id: 18, genre: "Drama", emoji: "😢" },
  { id: 27, genre: "Horror", emoji: "👻" },
  { id: 878, genre: "Science Fiction", emoji: "🚀" },
  { id: 14, genre: "Fantasy", emoji: "🐉" },
  { id: 10749, genre: "Romance", emoji: "❤️" },
];

const container = document.getElementById("buttonContainer");
container.innerHTML = "";

const movieModalElement = document.getElementById("movieModal");
const movieModal = new Modal(movieModalElement);

//removing backdrop process
const cleanupModal = () => {
 // Remove backdrop manually
 document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
 // Ensure body scroll is restored
  document.body.classList.remove('overflow-hidden');
};

//remove backdrop initiator
document.querySelectorAll("[data-modal-hide='movieModal']").forEach(btn => {
  btn.addEventListener("click", () => {
    movieModal.hide();
    cleanupModal();
})});

const poppingFnc = (movie) => {
  // Set title, image, and overview
  document.getElementById("modalTitle").textContent = movie.title;
  document.getElementById("modalImage").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.getElementById("modalOverview").textContent = movie.overview;

  // Optional: fetch trailer
  fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTgzZmI3ZjBiNTYxOWYwZGFmYmExYzAzNzkyM2EwMyIsIm5iZiI6MTY5MjczMDU4Ni42NzcsInN1YiI6IjY0ZTUwNGRhYzNjODkxMDBlMzVlYjNmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEhEB_vVgFSZ-9E5ACDJ54vsmxT9PMBwXqo7V5GuklY",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      const trailer = json.results.find((v) => v.type === "Trailer" && v.site === "YouTube");
      const trailerDiv = document.getElementById("modalTrailer");
      if (trailer) {
        trailerDiv.innerHTML = `<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        trailerDiv.innerHTML = "<p class='text-sm text-gray-400'>No trailer available.</p>";
      }
    })
    .catch((err) => console.error(err));

  // Show the modal (Flowbite way)
  movieModal.show();
}


const filterMovies = (genre) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTgzZmI3ZjBiNTYxOWYwZGFmYmExYzAzNzkyM2EwMyIsIm5iZiI6MTY5MjczMDU4Ni42NzcsInN1YiI6IjY0ZTUwNGRhYzNjODkxMDBlMzVlYjNmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEhEB_vVgFSZ-9E5ACDJ54vsmxT9PMBwXqo7V5GuklY",
    },
  };

  const container = document.getElementById("movieList");
  container.innerHTML = ""; // Clear previous results

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      const movies = json.results;

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
       /* const movieTitle = document.createElement("h2");
        movieTitle.classList.add("text-white", "text-3xl", "font-bold");
        movieTitle.textContent = movie.title;*/

       /* const movieOverview = document.createElement("p");
        movieOverview.classList.add("text-white", "text-lg");
        movieOverview.textContent = movie.overview;*/

        const movieImage = document.createElement("img");
        movieImage.classList.add("w-[220px]", "h-[330px]", "rounded-lg", "cursor-pointer");
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        //use to show modal upon image click
        movieImage.addEventListener("click", () => {
          console.log(`Clicked on: ${movie.title}`);
          // You can call another function here if you want to show more info or do something fancy
          poppingFnc(movie)
        });

        // movieCard.appendChild(movieTitle);
        // movieCard.appendChild(movieOverview);
        container.appendChild(movieCard);
        movieCard.appendChild(movieImage);
      });
    })
    .catch((err) => console.error(err));

  // console.log(genre);

  console.log(genre);
};

// loop through the genres array and create buttons for each genre
genres.forEach((genre) => {
  container.innerHTML += `
      <div class="w-full flex flex-row justify-center items-center relative group">
        <button class="text-7xl hover:bg-gray-500 h-full w-full p-5 rounded-full" onclick="filterMovies('${genre.id}')">
          ${genre.emoji}
          <br/>
          <span class=" opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-white font-bold">${genre.genre}</span>
          </button>

      </div>
    `;
});

// particles.js configuration
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 50 },
    size: { value: 3 },
    move: { enable: true, speed: 1 },
    line_linked: { enable: true, distance: 150 },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "attract" } },
  },
  mode: {
    attract: {
      distance: 500,
      duration: 0.4,
      speed: 1,
    },
  },
  background: {
    color: "#000",
  },
});
