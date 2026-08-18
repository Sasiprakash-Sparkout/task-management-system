const form = document.getElementById("taskform");
const title = document.getElementById("title");
const des = document.getElementById("description")
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
        //popup message for edit
        localStorage.setItem("updatetask","true")
        window.location.href = "../html/dashboard.html";

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
       localStorage.setItem("addtask","true")

        window.location.href = "../html/dashboard.html";
    
    }
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
    const today = new Date().toISOString().split("T")[0];
    let success = true;
    if(titvlaue===""||priorityval===""||dueval===""||droupval===""){
        showfeedback("required fields are missing","confirm-error")
    }
    if (titvlaue === "") {
        success = false;
        seterror(title, "Task name is mandatory");
    }
    else {
        setsucess(title);
    }
    if (priorityval === "") {
        success = false;
        seterror(priority, "priority must be selected");
    }
    else {
        setsucess(priority);
    }
    if (dueval === "") {
        success = false;
        seterror(duedate, "Due Date is mandatory");
      
    }
    else if (dueval < today) {
        success = false;
         seterror(duedate, "Due Date should not be earlier than the current date")
      showfeedback("invalid due date","confirm-error")
    }
    else {
        setsucess(duedate);
    }
    if (droupval === "") {
        success = false;
        seterror(droup, "status must be selected");
    }
    else {
        
    } return success;
}

let timer = null;
function showfeedback(messages, type) {
    const popupbox = document.getElementById('notification');
   
    popupbox.innerText = messages;
    popupbox.className = '';
    popupbox.classList.add(type)

    popupbox.style.display = "block";
    timer = setTimeout(function () {
        popupbox.style.display = "none";
    }, 2000)
}
 


