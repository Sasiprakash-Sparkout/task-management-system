const taskContainer = document.getElementById("task-container");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//to create a task list for display a taskm
tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.innerHTML = `
        <h3>Title<br>${task.title}</h3>
        <p>Description<br>${task.description}</p>
        <p>Priority<br>${task.priority}</p>
        <p>Due Date<br>${task.dueDate}</p>
        <p>Created Date<br>${task.createdDate}</p>
        <p>Status<br>${task.status}</p>
        <button class="editbtn">Edit</button>
        <button class="btn">Complete</button>
        <button class="deletebtn">Delete</button>
    `;
    taskContainer.appendChild(taskElement);

    //edit to click
    const editbtn = taskElement.querySelector(".editbtn");
    editbtn.addEventListener("click", (e) => {
        //save a edit task in storage
        localStorage.setItem("editTask", task.id);
        window.location.href = "../html/addtask.html";
    });
    //to delete the task
    const deletebtn = taskElement.querySelector(".deletebtn");
    deletebtn.addEventListener("click", (e) => {
        let TaskId = task.id;

        if (confirm("Are you sure you want to delete?")) {
            tasks = tasks.filter((task) => task.id !== TaskId);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            deleteTask();
        }
        if (false()) {
            deleteTask();
        }

        taskElement.remove();
    })
});
//to count total task
function totalcount() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let totalTask = tasks.length;
    let counttask = document.getElementById("total-task");
    counttask.textContent = totalTask;
}
totalcount();
//to count pending task
function pendingcount() {
    let count = document.getElementById("pending-task")
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let pendingstat = tasks.filter((pending) => pending.status === "pending");
    let pendingcount = pendingstat.length;
    count.textContent = pendingcount;
}
pendingcount();
//to completed count
function completedcount() {
    let count = document.getElementById("completed-task")
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let completestat = tasks.filter((pending) => pending.status === "completed");
    let completcount = completestat.length;
    count.textContent = completcount;
}
completedcount();