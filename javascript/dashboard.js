const taskContainer = document.getElementById("task-container");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//to create a html container using create element
tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.innerHTML = `
        <h3 id="task">Title<br>${task.title}</h3>
        <p>Description<br>${task.description}</p>
        <p>Priority<br>${task.priority}</p>
        <p>Due Date<br>${task.dueDate}</p>
        <p>Created Date<br>${task.createdDate}</p>
        <p>Status<br>${task.status}</p>
        <button class="editbtn">Edit</button>
        <button class="com">${task.status==="completed"?"completed":"complete"}</button>
        <button class="deletebtn">Delete</button>
    `;
    taskContainer.appendChild(taskElement);
    //to change the style when i click the complete button
      /* tasks.forEach((task)=>{
            if(task.status==="completed"){
                    
                taskElement.classList.add("completed")
            }
        }) */

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
        const TaskId = task.id;
    
        if (confirm("Are you sure you want to delete?")) {
            tasks = tasks.filter((task) => task.id !== TaskId);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskElement.remove();
            totalcount();
            pendingcount();
            completedcount();
        }


    });
    //complete the task button

    const completebtn = taskElement.querySelector(".com");
    
    taskElement.id = task.id;
    completebtn.addEventListener('click', () => {
    const comtask = tasks.find((task) => task.id === String(taskElement.id));
          
    
        if (comtask && comtask.status === "pending") {
            comtask.status = "completed";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            completebtn.textContent = "Completed";
            taskElement.querySelector("p:nth-of-type(5)").innerHTML = `Status<br>${comtask.status}`;
        }
      
        completedcount();
        pendingcount();
    });
    //search tasks
     const search=document.getElementById("search");
    const tasklist=document.getElementById("task-container");
    function searchtask(task){
        tasklist.innerHTML="";
         const data=JSON.parse(localStorage.getItem("tasks"))||[];
         
        const cleartask=task.toLowerCase().trim();
        const filtertask=data.filter(storedata=>{
           const titleText = (storedata.title || "").toLowerCase();
        const descText = (storedata.description || "").toLowerCase();
        
        return titleText.includes(cleartask) || descText.includes(cleartask);
    
        });
        if(filtertask.length===0){
            tasklist.innerHTML='<p class="noresults">no matchfound</p>';
            return;
        }
        filtertask.forEach(data=>{
            //create a html element for display the search items 
          const itemdisplay = document.createElement("div");
    itemdisplay.classList.add("task-item");
    itemdisplay.innerHTML = `
        <h3 id="task">Title<br>${data.title}</h3>
        <p>Description<br>${data.description}</p>
        <p>Priority<br>${data.priority}</p>
        <p>Due Date<br>${data.dueDate}</p>
        <p>Created Date<br>${data.createdDate}</p>
        <p>Status<br>${data.status}</p>
        <button class="editbtn">Edit</button>
        <button class="com">${data.status==="completed"?"completed":"complete"}</button>
        <button class="deletebtn">Delete</button>
    `;
    taskContainer.appendChild(itemdisplay);
        });
    }
search.addEventListener("input",((e)=>{
    searchtask(e.target.value);
})) 

});
//to count total task
function totalcount() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const counttask = document.getElementById("total-task");
    counttask.textContent = tasks.length;
}
totalcount();
//to count pending task
function pendingcount() {
    const count = document.getElementById("pending-task")
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let pendingstat = tasks.filter((pending) => pending.status === "pending");
    count.textContent = pendingstat.length;
}
pendingcount();
//to completed count
function completedcount() {
    let count = document.getElementById("completed-task")
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completestat = tasks.filter((pending) => pending.status === "completed");
    count.textContent = completestat.length;
}
completedcount();


