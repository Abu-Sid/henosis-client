import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import CodingBanner from "./CodingBanner";

const PersonalDashboardHeader = () => {
  const today = new Date();
  const day = today.toLocaleString("default", { weekday: "long" });
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.getDate();
  const year = today.getFullYear();

  const { name, email } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const { tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
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

  return (
    <>
      <div className="personal-dashboard__header__info">
        <div className="info__image">
          <CodingBanner />
        </div>
        <div className="info__text">
          <h1>
            Hi, <span>{name}</span>
          </h1>
          <div className="personal-dashboard__header__time">
            It is <span>{day}, </span>
            {month} {date}, {year}
          </div>
          <p>
            You have {todayUndoTasks.length} tasks to finish today. You have
            already completed {parseFloat(progress.toFixed(2)) || 0}% of your
            tasks. Your progress is unbeatable.
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalDashboardHeader;
