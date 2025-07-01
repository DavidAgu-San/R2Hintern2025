
const input = document.getElementById('input-box');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('list-container');

function addTask() {
    const task = input.value.trim();
    if (!task) return;
    const li = document.createElement('li');
    li.textContent = task;

    li.onclick = () => li.classList.toggle('completed');


    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
    };
    li.appendChild(delBtn);

    list.appendChild(li);
    input.value = '';
}

addBtn.onclick = addTask;
