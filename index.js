//creating an onkey press event listener
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".onkey");
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      classifyGenre();
    }
  });
});
