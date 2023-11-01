document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        console.log("clicked");

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Send a POST request to the server for login validation
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${username}&password=${password}`,
        })
            .then((response) => {
                if (response.status === 200) {
                    // Successful login, redirect to another page or perform further actions
                    alert("Login successful");
                } else if (response.status === 401) {
                    errorMessage.innerText = "Invalid username or password";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});