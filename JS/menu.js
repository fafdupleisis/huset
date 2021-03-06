window.addEventListener('load', () => {
    let menuOpen = false;
    let menuIcon = document.querySelector("svg.menuIcon")
    let menu = document.querySelector(".menu");
    let bars = menuIcon.querySelectorAll("rect");
    menuIcon.addEventListener('click', toggleMenu);

    function toggleMenu() {
        menuOpen = !menuOpen;
        bars[0].classList.toggle("rotateDown");
        bars[1].classList.toggle("fadeOut");
        bars[2].classList.toggle("rotateUp");
        menu.classList.toggle("hidden");
    }
    fetch("http://creative-digital.one/wordpress/theme_7/wpress/wp-json/wp/v2/categories")
        .then(e => e.json())
        .then(buildMenu)

    function buildMenu(data) {
        let parentElement = document.querySelector(".menu ul");
        data.forEach(item => {
            console.log(item.parent);
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.textContent = item.name;
            a.href = "index.html?category=" + item.id;

           /* if (item.parent == 8) {
                a.textContent = item.name;
                a.href = "index.html?category" + item.id;
            } else {
                a.textContent.remove;
            }
*/
            li.appendChild(a);
            parentElement.appendChild(li);


        })
    }









});
