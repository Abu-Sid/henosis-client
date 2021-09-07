import React from "react";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import WorkspaceRow from "./WorkspaceRow";
import { motion } from "framer-motion";

interface IProps {
  workspaces: IWorkspace[];
}

// const tableRowVariant = {
//   animate: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

const WorkspacesTable = ({ workspaces }: IProps) => {
  console.log(workspaces);
  return (
    <motion.div transition={{ staggerChildren: 0.5 }} className='table'>
      <div className='table__header'>
        <div className='number'>No.</div>
        <div className='name'>Name</div>
        <div className='type'>Type</div>
        <div className='owner-name'>Owner</div>
      </div>
      <motion.div className='table__row'>
        {workspaces.map((workspace, index) => (
          <WorkspaceRow
            key={workspace._id}
            workspace={workspace}
            index={index}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default WorkspacesTable;
