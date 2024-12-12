import React, { useEffect, useState, useRef } from "react";
import "./uploadJob.css";

function UploadJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: [],
    salary: "",
    minSalary: "",
    maxSalary: "",
    currency: "",
    location: "",
  });
  const [salaryType, setSalaryType] = useState({
    fixed: true,
  });
  const [currentRequirement, setCurrentRequirement] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Function to add requirement from input field
  const addRequirements = () => {
    const newRequirement = currentRequirement.trim();
    if (newRequirement) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement],
      });
    }
    setCurrentRequirement("");
  };
  //Function to remove reuirements
  const removeRequirements = (i) => {
    const updatedRequirement = formData.requirements.filter(
      (_, index) => index !== i
    );
    setFormData({
      ...formData,
      requirements: updatedRequirement,
    });
  };
  const handleRequirementChange = (e) => {
    setCurrentRequirement(e.target.value);
  };

  const innerBallRef = useRef(null);
  const handleSalaryTypeChange = (e) => {
    const position = innerBallRef.current.style;
    if (salaryType.fixed == true) {
      position.left = "50%";
      setSalaryType({
        fixed: false,
      });
    } else {
      position.left = "0%";
      setSalaryType({
        fixed: true,
      });
    }
  };

  const logValue=()=>{
    console.log("salary:"+formData.salary);
    console.log("minsalary:"+formData.minSalary);
    console.log("maxsalary:"+formData.maxSalary);

  }
  const handleSubmit = () => {};

  return (
    <div className="UploadJobDiv">
      <form onSubmit={handleSubmit}>
        <div className="group">
          <label htmlFor="job-title">Add job title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            placeholder="Enter job title"
          />
        </div>
        <div className="group">
          <label htmlFor="job-title">Add job description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter job description"
          />
        </div>
        <div className="group">
          <label htmlFor="job-title">Add job requirements</label>
          <input
            type="text"
            id="requirements"
            name="requirements"
            onChange={handleRequirementChange}
            value={currentRequirement}
            required
            placeholder="Enter job requirements"
          />
          <button className="add-requirements" onClick={addRequirements}>
            Add
          </button>
          <ul>
            {formData.requirements.map((req, i) => (
              <li key={i}>
                {req}{" "}
                <button
                  className="remove-requirement"
                  onClick={() => removeRequirements(i)}
                >
                  REMOVE
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="group">
          <div className="changeSalaryTypeDiv">
            <label className="changeSalaryTypeLabel" htmlFor="changeSalaryType">
              Fixed
            </label>
            <div className="changeSalaryType" onClick={handleSalaryTypeChange}>
              <div
                ref={innerBallRef}
                className="changeSalaryTypeInnerBall"
              ></div>
            </div>
            <label className="changeSalaryTypeLabel" htmlFor="changeSalaryType">
              Range
            </label>
          </div>
          {salaryType.fixed ? (
            <div className="fixedSalaryGroup">
              <label htmlFor="job-title">Add job fixed salary</label>
              <input
                type="text"
                id="salaryFixed"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                placeholder="Enter job salary"
              />
            </div>
          ) : (
            <div className="RangeSalaryGroup">
              <label htmlFor="job-title">Add job Minimum salary</label>
              <input
                type="text"
                id="salaryRangeMin"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleChange}
                required
                placeholder="Enter job minimum salary"
              />
              <label htmlFor="job-title">Add job Maximum salary</label>
              <input
                type="text"
                id="salaryRangeMax"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleChange}
                required
                placeholder="Enter job maximum salary"
              />
            </div>
          )}
          <div className="group">
            <select 
            className="currencySelector"
            name="currency"
            value={formData.currency} 
            onChange={handleChange}
            >
                <option value="" disabled>Select currency</option>
                <option>₾</option>
                <option>$</option>
                <option>€</option>
            </select>
            <button onClick={logValue}>asd</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadJob;
