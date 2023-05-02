// User Reducer
import * as actionTypes from '../constants/userConstants';
const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    token: null,
    userRole: null,
    userId: null,
    players: [],
    coaches: [],
    posts: [],
    socket: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.data.user,
                isAuthenticated: true,
                token: action.payload.token,
                userRole: action.payload.data.user.role,
                userId: action.payload.data.user._id,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                user: null,
                loading: false,
                error: null,
                isAuthenticated: false,
                token: null,
                userRole: null,
                userId: null,
            };
        case actionTypes.FETCH_DATA_START:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                players: action.payload,
            };

        case actionTypes.FETCH_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actionTypes.FETCH_COACH_DATA_START:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.FETCH_COACH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                coaches: action.payload,
            };

        case actionTypes.FETCH_COACH_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actionTypes.FETCH_POST_DATA_START:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.FETCH_POST_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
            };

        case actionTypes.FETCH_POST_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actionTypes.GET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case actionTypes.SOCKET:
            return {
                ...state,
                socket: action.payload,
            };
            
            

        default:
            return state;
    }
};

export default userReducer;

