// VARIABEL
const addTask = document.getElementById('addtask');

//Memunculkan Task
const showTasks = function () {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        const taskList = document.querySelector('.tasklist');
        const HTMLString = `
        <li class="taskitem">
        <div class="listgroup1">
        <input type="checkbox" class="taskcheck">
        <span class="tasktext">${task.task}</span>
        <span class="taskpriority">${task.priority}</span>
        </div>
        <span class="taskdate">${task.duedate}</span>
        <button type="button" class="taskdelete">Delete</button>
        </li>`
        taskList.insertAdjacentHTML('afterbegin', HTMLString);
    });
}
document.addEventListener('DOMContentLoaded', showTasks);


// Tambah input Task
const inputField = function () {
    const targetInput = document.querySelector('.taskcontainer');
    const HTMLString = `
    <form id="taskForm" class="taskform">
    <div class="inputgroup">
        <input type="text" class="taskinput" placeholder="Enter Task ...">
        <select class="taskselect">
            <option selected disabled>Select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
    </div>
        <label for="duedate">Due Date</label>
        <input type="date" id="duedate" class="taskdate">
        <button type="submit" class="tasksubmit">Submit</button>
    </form>
    `
    targetInput.insertAdjacentHTML('afterbegin', HTMLString);

    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', taskSubmit);
}

addTask.addEventListener('click', inputField);

// Tambahkan Task ke local database
const taskSubmit = function (event) {
    event.preventDefault();
    const taskInput = document.querySelector('.taskinput');
    const taskSelect = document.querySelector('.taskselect');
    const taskDate = document.querySelector('.taskdate');

    const task = taskInput.value;
    const priority = taskSelect.value;
    const duedate = taskDate.value;

    const taskObject = {
        task: task,
        priority: priority,
        duedate: duedate
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskForm.style.display = 'none';
}



/* 
Detail komponen :
Profile
waktu
text area
level prioritas
button submit
kolom centang
to do
done
delete
*/