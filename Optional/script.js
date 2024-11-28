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
    Elm.style.background = "#" + (Math.floor(Math.random() * 100)) + "ef";
    if (Elm.textContent == "Hi")
        Elm.textContent = "Bye";
    else
        Elm.textContent = "Hi";

    // Elm.style.borderRadius = "(Math.floor(Math.random() * 100))";
});




