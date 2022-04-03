const submitSignupBtn = document.querySelector('#submit-sign-up-btn');
const submitLoginBtn = document.querySelector('#submit-login-btn');

// using async function to allow new user to sign up. Preventdefault ensures that nothing regresses back to the default behavior
const signupNewUser = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (password.split("").length < 8) {
        alert("password must be at least 8 characters long. Please try again");
        return;
    }

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up, please try again');
        }
    }
    else {
        alert('Please enter a valid username and password (password must be at least 8 characters)');
    }
};

// this allows a new user to login and prevents the default behavior. Also stating to throw an error if the application can't catch the login for some reason.
const logUserIn = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in, please try again');
        }
    }
};

// event listeners to trigger each function
if (submitSignupBtn) {
    submitSignupBtn.addEventListener('click', signupNewUser);
}
if (submitLoginBtn) {
    submitLoginBtn.addEventListener('click', logUserIn);
}