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
  
  //close the video after closing the modal
  const trailerDiv = document.querySelector("#modalTrailer");
if (trailerDiv) {
  const iframe = trailerDiv.querySelector("iframe");
  if (iframe) {
    const src = iframe.src;
    iframe.src = ""; // clear it
    iframe.src = src; // re-assign it to reset (this stops YouTube video!)
  }
}
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
  console.log(movie);
  document.getElementById("modalTitle").textContent = movie.title;
  document.getElementById(
    "modalImage"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.getElementById("modalOverview").textContent = movie.overview;
  renderStars(Math.floor(movie.vote_average),10);
  document.getElementById("modalReleaseDate").textContent = `Release Date : ${movie.release_date}`;

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


//for favourite button inside modal
 // Get the button and heart icon
 const favoriteButton = document.getElementById("favoriteButton");
 const heartIcon = document.getElementById("heartIcon");

 // Set the initial content (white heart emoji)
 heartIcon.innerHTML = "🤍"; // White heart emoji

 // Toggle the heart icon when clicked
 favoriteButton.addEventListener("click", () => {
   if (heartIcon.innerHTML === "🤍") {
     heartIcon.innerHTML = "❤️"; // Red heart emoji
   } else {
     heartIcon.innerHTML = "🤍"; // White heart emoji
   }
 });


//star rendering
function renderStars(score, outOf = 10) {
  const ratingContainer = document.getElementById('rating');
  ratingContainer.innerHTML = ''; // Clear previous stars

  const stars = 5; // Display 5 stars visually
  const normalizedScore = (score / outOf) * stars;

  for (let i = 1; i <= stars; i++) {
      const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      star.setAttribute('class', 'w-4 h-4 me-1');
      star.setAttribute('fill', 'currentColor');
      star.setAttribute('viewBox', '0 0 22 20');
      star.setAttribute('aria-hidden', 'true');
      star.innerHTML = `
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734
                    -2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l
                    -5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656
                    3.563-.863 5.031a1.532 1.532 0 0 0 2.226
                    1.616L11 17.033l4.518 2.375a1.534 1.534 0 0
                    0 2.226-1.617l-.863-5.03L20.537
                    9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
      `;

      if (i <= Math.floor(normalizedScore)) {
          star.classList.add('text-yellow-300'); // Full star
      } else if (i - normalizedScore < 1) {
          star.classList.add('text-yellow-200'); // Could be for half star style if needed
      } else {
          star.classList.add('text-gray-300', 'dark:text-gray-500'); // Empty star
      }

      ratingContainer.appendChild(star);
  }

  // Add text value
  const text = document.createElement('p');
  text.className = 'ms-1 text-sm font-medium text-gray-500 dark:text-gray-400';
  text.textContent = `${score}/${outOf}`;
  ratingContainer.appendChild(text);
}

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
  const prompt = `Using the TMDb API movie genres, classify the input into exactly one matching genre. The input must be a matchable meaningful word or a coherent sentence. If the input contains unrelated words like input, urinate or contian numbers, special characters (e.g., *, %, $, etc.), a combination of these, or random patterns (e.g., "*********"), return "Invalid input". Do not classify such inputs into a genre. For valid inputs, return only the **ID** of the genre as defined by the TMDb API, without any additional text or explanation. The TMDb movie genres and their IDs are as follows:

- Action: 28
- Adventure: 12
- Animation: 16
- Comedy: 35
- Crime: 80
- Documentary: 99
- Drama: 18
- Family: 10751
- Fantasy: 14
- History: 36
- Horror: 27
- Music: 10402
- Mystery: 9648
- Romance: 10749
- Science Fiction: 878
- TV Movie: 10770
- Thriller: 53
- War: 10752
- Western: 37

Input: ${input}
Output: [ID only if input is a meaningful word or coherent sentence, but if the input includes numbers, special characters, or random patterns, your only output must be "Invalid input"]`;

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
