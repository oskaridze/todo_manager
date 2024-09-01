"use strict"

const addTaskBtn = document.querySelector('button');
const ul = document.getElementById('todo-list');

const taskInput = document.getElementById('new-task');
const taskDesc = document.getElementById('task-description');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

document.addEventListener('DOMContentLoaded', renderTasks);

addTaskBtn.addEventListener('click', addTask);

function markDone(btn, index) {
    btn.addEventListener('change', function() {
        todos[index].status = this.checked;
        saveAndRenderTasks();
    });
}

function addTask() {
    const newTask = taskInput.value.trim();
    const taskDescription = taskDesc.value.trim();

    if (newTask && taskDescription) {
        todos.splice(0, 0, { title: newTask, description: taskDescription, status: false});
        saveAndRenderTasks();
        newTask.value = '';
        taskDescription.value = '';
    };
};

function renderTasks() {
    ul.innerHTML = '';
    todos.forEach((task, index) => {
        const li = document.createElement('li');
        const spanName = document.createElement('span');
        const spanDesc = document.createElement('span');
        const deleteBtn = document.createElement('button');
        const done = document.createElement('input');

        done.type = 'checkbox';
        done.className = 'task-status';
        done.id = `done-item-${index}`;
        done.checked = task.status;

        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = () => {
            todos.splice(index, 1);
            saveAndRenderTasks();
        };

        spanName.className = 'task-title';
        spanName.textContent = task.title;

        spanDesc.className = 'task-description';
        spanDesc.textContent = task.description;

        li.className = 'todo-item';
        li.id = `todo-item-${index}`;

        li.appendChild(done);
        li.appendChild(spanName);
        li.appendChild(spanDesc);
        li.appendChild(deleteBtn);
        ul.appendChild(li);

        markDone(done, index);
    });
}

function saveAndRenderTasks() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTasks();
};