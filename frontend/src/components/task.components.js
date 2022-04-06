const Task =(props)=>{


const {id,title,description,status ,changeStatus}=props


const colors={
    OPEN:'OrangeRed',
    IN_PROGRESS:'violet',
    DONE:' Green',
}
const getButtonTitle=()=>{
    if(status==='OPEN'){
        return 'IN_PROGRESS'
    }else if(status==='IN_PROGRESS'){
            return 'DONE'
    }
}

const onButtonClick=()=>{
    if(status==='OPEN'){
        changeStatus(id,'IN_PROGRESS')
    }else if(status==='IN_PROGRESS'){
        changeStatus(id,'DONE')
    }
}
return  (
<div className="card"
 style={{
     backgroundColor:colors[status],
     width:'100%',
     display:'inline-block',
     margin:'10px',
     height:'200px'
     }}>
<div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p>{description}</p>
    {status!=='DONE'&&(
    <button onClick={onButtonClick} className="btn btn-success">{getButtonTitle()}</button>
    )}

</div>
</div>
)
}
export default Task