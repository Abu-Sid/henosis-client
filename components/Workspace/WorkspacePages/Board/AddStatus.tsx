import React from "react";
import useForm, { IUseForm } from "../../../../hooks/useForm";

interface IProps {
  submit: (data: { status: string }) => void;
}

const AddStatus = ({ submit }: IProps) => {
  const { handleInput, handleInvalid, handleSubmit, error } = useForm<
    { status: string } & IUseForm
  >();

  return (
    <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
      <h2>Add Status</h2>
      <input
        onChange={handleInput}
        onInvalid={handleInvalid}
        required
        name="status"
        type="text"
        placeholder="Status Name"
      />
      {error.status && <p className="alert-error">Status Is Required</p>}
      <button type="submit">Add Status</button>
    </form>
  );
};

export default AddStatus;
