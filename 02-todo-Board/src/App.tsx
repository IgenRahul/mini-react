import { useState } from "react";
import "./App.css";

type Status = "todo" | "inProgress" | "done";
interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      status: "todo",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      status: "inProgress",
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      status: "todo",
    },
  ]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const renderTasks = (title: string, status: Status) => {
    return (
      <div
        className="flex-1 min-w-56 bg-gray-100 rounded-lg p-4"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={() => {
          if (draggedTask) {
            setTasks(
              tasks.map((task) =>
                task.id === draggedTask ? { ...task, status } : task
              )
            );
            setDraggedTask(null);
          }
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <div
              key={task.id}
              className="shadow-xs bg-white rounded-lg p-4 mb-4 cursor-move"
              draggable
              onDragStart={() => setDraggedTask(task.id)}
            >
              <div>
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <div className="flex justify-evenly mt-4">
                {status !== "todo" && (
                  <button className="min-w-1/4 ml-2 text-sm font-extrabold px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {"<-"}
                  </button>
                )}
                <button className="min-w-1/4 ml-2 text-sm font-bold px-2 py-1 bg-red-500  text-white rounded hover:bg-red-600">
                  X
                </button>
                {status !== "done" && (
                  <button className="min-w-1/4 ml-2 text-sm font-extrabold px-3 py-1 bg-green-500  text-white rounded hover:bg-green-600">
                    <span>{"->"}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-200 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Do It!
          </h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            onClick={() => setShowAddTask(true)}
          >
            Add New Task
          </button>
        </div>
        <div className="flex flex-row flex-wrap justify-evenly gap-4 lg:gap-8">
          {renderTasks("To Do", "todo")}
          {renderTasks("In Progress", "inProgress")}
          {renderTasks("Done", "done")}
        </div>
        {showAddTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white backdrop-blur-3xl rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Add New Task
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newTask.title.trim()) return;

                  const task: Task = {
                    id: Date.now().toString(),
                    title: newTask.title.trim(),
                    description: newTask.description.trim(),
                    status: "todo",
                  };

                  setTasks([...tasks, task]);
                  setNewTask({ title: "", description: "" });
                  setShowAddTask(false);
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="Enter task title"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    rows={3}
                    placeholder="Enter task description"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowAddTask(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
