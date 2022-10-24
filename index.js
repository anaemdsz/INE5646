const home = () => {
    // TO-DO: Back to home page
}

const showSignup = () => {
    console.log("IN")
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("signup-box").classList.remove("hidden");
};

const login = () => {
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




