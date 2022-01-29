import { createAction } from "redux-actions"
import * as constants from "./constants"

export const actions = {
  save: createAction(constants.SAVE),
  edit: createAction(constants.EDIT),
  deleteData: createAction(constants.DELETE_DATA),
}
