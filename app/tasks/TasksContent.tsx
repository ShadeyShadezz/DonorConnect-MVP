"use client";

import { useState } from "react";
import TaskModal from "@/components/TaskModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";

interface Task {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TasksContentProps {
  initialTasks: Task[];
}

export default function TasksContent({ initialTasks }: TasksContentProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusCounts = {
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    overdue: tasks.filter((t) => t.status === "overdue").length,
  };

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleSuccessSave = async () => {
    const response = await fetch("/api/tasks");
    const updatedTasks = await response.json();
    setTasks(updatedTasks);
  };

  const handleDeleteClick = (task: Task) => {
    setDeleteTarget(task);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/tasks/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete task");
      }

      setTasks(tasks.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert(error instanceof Error ? error.message : "Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-2">Manage your to-do list and follow-ups</p>
          </div>
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-3xl font-bold text-blue-600">
            {statusCounts.pending}
          </p>
          <p className="text-sm text-blue-700 mt-1">Pending</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6">
          <p className="text-3xl font-bold text-yellow-600">
            {statusCounts.inProgress}
          </p>
          <p className="text-sm text-yellow-700 mt-1">In Progress</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <p className="text-3xl font-bold text-green-600">
            {statusCounts.completed}
          </p>
          <p className="text-sm text-green-700 mt-1">Completed</p>
        </div>
        <div className="bg-red-50 rounded-lg p-6">
          <p className="text-3xl font-bold text-red-600">
            {statusCounts.overdue}
          </p>
          <p className="text-sm text-red-700 mt-1">Overdue</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600 text-center py-12">
            No tasks yet. Create one to get started!
          </p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded font-medium text-sm transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(task)}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded font-medium text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={handleCloseModal}
        onSuccess={handleSuccessSave}
      />

      <DeleteConfirmationModal
        isOpen={deleteTarget !== null}
        itemName={deleteTarget?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </>
  );
}
