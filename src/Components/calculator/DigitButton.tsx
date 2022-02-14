import React from "react";
import { actionType } from "./Calculator";

interface Props {
  dispatch: (action: actionType) => void;
  digit: string;
}

const DigitButton: React.FC<Props> = (props) => {
  return (
    <button
      className="col-3 p-3 opp"
      onClick={() =>
        props.dispatch({ type: "add-digit", payload: props.digit })
      }
    >
      {props.digit}
    </button>
  );
};

export default DigitButton;
