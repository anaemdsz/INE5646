const logoClickHandler = () => {
    // TO-DO: 
    //     - If user is logged in go to home dashboard
    //     - Else go to login screen
    document.location.href = "http://127.0.0.1:5500/html/index.html"
}

const showSignup = () => {
    console.log("IN")
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("signup-box").classList.remove("hidden");
};

const login = () => {
    document.location.href = "http://127.0.0.1:5500/html/home.html"
    // TO-DO: 
    //     - Check if user is registered
    //     - Check if password is right
    //     - Go to home page
};

const signup = () => {
    document.location.href = "http://127.0.0.1:5500/html/home.html"
    // TO-DO:
    //     - Check if user is already in use and warn if it is 
    //     - Check if passwords match (and if they are hard enough)
    //     - Add user+password to DB
};



// Stil in tests

/* Custom Dragula JS */
dragula([
    document.getElementById("to-do"),
    document.getElementById("doing"),
    document.getElementById("done"),
    document.getElementById("trash")
]);
removeOnSpill: false
    .on("drag", function (el) {
        el.className.replace("ex-moved", "");
    })
    .on("drop", function (el) {
        el.className += "ex-moved";
    })
    .on("over", function (el, container) {
        container.className += "ex-over";
    })
    .on("out", function (el, container) {
        container.className.replace("ex-over", "");
    });

/* Vanilla JS to add a new task */
function addTask() {
    /* Get task text from input */
    var inputTask = document.getElementById("taskText").value;
    /* Add task to the 'To Do' column */
    document.getElementById("to-do").innerHTML +=
        "<li class='task'><p>" + inputTask + "</p></li>";
    /* Clear task text from input after adding task */
    document.getElementById("taskText").value = "";
}

/* Vanilla JS to delete tasks in 'Trash' column */
function emptyTrash() {
    /* Clear tasks from 'Trash' column */
    document.getElementById("trash").innerHTML = "";
}
