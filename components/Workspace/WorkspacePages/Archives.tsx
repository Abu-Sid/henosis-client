import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import LoadingAnimation from "../../ui/Animation/LoadingAnimation";

const Archives = () => {
  const [sprints, setSprints] = useState(null);
  const [loading, setLoading] = useState(true);
  const { _id } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  useEffect(() => {
    const infos = async () => {
      try {
        const res = await fetch(
          `https://intense-peak-24388.herokuapp.com/sprint/${_id}`
        );
        const data = await res.json();
        setSprints(data.data);
        setLoading(false);
      } catch (err) {
        console.log("Error", err);
      }
    };
    infos();
  }, [_id]);
  console.log(sprints);

  return (
    <div className="archive">
      <h1>
        Get a complete view of all sprint with <span>archive</span> <br /> so
        teams tackle the right tasks at the right time.
      </h1>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="archive__text">
          {sprints &&
            sprints?.map((s) => (
              <div key={s?._id} className="archive__text__sprint">
                <details>
                  <summary>
                    {" "}
                    <h2>{s?.sprintName}</h2>
                    <br />
                    <small>
                      {new Date(s?.startDate).toDateString()} -{" "}
                      {new Date(s?.endDate).toDateString()}
                    </small>
                  </summary>{" "}
                  <br />
                  <p>
                    <h4> Goals: </h4>
                    <ul>
                      <small>
                        {s?.goals.map((goal, index) => (
                          <li key={index}>
                            {index + 1}. {goal}
                          </li>
                        ))}
                      </small>
                    </ul>
                  </p>
                  <p>
                    <h3>Tasks:</h3>
                    <ul>
                      {s?.tasks.map((task, index) => (
                        <li key={index}>
                          <strong>{index + 1}. </strong> {task.taskName},{" "}
                          <strong> Status:</strong>
                          {task.currentStatus},{" "}
                          <strong> Assigned Member:</strong>{" "}
                          {task?.assignedMember[0]}
                        </li>
                      ))}
                    </ul>
                  </p>
                </details>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Archives;
