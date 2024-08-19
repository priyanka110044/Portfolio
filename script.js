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
    let menuLi = document.querySelectorAll(".navlist a");
    let sections = document.querySelectorAll("section");

    const changeActive = () => {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        menuLi.forEach((link) => link.classList.remove("active"));
        menuLi[index].classList.add("active");
    };

    changeActive();
    window.addEventListener("scroll", changeActive);

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
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.querySelector('.navlist');
    
    // Toggle the menu visibility and icon state when menuIcon is clicked
    menuIcon.addEventListener('click', function() {
        navList.classList.toggle('show');
        menuIcon.classList.toggle('bx-x'); // Toggle between menu and close (x) icon
    });

    // Optional: Hide the menu and reset the icon when window is resized beyond a certain width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navList.classList.remove('show');
            menuIcon.classList.remove('bx-x'); // Ensure the icon is reset to menu state
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////msg////////////////////////
const scriptURL = 'https://script.google.com/macros/s/AKfycbzXO5NEJTB8xLxh2Zirc2ZXSQZYml3RSYTiA9aKdCY4T0uKDTXi-xMRITO5YbIcvmh0KQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message Sent Successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        }, 5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})
