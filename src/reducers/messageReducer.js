import * as types from "../types";

export default (state = "", { type }) => {
  switch (type) {
    case types.SET_MESSAGE:
      return "The email was succesfully validated.";
    case types.RESET_MESSAGE:
      return "";
    default:
      return state;
  }
};
