const taskContainer = document.getElementById("task-container");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Priority: ${task.priority}</p>
        <p>Due Date: ${task.dueDate}</p>
        <p>Created Date: ${task.createdDate}</p>
        <p>Status: ${task.status}</p>
        <button class="editbtn">Edit</button>
        <button class="btn">Complete</button>
        <button class="btn">Delete</button>
    `;
    taskContainer.appendChild(taskElement);
    //edit to click
    const editbtn = taskElement.querySelector(".editbtn");
    editbtn.addEventListener("click", (e) => {
        //save a select task
        localStorage.setItem("editTask", task.id);
        window.location.href = "../html/addtask.html";
    });
});