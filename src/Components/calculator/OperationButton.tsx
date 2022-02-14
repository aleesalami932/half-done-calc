import React from "react";
import { actionType } from "./Calculator";

interface Props {
  dispatch: (action: actionType) => void;
  operation: string;
}

const OperationButton: React.FC<Props> = (props) => {
  return (
    <button
      className="col-3 p-3 opp"
      onClick={() =>
        props.dispatch({ type: "choose-operation", payload: props.operation })
      }
    >
      {props.operation}
    </button>
  );
};

export default OperationButton;
