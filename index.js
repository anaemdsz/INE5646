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
    // TO-DO:
    //     - Check if user is already in use and warn if it is 
    //     - Check if passwords match (and if they are hard enough)
    //     - Add user+password to DB
};



