document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const errorMessage = document.getElementById("error-message");

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Send a POST request to the server for signup
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `username=${username}&password=${password}`,
        })
            .then((response) => {
                if (response.status === 201) {
                    // Successful signup, you can redirect to the login page or perform further actions
                    alert("Signup successful");
                } else if (response.status === 409) {
                    errorMessage.innerText = "Username already in use";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});