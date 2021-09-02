import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Dashboard/AdminSidebar";
import WorkspaceRow from "../../components/Dashboard/WorkspaceRow";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";
import verifyAdmin from "../../HOC/verifyAdmin";

interface IFormInput {
  _id: number;
  workspaceName: String;
  type: String;
  members: Number[];
}

const Workspaces = () => {
  const [workspaceInfo, setWorkspaceInfo] = useState<IFormInput[]>([]);
  const [allWorkspace, setAllWorkspace] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://intense-peak-24388.herokuapp.com/workspace/all")
      .then((res) => res.json())
      .then((data) => {
        setWorkspaceInfo(data.data);
        setAllWorkspace(data.data);
      });
  }, []);

  const handleSearch = (e) => {
    const searchItem = e.target.value;
    if (searchItem !== "" && searchItem.length > 0) {
      const result = workspaceInfo?.filter((si) => {
        return Object.values(si)
          .join(" ")
          .toLowerCase()
          .includes(searchItem.toString().toLowerCase());
      });
      setAllWorkspace(result);
    } else {
      setAllWorkspace(workspaceInfo);
    }
  };

  useEffect(() => {
    if (workspaceInfo.length !== 0) {
      setLoading(false);
    }
  }, [workspaceInfo]);

  return (
    <div className="d-container">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="d-row">
          <div className="col-left">
            <AdminSidebar />
          </div>
          <div className="col-right">
            <div className="right-division">
              <h2>Workspaces</h2>
              <form>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  className="input-search"
                />
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
              <tbody>
                {allWorkspace.map((info, index) => (
                  <WorkspaceRow key={info._id} info={info} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default verifyAdmin(Workspaces);
