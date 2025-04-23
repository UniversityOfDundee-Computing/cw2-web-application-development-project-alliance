// this are the list of genres and their respective emojis
const genres = [
  { id: 1, genre: "Action", emoji: "🔫" },
  { id: 2, genre: "Adventure", emoji: "🗺️" },
  { id: 3, genre: "Comedy", emoji: "😂" },
  { id: 4, genre: "Drama", emoji: "😢" },
  { id: 5, genre: "Horror", emoji: "👻" },
  { id: 6, genre: "Science Fiction", emoji: "🚀" },
  { id: 7, genre: "Fantasy", emoji: "🐉" },
  { id: 8, genre: "Romance", emoji: "❤️" },
];

const container = document.getElementById("buttonContainer");
container.innerHTML = "";

const filterMovies = (genre) => {
  console.log(genre);
};

// loop through the genres array and create buttons for each genre
genres.forEach((genre) => {
  container.innerHTML += `
      <div class="w-full flex flex-row justify-center items-center relative group">
        <button class="text-7xl hover:bg-gray-500 h-full w-full p-5 rounded-full" onclick="filterMovies('${genre.genre}')">
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
    events: { onhover: { enable: true, mode: "repulse" } },
  },
  background: {
    color: "#000"
  }
});

