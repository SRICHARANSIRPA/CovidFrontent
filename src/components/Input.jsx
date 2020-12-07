import React from "react";
import "../CSS_FILES/Input.css";
function Input({ label, type, value, onChange, min }) {
  return (
    <div className="input_container">
      <label className="label" htmlFor={label}>
        {label} :
      </label>
      {type !== "number" ? (
        <div className="input">
          <input
            value={value}
            id={label}
            name={label}
            onChange={onChange}
            type={type}
          />
        </div>
      ) : (
        <div className="input">
          <input
            value={value}
            id={label}
            name={label}
            onChange={onChange}
            type={type}
            min={min}
          />
        </div>
      )}
    </div>
  );
}

export default Input;
