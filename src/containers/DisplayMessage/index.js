import React from "react";
import { connect } from "react-redux";
import "./styles.css";

const DisplayMessage = ({ message }) =>
  message ? <div className="message-container">{message}</div> : null;

export default connect(state => ({ message: state.message }))(DisplayMessage);
