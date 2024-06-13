import { checkToken, redirect } from "./utils.js";

const form = document.forms[0];
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.querySelector(".loginBtn")


window.addEventListener("DOMContentLoaded", function () {
    const hasToken = checkToken();
    if (hasToken) {
        redirect("/admin.html");
    }

});

loginBtn.disabled = true;


function toggle() {

    if (credentials.email && credentials.password) {
        loginBtn.disabled = false

    } else {
        loginBtn.disabled = true

    }
    return;
}
const credentials = {
    email: emailInput.value,
    password: passwordInput.value,
};


emailInput.oninput = function (event) {
    credentials.email = event.target.value;

    console.log(credentials);
    toggle()
};

passwordInput.oninput = function (event) {
    credentials.password = event.target.value;

    console.log(credentials);
    toggle()
};


form.onsubmit = function (event) {
    event.preventDefault();
    login();

    emailInput.value = "";
    passwordInput.value = "";
};

async function login() {
    const api_url = "https://api.escuelajs.co/api/v1/auth/login";
    try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (data.statusCode == 401) {
            alert("hato")
        } else {
            const { access_token, refresh_token } = data; // {}

            sessionStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            const hasToken = checkToken();
            if (hasToken === undefined) {
                alert("hato qiymat")
            } else {

                redirect("/admin.html");
            }
        }


    } catch (error) {
        console.error;
    }
}

