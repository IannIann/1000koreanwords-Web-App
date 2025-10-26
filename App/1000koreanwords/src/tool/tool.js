const getErrorMessage = (error) => {
    try {
        var errorJson = JSON.parse(error.message);
        return errorJson.message
    } catch {
        return "An error happened."
    }
}

const checkPasswordSecurity = (password) => {
    const minPasswordLength = 8;
    const maxPasswordLength = 64;

    const constraints = [
        {
            test: password => /[A-Z]/.test(password),
            message: "Password must have at least one upper case letter",
        },
        {
            test: password => /[a-z]/.test(password),
            message: "Password must have at least one lower case letter",
        },
        {
            test: password => /\d/.test(password),
            message: "Password must have at least one number",
        },
        {
            test: password => password.length >= minPasswordLength,
            message: `Password must be at least ${minPasswordLength} characters long`,
        },
        {
            test: password => password.length <= maxPasswordLength,
            message: `Password must be at most ${maxPasswordLength} characters long`,
        },
    ];

    const errors = constraints.filter(constraint => !constraint.test(password));

    if (errors.length > 0) {
        return {
            success: false,
            message: errors.map(error => error.message).join("\n"),
        };
    }

    return { success: true };
};

const checkPasswordMatch = (password, passwordConfirm) => {
    if (password !== passwordConfirm) {
        return {
            success: false,
            message: "Passwords do not match",
        };
    }

    return { success: true };
};


const checkEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            success: false,
            message: "Email is not valid"
        };
    }

    return { success: true };
};

const checkUsernameFormat = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        return {
            success: false,
            message: "Username cannot contains special characters or be empty"
        };
    }
    return { success: true };
};

export default {
    getErrorMessage,
    checkPasswordSecurity,
    checkPasswordMatch,
    checkEmailFormat,
    checkUsernameFormat
}