import HOST_BACKEND from './hostBackend.js';

export async function registerUser(firstName, lastName, usernameSignUp, passwordSignUp, email, profileImgNameLarge, profileImgURLLarge, profileImgURLSmall, profileImgNameSmall) {
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
                email: email,
                profileImgNameLarge: profileImgNameLarge,
                profileImgURLLarge: profileImgURLLarge,
                profileImgURLSmall: profileImgURLSmall,
                profileImgNameSmall: profileImgNameSmall
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

export async function updateProfileImg(usernameSignIn, loggedEmail, profileImgURL, profileImgName, size ) {
   /*  console.log(usernameSignIn, passwordSignIn, profileImgURL, profileImgName);
    return */

    let body;

    if(size === 'large') {
        body = JSON.stringify({
            username: usernameSignIn,
            email: loggedEmail,
            profileImgURLLarge: profileImgURL,
            profileImgNameLarge: profileImgName
        })
    } else if(size === 'small') {
        body = JSON.stringify({
            username: usernameSignIn,
            email: loggedEmail,
            profileImgURLSmall: profileImgURL,
            profileImgNameSmall: profileImgName
    
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/updateProfilePhotoURL/${size}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token')
            },

            body: body
        })
        const user = await response.json();
     
        return user
    }
    catch (err) {
        console.log(err);
    }
}