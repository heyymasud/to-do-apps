// VARIABEL
const addTask = document.getElementById('addtask');



//Memunculkan Task
const showTasks = function () {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const finishedTask = JSON.parse(localStorage.getItem('tasksFinish'));
    const taskList = document.querySelector('#tasktodo');
    const taskFinish = document.querySelector('#taskfinish');

    taskList.innerHTML = '';
    taskFinish.innerHTML = '';

    tasks.forEach((task, index) => {
        const HTMLString = `
        <li class="taskitem" data-index="${index}">
        <input type="checkbox" class="taskcheck">
        <div class="listgroups">
        <div class="listgroup">
        <span class="listtext">${task.task}</span>
        <span class="listpriority ${taskBadge(task.priority)}">${task.priority}</span>
        </div>
        <span class="listdate">${task.duedate}</span>
        </div>
        <button type="button" class="taskdelete">Delete</button>
        
        </li>`
        taskList.insertAdjacentHTML('afterbegin', HTMLString);
    });

    if (finishedTask) {
        finishedTask.forEach((task, index) => {
            const taskList = document.querySelector('#taskfinish');
            const HTMLString = `
            <li class="taskitem finish" data-index="${index}">
            <div class="listgroups">
            <div class="listgroup">
            <span class="listtext checked">${task.task}</span>
            <span class="listpriority ${taskBadge(task.priority)}">${task.priority}</span>
            </div>
            <span class="listdate checked">${task.duedate}</span>
            </div>
            <button type="button" class="taskdelete">Delete</button>
            
            </li>`
            taskList.insertAdjacentHTML('afterbegin', HTMLString);
        });
    }
    

    deleteEvent();
    taskCheck();
    // const taskChecklist = document.querySelectorAll('.taskcheck');

    // taskChecklist.forEach(task => {
    //     task.addEventListener('change', () => {
    //         ;
    //     });
    //     });

}
document.addEventListener('DOMContentLoaded', showTasks);

// Fungsi warna badge
const taskBadge = function (priority) {
    if (priority === 'High') {
        return "high";
    } else if (priority === 'Medium') {
        return "medium";
    } else {
        return "low";
    }
};

// Fungsi delete task
const deleteEvent = function () {
    const deleteList = document.querySelectorAll('.taskdelete');

    deleteList.forEach(task => {
        task.addEventListener('click', () => {
            const taskItem = task.parentElement;
            const index = taskItem.getAttribute('data-index');
            const tasks = JSON.parse(localStorage.getItem('tasks')) ;
            const tasksFinish = JSON.parse(localStorage.getItem('tasksFinish'));
            if (taskItem.classList.contains('finish')) {
                if (confirm('Are you sure?')) {
                    tasksFinish.splice(index, 1);
                    localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
                    showTasks();
                } else {
                    return;
                }
            } else {
                if (confirm('Are you sure?')) {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    showTasks();
                } else {
                    return;
                }
            }
        });
    })

};

// Tambah input Task
const inputField = function () {
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
    </form>
    `
    targetInput.insertAdjacentHTML('beforeend', HTMLString);

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
    try {
        //if input is empty
        if (task === '' || priority === '' || duedate === '' || priority === 'Select priority') {
            throw new Error('Input cannot be empty');
        } else {
            tasks.push(taskObject);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            window.location.reload();
        }
    } catch (error) {
        alert(error);
    }

}

// Fungsi memindahkan task yang di centang ke local database dan finish
const taskCheck = function () {
    const taskCheck = document.querySelectorAll('.taskcheck');
    const taskFinish = document.querySelector('.taskfinish');
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    taskCheck.forEach((task) => {
        task.addEventListener('change', () => {
            if (task.checked) {
                const taskItem = task.parentElement;
                const index = taskItem.getAttribute('data-index');
                const dataTask = tasks.splice(index, 1)[0];
                const tasksFinish = JSON.parse(localStorage.getItem('tasksFinish')) || [];
                tasksFinish.push(dataTask);
                localStorage.setItem('tasksFinish', JSON.stringify(tasksFinish));
                localStorage.setItem('tasks', JSON.stringify(tasks));
                showTasks();
            }

        })
    })
}


//     const taskCheck = document.querySelectorAll('.taskcheck');
//     const taskFinish = document.querySelector('.taskfinish');
//     const tasks = JSON.parse(localStorage.getItem('tasks'));

//     taskCheck.forEach((task) => {
//         if (task.checked) {
//             taskFinish.insertAdjacentElement('afterbegin', task.parentElement);
//             task.parentElement.remove();
//             tasks.splice(tasks.indexOf(task.parentElement), 1);
//             localStorage.setItem('tasks', JSON.stringify(tasks));
//         }
//     });



// console taskChecklist


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