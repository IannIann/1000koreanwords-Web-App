const getErrorMessage = (error) => {
    try {
        const errorJson = JSON.parse(error.message);
        return errorJson.message;
    } catch {
        return "An error happened.";
    }
};

const checkPasswordSecurity = (password) => {
    const minPasswordLength = 8;
    const maxPasswordLength = 64;

    const constraints = [
        {
            test: value => /[A-Z]/.test(value),
            message: "Password must have at least one upper case letter",
        },
        {
            test: value => /[a-z]/.test(value),
            message: "Password must have at least one lower case letter",
        },
        {
            test: value => /\d/.test(value),
            message: "Password must have at least one number",
        },
        {
            test: value => value.length >= minPasswordLength,
            message: `Password must be at least ${minPasswordLength} characters long`,
        },
        {
            test: value => value.length <= maxPasswordLength,
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
    const maxEmailLength = 64;

    const constraints = [
        {
            test: value => value.length >= minEmailLength,
            message: "Email must be at least 5 characters long",
        },
        {
            test: value => value.length <= maxEmailLength,
            message: "Email must be at most 64 characters long",
        },
        {
            test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value),
            message: "Email is not valid",
        },
    ];

    const errors = constraints.filter(constraint => !constraint.test(email));

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

    const constraints = [
        {
            test: value => value.length >= minUsernameLength,
            message: `Username must be at least ${minUsernameLength} characters long`,
        },
        {
            test: value => value.length <= maxUsernameLength,
            message: `Username must be at most ${maxUsernameLength} characters long`,
        },
        {
            test: value => /^[a-zA-Z0-9]+$/i.test(value),
            message: "Username cannot contains special characters or be empty",
        },
    ];

    const errors = constraints.filter(constraint => !constraint.test(username));

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
    checkUsernameFormat,
};