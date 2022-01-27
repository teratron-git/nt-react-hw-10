interface IProps {
  task: string
  onChangeHandler: (e: any) => void
}

const TaskSwitcher = ({ task, onChangeHandler }: IProps) => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 9,
        top: 0,
        right: 0,
        background: "rgba(255,255,255,0.8)",
        padding: "10px",
        margin: "5px",
        border: "1px solid black",
        borderRadius: "30%",
      }}
    >
      <input type="radio" id="choice1" name="task" value="1" defaultChecked={task === "1"} onChange={onChangeHandler} />
      <label htmlFor="choice1">Task1 (Steps)</label>
      <br />
      {/* <input type="radio" id="choice2" name="task" value="2" defaultChecked={task === "2"} onChange={onChangeHandler} />
      <label htmlFor="choice2">Task2 (Steps)</label> */}
      {/* <br />
      <input type="radio" id="choice3" name="task" value="3" defaultChecked={task === "3"} onChange={onChangeHandler} />
      <label htmlFor="choice3">Task3</label> */}
    </div>
  )
}
export default TaskSwitcher
