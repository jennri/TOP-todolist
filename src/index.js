alert('hello')

const listContainer = document.querySelector("[data-list]")
const newListForm = document.querySelector("[data-new-list]")
const newListInput = document.querySelector("[data-new-input]")

//
let lists = [{
    id: 1,
    name: 'name'
}, {
    id: 2,
    name: 'wash laundry'
}];

newListForm.addEventListener('submit', e => {
    //prevents submission, as doing so will refresh the page
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName === "") return
    
    const list = createList(listName)
    newListInput.value = null;
    lists.push(list)
    render();
})

function createList(name) {
    return {id: Date.now().toString(), name: name, task: []}
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