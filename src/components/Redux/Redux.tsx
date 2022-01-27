import React, { Dispatch, SetStateAction, useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.min.css"
import { v4 as uuidv4 } from "uuid"
import st from "./Redux.module.css"

interface IResultItem {
  id: string
  date: string
  distance: number | string
}

const Redux = () => {
  const [selectedName, setSelectedName] = useState<string>("")
  const [selectedDistance, setSelectedDistance] = useState<number | string>("")
  const [resultAmout, setResultAmount] = useState<IResultItem[]>([])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = resultAmout.findIndex((item) => item.date === selectedName)

    if (found == -1) {
      setResultAmount([...resultAmout, { id: uuidv4(), date: selectedName, distance: selectedDistance }])
    } else {
      resultAmout[found].date = selectedName
      resultAmout[found].distance = +resultAmout[found].distance + +selectedDistance
      setResultAmount([...resultAmout])
    }

    setSelectedName("")
    setSelectedDistance("")
  }

  const changeDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDistance(e.target.value)
  }

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value)
  }

  const deleteHandler = (id: string) => {
    setResultAmount(resultAmout.filter((item) => item.id !== id))
  }
  const editHandler = (id: string, date: string, distance: number) => {
    deleteHandler(id)
    setSelectedName("new Date(date)")
    setSelectedDistance(distance)
  }

  return (
    <div className={st.container}>
      <div className={st.steps}>
        <form className={st.header} onSubmit={(e) => submitHandler(e)}>
          <div className="dateItem">
            <label htmlFor="date">Дата</label>
            <input type="text" name="name" id="name" value={selectedName} onChange={changeName} required autoComplete="off" />
          </div>

          <div className="distanceItem">
            <label htmlFor="distance">Дистанция</label>
            <input
              type="number"
              name="distance"
              id="distance"
              value={selectedDistance}
              onChange={changeDistance}
              required
              autoComplete="off"
              step={0.1}
            />
          </div>

          <input type="submit" name="button" id="button" value="OK" />
        </form>

        <div className={st.result}>
          <ol>
            <li className={st.resultHeader}>
              <span>Дата</span>
              <span>Дистанция</span>
              <span>Действия</span>
            </li>

            {resultAmout.map((item, i) => (
              <div key={item.id} className={st.resultItem}>
                <li>
                  <span>{item.date}</span>
                  <span>{item.distance}</span>

                  <span>
                    <i className="far fa-edit" onClick={() => editHandler(item.id, item.date, item.distance as number)} />
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
