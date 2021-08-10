import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useForm from "../../../hooks/useForm";
import ReactModal from "../../ReactModal/ReactModal";
import { IData } from "../WorkspacePages/Backlog";

interface IForm {
  handleInput: (e: any) => void;
  handleInvalid: (e: any) => void;
  handleSubmit: (submit: (data: IData) => void) => (e: any) => void;
  error: any;
}

const inputData = [
  {
    title: "Sprint Name",
    name: "sprintName",
    type: "text",
  },
  {
    title: "Start Date",
    name: "startDate",
    type: "date",
  },
  {
    title: "End Date",
    name: "endDate",
    type: "date",
  },
];

interface IProps {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submit: (data: IData) => void;
  goals: number[];
  setGoals: React.Dispatch<React.SetStateAction<number[]>>;
}

const CreateSprint = ({
  modalIsOpen,
  setIsOpen,
  submit,
  goals,
  setGoals,
}: IProps) => {
  const { handleInput, handleInvalid, handleSubmit, error }: IForm = useForm();

  const lastGoal = goals[goals.length - 1];

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create Sprint</button>
      <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
          <h2>Sprint Information</h2>
          {inputData.map(({ title, name, type }, index) => (
            <div key={index}>
              <label htmlFor={name}>{title}</label>
              <input
                id={name}
                type={type}
                name={name}
                placeholder={title}
                onChange={handleInput}
                required
                onInvalid={handleInvalid}
              />
              {error[name] && (
                <p className="alert-error">{title} is required</p>
              )}
            </div>
          ))}
          <label>
            Goal <span>(optional)</span>
          </label>
          {goals.map((goal) => (
            <div key={goal} className="goal">
              <input
                type="text"
                name={"goal" + goal}
                placeholder={"Goal " + goal}
                onChange={handleInput}
              />
              {goal === lastGoal && (
                <label
                  onClick={() =>
                    setGoals((preGoals) => [
                      ...preGoals,
                      preGoals[preGoals.length - 1] + 1,
                    ])
                  }
                  className="add-btn"
                >
                  <FontAwesomeIcon style={{ fontSize: "22px" }} icon={faPlus} />
                </label>
              )}
            </div>
          ))}
          <button type="submit">Create Sprint</button>
        </form>
      </ReactModal>
    </div>
  );
};

export default CreateSprint;
