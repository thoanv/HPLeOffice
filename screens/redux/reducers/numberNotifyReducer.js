
export const UPDATE_NUMBER_NOTIFY = "UPDATE_NUMBER_NOTIFY"
const initialState = {
    number: 0
}

export default function actionNumberNotify(state = initialState, payload){
    switch(payload.type){
        case UPDATE_NUMBER_NOTIFY:
            return {
                ...state,
                number: payload.number
            }
        default:
            return state
    }
}