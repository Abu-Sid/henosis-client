import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays } from "date-fns";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useForm from "../../../../hooks/useForm";
import Modal from "../../../Modal/Modal";
import { IData } from "./Backlog";

const inputsData = [
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
  const {
    handleInput,
    handleInvalid,
    handleSubmit,
    handleDateChange,
    error,
    inputData,
  } = useForm({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });

  const lastGoal = goals[goals.length - 1];

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="create-sprint-button">
        Create Sprint
      </button>
      <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
          <h2>Sprint Information</h2>
          {inputsData.map(({ title, name, type }, index) => (
            <div key={index}>
              <label htmlFor={name}>{title}</label>
              {type !== "date" ? (
                <input
                  id={name}
                  type={type}
                  name={name}
                  placeholder={title}
                  onChange={handleInput}
                  required
                  onInvalid={handleInvalid}
                />
              ) : (
                <DatePicker
                  selected={inputData[name]}
                  onChange={(date) => handleDateChange(date, name)}
                  minDate={new Date()}
                  showDisabledMonthNavigation
                  dateFormat="dd/MM/yyyy"
                  placeholderText={title}
                  className={name}
                />
              )}
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
                  <FontAwesomeIcon
                    style={{ fontSize: "22px" }}
                    icon={faPlus as IconProp}
                  />
                </label>
              )}
            </div>
          ))}
          <button type="submit">Create Sprint</button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateSprint;
