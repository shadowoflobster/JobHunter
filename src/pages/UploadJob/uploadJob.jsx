import React, { useEffect, useState, useRef } from "react";
import "./uploadJob.css";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/Header/header";

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
    jobCategory: "",
  });
  const [salaryType, setSalaryType] = useState({
    fixed: true,
  });
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [authorization, setAuthorization] = useState(false);
  const jobCategories = [
    "IT",
    "Engineering",
    "Medical",
    "Education",
    "Finance",
    "Sales",
    "Construction",
    "Hospitality",
    "Logistics",
    "Legal",
    "Customer Service",
    "Skilled Trades",
    "Marketing",
    "Human Resources",
    "Creative",
    "Media",
    "Transportation",
    "Agriculture",
    "Manufacturing",
    "Real Estate",
    "Telecommunications",
    "Energy",
    "Pharmaceuticals",
    "Research & Development",
    "Public Sector",
    "Defense",
    "Aerospace",
    "Retail",
    "Food Services",
    "Entertainment",
    "Sports",
    "Nonprofit",
    "Consulting",
    "Freelance",
    "Remote Work",
    "Internship",
    "Administration",
    "Healthcare",
    "Tourism",
    "Beauty & Wellness",
  ];
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
  //Function to change salary type between fixed and range
  const handleSalaryTypeChange = (e) => {
    const position = innerBallRef.current.style;
    if (salaryType.fixed === true) {
      position.left = "50%";
      setFormData({
        ...formData, //while changing to range, fixed salary gets emptied,
        salary: "",
      });
      setSalaryType({
        fixed: false,
      });
    } else {
      position.left = "0%";
      setFormData({
        ...formData, //while changing to fixed, range salary gets emptied,
        minSalary: "",
        maxSalary: "",
      });
      setSalaryType({
        fixed: true,
      });
    }
  };
  const token = localStorage.getItem("token");
  let companyId;
  useEffect(() => {
    if (token) {
      setAuthorization(true);
      const decoded = jwtDecode(token); // Decode the JWT
      companyId = decoded.user_id; // Assuming company_id is in the token payload
    }
  });

  const handleSubmit = (e) => {
    const data = {
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements,
      salary: formData.salary,
      minSalary: formData.minSalary,
      maxSalary: formData.maxSalary,
      currency: formData.currency,
      location: formData.location,
      company_id: companyId,
      category: formData.jobCategory,
    };
    console.log(data);
 

    fetch("http://localhost/api/uploadJob.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.text(); // Get raw text first
      })
      .then((data) => {
        console.log(data); // Log the raw response
        try {
          const jsonResponse = JSON.parse(data); // Parse JSON if valid
          console.log(jsonResponse);
        } catch (e) {
          console.error("Invalid JSON:", data); // Handle invalid JSON
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="UploadJobDiv">
      <Header
        role="company"
        authorizationStatus={authorization ? true : false}
      ></Header>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <label htmlFor="job-title">Add job title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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
              required
            >
              <option value="" disabled>
                Select currency
              </option>
              <option>₾</option>
              <option>$</option>
              <option>€</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="jobCategory"></label>
            <select
              className="job-category-selector"
              id="jobCategory"
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select job Category
              </option>
               {jobCategories.map((job,index)=>
              <option key={index}>{job}</option>
              )} 
            </select>
          </div>
          <div className="group">
            <label htmlFor="location">Add job location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter job location"
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UploadJob;
