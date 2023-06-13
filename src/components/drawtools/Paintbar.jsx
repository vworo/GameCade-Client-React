import React from "react";
import '../drawtools/Paintbar.css'

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
