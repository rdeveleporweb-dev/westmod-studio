$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  // ================================
  // SMOOTH SCROLL (LENIS)
  // ================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.2,
    lerp: 0.08,
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  $('a[href*="#"]').on("click", function (e) {
    const target = $(this).attr("href");
    if (target.startsWith("#") && $(target).length) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    }
  });

  // ================================
  // ANIMATION: counterAnimation
  // ================================
  let hasAnimated = false;
  const $window = $(window);
  const $numbersSec = $(".numbers-sec");

  function isInViewport($el) {
    const elementTop = $el.offset().top;
    const elementBottom = elementTop + $el.outerHeight();
    const viewportTop = $window.scrollTop();
    const viewportBottom = viewportTop + $window.height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  function animateCounters() {
    $(".numbers-sec h1").each(function () {
      const $this = $(this);
      const target = parseInt($this.data("target"));
      const span = $this.find("span").prop("outerHTML") || "";

      $({ countNum: 0 }).animate(
        { countNum: target },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.html(Math.floor(this.countNum) + span);
          },
          complete: function () {
            $this.html(target.toLocaleString() + span);
          },
        },
      );
    });
  }

  $window.on("scroll load", function () {
    if (isInViewport($numbersSec) && !hasAnimated) {
      hasAnimated = true;
      animateCounters();
    }
  });

  // ================================
  // ANIMATION: wordWrapper
  // ================================
  $(".move-txt h5").each(function () {
    const words = $(this).text().trim().split(/\s+/);
    $(this).html(
      words.map((word) => `<span class="word">${word}</span>`).join(" "),
    );
  });

  gsap.set(".move-txt .word", { color: "#24202169" });

  // ================================
  // ANIMATION: movingSvgReveal
  // ================================

  const mm2 = gsap.matchMedia();

  mm2.add("(min-width:767px)", () => {
    const movingSvgReveal = gsap.timeline({
      scrollTrigger: {
        trigger: ".moving-svg-sec",
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });
    movingSvgReveal.to(
      ".moving-img img",
      {
        yPercent: -10,
        scale: 1.15,
        ease: "none",
      },
      0,
    );

    movingSvgReveal.fromTo(
      ".moving-img img",
      {
        filter: "blur(10px)",
        xPercent: 5,
        scale: 1.1,
      },
      {
        filter: "blur(0px)",
        scale: 1.2,
        xPercent: -10,
        ease: "none",
      },
      0.2,
    );

    movingSvgReveal.to(
      ".move-txt .word",
      {
        color: "#000",
        textShadow:
          "0 0 6px rgba(45,83,144,0.35), 0 0 10px rgba(45,83,144,0.2)",
        stagger: 0.08,
        ease: "none",
      },
      0,
    );
    movingSvgReveal.to(
      ".move-txt .word",
      {
        textShadow: "0 0 0 rgba(0,0,0,0)",
        stagger: 0.08,
        ease: "none",
      },
      0.5,
    );
    movingSvgReveal.fromTo(
      ".roling-svg",
      { y: 0 },
      {
        y: 200,
        ease: "none",
        duration: 5,
      },
      0,
    );
  });
  mm2.add("(max-width: 767px)", () => {
    const text = document.querySelector(".move-txt h5");

    text.innerHTML = text.textContent
      .split(" ")
      .map((word) => `<span class="word">${word}</span>`)
      .join(" ");

    gsap.to(".move-txt .word", {
      color: "#000",
      stagger: 0.08, // controls word-by-word delay
      ease: "none",
      scrollTrigger: {
        trigger: ".move-txt",
        start: "top 80%",
        end: "top 40%",
        scrub: true,
      },
    });
  });
  // mm2.add("(max-width: 991px)", () => {
  //   movingSvgReveal.to(
  //     ".move-txt .word",
  //     {
  //       color: "#000",
  //       stagger: 0.15,
  //       ease: "none",
  //     },
  //     0,
  //   );
  //   movingSvgReveal.fromTo(
  //     ".roling-svg",
  //     { y: 0 },
  //     {
  //       y: 100,
  //       ease: "none",
  //       duration: 5,
  //     },
  //     0,
  //   );
  // });

  // mm2.add("(max-width: 767px)", () => {
  //   movingSvgReveal.to(
  //     ".move-txt .word",
  //     {
  //       color: "#000",
  //       stagger: 0.15,
  //       ease: "none",
  //     },
  //     0,
  //   );
  //   movingSvgReveal.fromTo(
  //     ".rolling-svg.for-mob",
  //     { x: "0%" },
  //     {
  //       x: "60vw",
  //       ease: "none",
  //       duration: 4,
  //     },
  //     0,
  //   );
  // });

  // ================================
  // ANIMATION: studio3dReveal
  // ================================
  const mm4 = gsap.matchMedia();

  mm4.add(
    {
      sm: "(min-width: 576px)",
      lg: "(min-width: 1200px)",
    },
    (context) => {
      const { sm, lg } = context.conditions;

      const studio3dReveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".studio-sec",
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // base animations (576px+)
      studio3dReveal.from(".studio-sec", {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "power3.out",
      });

      studio3dReveal.from(
        ".badge-txt2",
        { y: 300, duration: 2, scale: 0, opacity: 0 },
        0,
      );

      studio3dReveal.from(
        ".heading1",
        { y: 400, duration: 2, scale: 0, opacity: 0 },
        1,
      );

      studio3dReveal.from(
        ".heading2",
        { y: 500, duration: 2, opacity: 0, scale: 0 },
        2,
      );

      // only 1200px+
      if (lg) {
        studio3dReveal.from(
          ".crvgsap1",
          { width: "700px", opacity: 0, duration: 3 },
          1,
        );

        studio3dReveal.from(
          ".crvgsap2",
          { width: "700px", top: -1, right: -2, duration: 3 },
          1,
        );
      }
    },
  );
  // ================================
  // ANIMATION: createGridPieces (Helper)
  // ================================
  // function createGridPieces(container, rows = 8, cols = 12) {
  //   const rect = container.getBoundingClientRect();
  //   const imgRatio = container.naturalWidth / container.naturalHeight;
  //   const boxRatio = rect.width / rect.height;

  //   let bgWidth, bgHeight;

  //   if (imgRatio > boxRatio) {
  //     bgHeight = rows * 100;
  //     bgWidth = (imgRatio / boxRatio) * cols * 100;
  //   } else {
  //     bgWidth = cols * 100;
  //     bgHeight = (boxRatio / imgRatio) * rows * 100;
  //   }

  //   for (let r = 0; r < rows; r++) {
  //     for (let c = 0; c < cols; c++) {
  //       const piece = document.createElement("div");
  //       piece.classList.add("piece");

  //       piece.style.width = `${100 / cols}%`;
  //       piece.style.height = `${100 / rows}%`;
  //       piece.style.left = `${(c * 100) / cols}%`;
  //       piece.style.top = `${(r * 100) / rows}%`;

  //       piece.style.backgroundImage = `url(${container.src})`;
  //       piece.style.backgroundSize = `${bgWidth}% ${bgHeight}%`;
  //       piece.style.backgroundPosition = `${
  //         (c / (cols - 1)) * 100
  //       }% ${(r / (rows - 1)) * 100}%`;
  //       piece.style.backgroundRepeat = "no-repeat";

  //       container.parentNode.appendChild(piece);
  //     }
  //   }

  //   container.style.opacity = 0;
  // }

  // createGridPieces(document.querySelector(".pool-main img"));

  // ================================
  // ANIMATION: poolFeatureSteps
  // ================================
  const mm5 = gsap.matchMedia();

  mm5.add("(min-width: 767px)", () => {
    gsap.set(".pool-parts img", {
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
      opacity: 0,
      scale: 0.8,
    });
    gsap.set(".pool-list a", { opacity: 0, x: 50 });
    gsap.set(".pool-decp .pool-bx", { opacity: 0, y: 80 });
    gsap.set(".pool1, .pool3", { opacity: 0, scale: 0 });

    // const pieces = document.querySelectorAll(".piece");

    const poolFeatureSteps = gsap.timeline({
      scrollTrigger: {
        trigger: ".pool-wrap",
        start: "top top",
        end: "+=350%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    poolFeatureSteps
      .to({}, { duration: 1 })
      .to(
        ".main-join",
        {
          opacity: 0,     
          filter: "blur(8px)",
          duration: 3,
          stagger: { amount: 0.5, from: "bottom" },
        },
        0,
      )
      .to(".pool7", { opacity: 0 }, 0)
      .to(
        ".pool1",
        { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1 },
        "-=0.7",
      )
      .to("#structurePart", { opacity: 1, scale: 1, y: 0, duration: 1 })
      .to(".pool-item1", { opacity: 1, x: 0, duration: 0.3 }, "<")
      .to(
        ".pool-decp .pool-bx:nth-child(1)",
        { opacity: 1, y: 0, duration: 0.4 },
        "<",
      )
      .to(".pool3", { opacity: 1, scale: 1, duration: 1 })
      .to("#hydraulicsPart", { opacity: 1, scale: 1, y: 0, duration: 1 })
      .to(".pool-item2", { opacity: 1, x: 0, duration: 0.3 }, "<")
      .to(
        ".pool-decp .pool-bx:nth-child(1)",
        { opacity: 0, y: -40, duration: 0.3 },
        "<",
      )
      .to(
        ".pool-decp .pool-bx:nth-child(2)",
        { opacity: 1, y: 0, duration: 0.4 },
        "<",
      )
      .to("#interiorFinishPart", { opacity: 1, scale: 1, y: 0, duration: 1 })
      .to(".pool-item3", { opacity: 1, x: 0, duration: 0.3 }, "<")
      .to(
        ".pool-decp .pool-bx:nth-child(2)",
        { opacity: 0, y: -40, duration: 0.3 },
        "<",
      )
      .to(
        ".pool-decp .pool-bx:nth-child(3)",
        { opacity: 1, y: 0, duration: 0.4 },
        "<",
      )
      .to("#decksystemPart", { opacity: 1, scale: 1, y: 0, duration: 1 })
      .to(".pool8", {
        width: "600px",
        opacity: 1,
        scale: 1,
        y: "25vh",
        duration: 1,
      })
      .to(".pool-item4", { opacity: 1, x: 0, duration: 0.3 }, "<")
      .to(
        ".pool-decp .pool-bx:nth-child(3)",
        { opacity: 0, y: -40, duration: 0.3 },
        "<",
      )
      .to(
        ".pool-decp .pool-bx:nth-child(4)",
        { opacity: 1, y: 0, duration: 0.4 },
        "<",
      );
  });

  // ================================
  // ANIMATION: customizeStepReveal
  // ================================
  const mm7 = gsap.matchMedia();

  mm7.add("(min-width: 768px)", () => {
    const boxes = gsap.utils.toArray(".cust-left .cust-box");
    const images = gsap.utils.toArray(".cust-right .cust-box-desc");
    const section = document.querySelector(".customize-studio");

    boxes.forEach((box, i) => {
      gsap.set(box, { opacity: 0, y: 80, scale: 0.95 });
      gsap.set(images[i], { opacity: 0, y: 60, scale: 0.95 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".customize-studio",
        start: "top top",
        end: "+=300%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    boxes.forEach((box, i) => {
      tl.to(box, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
      }).to(
        images[i],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "<",
      );

      if (i < boxes.length - 1) {
        tl.to(box, {
          opacity: 0,
          y: -60,
          scale: 0.95,
          duration: 1.2,
          ease: "power2.in",
        }).to(
          images[i],
          {
            opacity: 0,
            y: -40,
            scale: 0.95,
            duration: 1.2,
            ease: "power2.in",
          },
          "<",
        );
      }
    });
  });
  // ================================
  // ANIMATION: sliderInit
  // ================================
  $(".pool-slider-wrap").slick({
    slidesToShow: 2,
    speed: 1600,
    cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
    arrows: false,
    swipeToSlide: false,
    touchThreshold: 25,
    edgeFriction: 0.5,
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  });

  // ================================
  // ANIMATION: dragCursor
  // ================================
  const cursor = document.querySelector(".drag-cursor");
  document.querySelector(".pool-slider").addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power2.out",
    });
  });

  // ================================
  // ANIMATION: modernBgReveal
  // ================================
  const mm8 = gsap.matchMedia();

  mm8.add("(min-width: 768px)", () => {
    const modernGsap = gsap.timeline({
      scrollTrigger: {
        trigger: ".modern-design",
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onToggle: (self) => section.classList.toggle("active", self.isActive),
      },
    });

    modernGsap.from(
      ".modern-bg",
      {
        scale: 0.6,
        borderRadius: 25,
        opacity: 0.9,
        duration: 2,
      },
      0,
    );

    modernGsap.from(".modern-design h3", {
      opacity: 0,
      y: 60,
      filter: "blur(10px)",
      duration: 1.2,
      ease: "power4.out",
    });

    const $wrap = $(".logo-wrap");
    const $glow = $(".bg-glow");

    $wrap.on("mousemove", function (e) {
      const offset = $wrap.offset();
      const x = e.pageX - offset.left;
      const y = e.pageY - offset.top;
      $glow.css({
        left: x + "px",
        top: y + "px",
        transform: "translate(-50%, -50%)",
      });
    });
  });

  // ================================
  // ANIMATION: readyReveal
  // ================================
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1200px)", () => {
    const readyGsap = gsap.timeline({
      scrollTrigger: {
        trigger: ".ready",
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    readyGsap.from(".ready-inner ", {
      scale: 0.5,
      duration: 1,
      opacity: 0,
    });
  });

  // ================================
  // ANIMATION: poolListHover
  // ================================
  $(".pool-list a").hover(
    function () {
      $(".pool-list a").removeClass("active");
      $(this).addClass("active");
    },
    function () {
      $(this).removeClass("active");
    },
  );

  // ================================
  // ANIMATION: loaderBookOpen
  // ================================
  const loader = document.querySelector(".loader");

  if (loader) {
    document.body.classList.add("no-scroll");

    if (typeof lenis !== "undefined") {
      lenis.stop();
    }

    const loaderTl = gsap.timeline({
      defaults: { ease: "power4.inOut", duration: 1.4 },
      onComplete: () => {
        loader.style.display = "none";
        document.body.classList.remove("no-scroll");
        if (typeof lenis !== "undefined") {
          lenis.start();
        }
        ScrollTrigger.refresh();
      },
    });

    gsap.set(".upper-div", { y: 0 });
    gsap.set(".lower-div", { y: 0 });

    loaderTl
      .to(".upper-div", { y: "-100%", duration: 3 })
      .to(".lower-div", { y: "100%", duration: 3 }, 0)
      .to(".loader", { opacity: 0, duration: 0.5 }, "-=0.6");
  }

  // ================================
  // ANIMATION: heroParallax
  // ================================
  gsap.to(".hero-bg img", {
    scale: 1.25,
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // ================================
  // ANIMATION: bannerFadeOut
  // ================================
  gsap.to(".bnnr-inner", {
    opacity: 0,
    y: -120,
    filter: "blur(6px)",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // ================================
  // ANIMATION: headerScroll
  // ================================
  const header = document.querySelector(".main-header");

  let showAnim = gsap.to(header, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    paused: true,
    ease: "power3.out",
  });

  let hideAnim = gsap.to(header, {
    y: 0,
    opacity: 1,
    duration: 0.4,
    paused: true,
    ease: "power2.in",
  });

  // hero sec
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    onUpdate: (self) => {
      if (self.progress > 0.05 && self.progress < 0.95) {
        hideAnim.play();
      } else {
        showAnim.play();
      }
    },
  });

  ScrollTrigger.create({
    trigger: ".hero",
    start: "bottom top",
    onEnter: () => {
      header.classList.add("fixed");
      showAnim.play();
    },
    onLeaveBack: () => {
      header.classList.remove("fixed");
      showAnim.play();
    },
  });

  // ================================
  // ANIMATION: textGlowReveal
  // ================================
  const textEl = document.querySelector(".glow-text");

  const temp = document.createElement("div");
  temp.innerHTML = textEl.innerHTML;

  let finalHTML = "";

  temp.childNodes.forEach((node) => {
    if (node.nodeType === 3) {
      let words = node.textContent.trim().split(/\s+/);
      words.forEach((word) => {
        if (!word) return;
        let letters = word
          .split("")
          .map((char) => `<span class="char">${char}</span>`)
          .join("");
        finalHTML += `<span class="word">${letters}</span> `;
      });
    }

    if (node.nodeType === 1 && node.classList.contains("blue-color")) {
      let words = node.textContent.trim().split(/\s+/);
      let blueHTML = words
        .map((word) => {
          if (!word) return "";
          let letters = word
            .split("")
            .map((char) => `<span class="char is-blue">${char}</span>`)
            .join("");
          return `<span class="word">${letters}</span>`;
        })
        .join(" ");
      finalHTML += `<span class="blue-color">${blueHTML}</span>`;
    }
  });

  textEl.innerHTML = finalHTML.trim();

  const chars = document.querySelectorAll(".glow-text .char");

  ScrollTrigger.create({
    trigger: ".heading-single",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true,
    onUpdate: (self) => {
      let progress = self.progress * 1.8;
      let current = Math.floor(progress * chars.length);
      chars.forEach((char, i) => {
        if (i < current - 2) {
          char.classList.add("revealed");
          char.classList.remove("active");
        } else if (i >= current - 2 && i <= current + 2) {
          char.classList.add("active");
          char.classList.remove("revealed");
        } else {
          char.classList.remove("active", "revealed");
        }
      });
    },
  });

  // ================================
  // ANIMATION: ctaMagneticHover
  // ================================
  const btn = document.querySelector(".cta");

  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
  });

  // ================================
  // ANIMATION: mobilePoolAccordion
  // ================================
  const $parent = $(".max-767");

  $parent.on("click touchstart", ".pool-headings a", function (e) {
    e.preventDefault();
    const $this = $(this);
    if ($this.hasClass("active")) {
      $this.removeClass("active");
    } else {
      $parent.find(".pool-headings a").removeClass("active");
      $this.addClass("active");
    }
  });

  $(document).on("click touchstart", function (e) {
    if (!$(e.target).closest(".max-767").length) {
      $parent.find(".pool-headings a").removeClass("active");
    }
  });

  const reaveal = document.querySelector(".max-767");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reaveal.classList.add("active");
          observer.unobserve(reaveal);
        }
      });
    },
    { threshold: 0.4 },
  );

  observer.observe(reaveal);

  // ================================
  // REFRESH
  // ================================
  setTimeout(() => ScrollTrigger.refresh(), 200);
  $(window).on("resize", () => ScrollTrigger.refresh());
});

const target_sections = document.querySelectorAll(
  ".customize-studio, .pool-wrap",
);
const header_new = document.querySelector(".main-header");

window.addEventListener("scroll", function () {
  if (!target_sections.length || !header_new) return;

  let hideHeader = false;

  target_sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 0 && rect.bottom > 0) {
      hideHeader = true;
    }
  });

  if (hideHeader) {
    header_new.style.display = "none";
  } else {
    header_new.style.display = "block";
  }
});
