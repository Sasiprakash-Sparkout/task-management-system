const taskContainer = document.getElementById("task-container");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//to create a html container using create element
tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.innerHTML = `
        <h3 class="task-title">Title<br>${task.title}</h3>
        <p>Description<br>${task.description}</p>
        <p>Priority<br>${task.priority}</p>
        <p>Due Date<br>${task.dueDate}</p>
        <p>Created Date<br>${task.createdDate}</p>
        <p>Status<br>${task.status}</p>
        <button class="editbtn">Edit</button>
        <button class="com">${task.status === "completed" ? "completed" : "complete"}</button>
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
        const TaskId = task.id;

        if (confirm("Are you sure you want to delete?")) {
            tasks = tasks.filter((task) => task.id !== TaskId);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskElement.remove();
            totalcount();
            pendingcount();
            completedcount();
            empty();
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
        //to change the style when i click the complete button

        const title = taskElement.querySelector(".task-title");

        if (task.status === "completed") {
            title.classList.add("completed");
        }
        completedcount();
        pendingcount();
    });
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










//search task
const search = document.getElementById("search");
const tasklist = document.getElementById("task-container");
function searchtask(task) {
    tasklist.innerHTML = "";
    const mydata = JSON.parse(localStorage.getItem("tasks")) || [];

    const cleartask = task.toLowerCase().trim();
    const filtertask = mydata.filter(storedata => {
        const titleText = (storedata.title || "").toLowerCase();
        const descText = (storedata.description || "").toLowerCase();

        return titleText.includes(cleartask) || descText.includes(cleartask);

    });
    if (filtertask.length === 0) {
        tasklist.innerHTML = '<p class="noresults">no matchfound</p>';
        return;
    }
    filtertask.forEach(data => {
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
        <button class="com">${data.status === "completed" ? "completed" : "complete"}</button>
        <button class="deletebtn">Delete</button>
    `;
        taskContainer.appendChild(itemdisplay);
        const editbtn = itemdisplay.querySelector(".editbtn");
        editbtn.addEventListener("click", (e) => {

            localStorage.setItem("editTask", data.id);
            window.location.href = "../html/addtask.html";
        });
        const completebtn = itemdisplay.querySelector(".com");
        itemdisplay.id = data.id;
        completebtn.addEventListener('click', () => {
            const comtask = tasks.find((task) => task.id === String(itemdisplay.id));
            if (comtask && comtask.status === "pending") {
                comtask.status = "completed";
                localStorage.setItem("tasks", JSON.stringify(tasks));
                completebtn.textContent = "Completed";
                itemdisplay.querySelector("p:nth-of-type(5)").innerHTML = `Status<br>${comtask.status}`;
            }
            completedcount();
            pendingcount();
        });
        const deletebtn = itemdisplay.querySelector(".deletebtn");
        deletebtn.addEventListener("click", (e) => {
            const dataId = data.id;

            if (confirm("Are you sure you want to delete?")) {
                tasks = mydata.filter(task => task.id !== String(dataId));
                localStorage.setItem("tasks", JSON.stringify(tasks));

                itemdisplay.remove();

                totalcount();
                pendingcount();
                completedcount();
             
            }
        });
    });
}
search.addEventListener("input", ((e) => {
    searchtask(e.target.value);

}))












//filter task
function getstoreddata() {
    const localdata = JSON.parse(localStorage.getItem("tasks"));
    return localdata;
}
function dispalaydata(datafetch) {
    const container = document.getElementById("task-container");
    container.textContent = "";
    if (datafetch.length === 0) {
        container.innerHTML = "<p>No Data Found</p>";
    }
    datafetch.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("task-item");
        div.innerHTML = ` <h3 id="task">Title<br>${item.title}</h3>
        <p>Description<br>${item.description}</p>
        <p>Priority<br>${item.priority}</p>
        <p>Due Date<br>${item.dueDate}</p>
        <p>Created Date<br>${item.createdDate}</p>
        <p>Status<br>${item.status}</p>
        <button class="editbtn">Edit</button>
        <button class="com">${item.status === "completed" ? "completed" : "complete"}</button>
        <button class="deletebtn">Delete</button>
    `;
        taskContainer.appendChild(div);
        //edit to click
        const editbtn = div.querySelector(".editbtn");
        editbtn.addEventListener("click", (e) => {

            localStorage.setItem("editTask", item.id);
            window.location.href = "../html/addtask.html";
        });
        const completebtn = div.querySelector(".com");
        div.id = item.id;
        completebtn.addEventListener('click', () => {
            const comtask = tasks.find((task) => task.id === String(div.id));
            if (comtask && comtask.status === "pending") {
                comtask.status = "completed";
                localStorage.setItem("tasks", JSON.stringify(tasks));
                completebtn.textContent = "Completed";
                div.querySelector("p:nth-of-type(5)").innerHTML = `Status<br>${comtask.status}`;
            }
            completedcount();
            pendingcount();
        });
        const deletebtn = div.querySelector(".deletebtn");
        deletebtn.addEventListener("click", (e) => {
            const dataId = item.id;

            if (confirm("Are you sure you want to delete?")) {
                tasks = getstoreddata().filter(task => task.id !== String(dataId));
                localStorage.setItem("tasks", JSON.stringify(tasks));

                div.remove();

                totalcount();
                pendingcount();
                completedcount();
                empty();
            }
        });
    });

}
function filter(status) {
    const filtereddata = getstoreddata();
    if (status === "all") {
        dispalaydata(filtereddata);
    }
    else {
        const filterstatus = filtereddata.filter(item => item.status.toLowerCase() === status);
        dispalaydata(filterstatus);
    }
}

