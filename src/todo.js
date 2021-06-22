import React, { useState } from 'react';
import './todo.css';

export default function Todo(){
    let [todoArrayObject,setTodoArrayObject] = useState([]);
    let [displayArray,setDisplayArray] = useState([]);

    const InputFields = () => {
        return (
            <div>
                <input id="currentInput" type="text" placeholder=" Add Your Goal" />
                <button id="addButton" onClick={AddCurrentGoal}><b>+</b></button>
            </div>
        )
    }

    const ListArea = () => {
        let  listItems = 
        displayArray.map((displayArrayItem,index) => <div key={index}> <CreateComponent  id={displayArrayItem.id} content={displayArrayItem.content} check={displayArrayItem.status}/></div>); 
        return (
            <div id="listArea"> 
                {listItems}
            </div>
        )
    }
    const AddCurrentGoal = () => {
        const currentGoal = document.getElementById('currentInput').value;
        if(!currentGoal){ alert("You are trying to add nothing!"); return; }
        setTodoArrayObject([{id : todoArrayObject.length , content : currentGoal , status : false},...todoArrayObject]);
        setDisplayArray([{id : todoArrayObject.length , content : currentGoal , status : false},...todoArrayObject]);
    }

    const CreateComponent = (props) => {
        
        return (
            <div id = {props.id} className="listBody">
                <div className="listComponentCheckBox"><input className="checkbox" type="checkbox" onClick={() => {changeCheckBox(props.id)}} defaultChecked={props.check}/></div>
                <div className="listComponentName"><h2>{props.content}</h2></div>
                <div className="listComponentCrossButton"><button  onClick={() => {deleteList(props.id)}}><b>X</b></button></div>
            </div>
        )
    }

    const changeCheckBox = (thisComponentId) => {
        
        for(let i of todoArrayObject){
            if(thisComponentId === i.id){
                i.status =!(i.status);
                break;
            }
        } 
    }

    const deleteList = (thisComponentId) => {
        
        for(let i in todoArrayObject){
            if(thisComponentId === todoArrayObject[i].id){ 
                todoArrayObject.splice(i,1);
                document.getElementById(thisComponentId).remove();
                break; 
            }
        }
        for(let j in displayArray){
            if(thisComponentId === displayArray[j].id){ 
                displayArray.splice(j,1);
                break; 
            }
        }
    }


    const filterStatus = (displayType) => {
        if(displayType === "active") {
            let filtered = todoArrayObject.filter(function(value){
                if(value.status === false) return value;
                return false;
            });
            setDisplayArray(filtered);
            if(filtered.length === 0 && todoArrayObject.length > 0) {alert("Hurray, You have completed all of your tasks, And you don't have any active tasks left!"); return;}
        }
        else if(displayType === "completed") {
            let filtered = todoArrayObject.filter(function(value){
                if(value.status === true) return value;
                return false;
            });
            setDisplayArray(filtered);
            if(filtered.length === 0 && todoArrayObject.length > 0) {alert("You haven't completed any of your tasks!"); return;}
        }
        else {
            setDisplayArray(todoArrayObject);
        }
    }

    const FilterButtons = () => {
        return (
            <div className="filterButtons">
                <button onClick={ () => {filterStatus("all")}}>All</button>
                <button onClick={ () => {filterStatus("active")}}>Active</button>
                <button onClick={ () => {filterStatus("completed")}}>Completed</button>
      
            </div>
        )       
    }
    return (
        <div id="body">
            <h1>List Your Today's Goal</h1>
            <InputFields />
            <ListArea />
            <FilterButtons />
        </div>    
    )
}