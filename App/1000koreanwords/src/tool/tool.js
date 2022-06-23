    export function getErrorMessage(error) {
        try{
            var errorJson = JSON.parse(error.message);
            return errorJson.message
        } catch {
            return "An error happened."
        }
    }

