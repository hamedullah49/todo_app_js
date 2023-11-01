let form = document.querySelector('form');
let taskList = document.querySelector('.task-list');
let clearTasksBtn = document.querySelector('.clear-tasks');

clearTasksBtn.addEventListener('click', clearTasks);
form.addEventListener('submit', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);

function clearTasks(e) {
    if (confirm()) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        taskList.style.display = 'none';
        localStorage.clear();
    }
}

function loadTasks(task) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        taskList.style.display = 'flex';
    }

    tasks.forEach(function (task) {
        let removeBtn = document.createElement('button');
        removeBtn.className = 'delete';
        // removeBtn.innerText = 'Delete';
        removeBtn.innerHTML = 'Delete';
        removeBtn.addEventListener('click', deleteTask);

        let newTask = document.createElement('div');
        newTask.className = 'list-card';
        newTask.innerText = task;
        newTask.appendChild(removeBtn);

        taskList.appendChild(newTask);
    });
}

function storeTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask(e) {

    let inValue = document.querySelector('.input').value;

    if (inValue === '') { alert('please enter task') } else {
        taskList.style.display = 'flex';

        let removeBtn = document.createElement('button');
        removeBtn.className = 'delete';
        removeBtn.innerText = 'Delete';
        removeBtn.addEventListener('click', deleteTask);

        let newTask = document.createElement('div');
        newTask.className = 'list-card';
        newTask.innerText = inValue;
        newTask.appendChild(removeBtn);

        taskList.appendChild(newTask);

        document.querySelector('.input').value = '';
        storeTasks(inValue);
    }

    e.preventDefault();
}

function deleteTask(e) {
    let parent = e.target.parentElement;
    parent.removeChild(parent.querySelector('.delete'));
    removetaskData(parent);

    if (taskList.childElementCount === 1) {
        taskList.style.display = 'none';
    }
    console.log(taskList.childElementCount);

    parent.remove();
}

function removetaskData(taskData) {
    let tasks;
    if (localStorage.getItem('tasks' === null)) {
        tasks = null;
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    taskData
    tasks.forEach(function (task, index) {
        if (taskData.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
    // problem: this function also removes duplicate tasks with the same textContent from LS
}