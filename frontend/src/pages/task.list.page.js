import { useEffect, useState } from "react"
import { changeTaskStatus, getTasks } from "../services/task.services"
import Task from '../components/task.components'
import { Link, useNavigate } from "react-router-dom"

const TaskListPage = (props) => {
    // state
    const [tasksOpen, setTasksOpen] = useState([])
    const [tasksInProgress, setTasksInProgress] = useState([])
    const [tasksDone, setTasksDone] = useState([])
    const navigate = useNavigate()
  
    // this function is called as soon as the page loads
    useEffect(() => {
      reloadTasks()
    }, [])
  
    const reloadTasks = () => {
      loadTasks('OPEN', setTasksOpen)
      loadTasks('IN_PROGRESS', setTasksInProgress)
      loadTasks('DONE', setTasksDone)
    }
  
    // load tasks by calling the get api
    const loadTasks = async (status, func) => {
      const result = await getTasks(status)
      if (result.errors && result.errors.length > 0) {
        const error = result.errors[0].message
        alert(error)
      } else {
        if (result.data) {
          func(result.data.tasks)
        }
      }
    }
  
    // change the status
    const changeStatus = async (id, status) => {
      const result = await changeTaskStatus(id, status)
      if (result.errors && result.errors.length > 0) {
        const error = result.errors[0].message
        alert(error)
      } else {
        if (result.data) {
          reloadTasks()
        }
      }
    }
  
    // logout
    const logout = () => {
      // remove the token and username from sessionStorage
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('username')
  
      // redirect to signin
      navigate('/signin')
    }

    return(
        <div>
            <button onClick={logout} style={{float:'right'}} className="btn btn-warning">Logout</button>
        <h1 className="header">Task list page</h1>
        <Link to="/task-create"> Create new task</Link> 
        <div className="row">
            <div className="col">
                <h5 className="header">OPEN</h5>
                {tasksOpen.length > 0 &&
                tasksOpen.map ( ( task)=>{
            const {id,title,description,status}=task
            return( <Task key={id} id={id} title={title} description={description} changeStatus={changeStatus} status={status}></Task>
     ) }
        
        )}
          {tasksOpen.length === 0 && <div>No OPEN tasks</div>}

            </div>
            <div className="col" style={{borderLeft:'dotted 5px blue', borderRight:'dotted 5px blue' }}>
                <h5 className="header" >IN_PROGRESS</h5>
                {tasksInProgress.length > 0 &&
                tasksInProgress.map((task)=>{
            const {id,title,description,status}=task
            return <Task key={id} id={id} title={title} description={description} changeStatus={changeStatus} status={status}></Task>
                
            }
                
        )}
                  {tasksInProgress.length === 0 && <div>No IN_PROGRESS tasks</div>}

            </div>
            <div className="col">
                <h5 className="header">DONE</h5>
                {tasksDone.length > 0 &&
                tasksDone.map((task)=>{
            const {id,title,description,status}=task
            return( <Task key={id} id={id} title={title} description={description} changeStatus={changeStatus} status={status}></Task>
            )}
        
        )}
          {tasksDone.length === 0 && <div>No DONE tasks</div>}

            </div>
        </div>
        <div>
        
        
        
</div>
        </div>
    )
}
export default TaskListPage