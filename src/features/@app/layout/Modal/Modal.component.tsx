import React from "react";
import "./Modal.styles.css";
import { createPortal } from "react-dom";

// @ts-ignore
const Modal = ({ children, closeModal }) => {
  const domEl = document.getElementById("modal");

  return createPortal(
    <div className='Modal'>
      <div className='modal-content'>
        {children}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>,
    // @ts-ignore
    domEl
  );
};

export default Modal;