const seleteddata = document.getElementById("filter");
seleteddata.addEventListener("change", (e) => {
    filter(e.target.value);
})









//sorting task by priority and due date
const listcontainer = document.getElementById('task-container');
const sortselect = document.getElementById('sort-by');
const sortorederselect = document.getElementById('sort-order');
const priorityorder = { "high": 1, "medium": 2, "low": 3 }

function sortinglist(sortdata) {
    listcontainer.innerHTML = "";

    sortdata.forEach(item => {
        const div = document.createElement('div');
        div.classList.add("task-item");
        div.innerHTML = ` <h3 id="task">Title<br>${item.title}</h3>
        <p>Description<br>${item.description}</p>
        <p>Priority<br>${item.priority}</p>
        <p>Due Date<br>${item.dueDate}</p>
        <p>Created Date<br>${item.createdDate}</p>
        <p>Status<br>${item.status}</p>
        <button class="editbtn">Edit</button>
        <button class="com">${item.status === "completed" ? "completed" : "complete"}</button>
        <button class="deletebtn">Delete</button>
    `;
        listcontainer.appendChild(div);
         const editbtn = div.querySelector(".editbtn");
        editbtn.addEventListener("click", (e) => {

            localStorage.setItem("editTask", item.id);
            window.location.href = "../html/addtask.html";
        });
        const completebtn = div.querySelector(".com");
        div.id = item.id;
        completebtn.addEventListener('click', () => {
            const comtask = tasks.find((task) => task.id === String(div.id));
            if (comtask && comtask.status === "pending") {
                comtask.status = "completed";
                localStorage.setItem("tasks", JSON.stringify(tasks));
                completebtn.textContent = "Completed";
                div.querySelector("p:nth-of-type(5)").innerHTML = `Status<br>${comtask.status}`;
            }
            completedcount();
            pendingcount();
        });
        const deletebtn = div.querySelector(".deletebtn");
        deletebtn.addEventListener("click", (e) => {
            const dataId = item.id;

            if (confirm("Are you sure you want to delete?")) {
                tasks = getstoreddata().filter(task => task.id !== String(dataId));
                localStorage.setItem("tasks", JSON.stringify(tasks));

                div.remove();

                totalcount();
                pendingcount();
                completedcount();
                empty();
            }
        });

    });
}


function sortstoragedata() {
    const items = JSON.parse(localStorage.getItem('tasks')) || [];
    const sortby = sortselect.value;
    const sortorder = sortorederselect.value;
    items.sort((a, b) => {
        let comparsion = 0;
        if (sortby === "dueDate") {
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            comparsion = dateA - dateB;
        }
        else if(sortby==="priority"){
            const weighta=priorityorder[a.priority?.toLowerCase()]||99;
            const weightb=priorityorder[b.priority?.toLowerCase()]||99;
            comparsion=weighta-weightb;
        }
return sortorder==="asc"?comparsion:-comparsion;

    });
    sortinglist(items);


}
sortselect.addEventListener("change",sortstoragedata);
sortorederselect.addEventListener("change",sortstoragedata)
sortstoragedata();


//when container is empty 
function empty(){
    const emptystate=document.getElementById("empty");
    if(!emptystate) return;
    const storage=localStorage.getItem("tasks");
    if(!storage||storage==="[]"||storage===""){
        emptystate.textContent="No tasks available. Click Add Task to create your first task";
        emptystate.style.display="block";
    }
    else{
        emptystate.textContent="";
        emptystate.style.display="none"

    }
   
}
empty();