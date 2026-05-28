const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");
addBtn.addEventListener("click", function () {

    const taskText = input.value
    if (taskText === "") return

    const li = document.createElement("li")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    const span = document.createElement("span")
    span.innerText = taskText

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "❌"

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through"
            span.style.color = "#94a3b8"
            span.style.opacity = "0.8"

            confetti()
        } else {
            span.style.textDecoration = "none"
            span.style.color = "white"
            span.style.opacity = "1"
        }
    })

    deleteBtn.addEventListener("click", function () {
        li.remove()
        updateCount()
        saveTasks()
    })

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(deleteBtn)

    taskList.appendChild(li)

    input.value = ""

    updateCount()
    saveTasks()
})
function updateCount() {
    const count = document.querySelectorAll("#taskList li").length
    taskCount.innerText = "Tasks: " + count
}
clearBtn.addEventListener("click", function () {
    taskList.innerHTML = ""
    updateCount()
    saveTasks()
})
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML)
}
window.addEventListener("load", function () {
    taskList.innerHTML = localStorage.getItem("tasks") || ""
    updateCount()
})
function confetti() {
    const colors = ["#60a5fa", "#f472b6", "#34d399", "#fbbf24"];

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement("div");

        particle.style.position = "fixed";
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.top = "0";
        particle.style.width = "6px";
        particle.style.height = "6px";
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.zIndex = "9999";
        particle.style.borderRadius = "50%";

        document.body.appendChild(particle);

        let fall = setInterval(() => {
            particle.style.top = particle.offsetTop + 5 + "px";

            if (particle.offsetTop > window.innerHeight) {
                particle.remove();
                clearInterval(fall);
            }
        }, 20);
    }
}
