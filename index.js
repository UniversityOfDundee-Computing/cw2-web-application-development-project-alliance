const moviesEmojis = [
  { id: 28, name: "Action", emoji: "💥" },
  { id: 12, name: "Adventure", emoji: "🧭" },
  { id: 16, name: "Animation", emoji: "🎨" },
  { id: 35, name: "Comedy", emoji: "😂" },
  { id: 80, name: "Crime", emoji: "🕵️‍♂️" },
  { id: 99, name: "Documentary", emoji: "🎥" },
  { id: 18, name: "Drama", emoji: "🎭" },
  { id: 10751, name: "Family", emoji: "👨‍👩‍👧‍👦" },
  { id: 14, name: "Fantasy", emoji: "🧙‍♂️" },
  { id: 36, name: "History", emoji: "📜" },
  { id: 27, name: "Horror", emoji: "👻" },
  { id: 10402, name: "Music", emoji: "🎵" },
  { id: 9648, name: "Mystery", emoji: "🕵️‍♀️" },
  { id: 10749, name: "Romance", emoji: "❤️" },
  { id: 878, name: "Science Fiction", emoji: "👽" },
  { id: 10770, name: "TV Movie", emoji: "📺" },
  { id: 53, name: "Thriller", emoji: "🔪" },
  { id: 10752, name: "War", emoji: "⚔️" },
  { id: 37, name: "Western", emoji: "🤠" },
];

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

// this is for getting related genre emojis

const reg = moviesEmojis.find((g) => g.id === Number(genre));

document.getElementById(
  "currentMovieList"
).textContent = `These are the list of ${reg.name} ${reg.emoji} movies`;
console.log(reg);

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
  const prompt = `Task: Classify the input into exactly one TMDb genre ID based on the user’s emotional state, need, or movie-related keywords.

Valid Inputs:

Emotional states or needs (e.g., "I feel lonely," "I need a laugh," "I want to relax").

Movie-related keywords or phrases (e.g., "space aliens," "crime investigation").

Invalid Inputs:

Contains numbers, special characters (e.g., *, $), or random patterns.

Unrelated topics (e.g., "urinate," "how to cook").

Gibberish or ambiguous phrases (e.g., "asdfg").

Genre Mapping Rules:

Emotions/Needs → Genres:

Emotion/Need Keywords	Genre & ID
Love, romance, relationships, longing, dating	- 10749 (Romance)
Fear, suspense, scary, paranormal, haunted	- 27 (Horror)
Laughter, jokes, humor, silly, satire, angry	- 35 (Comedy)
Relaxation, calm, emotional stories, tearjerker, heartfelt	- 18 (Drama)
Excitement, action, adrenaline, explosions, battles	- 28 (Action)
Fantasy, magical, mythical, dragons, enchanted	- 14 (Fantasy)
Thought-provoking, real-life, educational, investigative - 99 (Documentary)
Adventure, epic journey, exploration, treasure hunt, survival, sick -	12 (Adventure)
Crime, heist, gangster, detective, justice	- 80 (Crime)
Nostalgia, childhood, family bonding, kid-friendly	- 10751 (Family)
History, historical events, war heroes, ancient times	- 36 (History)
Music, concerts, band stories, musicals	- 10402 (Music)
Mystery, unsolved crimes, puzzles, secrets	- 9648 (Mystery)
Thrills, edge-of-seat tension, psychological mind games	- 53 (Thriller)
War, military conflict, soldiers, patriotism	- 10752 (War)
Westerns, cowboys, frontier life, wild west	- 37 (Western)
Animation, cartoons, animated adventures, family-friendly fantasy - 16 (Animation)
TV-style, lighthearted, made-for-TV drama	- 10770 (TV Movie)

TMDb Genres (Full List for Reference):
Action: 28 | Adventure: 12 | Animation: 16 | Comedy: 35

Crime: 80 | Documentary: 99 | Drama: 18 | Family: 10751

Fantasy: 14 | History: 36 | Horror: 27 | Music: 10402

Mystery: 9648 | Romance: 10749 | Science Fiction: 878 | TV Movie: 10770

Thriller: 53 | War: 10752 | Western: 37

Examples of Mapped Inputs:

"I miss my childhood" → 10751 (Family)

"I want to solve a puzzle" → 9648 (Mystery)

"Tell me about ancient Rome" → 36 (History)

"I need a wild west adventure" → 37 (Western)

"Play something with singing!" → 10402 (Music)

"I'm in love" →  10749

"I feel scared" → 27

"Make me laugh" →  35

"I need relaxation" → 18

Input: ${input}
Output: [Genre ID or "Invalid input"]`;

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

    // console.log(text);

    //

    // generate a random page number between 1 and 72
    // const randomPage = Math.floor(Math.random() * 72) + 1;

    localStorage.setItem("genre", text.trim());
  } catch (error) {
    document.getElementById("result").innerText = "❌ Error: " + error.message;
    console.error("API Error:", error);
  }
}
