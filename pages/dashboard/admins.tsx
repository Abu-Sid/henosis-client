import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import AdminRow from "../../components/Dashboard/AdminRow";
import AdminSidebar from "../../components/ui/AdminSidebar/AdminSidebar";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";

enum RoleEnum {
  admin = "admin",
  editor = "editor",
  other = "other",
}

interface IFormInput {
  name: String;
  email: String;
  role: RoleEnum;
  _id: number;
}

const Admins = () => {
  const [adminInfo, setAdminInfo] = useState<IFormInput[]>([]);
  const [loading, setLoading] = useState(true);
  // console.log(loading);

  useEffect(() => {
    fetch("https://intense-peak-24388.herokuapp.com/admin")
      .then((res) => res.json())
      .then((data) => setAdminInfo(data.data));
  }, []);

  useEffect(() => {
    if (adminInfo.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [adminInfo]);

  // modal
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // react hook form
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (
    data,
    e: React.BaseSyntheticEvent<object>
  ) => {
    if (data) {
      const { name, email, role } = data;
      e.target.reset();
      // sent data to database
      fetch("https://intense-peak-24388.herokuapp.com/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, role }),
      })
        // .then((res) => res.json())
        // .then((data) => {
        //   console.log(data);
        //   if (data) {
        //     const newAdminInfo = [...adminInfo, data];
        //     setAdminInfo(newAdminInfo);
          // }
        // });
      setOpen(false);
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
            <h2>Admins</h2>
            <button className="admin-button" onClick={onOpenModal}>
              Add New Admin
            </button>
            <Modal open={open} onClose={onCloseModal} center>
              <div className="admin-info">
                <h2>Admin Information</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label>Admin Name</label>
                  <input {...register("name")} type="text" required />
                  <label>Email</label>
                  <input {...register("email")} type="email" required />
                  <label>Role</label>
                  <select {...register("role")}>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="other">other</option>
                  </select>
                  <input type="submit" value="Add Admin" className="button" />
                </form>
              </div>
            </Modal>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            {loading ? (
              <LoadingAnimation />
            ) : (
              <tbody>
                {adminInfo.map((info, index) => (
                  <AdminRow key={info._id} info={info} index={index} />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};

export default Admins;
