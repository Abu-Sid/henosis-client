import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import TableRow from "../../components/Dashboard/TableRow";
import SideBar from "../../components/Dashboard/SideBar";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation.tsx";
import AdminSidebar from "../../components/ui/AdminSidebar/AdminSidebar";

const Admins = () => {
  const [adminInfo, setAdminInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(loading);
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
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    if (data) {
      const { name, email, role } = data;
      // sent data to database
      fetch("https://intense-peak-24388.herokuapp.com/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, role }),
      });
      e.target.reset();
      setOpen(false);
    }
  };

  return (
    <section className='d-container'>
      <div className='d-row'>
        <div className='col-left'>
          <AdminSidebar />
        </div>
        <div className='col-right'>
          <div className='right-division'>
            <h2>Admins</h2>
            <button className='admin-button' onClick={onOpenModal}>
              Add New Admin
            </button>
            <Modal open={open} onClose={onCloseModal} center id='modal'>
              <div className='admin-info'>
                <h2>Admin Information</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label>Admin Name</label>
                  <input {...register("name")} type='text' required />
                  <label>Email</label>
                  <input {...register("email")} type='email' required />
                  <label>Role</label>
                  <select {...register("role")} type='text'>
                    <option value='admin'>Admin</option>
                    <option value='editor'>Editor</option>
                    <option value='other'>other</option>
                  </select>
                  <input type='submit' value='Add Admin' className='button' />
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
              </tr>
            </thead>
            {loading ? (
              <LoadingAnimation />
            ) : (
              <tbody>
                {adminInfo.map((info, index) => (
                  <TableRow key={info._id} info={info} index={index} />
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
