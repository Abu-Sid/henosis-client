import React, { useEffect, useState } from "react";
import UsersRow from "../../components/Dashboard/UsersRow";
import AdminSidebar from "../../components/Dashboard/AdminSidebar";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";
import verifyAdmin from "../../HOC/verifyAdmin";

interface UserType {
  name: String;
  email: String;
  role: String;
  _id: number;
}

const All_signup_users = () => {
  const [userInfo, setUserInfo] = useState<UserType[]>([]);
  const [usersInfo, setUsersInfo] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  // console.log(userInfo);

  useEffect(() => {
    fetch("https://intense-peak-24388.herokuapp.com/user")
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.data);
        setUsersInfo(data.data);
      });
  }, []);

  useEffect(() => {
    if (userInfo.length !== 0) {
      setLoading(false);
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const searchItem = e.target.value;
    if (searchItem !== "" && searchItem.length > 0) {
      const newItems = userInfo?.filter((si) => {
        return Object.values(si)
          .join(" ")
          .toLowerCase()
          .includes(searchItem.toString().toLowerCase());
      });
      setUsersInfo(newItems);
    } else {
      setUsersInfo(userInfo);
    }
  };

  return (
    <section className="d-container">
      <div className="d-row">
        <div className="col-left">
          <AdminSidebar />
        </div>
        <div className="col-right">
          <div className="right-division">
            <h2>All Users</h2>
            <form>
              <input
                type="text"
                className="input-search"
                onChange={handleChange}
                placeholder="Search"
              />
            </form>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            {loading ? (
              <LoadingAnimation />
            ) : (
              <tbody>
                {usersInfo.map((info, index) => (
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

export default verifyAdmin(All_signup_users);
