document.addEventListener("DOMContentLoaded", function() {
    let words = document.querySelectorAll(".word");
    words.forEach((word) => {
        let letters = word.textContent.split("");
        word.textContent = "";
        letters.forEach((letter) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.className = "letter";
            word.append(span);
        });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    let changeText = () => {
        let currentWord = words[currentWordIndex];
        let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = "letter out";
            }, i * 80);
        });

        nextWord.style.opacity = "1";
        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => {
                letter.className = "letter in";
            }, 340 + i * 80);
        });

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    changeText();
    setInterval(changeText, 3000);

    ////////////////////////////////// Circle Skill Animation////////////////////////////////////////
    const circles = document.querySelectorAll('.circle');

    circles.forEach(elem => {
        var dots = parseInt(elem.getAttribute("data-dots"), 10);
        var marked = parseInt(elem.getAttribute("data-percent"), 10);
        var percent = Math.floor(dots * marked / 100);
        var points = "";
        var rotate = 360 / dots;

        for (let i = 0; i < dots; i++) {
            points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
        }
        elem.innerHTML = points;
        const pointsMarked = elem.querySelectorAll('.points');
        for (let i = 0; i < percent; i++) {
            pointsMarked[i].classList.add('marked');
        }
    });

    /////////////////////////// Active menu///////////////////////////////////
    let menuLi = document.querySelectorAll('header ul li a');
    let sections = document.querySelectorAll('section');

    function activeMenu() {
        let len = sections.length;
        while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
        menuLi.forEach(sec => sec.classList.remove("active"));
        menuLi[len].classList.add("active");
    }

    activeMenu();
    window.addEventListener("scroll", activeMenu);

    /////////////////////////////////////////////////// Sticky navbar////////////////////////////////////////////////////////////////////////
    const header = document.querySelector("header");
    window.addEventListener("scroll", function() {
        header.classList.toggle("sticky", window.scrollY > 50);
    });

    ////////////////////////////////////////////////////////// Smooth scroll for navigation menu links/////////////////////////////////////
    menuLi.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
//////////////////////////////////////////////////////////toggle icone navbar/////////////////////////////////////
let menuIcone = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
menuIcone.onclick = () => {
    menuIcone.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}
