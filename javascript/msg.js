const form = document.getElementById("taskform");
const title = document.getElementById("title");

const priority = document.getElementById("priority-input");
const duedate = document.getElementById("duedate");
const droup = document.getElementById("droup");
// edit task
const editTaskId = localStorage.getItem("editTask");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const editTask = tasks.find((task) => task.id === editTaskId);
if (editTask) {

    title.value = editTask.title;
    des.value = editTask.description;
    priority.value = editTask.priority;
    duedate.value = editTask.dueDate;
    droup.value = editTask.status;

}
form.addEventListener("submit", (e) => {
e.preventDefault();
if (!validateInputs()) {
        return;
    }
    if (editTask) {

        editTask.title = title.value.trim();
        editTask.description = des.value.trim();
        editTask.priority = priority.value.trim();
        editTask.dueDate = duedate.value;
        editTask.status = droup.value.trim();
        //updatecode
        localStorage.setItem("tasks", JSON.stringify(tasks));
        //remove edit btm
        localStorage.removeItem("editTask");
        alert("Task updated successfully!");

    }
    else {
        const createdDate = new Date().toLocaleDateString();
        const newtask = {
            id: crypto.randomUUID(),
            title: title.value.trim(),
            description: des.value.trim(),
            priority: priority.value.trim(),
            dueDate: duedate.value,
            status: droup.value.trim(),
            createdDate: createdDate

        };
        tasks.push(newtask);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        alert("Task added successfully!");
    }
    window.location.href = "../html/dashboard.html";
});
function seterror(element, message) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error-message");
    errorElement.innerText = message;
    inputGroup.classList.add("error");
    inputGroup.classList.remove("success");
}
function setsucess(element) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector(".error-message");
    errorElement.innerText = "";
    inputGroup.classList.add("success");
    inputGroup.classList.remove("error");
}
function validateInputs() {
    const titvlaue = title.value.trim();

    const priorityval = priority.value.trim();
    const dueval = duedate.value.trim();
    const droupval = droup.value.trim();
    let success = true;
    if (titvlaue === "") {
        success = false;
        seterror(title, "Task name is required");
    } 
    else {
        setsucess(title);
    }
   
    if (priorityval === "") {
        success = false;
        seterror(priority, "Select your priority");
    } 
    else {
        setsucess(priority);
    }
    if (dueval === "") {
        success = false;
        seterror(duedate, "Select the due date");
    } 
    else {
        setsucess(duedate);
    }
    if (droupval === "") {
        success = false;
        seterror(droup, "Select task status");
    } 
    else {
        setsucess(droup);
    }return success;
}