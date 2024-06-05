import { useState } from "react";
import { getCurrentId, setCurrentId } from "./CurrentId.ts";

interface Task {
    id: number;
    name: string;
    description: string;
    state: string
}

interface TaskFormProps {
    addTask: (task: Task) => void;
}

const TaskForm = ({ addTask }: TaskFormProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        var id = getCurrentId();
        addTask({ id, name, description, state: "Not started" });
        setCurrentId(getCurrentId() + 1);
        setName("");
        setDescription("");
    };

    return (
        <div
            className={
                "collapse border-s-4 border-e-4 border-b-4 border-secondary w-2/5 mx-auto"
            }
        >
            <input type={"checkbox"} />
            <div
                className={
                    "collapse-title text-center p-4 bg-secondary text-xl font-bold"
                }
            >
                New task
            </div>
            <div className={"collapse-content bg-secondary bg-opacity-15"}>
                <form onSubmit={handleSubmit}>
                    <div
                        className={
                            "flex flex-col self-center p-4 pb-0 items-center"
                        }
                    >
                        <input
                            className={"input input-primary w-1/2 mb-4"}
                            placeholder={"Name"}
                            type={"text"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <textarea
                            className={
                                "input input-primary w-4/5 min-h-12 h-40 mb-4 pt-2.5"
                            }
                            placeholder={"Description"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                            type={"submit"}
                            className={"btn btn-primary w-15"}
                        >
                            Add task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
