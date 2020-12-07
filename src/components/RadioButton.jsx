import React from "react";
import "../CSS_FILES/RadioButton.css";
function RadioButton({ handleChange, label }) {
  return (
    <div>
      <label className="radio">
        <input
          onChange={(e) => handleChange(e.target.value)}
          type="radio"
          id="Covid"
          name="Covid"
          value={label}
        />
        {" " + label}
      </label>
    </div>
  );
}

export default RadioButton;
