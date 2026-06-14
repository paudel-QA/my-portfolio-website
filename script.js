document.addEventListener('DOMContentLoaded', function () {

    var navbar = document.querySelector('.navbar');
    var scrollUpBtn = document.querySelector('.scroll-up-btn');
    var menu = document.querySelector('.navbar .menu');
    var menuBtn = document.querySelector('.menu-btn');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        if (window.scrollY > 500) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    });

    scrollUpBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    menuBtn.addEventListener('click', function () {
        menu.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-times');
    });

    // close mobile menu when a link is clicked
    document.querySelectorAll('.navbar .menu li a').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
            menuBtn.querySelector('i').classList.remove('fa-times');
        });
    });

    // active nav link on scroll
    var navLinks = document.querySelectorAll('.navbar .menu li a[href^="#"]:not(.hire)');
    var sections = [];
    navLinks.forEach(function (link) {
        var id = link.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        if (section) {
            sections.push({ link: link, section: section });
        }
    });

    function updateActiveLink() {
        var current = sections[0];
        var triggerPoint = window.scrollY + (window.innerHeight * 0.35);

        sections.forEach(function (item) {
            if (item.section.offsetTop <= triggerPoint) {
                current = item;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        if (current) {
            current.link.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // terminal typing sequence
    var lines = document.querySelectorAll('.term-line .text');
    var summary = document.getElementById('termSummary');
    var lineIndex = 0;

    function typeLine() {
        if (lineIndex >= lines.length) {
            if (summary) {
                summary.textContent = (lines.length - 1) + ' checks passed — ready to ship';
            }
            return;
        }

        var el = lines[lineIndex];
        var line = el.closest('.term-line');
        var fullText = el.getAttribute('data-text');
        var i = 0;

        line.classList.add('visible');

        var typer = setInterval(function () {
            el.textContent = fullText.slice(0, i + 1);
            i++;
            if (i >= fullText.length) {
                clearInterval(typer);
                lineIndex++;
                setTimeout(typeLine, 180);
            }
        }, 18);
    }

    typeLine();
});
