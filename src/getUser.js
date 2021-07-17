import HOST_BACKEND from './hostBackend.js';

export async function registerUser(firstName, lastName, usernameSignUp, passwordSignUp, email) {
    try {
        const response = await fetch(`${HOST_BACKEND}/oneUserFE`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },

            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: usernameSignUp,
                password: passwordSignUp,
                email: email
            })
        })
        const newUser = await response.json();
        return {newUser}
    }
    catch (err) {
        console.log(err);
    }
}

export async function loginUser(usernameSignIn, passwordSignIn) {
    try {
        const response = await fetch(`${HOST_BACKEND}/authOneUserFE`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },

            body: JSON.stringify({
                username: usernameSignIn,
                password: passwordSignIn
            })
        })
        const user = await response.json();
     
        return user
    }
    catch (err) {
        console.log(err);
    }
}