import React from "react";
import { useSelector } from "react-redux";
import useForm, { IUseForm } from "../../hooks/useForm";
import { IWorkspaceData } from "../../pages/information";
import { RootState } from "../../redux/reducers";

interface IProps {
  submit: (submit: IWorkspaceData) => void;
  isCompany?: boolean;
}

const WorkspaceForm = ({ submit, isCompany }: IProps) => {
  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const { handleInput, handleInvalid, handleSubmit, error } = useForm<
    IWorkspaceData & IUseForm
  >(isCompany && ({ companyEmail: email } as IWorkspaceData));

  return (
    <form onSubmit={handleSubmit(submit)} className="workspace-form">
      {isCompany && (
        <>
          <h1 className="workspace-form__header">Company Information</h1>
          <div className="workspace-form__input">
            <label htmlFor="company-name">Company name</label>
            <input
              onChange={handleInput}
              type="text"
              name="companyName"
              id="company-name"
              onInvalid={handleInvalid}
              required
              placeholder="Company Name"
            />
            {error.companyName && (
              <p className="alert-error">
                Company Name Is Required Minimum 6 characters
              </p>
            )}
          </div>
          <div className="workspace-form__input">
            <label htmlFor="company-email">Company email</label>
            <input
              onChange={handleInput}
              type="email"
              name="companyEmail"
              id="company-email"
              onInvalid={handleInvalid}
              required
              placeholder="Email"
              defaultValue={email}
            />
            {error.companyEmail && (
              <p className="alert-error">Valid Company Email Is Required</p>
            )}
          </div>
        </>
      )}
      <h1 className="workspace-form__header">Workspace Information</h1>
      <div className="workspace-form__input">
        <label htmlFor="workspace-name">Workspace name </label>
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
          <p className="alert-error">
            Workspace Name Is Required Minimum 6 characters
          </p>
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
      <button type="submit">
        {isCompany ? "Proceed to checkout" : "Create Workspace"}
      </button>
    </form>
  );
};

export default WorkspaceForm;
