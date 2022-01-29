import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IData {
  id: string
  name: string
  price: number
}

export interface IMainState {
  data: Array<IData>
}

const found = (arr: IData[], selectedId: string) => arr.findIndex((item) => item.id === selectedId)
let index

const initialState: IMainState = {
  data: [],
}

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<IData>) => {
      state.data.push(action.payload)
    },
    edit: (state, action: PayloadAction<IData>) => {
      index = found(state.data, action.payload.id)
      state.data[index].id = action.payload.id
      state.data[index].name = action.payload.name
      state.data[index].price = action.payload.price
    },
    deleteData: (state, action: PayloadAction<{ id: string }>) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id)
    },
  },
})

export const { save, edit, deleteData } = mainSlice.actions

export default mainSlice.reducer
