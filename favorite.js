const getWatchListMovies = localStorage.getItem("watch-list");
const watchListMovies = JSON.parse(getWatchListMovies);
console.log(watchListMovies.length);

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
  });
}
