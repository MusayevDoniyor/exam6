
import { checkToken, redirect } from "./utils.js";

const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");

const btn = document.querySelector("button[type='submit']");

window.addEventListener("DOMContentLoaded", function () {
    const hasToken = checkToken();

    if (!hasToken) {
        redirect("/index.html");
    }
});

const form = document.forms[0];

btn.disabled = true;

function toggle() {
    btn.disabled = !(title.value && price.value && description.value);
}

const products = [];

title.oninput = toggle;
price.oninput = toggle;
description.oninput = toggle;

form.onsubmit = function (event) {
    event.preventDefault();

    btn.disabled = true;

    const newProduct = {
        id: Date.now(),
        title: title.value,
        price: price.value,
        description: description.value,
    };

    title.value = '';
    price.value = '';
    description.value = '';

    products.push(newProduct);

    mapProduct(products);
};

function mapProduct(mappa) {
    let container = document.querySelector(".container");

    container.innerHTML = ''; 

    mappa.forEach(mad => {
        if (mad.title === "" && mad.price === "" && mad.description === "") {
            console.log("Ma'lumotlar bo'sh");
        } else {
            let cleanebtn = document.createElement("button");
            cleanebtn.textContent = "o'chirish";

            let div = document.createElement("div");
            div.className = "content";

            let titl = document.createElement("h2");
            titl.textContent = mad.title;

            let pric = document.createElement("span");
            pric.textContent = ` $${mad.price}`;

            let descriptio = document.createElement("p");
            descriptio.textContent = mad.description;

            cleanebtn.onclick = function () {
                // Elementlarni tozalash
                titl.textContent = "";
                pric.textContent = "";
                descriptio.textContent = "";
                // O'chirish tugmasini yashirish
                cleanebtn.hidden = true;
                // Blokni yashirish
                div.style.display = "none";
            };

            div.append(titl);
            div.append(pric);
            div.append(descriptio);
            div.append(cleanebtn);

            container.append(div);
        }
    });
    console.log(mappa)
}