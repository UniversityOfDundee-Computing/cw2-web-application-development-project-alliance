const container = document.getElementById("buttonContainer");
container.innerHTML = "";

const movieModalElement = document.getElementById("movieModal");
const movieModal = new Modal(movieModalElement);

//removing backdrop process
const cleanupModal = () => {
  // Remove backdrop manually
  document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  // Ensure body scroll is restored
  document.body.classList.remove("overflow-hidden");
};

//remove backdrop initiator
document.querySelectorAll("[data-modal-hide='movieModal']").forEach((btn) => {
  btn.addEventListener("click", () => {
    movieModal.hide();
    cleanupModal();
  });
});

const poppingFnc = (movie) => {
  // Set title, image, and overview
  document.getElementById("modalTitle").textContent = movie.title;
  document.getElementById(
    "modalImage"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.getElementById("modalOverview").textContent = movie.overview;

  // Optional: fetch trailer
  fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTgzZmI3ZjBiNTYxOWYwZGFmYmExYzAzNzkyM2EwMyIsIm5iZiI6MTY5MjczMDU4Ni42NzcsInN1YiI6IjY0ZTUwNGRhYzNjODkxMDBlMzVlYjNmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEhEB_vVgFSZ-9E5ACDJ54vsmxT9PMBwXqo7V5GuklY",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      const trailer = json.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      const trailerDiv = document.getElementById("modalTrailer");
      if (trailer) {
        trailerDiv.innerHTML = `<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        trailerDiv.innerHTML =
          "<p class='text-sm text-gray-400'>No trailer available.</p>";
      }
    })
    .catch((err) => console.error(err));

  // Show the modal (Flowbite way)
  movieModal.show();
};

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

// const filterMovies = () => {
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

      // console.log(movies);

      containers.appendChild(movieCard);
      movieCard.appendChild(movieImage);
    });
  })
  .catch((err) => console.error(err));
// };

const API_KEY = "AIzaSyB1wDLrrcd602tpIiMeI035IEMordsWrqc";

async function classifyGenre() {
  const input = document.getElementById("searchInput").value;
  const prompt = `Classify this sentence into a movie genre: "${input}". which will match only one of tmdb genres giving out the id only without any text for that genre with respect to tmdb api`;

  try {
    // api 1
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        "AIzaSyB1wDLrrcd602tpIiMeI035IEMordsWrqc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    document.getElementById("result").innerText = "🎭 Genre: " + text.trim();

    // console.log(typeof Number(text));
    // moves to the next page if the genre is found.
    window.location.href = "index.html";
    //

    // generate a random page number between 1 and 72
    const randomPage = Math.floor(Math.random() * 72) + 1;

    localStorage.setItem("genre", text.trim());

  } catch (error) {
    document.getElementById("result").innerText = "❌ Error: " + error.message;
    console.error("API Error:", error);
  }
}
