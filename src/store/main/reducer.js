import { actions } from "./actions"

const { save, edit, deleteData } = actions
const found = (arr, selectedId) => arr.findIndex((item) => item.id === selectedId)
let index
let tempData

const initialState = {
  data: [],
}

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case save.toString():
      return {
        ...state,
        data: [...state.data, action.payload],
      }

    case edit.toString():
      index = found(state.data, action.payload.id)
      tempData = [...state.data]
      tempData[index].id = action.payload.id
      tempData[index].name = action.payload.name
      tempData[index].price = action.payload.price

      return {
        ...state,
        data: tempData,
      }

    case deleteData.toString():
      return {
        ...state,
        data: [...state.data.filter((item) => item.id !== action.payload)],
      }

    default:
      return state
  }
}
