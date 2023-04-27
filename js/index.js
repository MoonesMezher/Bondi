function $(element) {
    return document.querySelector(element);
}

function $$(element) {
    return document.querySelectorAll(element);
}
let count = {
    works: 8,
    blogs: 3
};

getDataWorks("../json/works.json");

getDataBlogs("../json/blog.json");

$$(".nav-link").forEach((e) => {
    e.addEventListener("click", function() {
        clickBtn(e, ".nav-link", "active");
    });
});

$$(".work-filter .list-group-item").forEach((e) => {
    e.addEventListener("click", function() {
        clickBtn(e, ".work-filter .list-group-item", "active");

        $$(".works .img").forEach((work) => {
            getWorks(e.innerHTML,work); 
        });
    });
});

$(".work-more").addEventListener("click", () => {
    count.works+=4;
    count.works == 16?$(".work-more").remove():"";
    clearCards($$(".works .img"));
    getDataWorks("../json/works.json");
});

$(".blog-more").addEventListener("click", () => {
    count.blogs+=3;
    count.blogs == 9?$(".blog-more").remove():"";
    clearCards($$(".our-blog .blog"));
    getDataBlogs("../json/blog.json");
});

$(".subscribe form input").onpaste = () => {
    return false;
};

function getWorks(btn,element) {
    element.style.cssText = "display: block";
    if (btn == "all") {
        element.style.cssText = "display: block";
    } else if (btn == "apps") {
        if(element.dataset.name != "application") {
            element.style.cssText = "display: none";
        }
    } else if(element.dataset.name != btn) {
        element.style.cssText = "display: none";
    } 
}

function clickBtn(btn, array, className) {
        $$(array).forEach((btn) => {
            btn.classList.remove(className);
        });
        btn.classList.add(className);
}

function getDataWorks(api) {
    fetch(api)
        .then((Response) => Response.json())
        .then((data) => {
            createWorks(data);
    });
}

function createWorks(data) {
    for(let i=0;i<count.works;i++) {
        let work = document.createElement("div");
        work.className = "img overflow-hidden rounded-1 position-relative";
        work.setAttribute("data-name", data[i].name);
        let img = document.createElement("img");
        img.setAttribute("src", data[i].img);
        work.append(img);
        $(".works").append(work);
    }
}

function clearCards(array) {
    array.forEach(e => {
        e.remove();
    });
}

function getDataBlogs(api) {
    fetch(api)
        .then((Response) => Response.json())
        .then((data) => {
            createBlogs(data);
    });
}

function createBlogs(data) {
    for(let i=0;i<count.blogs;i++) {
        let blog = document.createElement("div");
        blog.className = "blog rounded-1 overflow-hidden";
        let img = document.createElement("img");
        img.setAttribute("src", data[i].img);
        let image = document.createElement("div");
        image.className = "img";
        image.append(img);
        blog.append(image);
        let discription = document.createElement("div");
        discription.className = "discription overflow-hidden position-relative z-1 bg-white p-3";
        let date = document.createElement("p");
        date.className = "mb-0";
        date.textContent = data[i].date;
        let title = document.createElement("h5");
        title.textContent = data[i].title;
        discription.append(date);
        discription.append(title);
        blog.append(discription);
        $(".our-blog .content").append(blog);
    }
}