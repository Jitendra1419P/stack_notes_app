import { useTasks } from '@/context/taskContext';
import { item } from '@/utils/animations';
import { edit, star, trash } from '@/utils/icons';
import { Task } from '@/utils/types';
import { formatTime } from '@/utils/utilities';
import { motion } from 'framer-motion';
import React from 'react';

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-red-500';
    }
  };

  const { getTask, openModalForEdit, deleteTask, modalMode } = useTasks();

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            <button
              className={`${
                task.completed ? 'text-yellow-400' : 'text-gray-400'
              }`}
            >
              {star}
            </button>
            <button
              className="text-[#00a1f1]"
              onClick={() => {
                getTask(task._id);
                openModalForEdit(task);
              }}
            >
              {edit}
            </button>
            <button
              className="text-[#f65314] "
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trash}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;
