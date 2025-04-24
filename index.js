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
