import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import CodingBanner from "./CodingBanner";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const PersonalDashboardHeader: React.FC = () => {
  const today = new Date();
  const day = today.toLocaleString("default", { weekday: "long" });
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.getDate();
  const year = today.getFullYear();

  const [greeting, setGreeting] = useState(false);

  const { name, email } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const { tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  const { workspaceName } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const userTasks = tasks.filter((task) => task.assignedMember.includes(email));

  const todayTasks = userTasks.filter(
    (task) =>
      new Date(task.dueDate).toDateString() === new Date().toDateString()
  );

  const todayUndoTasks = todayTasks.filter(
    (task) => task.currentStatus !== "DONE"
  );

  const progress = 100 - (todayUndoTasks.length / todayTasks.length) * 100;

  useEffect(() => {
    setTimeout(() => {
      setGreeting(true);
    }, 3000);
  }, []);

  return (
    <>
      <AnimateSharedLayout>
        <motion.div layout className='personal-dashboard__header__info'>
          <div className='info__image'>
            <CodingBanner />
          </div>
          <motion.div layout className='info__text'>
            <AnimatePresence>
              {!greeting && (
                <motion.h1 exit={{ opacity: 0 }}>
                  Hi, <span>{name}</span>
                </motion.h1>
              )}
            </AnimatePresence>
            {greeting && (
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Welcome to <span>{workspaceName}</span>
              </motion.h1>
            )}
            <motion.div layout className='personal-dashboard__header__time'>
              It is <span>{day}, </span>
              {month} {date}, {year}
            </motion.div>
            <motion.p layout>
              {todayUndoTasks.length === 0 && (
                <span>There is nothing left to do. </span>
              )}
              {todayUndoTasks.length !== 0 && (
                <span>
                  You have {todayUndoTasks.length} tasks to finish today.
                </span>
              )}
              {progress !== 0 && (
                <span>
                  You have already completed {parseFloat(progress.toFixed(2))}%
                  of your tasks. Your progress is unbeatable.
                </span>
              )}
              {progress === 0 && (
                <span>
                  You haven&apos;t done anything yet, but keep going. You can do
                  it.
                </span>
              )}
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimateSharedLayout>
    </>
  );
};

export default PersonalDashboardHeader;
