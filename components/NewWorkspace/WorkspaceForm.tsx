import React from "react";
import useForm from "../../hooks/useForm";

interface IForm {
  handleInput: (e: any) => void;
  handleInvalid: (e: any) => void;
  handleSubmit: (submit: any) => (e: any) => void;
  error: any;
}

const WorkspaceForm = ({ submit }) => {
  const { handleInput, handleInvalid, handleSubmit, error }: IForm = useForm();

  return (
    <form onSubmit={handleSubmit(submit)} className="workspace-form">
      <h1 className="workspace-form__header">Workspace Information</h1>
      <div className="workspace-form__input">
        <label htmlFor="workspace-name">Workspace name: </label>
        <input
          onChange={handleInput}
          type="text"
          name="workspaceName"
          id="workspace-name"
          onInvalid={handleInvalid}
          required
          placeholder="Workspace Name"
        />
        {error.workspaceName && (
          <p className="alert-error">Workspace Name Is Required</p>
        )}
      </div>
      <div className="workspace-form__input">
        <label htmlFor="member-email">
          Add members <span>(optional)</span>
        </label>
        <input
          onChange={handleInput}
          type="text"
          name="memberEmail"
          id="member-email"
          placeholder="Email"
        />
      </div>
      <button type="submit">Create Workspace</button>
    </form>
  );
};

export default WorkspaceForm;
