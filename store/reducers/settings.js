import { UPDATE_SETTINGS, SET_SETTINGS } from "../actions/settings"
const initialState = {
    theme: "light",
    language: "en",
    timezone: "Europe/London",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    passcode: null,
    passcodeTimeout: null,
    

}

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case UPDATE_SETTINGS:
        return { ...state, ...payload }
    case SET_SETTINGS:
        return { ...payload }
    default:
        return state
    }
}
