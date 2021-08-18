import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";
import StatusBoards from "./StatusBoards";
import TaskCard from "./TaskCard";

interface IProps {
  handleOnDragEnd: (result: DropResult) => void;
  handleDelete: (_id: string) => void;
}

const BoardMain = ({ handleOnDragEnd, handleDelete }: IProps) => {
  const { status, tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  return (
    <div className="status-board-container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {status.map((singleStatus) => (
          <Droppable key={singleStatus} droppableId={singleStatus}>
            {(provided) => (
              <StatusBoards
                ref={provided.innerRef}
                {...provided.droppableProps}
                statusName={singleStatus}
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
  );
};

export default BoardMain;
