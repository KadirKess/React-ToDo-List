import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./TaskForm";
import { getCurrentId, setCurrentId } from "./CurrentId.ts";

type Task = {
    id: number;
    name: string;
    description: string;
    state: string;
};

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load save from localStorage
    useEffect(() => {
        const savedTodos = localStorage.getItem("todosReact");
        if (savedTodos) {
            try {
                const parsedTodos = JSON.parse(savedTodos);
                setTasks(parsedTodos);
            } catch (e) {
                console.error("Failed to parse todos from localStorage", e);
            }
        }

        const savedCurrentId = localStorage.getItem("idReact");
        if (savedCurrentId) {
            try {
                setCurrentId(parseInt(savedCurrentId));
            } catch (e) {
                console.error("Failed to parse current id from localStoage", e);
            }
        }
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        if (tasks && tasks.length > 0) {
            try {
                localStorage.setItem("todosReact", JSON.stringify(tasks));
                localStorage.setItem("idReact", JSON.stringify(getCurrentId()));
            } catch (e) {
                console.error("Failed to save todos to localStorage", e);
            }
        }
    }, [tasks]);

    const addTask = ({ id, name, description }: Task) => {
        const newTask: Task = {
            id,
            name,
            description: description || "No description",
            state: "Not started",
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const changeState = (taskId: number, state: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, state } : task,
            ),
        );
    };

    const displayTasks = () => (
        <div className={"p-10 mx-auto"}>
            <h1
                className={
                    "text-5xl p-10 bg-primary text-secondary rounded-t-3xl"
                }
            >
                Tasks
            </h1>
            <div
                className={
                    "bg-primary bg-opacity-15 p-1 pb-8 flex flex-wrap justify-center self-center min-h-0 rounded-b-3xl items-center"
                }
            >
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={
                            "collapse border-s-2 border-e-2 border-b-2 border-secondary collapse-arrow w-2/5 mx-10 mt-6"
                        }
                    >
                        <input type={"radio"} name={"my-accordion-2"} />
                        <div
                            className={
                                "collapse-title text-xl font-medium text-center p-4 bg-secondary flex items-center"
                            }
                        >
                            <div
                                className={`badge ${task.state === "Not started" ? "badge-neutral" : task.state === "In progress" ? "badge-warning" : "badge-success"}`}
                            >
                                {task.state}
                            </div>
                            <p
                                className={
                                    "absolute left-1/2 transform -translate-x-1/2"
                                }
                            >
                                {task.name}
                            </p>
                        </div>
                        <div
                            className={
                                "collapse-content bg-secondary bg-opacity-15"
                            }
                        >
                            <p
                                className={"pt-3"}
                                dangerouslySetInnerHTML={{
                                    __html: task.description.replace(
                                        /\n/g,
                                        "<br />",
                                    ),
                                }}
                            ></p>
                            <div
                                className={
                                    "w-1/3 flex justify-evenly mx-auto p-1 m-2 bg-secondary bg-opacity-25 rounded-3xl"
                                }
                            >
                                <input
                                    type={"radio"}
                                    name={`radio-${task.id}`}
                                    className={
                                        "radio radio-neutral border-4 border-neutral"
                                    }
                                    checked={task.state === "Not started"}
                                    onChange={() =>
                                        changeState(task.id, "Not started")
                                    }
                                />
                                <input
                                    type={"radio"}
                                    name={`radio-${task.id}`}
                                    className={
                                        "radio radio-warning border-4 border-warning"
                                    }
                                    checked={task.state === "In progress"}
                                    onChange={() =>
                                        changeState(task.id, "In progress")
                                    }
                                />
                                <input
                                    type={"radio"}
                                    name={`radio-${task.id}`}
                                    className={
                                        "radio radio-success border-4 border-success"
                                    }
                                    checked={task.state === "Done"}
                                    onChange={() =>
                                        changeState(task.id, "Done")
                                    }
                                />
                            </div>
                            <button
                                className={"btn btn-error"}
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={"App"}>
            <TaskForm addTask={addTask} />
            {displayTasks()}
        </div>
    );
}

export default App;
