import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import useForm, { IUseForm } from "../../../../hooks/useForm";
import { RootState } from "../../../../redux/reducers";
import Modal from "../../../Modal/Modal";

interface IProps {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submit: (data: any) => void;
  handleChange: (value: IOption) => void;
  selectError: boolean;
}

interface IData {
  subtaskName: string;
}

interface IOption {
  value: string;
  label: string;
}

const SubTaskModal = ({
  modalIsOpen,
  setIsOpen,
  submit,
  handleChange,
  selectError,
}: IProps) => {
  const { handleInput, handleInvalid, handleSubmit, error } = useForm<
    IData & IUseForm
  >();

  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const { tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  const [options, setOptions] = useState<IOption[]>([]);

  useEffect(() => {
    const userTasks = tasks.filter((task) =>
      task.assignedMember.includes(email)
    );
    const myOptions: IOption[] = userTasks.map((task) => ({
      value: task._id,
      label: task.taskName,
    }));
    setOptions(myOptions);
  }, [tasks, email]);

  return (
    <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
        <h2>Create Subtask</h2>
        <Select
          closeMenuOnSelect
          options={options}
          className="basic-multi-select"
          onChange={handleChange}
        />
        {selectError && <p className="alert-error">Select A Task</p>}
        <input
          onChange={handleInput}
          onInvalid={handleInvalid}
          type="text"
          required
          placeholder="Subtask Name"
          name="subtaskName"
        />
        {error.subtaskName && (
          <p className="alert-error">Subtask Name IS Required</p>
        )}
        <button type="submit">Create Subtask</button>
      </form>
    </Modal>
  );
};

export default SubTaskModal;
