const Elm = document.getElementById("myDIV");

const moveFunction = () => {
    const ElmH = window.innerHeight;
    const ElmW = window.innerWidth;
    const randomX = Math.floor(Math.random() * (ElmW - Elm.offsetWidth));
    const randomY = Math.floor(Math.random() * (ElmH - Elm.offsetWidth));
    Elm.style.left = `${randomX}px`;
    Elm.style.top = `${randomY}px`;

}

Elm.addEventListener("mouseover", () => {
    Elm.style.background = "#" + (Math.floor(Math.random() * 16777216).toString(16));
    Elm.textContent = Elm.textContent === "Hi" ? "Bye" : "Hi";
});




