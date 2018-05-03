    let template = document.querySelector("#olderTemp").content;

    let olderThings = document.querySelector("#older");
    let page = 1;
    let lookingForData = false;

    function fetchOlder() {
        lookingForData = true;

        let urlParams = new URLSearchParams(window.location.search);

        let catid = urlParams.get("category");
        let parentid = urlParams.get("parent");
        console.log(parentid);

        fetch("http://creative-digital.one/wordpress/theme_7/wpress/wp-json/wp/v2/jazz?_embed&per_page=2&page=" + page + "&categories=" + catid)
            .then(e => e.json())
            .then(showOlder)
    }

    function showOlder(data) {
        console.log(data);
        data.forEach(showOneOlder);
        lookingForData = false;
    }

    function showOneOlder(anEvent) {
        console.log(anEvent._embeded)


        let clone = template.cloneNode(true);

        clone.querySelector("h1").textContent = anEvent.title.rendered;
        clone.querySelector(".price span").textContent = anEvent.acf.price;
        var year = anEvent.acf.date.substring(2, 4);
        var month = anEvent.acf.date.substring(4, 6);
        var day = anEvent.acf.date.substring(6, 8);

          clone.querySelector(".genre").textContent = anEvent.acf.genre;
        clone.querySelector(".date").textContent = day + "/" + month + "/" + year;
        clone.querySelector(".time").textContent = anEvent.acf.time;
        if (anEvent._embedded["wp:featuredmedia"]) { //if image is present
            clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        } else { //  if no img present
            clone.querySelector("img").remove()
        }
        clone.querySelector("a.readmore").href = "subpage.html?id=" + anEvent.id;

        other.appendChild(clone);
    }

    fetchOlder();
    setInterval(function () {
        if (bottomVisible() && lookingForData === false) {
            page++;
            fetchOlder();
        }
    }, 100)



    function bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
    }
