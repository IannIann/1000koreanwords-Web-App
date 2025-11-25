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
    const minEmailLength = 5;
    const maxPasswordLength = 64;

    const emailConstraints = [
        {
            test: email => email.length <= maxPasswordLength,
            message: "Email must be at most 64 characters long",
        },
        {
            test: email => email.length >= minEmailLength,
            message: "Email must be at least 5 characters long",
        },
        {
            test: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email),
            message: "Email is not valid",
        },
    ];

    const errors = emailConstraints.filter(constraint => !constraint.test(email));

    if (errors.length > 0) {
        return {
            success: false,
            message: errors.map(error => error.message).join("\n"),
        };
    }

    return { success: true };
};

const checkUsernameFormat = (username) => {
    const minUsernameLength = 3;
    const maxUsernameLength = 64;

    const usernameConstraints = [
        {
            test: username => username.length <= maxUsernameLength,
            message: `Username must be at most ${maxUsernameLength} characters long`,
        },
        {
            test: username => username.length >= minUsernameLength,
            message: `Username must be at least ${minUsernameLength} characters long`,
        },
        {
            test: username => /^[a-zA-Z0-9]+$/i.test(username),
            message: "Username cannot contains special characters or be empty",
        },
    ];

    const errors = usernameConstraints.filter(constraint => !constraint.test(username));

    if (errors.length > 0) {
        return {
            success: false,
            message: errors.map(error => error.message).join("\n"),
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