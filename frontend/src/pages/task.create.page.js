import { useState } from "react" 
import { createTask } from "../services/task.services"
import { Link, useNavigate } from "react-router-dom"

const TaskCreatePage=(props)=>{
    const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate=useNavigate()



  const onCreateTask =async()=>{
    if(title.length===0){
        alert('set title')
    }else if(description.length===0){
        alert('set description')

    }else{
        const result=await createTask(title,description)
        if(result){
            
            navigate('/task-list')
        }else{
           alert ('invalid username or password')
        }
    }
  }

    return(

         <div>
            <h1 className="header">Create Task page</h1>
            <div className ="form">
            <div className ="mb-3">
            <label className="form-label">Title</label>
             <textarea
            onChange={(e) => {
                setTitle(e.target.value)
              }}
            type="text" className="form-control"  ></textarea>
        </div><div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                type="text" className="form-control" rows={6}  ></textarea>
               
            </div>
            <div className="mb-3">
                    <button onClick={onCreateTask} className="btn btn-success">Save</button>
                    <Link to="/task-list" style={{ marginLeft:'15px' }} className="btn btn-danger">Cancel</Link>

            </div>
            </div>
            </div>
            )
    }
export default TaskCreatePage