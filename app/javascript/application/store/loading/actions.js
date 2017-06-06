import {
  SET_LOADING_STATE
} from "./constants"

export const setLoadingState = (loadingState) => ({type: SET_LOADING_STATE, payload: loadingState})
