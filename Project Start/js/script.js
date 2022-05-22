window.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  setTimeout(function () {
    loader.style.apacity = "0";
    setTimeout(function () {
      loader.style.display = "none";
    }, 1500);
  }, 2000);

  //-------------- TABS

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    tabParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    console.log(1);
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  //-----MODAL

  const modalBtn = document.querySelectorAll(".btnmodal"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector("[date-close]");

  modalBtn.forEach((btn) => {
    btn.addEventListener("click", showModal);
  });

  function showModal() {
    modal.classList.add("show");
    modal.classList.remove("none");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimer);
  }
  function hideModal() {
    modal.classList.add("none");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
  modalClose.addEventListener("click", hideModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });
  //const modalTimer = setTimeout(showModal, 10000);
  function showMyModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal();
      window.removeEventListener("scroll", showMyModalByScroll);
    }
  }
  window.addEventListener("scroll", showMyModalByScroll);

  //--------- DATE

  const deadline = "2022-05-25";

  function getTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor(((total / 1000) * 60 * 60) % 24),
      minutes = Math.floor((total / 1000 / 10) % 60),
      seconds = Math.floor((total / 1000) % 60);

    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if ((num >= 0, num < 10)) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updeteTime, 1000);

    updeteTime();

    function updeteTime() {
      const time = getTime(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  //--------class

  class CarCard {
    constructor(src, alt, title, price, descr, parentSelector, ...classess) {
      this.src = src;
      this.title = title;
      this.alt = alt;
      this.price = price;
      this.descr = descr;
      this.classess = classess;
      this.parent = document.querySelector(parentSelector);
      this.transwer = "11100";
      this.changeToUSD();
    }
    changeToUSD() {
      this.price = this.price * this.transwer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classess.length === 0) {
        this.classess = "menu__item";
        element.classList.add(this.classess);
      } else {
        this.classess.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
        <div class="menu__item">
              <img src=${this.src} alt=${this.alt} />
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                <div class="menu__item-cost">Price:</div>
                <div class="menu__item-total"><span>${this.price}</span> sum</div>
              </div>
            </div>
        `;
      this.parent.append(element);
    }
  }

  new CarCard(
    "../img/tabs/1.jpg",
    "vegy",
    "2021 Mercedes-Benz C-Class",
    299,
    `The 2021 Mercedes-Benz C-Class finishes in the top half of ou luxury small car rankings  It is powerful and upscale but it has so/so handli`,
    ".menu .container"
  ).render();

  new CarCard(
    "../img/tabs/1.jpg",
    "vegy",
    "2021 Mercedes-Benz C-Class",
    299,
    `The 2021 Mercedes-Benz C-Class finishes in the top half of ou luxury small car rankings  It is powerful and upscale but it has so/so handli`,
    ".menu .container"
  ).render();

  new CarCard(
    "../img/tabs/1.jpg",
    "vegy",
    "2021 Mercedes-Benz C-Class",
    299,
    `The 2021 Mercedes-Benz C-Class finishes in the top half of ou luxury small car rankings  It is powerful and upscale but it has so/so handli`,
    ".menu .container"
  ).render();

  //---------SLIDER first way

  // const slides = document.querySelectorAll(".offer__slide"),
  //   prev = document.querySelector(".offer__slider-prev"),
  //   next = document.querySelector(".offer__slider-next"),
  //   current = document.querySelector("#current"),
  //   total = document.querySelector("#total");

  // let slideIndex = 1;

  // show(slideIndex);

  // function show(s) {
  //   if (s > slides.length) {
  //     slideIndex = 1;
  //     if (s < 1) {
  //       slideIndex = slides.length;
  //     }
  //   }
  //   slides.forEach((item) => (item.style.cssText = "display: none"));
  //   slides[slideIndex - 1].style.display = "block";
  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }
  // function addSlider() {
  //   show((slideIndex += 1));
  // }
  // function prefSlider() {
  //   show((slideIndex = slideIndex - 1));
  // }
  // prev.addEventListener("click", () => {
  //   prefSlider();
  //   if (slideIndex === 0) {
  //     slideIndex = total;
  //   }
  // });
  // next.addEventListener("click", () => {
  //   addSlider();
  // });

  //----------second way
  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slideWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slideWrapper).width,
    slideField = document.querySelector(".offer__slider-way");

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  const cssField = slideField.style;
  cssField.width = 100 * slides.length + `%`;
  cssField.display = "flex";
  cssField.transition = "0.5s all";
  slideWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slideField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset == +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    slideField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });
});
