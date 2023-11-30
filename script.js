const fetchTasks = async () => {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        tasks = await response.json();
  
        taskTable.innerHTML = '<tr><th>S/n</th><th>Task</th><th>Date</th><th>Edit</th><th>Delete</th></tr>';
  
        tasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}</td><td>${task.title}</td><td>${task.date}</td><td><button onclick="editTask(${task.id})" class=" bg-info text-white">Edit</button></td><td><button class="bg-danger text-white" onclick="deleteTask(${task.id})">Delete</button></td>`;

            taskTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskTable = document.getElementById('taskTable');
  
    let tasks = []; // Store tasks in the global scope

   
   

    // Function to add a new task
    window.addTask = async () => {
        try {
            const newTask = {
                title: taskInput.value,
                date: new Date().toLocaleDateString(),
            };
  
            if (taskInput.value.trim() === '') {
                alert('Please enter a task before adding.');
                return;
            }
  
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
  
            if (!response.ok) {
                throw new Error('Failed to add new task');
            }
  
            taskInput.value = '';
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
  
    // Initial fetch when the page loads
    fetchTasks();
});
const deleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      // Task deleted successfully, fetch and display updated tasks
      fetchTasks();
    } else {
      console.error('Failed to delete task');
    }
  };

  const editTask = async (taskId) => {
    try {
      // Find the task with the specified ID
      const taskToEdit = tasks.find((task) => task.id === taskId);
  
      if (taskToEdit) {
        const promptt = prompt("Update Task:", taskToEdit.title);

if (promptt === null || promptt === "") {
  // User canceled the prompt, handle accordingly (optional)
  console.log('User canceled the update');
  return;
} else {
  // User entered a value
  // Continue with your logic, e.g., update the task with the new title
  updatedTitle = promptt;
  console.log(updatedTitle);
}
        const updateDate= new Date().toLocaleDateString();
        // Make a PUT request to update the task on the server
        const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: updatedTitle, date: updateDate}),
        });
  
        if (response.ok) {
          console.log('Task updated successfully');
          // You can do additional logic here, e.g., update UI with task data
          fetchTasks();
        } else {
          console.error('Failed to update task');
        }
      } else {
        console.error('Task not found');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };
  