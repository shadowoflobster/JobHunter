import React, { useEffect, useRef } from "react";
import "./skill.css";

const Skill = ({ name, percentage, color,level }) => {
  const skillBar = useRef(null);

  useEffect(() => {
    if (skillBar.current) {
      const dashoffset = 377 - (377 * percentage) / 100;
      const strokeColor = color;
      skillBar.current.style.strokeDashoffset = dashoffset;
      skillBar.current.style.stroke=strokeColor

    }
  }, [percentage]);

  return (
    <div className="skill-outer-circle">
      <div className="skill-inner-circle">
        <span>{name}</span>
      <span>{level}</span>
      </div>
      <svg className="skill-circle-svg">
        <circle cx="60" cy="60" r="60"></circle>
        <circle
          className="skill-bar-circle"
          ref={skillBar}
          cx="60"
          cy="60"
          r="60"
        ></circle>
      </svg>
    </div>
  );
};

export default Skill;
