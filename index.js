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