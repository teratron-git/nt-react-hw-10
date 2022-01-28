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
      console.log("🚀 ~ file: reducer.js ~ line 21 ~ mainReducer ~ action.payload", action.payload)

      return {
        ...state,
        data: [...state.data, action.payload],
      }

    case edit.toString():
      console.log("🚀 ~ file: reducer.js ~ line 21 ~ mainReducer ~ action.payload", action.payload)
      console.log("🚀 ~ file: reducer.js ~ line 21 ~ mainReducer ~ state.data", state.data)
      index = found(state.data, action.payload.id)
      tempData = [...state.data]
      tempData[index].id = action.payload.id
      tempData[index].date = action.payload.date
      tempData[index].distance = action.payload.distance
      console.log("🚀 ~ file: reducer.js ~ line 22 ~ mainReducer ~ x", index)

      return {
        ...state,
        data: tempData,
      }

    // case deleteData.toString():
    //   console.log("🚀 ~ file: reducer.js ~ line 21 ~ mainReducer ~ action.payload", action.payload)
    //   console.log("🚀 ~ file: reducer.js ~ line 21 ~ mainReducer ~ state.data", state.data)

    //   return {
    //     ...state,
    //   }

    default:
      return state
  }
}
