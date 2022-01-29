import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { RootState } from "../../store"
import { deleteData, edit, save } from "../../store/mainSlice"
import st from "./Redux.module.css"

interface IResultItem {
  id: string
  name: string
  price: number | string
}

const Redux = () => {
  const [filter, setFilter] = useState<string>("")
  const [selectedId, setSelectedId] = useState<string>("")
  const [selectedName, setSelectedName] = useState<string>("")
  const [selectedPrice, setSelectedPrice] = useState<number | string>("")
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [resultData, setResultData] = useState<IResultItem[]>([])

  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => state.main.data)

  useEffect(() => {
    filter ? setResultData([...data.filter((item: any) => item?.name?.includes(filter))]) : setResultData(data)
  }, [data, filter])

  const reset = () => {
    setSelectedId("")
    setSelectedName("")
    setSelectedPrice("")
    setIsEdit(false)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    isEdit
      ? dispatch(edit({ id: selectedId, name: selectedName, price: selectedPrice as number }))
      : dispatch(save({ id: uuidv4(), name: selectedName, price: selectedPrice as number }))
    reset()
  }

  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(e.target.value)
  }

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value)
  }

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const deleteHandler = (id: string) => {
    dispatch(deleteData({ id }))
  }

  const editHandler = ({ id, name, price }: IResultItem) => {
    setSelectedId(id)
    setSelectedName(name)
    setSelectedPrice(price)
    setIsEdit(true)
  }

  return (
    <div className={st.container}>
      <div className={st.steps}>
        <form className={st.header} onSubmit={(e) => submitHandler(e)}>
          <div className="dateItem">
            <label htmlFor="date">Название</label>
            <input type="text" name="name" id="name" value={selectedName} onChange={changeName} required autoComplete="off" />
          </div>

          <div className="priceItem">
            <label htmlFor="price">Цена</label>
            <input
              type="number"
              name="price"
              id="price"
              value={selectedPrice}
              onChange={changePrice}
              required
              autoComplete="off"
              step={0.1}
            />
          </div>

          <input type="submit" name="save" id="save" value="SAVE" />
          {isEdit && <input type="button" name="cancel" id="cancel" value="CANCEL" onClick={reset} />}
        </form>
        <div className={st.filterItem}>
          <label htmlFor="filter">
            Фильтр:
            <input type="text" name="filter" id="filter" value={filter} onChange={changeFilter} autoComplete="off" />
          </label>
        </div>

        <div className={st.result}>
          <ol>
            <li className={st.resultHeader}>
              <span>Название</span>
              <span>Цена</span>
              <span>Действия</span>
            </li>

            {resultData?.map((item) => (
              <div key={item.id} className={st.resultItem}>
                <li>
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                  <span>
                    <i className="far fa-edit" onClick={() => editHandler(item)} />
                    <i className="far fa-window-close" onClick={() => deleteHandler(item.id)} />
                  </span>
                </li>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Redux
