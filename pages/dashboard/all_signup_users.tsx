import React, { useEffect, useState } from "react";
import UsersRow from "../../components/Dashboard/UsersRow";
import AdminSidebar from "../../components/Dashboard/AdminSidebar";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";

interface UserType {
  name: String;
  email: String;
  role: String;
  _id: number;
}

const All_signup_users = () => {
  const [userInfo, setUserInfo] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  // console.log(userInfo);

  useEffect(() => {
    fetch("https://intense-peak-24388.herokuapp.com/user")
      .then((res) => res.json())
      .then((data) => setUserInfo(data.data));
  }, []);

  useEffect(() => {
    if (userInfo.length !== 0) {
      setLoading(false);
    }
  }, [userInfo]);

  return (
    <section className="d-container">
      <div className="d-row">
        <div className="col-left">
          <AdminSidebar />
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
            {loading ? (
              <LoadingAnimation />
            ) : (
              <tbody>
                {userInfo.map((info, index) => (
                  <UsersRow key={info._id} info={info} index={index} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};

export default All_signup_users;
