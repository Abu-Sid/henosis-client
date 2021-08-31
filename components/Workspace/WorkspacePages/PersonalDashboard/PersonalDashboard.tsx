import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../../../hooks/useSocket";
import {
  addTask,
  sendCurrentSprint,
} from "../../../../redux/actions/sprintActions";
import {
  ISprint,
  ITask,
} from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";
import LoadingAnimation from "../../../ui/Animation/LoadingAnimation";
import AssignedToMe from "./AssignedToMe";
import DashboardAccount from "./DashboardAccount";
import DashboardBarChart from "./DashboardBarChart";
import DashboardProgressChart from "./DashboardProgressChart";
import DashboardStatusPill from "./DashboardStatusPill";
import PersonalDashboardHeader from "./PersonalDashboardHeader";
import SubTask from "./SubTask";

let toastId: string;

const PersonalDashboard = () => {
  const socket = useSocket("/sprint");

  const { loading } = useSelector((state: RootState) => state.sprintReducer);

  const { _id } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (socket !== null) {
      socket.emit("join-sprint", _id);

      socket.emit("current-sprint", _id);

      socket.on("send-current-sprint", (currentSprint: ISprint) => {
        dispatch(sendCurrentSprint(currentSprint));
      });

      socket.on(
        "added-task",
        (
          tasks: ITask[],
          user?: {
            name: string;
            email: string;
            status?: string;
            isSub?: boolean;
          }
        ) => {
          dispatch(addTask(tasks));
          if (user) {
            if (user.email === email) {
              if (user.isSub) {
                toast.dismiss(toastId);
                toast.success(`Your SubTask Added Successfully!`);
              } else {
                toast.success(
                  `Your Task ${user.status || "Added"} Successfully!`
                );
              }
            } else {
              toast.success(`${user.name} ${user.status || "Added"} A Task!`);
            }
          }
        }
      );
    }
  }, [socket, _id, dispatch, email]);

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <section className="personal-dashboard">
          <div className="personal-dashboard__header">
            <PersonalDashboardHeader />
          </div>
          <div className="personal-dashboard__activity">
            <p>Activity</p>
          </div>
          <div style={{ padding: "1em" }} className="personal-dashboard__chart">
            <DashboardBarChart />
          </div>
          <div className="personal-dashboard__progress">
            <DashboardProgressChart />
          </div>
          <div className="personal-dashboard__to-do">
            <DashboardStatusPill status="Remaining" />
          </div>
          <div className="personal-dashboard__in-progress">
            <DashboardStatusPill status="In Progress" />
          </div>
          <div className="personal-dashboard__done">
            <DashboardStatusPill status="Done" />
          </div>
          <div className="personal-dashboard__assigned-to-me">
            <p>Assigned to me</p>
          </div>
          <div className="personal-dashboard__task">
            <AssignedToMe />
          </div>
          <div className="personal-dashboard__add-sub-task">
            <p>My Sub-tasks</p>
          </div>
          <div className="personal-dashboard__sub-task">
            <SubTask socket={socket} toastId={toastId} />
          </div>
          <div className="personal-dashboard__account">
            <DashboardAccount />
          </div>
        </section>
      )}
    </>
  );
};

export default PersonalDashboard;
