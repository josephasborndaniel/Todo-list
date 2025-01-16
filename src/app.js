let todos = [];
let initTask = document.querySelector('#addTaskButton');
let addTaskContainer = document.querySelector('#addTaskContainer');
let addTask = document.getElementById('addTask');
let taskInput = document.getElementById('task');
let dueDateInput = document.getElementById('dueDate');
let todosContainer = document.getElementById('todosContainer');

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

initTask.addEventListener('click', () => {
    addTaskContainer.classList.remove('hidden');
});

function renderTodos() {
    todosContainer.innerHTML = "";
    todos.forEach((todo, index) => {
        let statusClass = todo.status === 'done' ? 'bg-green-50 border-green-400' : 'border-neutral-200 bg-white';
        let textDecoration = todo.status === 'done' ? 'line-through text-green-600' : '';
        let buttonColor = todo.status === 'done' ? 'text-green-600' : 'text-neutral-400 hover:text-green-600';

        let date = new Date(todo.dueDate);
        let fDate = date.toLocaleDateString('en', options);

        let div = document.createElement('div');
        div.innerHTML = `
            <div id="taskStatus" class="border bg-neutral-0 mb-3 rounded-xl p-3 ${statusClass}">
                <p class="text-lg font-medium ${textDecoration}">${todo.task}</p>
                <p class="text-[14px] font-light text-neutral-700">${fDate}</p>
                <div class="flex gap-4">
                    <button id="task-completed" data-id="${index}" 
                        class="${buttonColor} flex gap-3 font-light mt-2 text-sm items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                            class="bi bi-check2-circle" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866
                                A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 
                                5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                        </svg> Mark as done
                    </button>
                    <button id="delete-task" data-id="${index}" 
                        class="text-neutral-400 hover:text-red-500 flex gap-3 font-light mt-2 text-sm items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                            class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 
                                0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3
                                A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 
                                10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853
                                -10.66h.538a.5.5 0 0 0 0-1z"/>
                        </svg> Delete
                    </button>
                </div>
            </div>
        `;
        todosContainer.appendChild(div);
    });

    let taskCompletedBtn = document.querySelectorAll('#task-completed');
    let deleteTaskBtn = document.querySelectorAll('#delete-task');

    taskCompletedBtn.forEach((taskCompleted) => {
        taskCompleted.addEventListener('click', (e) => {
            let index = e.currentTarget.getAttribute('data-id');
            todos[index].status = 'done';
            renderTodos();
        });
    });

    deleteTaskBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let index = e.currentTarget.getAttribute('data-id');
            todos.splice(index, 1);
            renderTodos();
        });
    });
}

addTask.addEventListener('click', () => {
    if (taskInput.value.trim() !== "" && dueDateInput.value !== "") {
        let task = {
            task: taskInput.value,
            dueDate: dueDateInput.value,
            status: 'pending'
        };
        todos.push(task);
        taskInput.value = "";
        dueDateInput.value = "";
        addTaskContainer.classList.add('hidden');
        renderTodos();
    } else {
        alert("Please enter a task and due date!");
    }
});

var el = document.getElementById('todosContainer');
new Sortable(el, {
    animation: 150,
    ghostClass: 'blue-background-class'
});
