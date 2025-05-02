// particles config
document.addEventListener("DOMContentLoaded", function () {
  tsParticles.load("tsparticles", {
    background: {
      color: "#000000", // Set background to black for space effect
    },
    particles: {
      number: {
        value: 100, // Number of particles
        density: {
          enable: true,
          value_area: 1000, // Control density
        },
      },
      size: {
        value: 5, // Size of the particles
        random: true, // Randomize the sizes
        anim: {
          enable: true,
          speed: 3,
          size_min: 1,
        },
      },
      opacity: {
        value: 0.8, // Slight opacity to simulate stars
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 1, // Slow speed to simulate floating particles
        direction: "none", // Free movement
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
      shape: {
        type: "circle", // Particle shape
        stroke: {
          width: 0,
          color: "#fff",
        },
      },
      line_linked: {
        enable: false, // Disable particle connections to mimic stars spread out
      },
      collisions: {
        enable: false, // No collisions between particles for a free space effect
      },
      color: {
        value: "#ffffff", // White particles to resemble stars
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse", // When you hover over particles, they will repel
        },
      },
      modes: {
        repulse: {
          distance: 100, // Hover effect distance
          duration: 0.4,
        },
      },
    },
    detectRetina: true, // Ensure proper scaling for retina displays
  });
});

let movieModalElement;
let movieModal;

document.addEventListener("DOMContentLoaded", () => {
  movieModalElement = document.getElementById("movieModal");
  movieModal = new Modal(movieModalElement);
});

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

// Add event listener to detect clicks outside the modal and close it
document.addEventListener("click", function (event) {
  const modal = document.querySelector("#modalTrailer"); // Change to your modal's ID
  const isClickInsideModal = modal.contains(event.target);

  // If the click is outside the modal, close it and stop the video
  if (!isClickInsideModal) {
    cleanupModal();
  }
});

//remove backdrop initiator
document.querySelectorAll("[data-modal-hide='movieModal']").forEach((btn) => {
  btn.addEventListener("click", () => {
    movieModal.hide();
    cleanupModal();
  });
});

const poppingFnc_fav = (movie) => {
  // Set title, image, and overview
  document.getElementById("modalTitle").textContent = movie.title;
  document.getElementById(
    "modalImage"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.getElementById("modalOverview").textContent = movie.overview;
  renderStars(Math.floor(movie.vote_average), 10);
  document.getElementById(
    "modalReleaseDate"
  ).textContent = `Release Date : ${movie.release_date}`;

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

//star rendering
function renderStars(score, outOf = 10) {
  const ratingContainer = document.getElementById("rating");
  ratingContainer.innerHTML = ""; // Clear previous stars

  const stars = 5; // Display 5 stars visually
  const normalizedScore = (score / outOf) * stars;

  for (let i = 1; i <= stars; i++) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    star.setAttribute("class", "w-4 h-4 me-1");
    star.setAttribute("fill", "currentColor");
    star.setAttribute("viewBox", "0 0 22 20");
    star.setAttribute("aria-hidden", "true");
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
      star.classList.add("text-yellow-300"); // Full star
    } else if (i - normalizedScore < 1) {
      star.classList.add("text-yellow-200"); // Could be for half star style if needed
    } else {
      star.classList.add("text-gray-300", "dark:text-gray-500"); // Empty star
    }

    ratingContainer.appendChild(star);
  }

  // Add text value
  const text = document.createElement("p");
  text.className = "ms-1 text-sm font-medium text-white";
  text.textContent = `${score}/${outOf}`;
  ratingContainer.appendChild(text);
}

const getWatchListMovies = localStorage.getItem("watch-list");
const watchListMovies = JSON.parse(getWatchListMovies);
console.log(watchListMovies.length);
let movie;

if (watchListMovies.length === 0) {
  document.getElementById("isEmpty").textContent = "Your watchlist is empty.";
  // container.innerHTML = "Your watchlist is empty.";
  //   return;
} else {
  const favContainer = document.getElementById("favMovieList");
  favContainer.innerHTML = ""; // Clear previous results

  watchListMovies.forEach((movie) => {
    console.log(movie);

    const favMovieCard = document.createElement("div");
    favMovieCard.classList.add(
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "rounded-lg",
      "p-5",
      "mt-5",
      "relative"
    );

    const favMovieImage = document.createElement("img");
    favMovieImage.classList.add(
      "w-[220px]",
      "h-[330px]",
      "rounded-lg",
      "cursor-pointer",
      "relative"
    );
    favMovieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    //   this is the button to remove the movie from the watchlist
    const removeButton = document.createElement("button");
    removeButton.classList.add(
      "bg-indigo-400",
      "hover:bg-indigo-700",
      "text-white",
      "rounded-lg",
      "p-2",
      "mt-5",
      "cursor-pointer",
      "absolute",
      "top-0",
      "right-6",
      "z-10"
    );

    removeButton.textContent = "❌";
    removeButton.addEventListener("click", () => {
      const index = watchListMovies.indexOf(movie);
      watchListMovies.splice(index, 1);
      localStorage.setItem("watch-list", JSON.stringify(watchListMovies));
      window.location.reload();
    });

    favMovieCard.appendChild(removeButton);

    favMovieCard.appendChild(favMovieImage);
    favContainer.appendChild(favMovieCard);

    favMovieImage.addEventListener("click", () => {
      poppingFnc_fav(movie);
    });
  });
}
