import React, { Reducer, useReducer } from "react";
import "./styles.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { State } from "../../Context/Interfaces";

// export const actions: Actions = {
//   ADD_DIGIT: "add-digit",
//   CHOOSE_OPERAION: "choose-operation",
//   CLEAR: "clear",
//   DELETE_DIGIT: "delete-digit",
//   EVALUATE: "evaluate",
// };

type stateType = {
  currentOp: string;
  previousOp: string;
  operation: string;
  overwrite?: boolean;
};

const initialState: stateType = {
  currentOp: "",
  operation: "",
  previousOp: "",
};

export type actionType = {
  type:
    | "add-digit"
    | "choose-operation"
    | "clear"
    | "delete-digit"
    | "evaluate";

  payload: string;
};

const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case "add-digit":
      if (state.overwrite) {
        return { 
          ...state, 
          currentOp: action.payload, 
          overwrite: false 
        };
      }

      if (action.payload === "0" && state.currentOp === "0") {
        return state;
      }

      if (action.payload === "." && state.currentOp.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOp: `${state.currentOp || ""}${action.payload}`,
      };

    case "choose-operation":
      if (state.currentOp == null && state.previousOp == null) {
        return state;
      }

      if (state.previousOp == null) {
        return {
          ...state,
          operation: action.payload,
          previousOp: state.currentOp,
          currentop: null,
        };
      }

      if (state.currentOp == null) {
        return {
          ...state,
          operation: action.payload,
        };
      }

      return {
        ...state,
        previousOp: evaluate(state),
        operation: action.payload,
        currentOp: null,
      };

    case "clear":
      return {};

    case "delete-digit":
      if (state.overwrite) {
        return {
          ...state,
          currentOp: null,
          overwrite: false,
        };
      }

      if (state.currentOp == null) {
        return state;
      }

      if (state.currentOp.length === 1) {
        return { ...state, currentOp: null };
      }

      return {
        ...state,
        currentOp: state.currentOp.slice(0, -1),
      };

    case "evaluate":
      if (
        state.currentOp == null ||
        state.operation == null ||
        state.operation == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        currentOp: evaluate(state),
        operation: null,
        previousOp: null,
      };
  }
};

const evaluate = (state: State) => {
  const curr = parseFloat(state.currentOp);
  const prev = parseFloat(state.previousOp);
  if (isNaN(prev) || isNaN(curr)) {
    return "";
  }
  let answer = "";
  switch (state.operation) {
    case "+":
      answer = (prev + curr).toString();
      break;
    case "-":
      answer = (prev - curr).toString();
      break;
    case "*":
      answer = (prev * curr).toString();
      break;
    case "÷":
      answer = (prev / curr).toString();
      break;

    default:
      break;
  }
  return answer;
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOp = (operand: string) => {
  if (operand == null) return;

  const [int, dec] = operand.split(".");

  if (dec == null) return INTEGER_FORMATTER.format(parseFloat(int));
  return `${INTEGER_FORMATTER.format(parseFloat(int))}.${parseFloat(dec)}`;
};
type Reducer<stateType,actionType> = (prevState:stateType, action:actionType) => stateType;
const Calculatour = () => {
  const [state, dispatch] = useReducer< reducer extends Reducer<stateType,actionType>(reducer,initialState);

  return (
    <div className="container mt-5 w-50 h-100">
      <div className="row output g-4 h-auto d-flex flex-column p-2">
        <div className="previous-operand">
          {formatOp(state.previousOp)} {state.operation}
        </div>
        <div className="current-operand">{formatOp(state.currentOp)}</div>
      </div>
      <div className="row  ">
        <button
          className="col-6 p-3 opp"
          onClick={() => dispatch({ type: "clear"})}
        >
          AC
        </button>
        <button
          className="col-3 p-3 opp"
          onClick={() => dispatch({ type: "delete-digit"})}
        >
          Del
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button
          className="col-6 p-3 opp"
          onClick={() => dispatch({ type: "evaluate" })}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculatour;
