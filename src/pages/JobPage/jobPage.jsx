import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./JobPage.css";

function JobPage() {
  const location = useLocation();
  const [job, setJob] = useState(null);
  const [error, setError] = useState([]);
  const { jobId } = location.state || {};
  const [authorization, setAuthorization] = useState(false);
  const [role, setRole]=useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthorization(true);
      const decoded = jwtDecode(token);
      setRole(decoded.user_role);
    }
    if (!jobId) {
      setError("Error occuered, please return to home page");
      return;
    }
    fetch(`http://${process.env.REACT_APP_API_IP}/backend/api/getJob.php?jobId=${jobId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.job) {
          setJob(data.job);
        } else {
          setError(data.error || "Job not found.");
        }
      })
      .catch(() => {
        setError("Failed to Fetch data");
      });
  }, [jobId]);

  if (error) {
    console.log(error);
  }
  if (job) {
    console.log("job: " + job.requirements);
  }

  return (
    <div className="job-page">
      <Header authorizationStatus={authorization}></Header>
      <div className="job-page-wrapper">
        <div className="job-page-header-containter">
          <div className="job-page-wrapper-header">
            <div className="job-page-header-left">
              <div className="job-page-title-category-wrapper">
                <h1 className="job-page-title">{job?.title || ""}</h1>
                <span className="job-page-category">{job?.category || ""}</span>
              </div>
              <span className="job-page-salary">
                {job?.salary ||
                  (job?.minSalary || "?") + "-" + (job?.maxSalary || "?")}
                {job?.currency}
              </span>
            </div>
            <div className="job-page-header-right"></div>
          </div>
        </div>
        <div className="job-page-content">
          <div className="job-page-description">{job?.description}</div>
          <div className="job-page-requirements">
            Requirements:
            <ul>
              {job?.requirements
                ? JSON.parse(job.requirements).map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
