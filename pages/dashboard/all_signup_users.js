import React, { useEffect, useState } from "react";
import TableRow from "../../components/Dashboard/TableRow";
import SideBar from "../../components/Dashboard/SideBar";


const All_signup_users = () => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    fetch("https://intense-peak-24388.herokuapp.com/user")
      .then((res) => res.json())
      .then((data) => setUserInfo(data.data));
  }, []);

  return (
    <section className="d-container">
      <div className="d-row">
        <div className="col-left">
          <SideBar />
        </div>
        <div className="col-right">
          <div style={{ textAlign: "center" }}>
            <h2>All Signup Users</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.map((info, index) => (
                <TableRow key={info._id} info={info} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default All_signup_users;
