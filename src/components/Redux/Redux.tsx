import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { actions } from "../../store/main/actions"
import { getData } from "../../store/main/selectors"
import st from "./Redux.module.css"

interface IResultItem {
  id: string
  date: string
  distance: number | string
}

const Redux = (props: any) => {
  console.log("🚀 ~ file: Redux.tsx ~ line 15 ~ Redux ~ props", props)

  const [selectedId, setSelectedId] = useState<string>("")
  console.log("🚀 ~ file: Redux.tsx ~ line 15 ~ Redux ~ selectedId", selectedId)
  const [selectedName, setSelectedName] = useState<string>("")
  const [selectedDistance, setSelectedDistance] = useState<number | string>("")
  const [resultAmout, setResultAmount] = useState<IResultItem[]>(props.data)
  console.log("🚀 ~ file: Redux.tsx ~ line 18 ~ Redux ~ resultAmout", resultAmout)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(() => {
    setResultAmount(props.data)
  }, [props.data])

  const reset = () => {
    setSelectedId("")
    setSelectedName("")
    setSelectedDistance("")
    setIsEdit(false)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("🚀 ~ file: Redux.tsx ~ line 40 ~ submitHandler ~ isEdit", isEdit)

    if (isEdit) {
      // const found = resultAmout.findIndex((item) => item.id === selectedId)

      // console.log("🚀 ~ file: Redux.tsx ~ line 24 ~ submitHandler ~ found", found)

      // resultAmout[found].id = selectedId
      // resultAmout[found].date = selectedName
      // resultAmout[found].distance = selectedDistance
      // setResultAmount([...resultAmout])
      props.edit({ id: selectedId, date: selectedName, distance: selectedDistance })
    } else {
      // setResultAmount([...resultAmout, { id: uuidv4(), date: selectedName, distance: selectedDistance }])
      props.save({ id: uuidv4(), date: selectedName, distance: selectedDistance })
    }

    reset()
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
    setSelectedId(id)
    setSelectedName(date)
    setSelectedDistance(distance)
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

          <div className="distanceItem">
            <label htmlFor="distance">Цена</label>
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

          <input type="submit" name="button" id="button" value="SAVE" />
          {isEdit && <input type="button" name="button" id="cancel" value="CANCEL" onClick={reset} />}
        </form>

        <div className={st.result}>
          <ol>
            <li className={st.resultHeader}>
              <span>Название</span>
              <span>Цена</span>
              <span>Действия</span>
            </li>

            {resultAmout.map((item) => (
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

const mapStateToProps = (state: any) => {
  return {
    data: getData(state),
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  save: (payload: any) => dispatch(actions.save(payload)),
  edit: (payload: any) => dispatch(actions.edit(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Redux)
