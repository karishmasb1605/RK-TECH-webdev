        
        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                const task = {
                    text: taskText,
                    addedAt: new Date(),
                    completed: false,
                };
                tasks.push(task);
                saveTasks();
                renderTasks();
                taskInput.value = '';
            }
        }

        function toggleComplete(index) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }

        function editTask(index) {
            const spanElement = document.getElementById(`taskText_${index}`);
            spanElement.setAttribute('contenteditable', 'true');
            spanElement.classList.add('editable');
            spanElement.focus();

            spanElement.addEventListener('blur', function () {
                spanElement.setAttribute('contenteditable', 'false');
                spanElement.classList.remove('editable');
                tasks[index].text = spanElement.textContent;
                saveTasks();
                renderTasks();
            });
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function loadTasks() {
            const storedTasks = localStorage.getItem('tasks');
            return storedTasks ? JSON.parse(storedTasks) : [];
        }

        function renderTasks() {
            const pendingTasksList = document.getElementById('pendingTasks');
            const completedTasksList = document.getElementById('completedTasks');
            pendingTasksList.innerHTML = '';
            completedTasksList.innerHTML = '';

            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.className = 'task';
                listItem.innerHTML = `
                    <span id="taskText_${index}" class="${task.completed ? 'completed' : ''} editable">
                        ${task.text}
                    </span>
                    <div class="editable-buttons">
                        <button onclick="toggleComplete(${index})">✓</button>
                        ${!task.completed ? `<button onclick="editTask(${index})">✎</button>` : ''}
                        <button onclick="deleteTask(${index})">✖</button>
                    </div>
                `;
                if (task.completed) {
                    completedTasksList.appendChild(listItem);
                } else {
                    pendingTasksList.appendChild(listItem);
                }
            });
        }

        let tasks = loadTasks();
        renderTasks();