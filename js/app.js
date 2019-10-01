const styles = require("../css/style.scss");

class Todo {
    constructor() {
        this.todos = new Map(JSON.parse(localStorage.getItem("todos"))) || new Map();
        this.completed = 0;

        if (this.todos.size) {
            this.initFromLocal();
        }

        this.initEvents();
        this.updateStatus();
    }

    initFromLocal() {
        for (let [k, v] of this.todos) {
            this.add(v, k);
        }
    }

    initEvents() {
        const inp = document.querySelector(".clist-inp");
        inp.addEventListener("keydown", (event) => {
            if (event.keyCode !== 13) return;
            if (!event.target.value) return;

            this.addTodo(event.target);
        });

        const ul = document.querySelector(".clist-list");
        ul.addEventListener("click", (event) => this.changeTodo(event));
    }

    addTodo(target) {
        let random;
        const val = target.value;
        do {
            random = Math.floor(Math.random()*10000);
        } while (this.todos.has(random));

        const newTodo = new TodoItem(random, val);
        this.todos.set(random, newTodo);
        
        this.add(newTodo, target);
        localStorage.removeItem("todos");
        localStorage.setItem("todos", JSON.stringify([...this.todos]));
        this.updateStatus();
    }

    add(todo, target) {
        const ul = document.querySelector(".clist-list");
        const li = document.createElement("li");
        li.classList.add("clist-li");
        
        const cbox = document.createElement("button");
        cbox.classList.add("clist-cbox");
        if (todo.isComplete) {
            cbox.classList.add("complete");
            this.completed++;
        }
        cbox.id = "cbox-" + todo.id;

        const span = document.createElement("span");
        span.classList.add("clist-span");
        if (todo.isComplete) span.classList.add("complete");
        span.innerText = todo.val;
        if (target) target.value = "";

        const del = document.createElement("button");
        del.classList.add("clist-del");
        del.innerText = "X";
        del.id = "del-" + todo.id;

        li.append(cbox);
        li.append(span);
        li.append(del);
        ul.append(li);
    }

    changeTodo(event) {
        if (event.target.classList.contains("clist-cbox")) {
            let id = event.target.id.split("-")[1];
            this.todos.get(parseInt(id)).isComplete = !this.todos.get(parseInt(id)).isComplete;

            if (this.todos.get(parseInt(id)).isComplete) {
                event.target.classList.add("complete");
                event.target.nextElementSibling.classList.add("complete");
                this.completed++;
            } else {
                event.target.classList.remove("complete");
                event.target.nextElementSibling.classList.remove("complete");
                this.completed--;
            }
        }

        if (event.target.classList.contains("clist-del")) {
            let id = event.target.id.split("-")[1];
            event.target.parentElement.remove();

            this.todos.delete(parseInt(id));
        }

        localStorage.removeItem("todos");
        localStorage.setItem("todos", JSON.stringify([...this.todos]));
        this.updateStatus();
    }

    updateStatus() {
        const status = document.querySelector(".clist-status-span");
        status.innerText = `${this.completed}/${this.todos.size} completed`;
    }
}

class TodoItem {
    constructor(id, val) {
        this.id = id;
        this.val = val;
        this.isComplete = false;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let t = new Todo();
});