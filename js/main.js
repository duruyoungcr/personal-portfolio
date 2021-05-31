//menu navigation variables
const hamburgerIcon = document.querySelector(".nav-toogle");
const links = document.querySelector(".links");
const linksLi = document.querySelectorAll(".links li");
const navLinks = document.querySelectorAll(".nav-links li");
const goDown = document.querySelector(".go-down");
const logo = document.querySelector(".logo");
const goUp = document.querySelector(".go-up");
const ctaBtns = document.querySelectorAll(".cta-btn");

//smooth scroll function
function smoothScroll(target, duration = 3000) {
  target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top;
  var adjust = 80;
  var startPosition = window.pageYOffset;
  startPosition == 0
    ? (targetPosition = targetPosition)
    : (targetPosition = startPosition + targetPosition);
  var distance = targetPosition - startPosition - adjust;

  var startTime = null;

  function animate(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animate);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animate);
}
// end scroll function

//arrow down
goDown.addEventListener("click", () => smoothScroll("#about", 500));
//arrow up
goUp.addEventListener("click", () => smoothScroll("#fullpage", 500));
//logo
logo.addEventListener("click", () => smoothScroll("#fullpage", 500));
// cta
ctaBtns.forEach((button) => {
  button.addEventListener("click", () => smoothScroll("#contact", 500));
});

//hamburger
hamburgerIcon.addEventListener("click", () => {
  navSlide();
  hamburgerIcon.classList.toggle("toogle");
});
//nav links and sm links set-up for toogle and smooth scroll
linksLi.forEach((link) =>
  link.addEventListener("click", () => {
    const screenWidth = window.innerWidth;
    let target = link.firstElementChild.textContent;
    if (screenWidth <= 1065) {
      if (link.classList.contains("nav-list-item")) {
        smoothScroll("#" + target, 1000);
        navSlide();
        hamburgerIcon.classList.toggle("toogle");
      }
    } else {
      if (link.classList.contains("nav-list-item")) {
        smoothScroll("#" + target, 1000);
      }
    }
    if (link.classList.contains("sm-list-item")) {
      navSlide();
      hamburgerIcon.classList.toggle("toogle");
    }
  })
);
//animation function for nav links & social media links
function navSlide() {
  links.classList.toggle("nav-toogled");
  linksLi.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `linksFade 0.5s ease forwards ${index / 8 + 0.4}s`;
    }
  });
}
// end of all scroll functions for hero and nav

//GSAP
gsap.registerPlugin(ScrollTrigger);

//about section animations
gsap.to("nav", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    // markers: true,
    toggleActions: "play complete play reset",
  },
  duration: 1,
  backgroundColor: "#222831",
});
gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about",
    start: "top center",
    toggleActions: "play reset play reset",
  },
  duration: 2,
  opacity: 0,
  y: 100,
  ease: "back",
});
gsap.from(".about-footer", {
  scrollTrigger: {
    trigger: ".about-text",
    start: "top center",
    toggleActions: "play reset play reset",
  },
  duration: 1,
  opacity: 0,
  y: -100,
  ease: "power2.in",
});
gsap.from(".go-up", {
  scrollTrigger: {
    trigger: ".about-text",
    start: "top center",
    toggleActions: "play complete play reset",
  },
  duration: 2,
  y: 50,
  opacity: 0,
  ease: "back",
});
//services section animations
gsap.from(".service-text", {
  scrollTrigger: {
    trigger: ".services",
    start: "top center",
    toggleActions: "play reset play reset",
  },
  duration: 2,
  y: 100,
  opacity: 0,
  ease: "back",
});

//contentful loading of projects
function getProjects() {
  try {
    const client = contentful.createClient({
      space: "9thvbm1qm2sr",
      accessToken: "HJkkkIY09JFZV0ThcAFwR75ZrvMTlqpW9zgKogdw56Y",
    });
    client.getEntries("portfolioProjects").then((response) => {
      let projects = response.items;
      projects = projects.map((project) => {
        const { title, description, live, source } = project.fields;
        const image = project.fields.image.fields.file.url;
        const imageTitle = project.fields.image.fields.title;
        return { image, title, description, live, source, imageTitle };
      });
      displayProjects(projects);
    });
  } catch (error) {
    console.log(error);
  }
}
function displayProjects(projects) {
  const projectsContainer = document.querySelector(".projects-container");

  projects.forEach((project) => {
    projectsContainer.innerHTML += `<div class="project">
            <div class="main-card">
              <div class="card__face card__face--front">
                <img class="project-img" src=${project.image} />
                <div class="project-title"><p>${project.title}</p></div>
              </div>
              <div class="card__face card__face--back">
                <div class="project-desc">
                  <p>
                    ${project.description}
                  </p>
                </div>
                <div class="project-links">
                    <div class="demo-link">
                    <a href="${project.live}" target="_blank" class="project-link"
                        ><i class="fa fa-external-link"></i> live site</a
                    >
                    </div>
                    <div class="code-link">
                    <a href="${project.source}" target="_blank" class="project-link"
                     ><i class="fa fa-eye"></i> view source</a
                     >
                    </div>
                </div>
              </div>
            </div>
          </div>`;
  });
  //card function
  const cards = document.querySelectorAll(".main-card");
  const titlesArr = document.querySelectorAll(".project-title");

  cards.forEach((card, index) => {
    let cardIndex = index;
    let title = titlesArr[cardIndex];
    card.addEventListener("click", () => {
      card.classList.contains("is-flipped")
        ? card.classList.remove("is-flipped")
        : card.classList.add("is-flipped");
      title.classList.contains("is-flipped")
        ? title.classList.remove("is-flipped")
        : title.classList.add("is-flipped");
      if (card.classList.contains("is-flipped")) {
        setTimeout(() => {
          title.classList.remove("is-flipped");
          card.classList.remove("is-flipped");
        }, 15000);
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", getProjects());
