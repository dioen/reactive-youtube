const initialState = {
    'google': {
        'logged_in': false,
        'google_file_id': null,
        'id': null,
        'full_name': null,
        'given_name': null,
        'family_name': null,
        'image_url': null,
        'email': null
    }
}

const LoginReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case "USER_LOGIN":
            return {
                'google': {
                    'logged_in': true,
                    'google_file_id': actions.payload.google_file_id,
                    'id': actions.payload.user_profile.getId(),
                    'full_name': actions.payload.user_profile.getName(),
                    'given_name': actions.payload.user_profile.getGivenName(),
                    'family_name': actions.payload.user_profile.getFamilyName(),
                    'image_url': actions.payload.user_profile.getImageUrl(),
                    'email': actions.payload.user_profile.getEmail()
                }
            }

        case "USER_LOGOUT":
            return initialState;

        default:
            return state;
    }
}

export default LoginReducer;