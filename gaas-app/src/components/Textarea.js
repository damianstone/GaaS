import React, { useState } from "react";
import "./Textarea.css";

function Textarea(props) {
  const [value, setValue] = useState(props.defaultValue || "");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <textarea
      className="Textarea"
      value={value}
      onChange={handleChange}
      placeholder={props.placeholder}
    />
  );
}

export default Textarea;