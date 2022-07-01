import { UPDATE_NUMBER_NOTIFY } from "../reducers/numberNotifyReducer";
export const updateNumberNotify = (number) => async dispatch => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000)
        });
        //Cập nhật số lượng notification
        dispatch({
            type: UPDATE_NUMBER_NOTIFY,
            number: number
        })
    } catch (error) {
        console.log("error", error);
    }
}