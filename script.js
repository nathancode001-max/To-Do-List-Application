document.addEventListener('DOMContentLoaded', () => {

    const taskInput = document.getElementById('task-input')

    const addTaskBtn = document.getElementById('add-task-btn')

    const taskList = document.getElementById('task-list')

    const emptyImage = document.querySelector('.empty-image')

    const todosContainer = document.querySelector('.todos-container');


    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

        // progress function
        const progressBar = document.getElementById('progress');

        const progressNumbers = document.getElementById('numbers')

        const updateProgress = (checkCompletion = true) => {

            const totalTasks = taskList.children.length;
            const completedTasks = taskList.querySelectorAll('.checkbox:checked').length

            progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%`  : `0%`

            progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

        }  


    // Function to add tasks
    const addTask = (text, completed = false, checkCompletion = true) =>{

        const taskText = text ||  taskInput.value.trim();
        if(!taskText){
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
         <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
         <span>${taskText}</span>
         <div class="task-buttons">
           <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
           <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
         </div>
        `

        // Function to delete tasks
        li.querySelector('.delete-btn').addEventListener('click', () =>{
            li.remove();
            toggleEmptyState();
            updateProgress()
        });


        // Function to edit tasks
        const editBtn = li.querySelector('.edit-btn');

        const checkbox = li.querySelector('.checkbox');

        editBtn.addEventListener('click', () => {
            if(!checkbox.checked){
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
                updateProgress(false);
            }
        })


        // Function to mark task as completed 
        if (completed){
            li.classList.add('completed');
            editBtn.disabled  = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none'
        }

        checkbox.addEventListener('change' ,() =>{
            const ischecked = checkbox.checked;
            li.classList.toggle('completed', ischecked);
            editBtn.disabled  = ischecked
            editBtn.style.opacity = ischecked ? '0.5' : '1';
            editBtn.style.pointerEvents = ischecked ? 'none' : 'auto'
            updateProgress();
        })


        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
        updateProgress(checkCompletion);
    };


    addTaskBtn.addEventListener('click', () => addTask());

    taskInput.addEventListener('keydown', (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            addTask();
        }
    })

})