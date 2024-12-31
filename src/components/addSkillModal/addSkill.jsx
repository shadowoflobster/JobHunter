import React, { useState } from "react";
import "./addSkill.css";
import ReactDOM from "react-dom";

const AddSkill = ({ open, onClose, userSkills, updatedUser, setUpdatedUser, onConfirm }) => {
  //Holds inserted skill data while modal is open
  const [skillData, setSkillData] = useState({
    skillName: "",
    percentage: 0,
    color: "#FFFFFF",
    level:"Novice"
  });

  const [skillLevel, setSkillLevel] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillData({
      ...skillData,
      [name]: value,
    });
    if (name === "percentage") {
      handleLevelChange(value);
    }
  };
  const handleLevelChange = (value) => {
    const level =
      value <= 20
        ? "Novice"
        : value <= 40
        ? "Beginner"
        : value <= 60
        ? "Intermediate"
        : value <= 80
        ? "Proficient"
        : value < 100
        ? "Advanced"
        : "Expert";
        setSkillData((prevSkillData)=>({
          ...prevSkillData,
          level:level,
        }));
  };

  const handleSubmit =()=>{
    const newSkill={
        ...skillData,
    }
    setUpdatedUser((prevUser) => {
      const updatedSkills = [...(Array.isArray(prevUser.skills) ? prevUser.skills : []), newSkill];
      onConfirm(updatedSkills);
      return{
        ...prevUser,
        skills: [...(Array.isArray(prevUser.skills) ? prevUser.skills : []), newSkill],
      }
    });
    onClose();
  }

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="add-skill-modal-overlay">
      <div className="add-skill-modal">
        <button className="close-modal-btn" onClick={() => onClose()}>
          X
        </button>
        <form className="modal-form">
          <div className="modal-form-group">
            <label>Add skill</label>
            <input
              type="text"
              value={skillData.skillName}
              id="skillName"
              name="skillName"
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-form-group">
            <label>Choose skill level: {skillLevel}</label>
            <input
              type="range"
              value={skillData.percentage}
              id="percentage"
              name="percentage"
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-form-group">
            <label>Color</label>
            <input 
            type="color"
            name="color"
            id="color" 
            value={skillData.color}  
            onChange={handleChange}
              />
          </div>
          
        </form>
        <button
          className="close-modal-btn"
          onClick={handleSubmit}
        >
          X
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AddSkill;
