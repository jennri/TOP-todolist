//followed closely to a guide, so the naming system is not precise
//this logic is for the project list which categorieses to do tasks under larger scale projects
//when selecting a project, the tasks will be filtered to match 


const listContainer = document.querySelector("[data-list]")
const newListForm = document.querySelector("[data-new-list]")
const newListInput = document.querySelector("[data-new-input]")
const deleteListBtn = document.querySelector("[delete-list-btn]")

const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitle = document.querySelector('[data-list-title]')
const listCount = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')

const taskTemplate = document.querySelector('[task-template]')

const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
//These lines and save() will save the list into your local browswer so reloading them won't remove them
//the first one saves the tasks list, the second one retains the selected list 
const LOCAL_STORAGE_LIST_KEY = 'task.lists'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListID'
let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY)

//Renders the saved list
render();

//When clicked, the selected list item will have the active class and will be the selectedId, this will display related todo tasks on the side
listContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId
    saveRender()
    }
})

//Removes the selected task list by filtering out the task list with the selectedId
deleteListBtn.addEventListener('click', () => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null;
    saveRender()
})

//When a new task item is added, it's value is taken and returned to the list object alongside it's id
newListForm.addEventListener('submit', e => {
    //prevents submission, as doing so will refresh the page
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName === "") return

    const list = createList(listName)
    //Super useful, it resets the input value once it has been submitted
    newListInput.value = null;
    lists.push(list)
    saveRender();
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    if (taskName == null || taskName === "") return

    const task = createTask(taskName)
    newTaskInput.value = null;
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.task.push(task)
    saveRender();
})

function createList(name) {
    return { id: Date.now().toString(), name: name, task: [] }
}

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false}
}

function saveRender(){
    save();
    render();
}

//stores the list and the selectedListId to the localStorage
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedListId)
}

//Whenever a new task list item is added, the entire list is cleared then for each task item
//it is given a unique id, a class of 'listname' and it's inner text set to the form input
//then all of the listElements are appended to listContainer, which is a linked to a html element.
//
//localStorage retains the selectedListId, so this checks thru each task item and reassigns the 'active' status to the selectedListId 
//so it doesn't reset after a new task item is added
function render() {
    clearElement(listContainer)
    renderLists()
    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitle.innerText = selectedList.name;
        renderTaskCount(selectedList)
        clearElement(tasksContainer)
        renderTask(selectedList)

    }
}

function renderTask(selectedList){
    selectedList.task.forEach(task=> {
        //imports the template, true is necessary to import the whole code block
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })

}


function renderTaskCount(selectedList){
    const incompleteTaskCount = selectedList.task.filter(task => !task.complete).length;
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
    listCount.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function renderLists(){
    lists.forEach(list => {
        const listElement = document.createElement("li")
        listElement.dataset.listId = list.id;
        listElement.classList.add("listname")
        listElement.innerText = list.name
        if (list.id === selectedListId) {
            listElement.classList.add('active')
        }
        listContainer.appendChild(listElement)
    })
}

function clearElement(ele) {
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild)
    }
}


