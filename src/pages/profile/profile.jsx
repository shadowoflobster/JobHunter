import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./profile.css";
import { jwtDecode } from "jwt-decode";
import Header from "../../components/Header/header";
import pencilIcon from "../../SVGs/editPencil.svg";
import emailIcon from "../../SVGs/mail-pencil-svgrepo-com.svg";
import Skill from "../../components/SkillsComponent/skill";
import AddSkillModal from "../../components/addSkillModal/addSkill";

function Profile() {
  //User saves users data from server
  const [user, setUser] = useState({ skills: [] });
  const [updatedUser, setUpdatedUser] = useState({});
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [authorization, setAuthorization] = useState(false);
  const [role, setRole] = useState();
  const [editableField, setEditableField] = useState(null);
  const [modalOn, setModalOn] = useState(false);
  const [imageError, setImageError] = useState("");
  const [profileHovered, setProfileHovered] = useState(false);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  

  const parsedSkills =
    user && user.skills
      ? typeof user.skills === "string"
        ? JSON.parse(user.skills)
        : user.skills
      : [];

      

  const toggleEdit = (name) => {
    setEditableField((prevField) => (prevField === name ? null : name));
  };

  useEffect(() => {
    if (token) {
      setAuthorization(true);
      setRole(token.user_role);

      fetch("http://192.168.100.3/api/profile.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setUser(data.user);
            console.log(user.name);
          }
        })
        .catch((error) => {
          setError("Error fetching user data");
          // console.error("Error:", error);
        });
    } else {
      setError("No token found");
    }
  }, [token]);

  const handleConfirm = (fieldName, updatedSkills = null) => {
    const mergedSkills = updatedSkills
      ? [
          ...parsedSkills.filter(
            (existingSkill) =>
              !updatedSkills.some(
                (newSkill) => newSkill.skillName === existingSkill.skillName
              )
          ),
          ...updatedSkills,
        ]
      : parsedSkills;

    const updatedData = updatedSkills
      ? { skills: mergedSkills }
      : { [fieldName]: updatedUser[fieldName] };

    console.log("Merged Skills:", mergedSkills);
    console.log("Parsed Skills:", parsedSkills);
    console.log("Updated Skills:", updatedSkills);

    fetch("http://192.168.100.3/api/updateProfile.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);
        if (data.success) {
          setUser((prev) => ({
            ...prev,
            skills: updatedSkills
              ? [...parsedSkills, ...updatedSkills]
              : prev.skills,
          }));
        }
      });
    setEditableField(null);
    window.location.reload();

  };
  const handleMouseEnter = () => {
    setProfileHovered(true);
    console.log("in");
  };
  const handleMouseLeave = () => {
    setProfileHovered(false);
    console.log("out");
  };
  console.log(user.name);
  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFileTypes = ["image/jpeg", "image/png"];

      if (validFileTypes.includes(file.type)) {
        setImageError("");
        setImage(file);
      } else {
        setImageError("Please choose valid image format(.jpg, .png)");
      }
    }
  };

  useEffect(() => {
    if (image) {
      handleImageUpload();
    }
  }, [image]);

  const handleImageUpload = async () => {
    if (!image) return alert("Please select an image");
    if (token) {
      setAuthorization(true);
      const formData = new FormData();
      formData.append("file", image);
      console.log(decoded.user_id + " IS user id");
      formData.append("public_id", "userId" + decoded.user_id);

      try {
        const response = await fetch("http://192.168.100.3/api/uploadImage.php", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Upload successful:", data);
          const uploadedImageUrl = data.secure_url;
          const imageUrlWithCacheBusting =
            uploadedImageUrl + "?v=" + Date.now();
          console.log(
            "Image URL (with cache busting):",
            imageUrlWithCacheBusting
          );
        } else {
          console.error("Upload failed with status:", response.status);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };
  console.log(user);
  return (
    <div className="profile-page d-flex flex-column align-items-center">
      <Header role={role} authorizationStatus={authorization}></Header>

      {authorization && (
        <>
          <div className="profile-content mt-1 row g-1" style={{width:"80%"}}>
            <div className="profile-image-div col-12 col-md-5">
              <div className="profile-image-wrapper">
                <img
                  className="profile-image"
                  src={user?.profile_image || "default_image_url"}
                  alt="Profile"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
                {profileHovered ? (
                  <div
                    className="profile-image-input-cover"
                    onClick={handleImageClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  ></div>
                ) : null}

                <input
                  ref={imageInputRef}
                  type="file"
                  className="profile-image-input"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {editableField === "image" && (
                  <>
                    <button onClick={() => handleConfirm("profile_image")}>
                      Confirm
                    </button>
                    <button onClick={() => setEditableField(null)}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
              {imageError && (
                <p style={{ color: "red", fontSize: "12px" }}>{imageError}</p>
              )}
            </div>
            <div className="details-div col-12 col-md-7 p-3 rounded-3" style={{backgroundColor:"#974ec3"}}>
              <div className="row">
                <div className="col-12">
                  <div className="row justify-content-between ">
                    <div className="col-6 d-flex justify-content-between row">
                    <span className="details-name col-12 text-break text-white">
                    {user?.name || ""} {user?.surname || ""}
                  </span>
                  {decoded?.user_role == "user" ? (
                    <div className="user-position-editable-div ">
                      {editableField === "position" ? (
                        <div className="edit-details-position">
                          <input
                            className="edit-input position"
                            type="text"
                            value={updatedUser?.position || ""}
                            onChange={(e) =>
                              setUpdatedUser((prev) => ({
                                ...prev,
                                position: e.target.value,
                              }))
                            }
                            placeholder="enter your position"
                          ></input>
                          <button
                            className="cancel-button position"
                            onClick={() => setEditableField(null)}
                          >
                            cancel
                          </button>
                          <button
                            className="confirm-button position"
                            onClick={() => handleConfirm("position")}
                          >
                            confirm
                          </button>
                        </div>
                      ) : (
                        <div className="edit-group col-12 d-flex ">
                          <span className="details-position text-break col-12 ">
                            {user?.position || "Add Position"}{" "}
                            
                          </span>
                          <img
                            className="edit-pencil-icon"
                            src={pencilIcon}
                            alt="Edit your position"
                            onClick={() => toggleEdit("position")}
                          />
                        </div>
                      )}
                    </div>
                  ) : null}
                    </div>
                    <div className="col-1"></div>
                  </div>
                  <div className="address-link-div">
                  {editableField === "address" ? (
                    <div className="edit-details-address">
                      <input
                        className="edit-input address"
                        type="text"
                        value={updatedUser?.address || ""}
                        onChange={(e) =>
                          setUpdatedUser((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Enter your address"
                      ></input>
                      <button
                        className="cancel-button address"
                        onClick={() => setEditableField(null)}
                      >
                        cancel
                      </button>
                      <button
                        className="confirm-button address"
                        onClick={() => handleConfirm("address")}
                      >
                        confirm
                      </button>
                    </div>
                  ) : (
                    <div className="edit-group address">
                      <span className="profile-address">
                        {user?.address || ""}
                        <img
                        className="edit-pencil-icon"
                        src={pencilIcon}
                        alt="Edit your address"
                        onClick={() => toggleEdit("address")}
                      />
                      </span>
                      
                    </div>
                  )}

                  
                </div>
                <a className="profile-link-div" href="#">
                    {user?.website || ""}
                  </a>
                <div className="profile-aboutMe-div">
                  {editableField === "about_me" ? (
                    <div className="about_me-div">
                      <input
                        className="input-details about_me"
                        type="text"
                        value={updatedUser?.about_me || ""}
                        onChange={(e) =>
                          setUpdatedUser((prev) => ({
                            ...prev,
                            about_me: e.target.value,
                          }))
                        }
                      ></input>
                      <button
                        className="cancel-button about_me"
                        onClick={() => setEditableField(null)}
                      >
                        cancel
                      </button>
                      <button
                        className="confirm-button about_me"
                        onClick={() => handleConfirm("about_me")}
                      >
                        confirm
                      </button>
                    </div>
                  ) : (
                    <div className="edit-group">
                      <span className="profile-address-div">
                        {user?.about_me || ""}
                      </span>
                      <img
                        className="edit-pencil-icon"
                        src={pencilIcon}
                        alt="Edit your Information"
                        onClick={() => toggleEdit("about_me")}
                      />
                    </div>
                  )}
                </div>
                </div>
                <div className="col-12"></div>
              </div>
            </div>
            {/* <div className="details-div col-12 col-md-7 row bg-white p-3">
              <div className="details-left col-6 row">
                <div className="name-position-div ">
                  <span className="details-name">
                    {user?.name || ""} {user?.surname || ""}
                  </span>
                  {decoded?.user_role == "user" ? (
                    <div className="user-position-editable-div">
                      {editableField === "position" ? (
                        <div className="edit-details-position">
                          <input
                            className="edit-input position"
                            type="text"
                            value={updatedUser?.position || ""}
                            onChange={(e) =>
                              setUpdatedUser((prev) => ({
                                ...prev,
                                position: e.target.value,
                              }))
                            }
                            placeholder="enter your position"
                          ></input>
                          <button
                            className="cancel-button position"
                            onClick={() => setEditableField(null)}
                          >
                            cancel
                          </button>
                          <button
                            className="confirm-button position"
                            onClick={() => handleConfirm("position")}
                          >
                            confirm
                          </button>
                        </div>
                      ) : (
                        <div className="edit-group">
                          <span className="details-position">
                            {user?.position || "Add Position"}{" "}
                          </span>
                          <img
                            className="edit-pencil-icon"
                            src={pencilIcon}
                            alt="Edit your position"
                            onClick={() => toggleEdit("position")}
                          />
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                <div className="address-link-div">
                  {editableField === "address" ? (
                    <div className="edit-details-address">
                      <input
                        className="edit-input address"
                        type="text"
                        value={updatedUser?.address || ""}
                        onChange={(e) =>
                          setUpdatedUser((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="Enter your address"
                      ></input>
                      <button
                        className="cancel-button address"
                        onClick={() => setEditableField(null)}
                      >
                        cancel
                      </button>
                      <button
                        className="confirm-button address"
                        onClick={() => handleConfirm("address")}
                      >
                        confirm
                      </button>
                    </div>
                  ) : (
                    <div className="edit-group address">
                      <span className="profile-address">
                        {user?.address || ""}
                      </span>
                      <img
                        className="edit-pencil-icon"
                        src={pencilIcon}
                        alt="Edit your address"
                        onClick={() => toggleEdit("address")}
                      />
                    </div>
                  )}

                  <a className="profile-link-div" href="#">
                    {user?.website || ""}
                  </a>
                </div>
                <div className="profile-aboutMe-div">
                  {editableField === "about_me" ? (
                    <div className="about_me-div">
                      <input
                        className="input-details about_me"
                        type="text"
                        value={updatedUser?.about_me || ""}
                        onChange={(e) =>
                          setUpdatedUser((prev) => ({
                            ...prev,
                            about_me: e.target.value,
                          }))
                        }
                      ></input>
                      <button
                        className="cancel-button about_me"
                        onClick={() => setEditableField(null)}
                      >
                        cancel
                      </button>
                      <button
                        className="confirm-button about_me"
                        onClick={() => handleConfirm("about_me")}
                      >
                        confirm
                      </button>
                    </div>
                  ) : (
                    <div className="edit-group">
                      <span className="profile-address-div">
                        {user?.about_me || ""}
                      </span>
                      <img
                        className="edit-pencil-icon"
                        src={pencilIcon}
                        alt="Edit your Information"
                        onClick={() => toggleEdit("about_me")}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="details-right col-6 row ">
                <div className="details-right-email-div m-0 p-0">
                  <img src={emailIcon} />
                  <span className="details-right-email-span">
                    {user?.email || ""}
                  </span>
                </div>
              </div>
            </div> */}
            {decoded?.user_role === "user" ? (
              <div className="skills-div p-3 rounded-3" style={{backgroundColor:"#974ec3"}}>
                <div className="skills-header-group">
                  <h1 className="skills-jobs-header">My Skills</h1>
                  <button
                    className="add-skill-button"
                    onClick={() => setModalOn(true)}
                  >
                    Add skill
                  </button>
                  <AddSkillModal
                    open={modalOn}
                    onClose={() => setModalOn(false)}
                    userSkills={Array.isArray(user.skills) ? user.skills : []}
                    updatedUser={updatedUser}
                    setUpdatedUser={setUpdatedUser}
                    onConfirm={(updatedSkills) =>
                      handleConfirm("skills", updatedSkills)
                    }
                  ></AddSkillModal>
                </div>
                <div className="skills-container">
                  {parsedSkills ? (
                    Object.keys(parsedSkills).map((skill) => {
                      const { skillName, percentage, color, level } =
                        parsedSkills[skill];
                      return (
                        <Skill
                          className="skill-component"
                          key={skill}
                          name={skillName}
                          percentage={percentage}
                          color={color}
                          level={level}
                        />
                      );
                    })
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            ) : decoded?.user_role === "company" ? (
              <div className="company-profile-jobs-div p-3">  
        <button className="upload-job-btn col-2" onClick={()=>navigate('/upload-job')}>Upload job</button>
                <h1 className="skills-jobs-header">
                  Jobs posted by {user?.name}
                </h1>
                <div className="company-profile-jobs-listing  row">
                  {user?.job_listings?.length > 0 ? (
                    user.job_listings.map((job) => (
                      <div className="company-profile-job d-flex p-1  align-items-center justify-content-center col-12 col-sm-6 col-md-3"
                       style={{height:"5rem"}} key={job.id}>
                        <div className="company-profile-job-content p-1 d-flex flex-column rounded bg-white w-100 h-100">
                        <span className="company-profile-job-title">{job.title}</span>
                        <span className="company-profile-job-category">{job.category}</span>
                        </div>

                      </div>
                    ))
                  ) : (
                    <p>No job listings available</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
