const inputElm = document.getElementById("new-todo");
const todoElm = document.getElementById("todos");
const doneElm = document.getElementById("dones");
const searchElm = document.getElementById("search");
const todoContainer = document.getElementById("todo");
const addButton = todoContainer.querySelector("button");
const newPen = todoContainer.querySelector(".fa-pen");

const storeData = () => {
    localStorage.setItem('todos', JSON.stringify(items));
}

const readData = () => {
    try {
        const strJSON = localStorage.getItem('todos');
        return strJSON === null ? [] : JSON.parse(strJSON);

    } catch (error) {
        return [];
    }
}
const renderFunc = (arrOfItems = items) => {
    todoElm.innerHTML = "";
    doneElm.innerHTML = "";

    const todos = arrOfItems.filter(item => !item.done);
    const dones = arrOfItems.filter(item => item.done);

    if (todos.length === 0) {
        todoElm.innerHTML = "<p style='font-size: 40px; font-weight: bold; color:#3797b0; text-align: center;text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;'>No tasks found!</p>";
    }

    if (dones.length === 0) {
        doneElm.innerHTML = "<p style='font-size: 40px; font-weight: bold; color:#3797b0; text-align: center;text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;'>No tasks found!</p>";
    }

    arrOfItems.forEach((item, index) => {
        const strElm = `
                <li>
                       <input type="checkbox" class="checkbox" onchange="toggle(${index})" ${item.done ? "checked" : ""}>
                       <p>${index + 1}. ${item.title} </p>
                       <div>
                         <button onclick="deleteFunc(${index})"><i class="fa-solid fa-trash"></i></button>
                         ${item.done ? "" : `<button onclick='editFunc(${index})'><i class="fa-solid fa-pen-to-square"></i></button>`}
                       </div>
                 </li> `;
        if (item.done) {
            doneElm.innerHTML += strElm;
        }
        else {
            todoElm.innerHTML += strElm;
        }
    });
};

let items = readData();
renderFunc();

const addFunc = (event) => {
    if (event && event.key != "Enter") {
        return;
    }
    if (editIndex !== null) {
        return;
    }
    const value = inputElm.value + "";
    if (value.length > 0) {
        const Elm = {
            id: Date.now(),
            title: value,
            done: false
        };
        items.push(Elm);
        inputElm.value = "";
        renderFunc();
    }
    storeData();
}

const toggle = (index) => {
    items[index].done = !items[index].done;
    renderFunc();
    storeData();
}

const deleteFunc = (index) => {
    items.splice(index, 1);
    renderFunc();
    storeData();
}

// const editFunc = (index) => {
//     items[index].title = prompt("Please enter new title", items[index].title) || items[index].title;
//     renderFunc();
//     storeData();
// }

let editIndex = null;
const editFunc = (index) => {
    editIndex = index;
    const item = items[index];
    inputElm.value = item.title;

    const editButtons = document.createElement("div");
    editButtons.id = "edit-buttons";
    editButtons.innerHTML = `
        <button class="btn" onclick="confirmEdit()">OK</button>
        <button class="btn" onclick="cancelEdit()">Cancel</button>
    `;
    addButton.style.display = "none";
    if (!document.getElementById("edit-buttons")) {
        todoContainer.appendChild(editButtons)
    }
};

const confirmEdit = () => {
    if (editIndex !== null) {
        items[editIndex].title = inputElm.value.trim();
        inputElm.value = "";
        editIndex = null;
        removeEditButtons();
        renderFunc();
        storeData();
    }
};

const cancelEdit = () => {
    inputElm.value = "";
    editIndex = null;
    removeEditButtons();
};

const removeEditButtons = () => {
    const editButtons = document.getElementById("edit-buttons");
    if (editButtons) {
        editButtons.remove();
        addButton.style.display = "inline-block";
    }
};

const search = () => {
    const term = searchElm.value.toLowerCase();
    if (term.length >= 1) {
        const filteredItems = items.filter(item => item.title.toLowerCase().includes(term));
        renderFunc(filteredItems);
    } else {
        renderFunc();
    }
}
