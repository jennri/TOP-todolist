alert('hello')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const listContainer = document.querySelector("[data-list]")
const newListForm = document.querySelector("[data-new-list]")
const newListInput = document.querySelector("[data-new-input]")

//
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

newListForm.addEventListener('submit', e => {
    //prevents submission, as doing so will refresh the page
    e.preventDefault();
    const listName = newListInput.value;
    alert(listName);
    if (listName == null || listName === "") return
    
    const list = createList(listName)
    newListInput.value = null;
    lists.push(list)
    render();
    save();
})

function createList(name) {
    return {id: Date.now().toString(), name: name, task: []}
}

function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
}

//clears the list and 
function render(){
    clearElement(listContainer)
    lists.forEach(list => {
        const listElement = document.createElement("li")
        listElement.dataset.listId = list.id;
        listElement.classList.add("listname")
        listElement.innerText = list.name
        listContainer.appendChild(listElement)
    })

}

function clearElement(ele){
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild)
    }
}

render();