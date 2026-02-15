document.getElementById("addBtn").addEventListener("click", addTask);

function getCurrentDateTime() {
    let now = new Date();
    return now.toLocaleString();
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTaskElement(taskText, getCurrentDateTime(), null, false);
    input.value = "";
}

function createTaskElement(text, addedTime, completedTime, isCompleted) {

    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    let taskContent = document.createElement("div");

    let taskTitle = document.createElement("span");
    taskTitle.innerText = text;

    if (isCompleted) {
        taskTitle.classList.add("completed");
    }

    let timeInfo = document.createElement("small");
    timeInfo.innerHTML = "Added: " + addedTime;

    if (completedTime) {
        timeInfo.innerHTML += "<br>Completed: " + completedTime;
    }

    taskContent.appendChild(taskTitle);
    taskContent.appendChild(timeInfo);

    let buttonGroup = document.createElement("div");

    // Complete Button
    if (!isCompleted) {
        let completeBtn = document.createElement("button");
        completeBtn.innerText = "Complete";
        completeBtn.onclick = function () {
            taskDiv.remove();
            createTaskElement(
                taskTitle.innerText,
                addedTime,
                getCurrentDateTime(),
                true
            );
        };
        buttonGroup.appendChild(completeBtn);
    }

    // Edit Button
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = function () {
        let newText = prompt("Edit your task:", taskTitle.innerText);
        if (newText !== null && newText.trim() !== "") {
            taskTitle.innerText = newText.trim();
        }
    };
    buttonGroup.appendChild(editBtn);

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function () {
        taskDiv.remove();
    };
    buttonGroup.appendChild(deleteBtn);

    taskDiv.appendChild(taskContent);
    taskDiv.appendChild(buttonGroup);

    if (isCompleted) {
        document.getElementById("completedList").appendChild(taskDiv);
    } else {
        document.getElementById("pendingList").appendChild(taskDiv);
    }
}
