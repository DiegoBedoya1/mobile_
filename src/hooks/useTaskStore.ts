import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'timeflow-tasks';

export const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, date: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      date,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter((task) => task.date === date);
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed);
  };

  const getTotalTasks = () => tasks.length;
  
  const getCompletedCount = () => tasks.filter((t) => t.completed).length;

  const getCompletionRate = () => {
    if (tasks.length === 0) return 0;
    return Math.round((getCompletedCount() / tasks.length) * 100);
  };

  const getTasksThisWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate >= startOfWeek && taskDate <= now;
    });
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    getTasksByDate,
    getCompletedTasks,
    getTotalTasks,
    getCompletedCount,
    getCompletionRate,
    getTasksThisWeek,
  };
};
