import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Dashboard/SideBar";
import WorkspaceRow from "../../../components/Dashboard/WorkspaceRow";
import LoadingAnimation from "../../../components/ui/Animation/LoadingAnimation";
import { useForm } from "react-hook-form";
import AdminSidebar from "../../../components/ui/AdminSidebar/AdminSidebar";
const Workspaces = () => {
  const [workspaceInfo, setWorkspaceInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(loading);
  const { register, handleSubmit } = useForm();
  console.log(workspaceInfo);
  useEffect(() => {
    fetch("https://intense-peak-24388.herokuapp.com/workspace/all")
      .then((res) => res.json())
      .then((data) => setWorkspaceInfo(data.data));
  }, []);
  const onSubmit = (data) => {
    if (data.filter === "personal") {
      fetch("https://intense-peak-24388.herokuapp.com/workspace/personal")
        .then((res) => res.json())
        .then((data) => setWorkspaceInfo(data.data));
    } else if (data.filter === "business") {
      fetch("https://intense-peak-24388.herokuapp.com/workspace/business")
        .then((res) => res.json())
        .then((data) => setWorkspaceInfo(data.data));
    } else {
      fetch("https://intense-peak-24388.herokuapp.com/workspace/all")
        .then((res) => res.json())
        .then((data) => setWorkspaceInfo(data.data));
    }
  };

  useEffect(() => {
    if (workspaceInfo.length !== 0) {
      setLoading(false);
    }
  }, [workspaceInfo]);

  return (
    <div className='d-container'>
      <div className='d-row'>
        <div className='col-left'>
          <AdminSidebar />
        </div>
        <div className='col-right'>
          <div className='right-division'>
            <h2>Workspaces</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <select {...register("filter")}>
                <option value='all'>All</option>
                <option value='personal'>Personal</option>
                <option value='business'>Business</option>
              </select>
              <input type='submit' value='Filter' className='button' />
            </form>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Type</th>
                <th>Members</th>
              </tr>
            </thead>
            {loading ? (
              <LoadingAnimation />
            ) : (
              <tbody>
                {workspaceInfo.map((info, index) => (
                  <WorkspaceRow key={info._id} info={info} index={index} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
