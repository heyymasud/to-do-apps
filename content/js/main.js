const addTaskButton = document.getElementById('addtask');

// Memunculkan Task ke browser
const showTasks = () => {
    const tasks = getLocalStorageData('tasks');
    const finishedTask = getLocalStorageData('tasksFinish');
    renderTasks('#tasktodo', tasks, false);
    renderTasks('#taskfinish', finishedTask, true);

    taskCheckEvent();
    deleteEvent();
}

// Task yang akan di read / dimunculkan
const renderTasks = (containerId, tasks, isFinished) => {
    const taskList = document.querySelector(containerId);
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const HTMLString = `
        <li class="taskitem ${isFinished ? 'finish' : ''}" data-index="${index}">
            ${!isFinished ? '<input type="checkbox" class="taskcheck">' : ''}
            <div class="listgroups">
                <div class="listgroup">
                    <span class="listtext ${isFinished ? 'checked' : ''}">${task.task}</span>
                    <span class="listpriority ${taskBadge(task.priority)}">${task.priority}</span>
                </div>
                <span class="listdate ${isFinished ? 'checked' : ''}">${task.duedate}</span>
            </div>
            <button type="button" class="taskdelete">Delete</button>
        </li>`;
        taskList.insertAdjacentHTML('afterbegin', HTMLString);
    });
}

// Fungsi menambahkan class badge untuk warna
const taskBadge = (priority) => priority.toLowerCase();

// Fungsi delete task
const deleteEvent = () => {
    const deleteList = document.querySelectorAll('.taskdelete');
    deleteList.forEach(button => {
        button.addEventListener('click', () => {
            const taskItem = button.parentElement;
            const index = taskItem.getAttribute('data-index');
            const taskArrayName = taskItem.classList.contains('finish') ? 'tasksFinish' : 'tasks';
            if (confirm('Are you sure?')) {
                const tasks = getLocalStorageData(taskArrayName);
                tasks.splice(index, 1);
                setLocalStorageData(taskArrayName, tasks);
                showTasks();
            }
        });
    });
}

// Fungsi delete all task
const deleteAllEvent = () => {
    const deleteAll = document.querySelectorAll('.taskdeleteall');
    deleteAll.forEach(button => {
        button.addEventListener('click', () => {
            const taskArrayName = button.classList.contains('finish') ? 'tasksFinish' : 'tasks';
            if (confirm('Are you sure want to delete all?')) {
                setLocalStorageData(taskArrayName, []);
                showTasks();
            }
        });
    });
}

// Fungsi memindahkan task yang di centang ke local database dan finish
const taskCheckEvent = () => {
    const taskCheck = document.querySelectorAll('.taskcheck');
    taskCheck.forEach(task => {
        task.addEventListener('change', () => {
            if (task.checked) {
                const taskItem = task.parentElement;
                const index = taskItem.getAttribute('data-index');
                const tasks = getLocalStorageData('tasks');
                const dataTask = tasks.splice(index, 1)[0];
                const tasksFinish = getLocalStorageData('tasksFinish');
                tasksFinish.push(dataTask);
                setLocalStorageData('tasks', tasks);
                setLocalStorageData('tasksFinish', tasksFinish);
                showTasks();
            }
        })
    })
}

// Menampilkan field input Task
const inputField = () => {
    const targetInput = document.querySelector('.taskcontainer');
    const HTMLString = `
    <form id="taskForm" class="taskform">
        <div class="inputgroup">
            <input type="text" class="taskinput" placeholder="Enter Task ...">
            <select class="taskselect">
                <option selected disabled>Select priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
        </div>
        <label for="duedate">Due Date</label>
        <input type="date" id="duedate" class="taskdate">
        <button type="submit" class="tasksubmit">Submit</button>
    </form>`;
    targetInput.insertAdjacentHTML('beforeend', HTMLString);

    document.getElementById('taskForm').addEventListener('submit', taskSubmit);
}

// Menambahkan Task yang di submit ke local database
const taskSubmit = (event) => {
    event.preventDefault();
    const taskInput = document.querySelector('.taskinput').value;
    const taskSelect = document.querySelector('.taskselect').value;
    const taskDate = document.querySelector('.taskdate').value;

    if (!taskInput || !taskSelect || taskSelect === 'Select priority' || !taskDate) {
        alert('Input cannot be empty');
        return;
    }

    const taskObject = {
        task: taskInput,
        priority: taskSelect,
        duedate: taskDate
    }
    const tasks = getLocalStorageData('tasks');
    tasks.push(taskObject);
    setLocalStorageData('tasks', tasks);

    window.location.reload();
}


// Mengambil data dari localStorage
const getLocalStorageData = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? [];
    } catch (error) {
        console.error(`Error parsing localStorage data ${key}:`, error);
        return [];
    }
}

// Menyimpan data ke localStorage
const setLocalStorageData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving data to localStorage ${key}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showTasks();
    deleteAllEvent();
});
addTaskButton.addEventListener('click', inputField);