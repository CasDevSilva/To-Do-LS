let task = document.querySelector("#task"),
ul = document.querySelector(".detail")

window.addEventListener('load',()=>{
    loadTasks(ul)
})

document.addEventListener('click',(e)=>{
    e.preventDefault()
    let element = e.target
    if(element.id == "add"){
        let value = task.value
        carryTask(addTask(value))
        console.log("Task Added - Update List")
        addElementTask(ul, value)
        cleanInput()
    }

    if(element.classList.contains("remove")){
        removeTask(element)
        removeElementTask(element)
        console.log("Item removed")
    }

    if(element.classList.contains("fa-trash")){
        removeTask(element.parentElement)
        removeElementTask(element.parentElement)
        console.log("Item removed")
    }
})

function loadTasks(parent){
    let obj = bringTasks()
    for(let key in obj){
        addElementTask(parent, obj[key])
    }
}
function removeElementTask(e){
    ul.removeChild(e.parentElement)
}
function cleanInput(){
    task.value = ""
    task.focus()
}
function createElementTask(task){
    let li = document.createElement("li"),
    text = document.createTextNode(task),
    button = document.createElement("button"),
    i = document.createElement("i")
    i.classList.add("fa-solid")
    i.classList.add("fa-trash")
    button.appendChild(i)
    button.classList.add("remove")
    button.classList.add("icon")
    li.appendChild(text)
    li.appendChild(button)
    return li
}
function addElementTask(parent, task){
    parent.appendChild(createElementTask(task))
}
function bringTasks(){
    let list = localStorage.getItem('list')
    return list != null ? JSON.parse(list): {}
}
function carryTask(obj){
    removeTaskLS()
    localStorage.setItem("list", JSON.stringify(obj))
}
function removeTaskLS(){
    localStorage.removeItem("list")
}
function addTask(task){
    let obj = bringTasks()
    obj[validateKey(obj)] = task
    return obj
}
function validateKey(obj){
    let key = generateRandom()
    let condition = obj.hasOwnProperty(`${key}`)
    while(condition){
        if(!condition) return key
        else{
            key = generateRandom()
            condition = obj.hasOwnProperty(`${key}`)
        }
    }
    return key
}
function searchValue(e){
    let obj = bringTasks()
    let compare = e.parentElement.textContent
    let key = 0
    for(let item in obj){
        if(obj[item]==compare) key = item
    }
    return [key, obj]
}
function removeTask(e){
    let [key, obj] = searchValue(e)
    delete obj[key]
    localStorage.removeItem("list")
    localStorage.setItem("list", JSON.stringify(obj))
}
function generateRandom(){
    return Math.floor(Math.random() * (10000 - 0 +1)+0)
}