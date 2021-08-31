import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
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

  const { sprint } = useSelector((state: RootState) => state.sprintReducer);

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

  const ballVariant = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        delay: 2,
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : sprint._id ? (
        <section className='personal-dashboard'>
          <div className='personal-dashboard__header'>
            <div className='header-purple-ball'>
              <motion.svg
                width='150'
                height='150'
                viewBox='0 0 238 238'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                variants={ballVariant}
                initial='initial'
                animate='animate'
              >
                <circle cx='119' cy='119' r='119' fill='#4A4FFF' />
              </motion.svg>
            </div>
            <PersonalDashboardHeader />
          </div>
          <div className='personal-dashboard__activity'>
            <p>Activity</p>
          </div>
          <div className='personal-dashboard__chart'>
            <DashboardBarChart />
          </div>
          <div className='personal-dashboard__progress'>
            <DashboardProgressChart />
          </div>
          <div className='personal-dashboard__to-do'>
            <DashboardStatusPill status='Remaining' />
          </div>
          <div className='personal-dashboard__in-progress'>
            <DashboardStatusPill status='In Progress' />
          </div>
          <div className='personal-dashboard__done'>
            <DashboardStatusPill status='Done' />
          </div>
          <div className='personal-dashboard__assigned-to-me'>
            <p>Assigned to me</p>
          </div>
          <div className='personal-dashboard__task'>
            <AssignedToMe />
          </div>
          <div className='personal-dashboard__add-sub-task'>
            <p>My Sub-tasks</p>
          </div>
          <div className='personal-dashboard__sub-task'>
            <SubTask socket={socket} toastId={toastId} />
          </div>
          <div className='personal-dashboard__account'>
            <DashboardAccount />
          </div>
        </section>
      ) : (
        <div className='board-error'>
          <h1 className='alert-error'>No Sprint Here</h1>
          <Link href={`${_id}/backlog`} passHref>
            <button className='button-primary'>Create A Sprint</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PersonalDashboard;
