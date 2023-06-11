import React from "react";

export default function Paintbar({ setLineColor }) {
  const handleColorChange = (e) => {
    setLineColor(e.target.value);
  };

  return (
    <div className="paintbar">
      <label>Color</label>
      <input type="color" onChange={handleColorChange} />
    </div>
  );
}
