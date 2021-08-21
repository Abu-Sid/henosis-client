import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { HiOutlinePlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import { ITask } from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";
import Modal from "../../../Modal/Modal";
import AddTaskModal from "../Backlog/AddTaskModal";
import AddStatus from "./AddStatus";
import StatusBoards from "./StatusBoards";
import TaskCard from "./TaskCard";

interface IProps {
  handleOnDragEnd: (result: DropResult) => void;
  handleDelete: (_id: string) => void;
  handleSubmit: (
    data: ITask,
    assignedMember: string[],
    currentStatus: string
  ) => void;
  handleAddStatus: (data: { status: string }) => void;
}

const BoardMain = ({
  handleOnDragEnd,
  handleDelete,
  handleSubmit,
  handleAddStatus,
}: IProps) => {
  const { status, tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  const [modalIsOpen, setIsOpen] = useState(false);

  const [assignedMember, setAssignedMember] = useState<string[]>(
    [] as string[]
  );

  const [selectedStatus, setSelectedStatus] = useState("");

  const [isAddStatus, setIsAddStatus] = useState(false);

  const handleAddTask = (status: string) => {
    setSelectedStatus(status);
    setIsOpen(true);
  };

  const handleAdd = (data: { status: string }) => {
    handleAddStatus(data);
    setIsAddStatus(false);
  };

  const submit = (data: ITask) => {
    setIsOpen(false);
    handleSubmit(data, assignedMember, selectedStatus);
    setSelectedStatus("");
  };

  return (
    <>
      <div className="board-main-section">
        <div className="status-board-container">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {status.map((singleStatus) => (
              <Droppable key={singleStatus} droppableId={singleStatus}>
                {(provided) => (
                  <StatusBoards
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    statusName={singleStatus}
                    handleAddTask={handleAddTask}
                  >
                    {tasks.map((task, index) =>
                      task.currentStatus === singleStatus ? (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <TaskCard
                              task={task}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              handleDelete={handleDelete}
                            />
                          )}
                        </Draggable>
                      ) : null
                    )}
                    {provided.placeholder}
                  </StatusBoards>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
        <button
          className="plus-btn status-plus"
          onClick={() => setIsAddStatus(true)}
        >
          <HiOutlinePlus />
        </button>
      </div>
      <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <AddTaskModal submit={submit} setAssignedMember={setAssignedMember} />
      </Modal>
      <Modal modalIsOpen={isAddStatus} setIsOpen={setIsAddStatus}>
        <AddStatus submit={handleAdd} />
      </Modal>
    </>
  );
};

export default BoardMain;
