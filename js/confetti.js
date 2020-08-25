gsap.registerPlugin(Physics2DPlugin);

document.querySelectorAll(".confettiButton").forEach((button) => {
  const bounding = button.getBoundingClientRect();

  function confettiPop(e) {
    button.classList.add("success");
    gsap.to(button, {
      "--icon-x": -3,
      "--icon-y": 3,
      "--z-before": 0,
      duration: 0.2,
      onComplete() {
        particles(button.querySelector(".emitter"), 100, -4, 6, -80, -50);
        gsap.to(button, {
          "--icon-x": 0,
          "--icon-y": 0,
          "--z-before": -6,
          duration: 1,
          ease: "elastic.out(1, .5)",
          onComplete() {
            button.classList.remove("success");
          },
        });
      },
    });
  }

  button.addEventListener("mouseenter", confettiPop);
  button.addEventListener("click", confettiPop);
});

function particles(parent, quantity, x, y, minAngle, maxAngle) {
  let colors = ["#FFFF04", "#EA4C89", "#892AB8", "#4AF2FD"];
  for (let i = quantity - 1; i >= 0; i--) {
    let angle = gsap.utils.random(minAngle, maxAngle),
      velocity = gsap.utils.random(70, 140),
      dot = document.createElement("div");
    dot.style.setProperty("--b", colors[Math.floor(gsap.utils.random(0, 4))]);
    parent.appendChild(dot);
    gsap.set(dot, {
      opacity: 0,
      x: x,
      y: y,
      scale: gsap.utils.random(0.4, 0.7),
    });
    gsap
      .timeline({
        onComplete() {
          dot.remove();
        },
      })
      .to(
        dot,
        {
          duration: 0.05,
          opacity: 1,
        },
        0
      )
      .to(
        dot,
        {
          duration: 1.8,
          rotationX: `-=${gsap.utils.random(720, 1440)}`,
          rotationZ: `+=${gsap.utils.random(720, 1440)}`,
          physics2D: {
            angle: angle,
            velocity: velocity,
            gravity: 120,
          },
        },
        0
      )
      .to(
        dot,
        {
          duration: 1,
          opacity: 0,
        },
        0.8
      );
  }
}
