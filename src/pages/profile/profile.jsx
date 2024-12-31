import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState(null);
  const [authorization, setAuthorization] = useState(false);
  const [role, setRole] = useState();
  const [editableField, setEditableField] = useState(null);
  const [modalOn, setModalOn] = useState(false);
  const navigate = useNavigate();
  const parsedSkills =
    user && user.skills
      ? typeof user.skills === "string"
        ? JSON.parse(user.skills)
        : user.skills
      : [];
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  
  const toggleEdit = (name) => {
    setEditableField((prevField) => (prevField === name ? null : name));
  };
  useEffect(() => {
    if (token) {
      setAuthorization(true);
      setRole(token.user_role);

      fetch("http://localhost/api/profile.php", {
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
          }
        })
        .catch((error) => {
          setError("Error fetching user data");
          console.error("Error:", error);
        });
    } else {
      setError("No token found");
    }

    // Log the object
  }, [parsedSkills]);
  const handleConfirm = (fieldName, updatedSkills = null) => {
    const updatedData  = updatedSkills
    ?{
      skills: [...(Array.isArray(user.skills) ? user.skills : []), ...updatedSkills],
    }
    :{[fieldName]:updatedUser[fieldName]};


    fetch("http://localhost/api/updateProfile.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser((prev) => ({
            ...prev,
            skills: updatedSkills ? [...prev.skills, ...updatedSkills] : prev.skills,
          }));
        }
      });
    setEditableField(null);
  };

  return (
    <div className="profile-page">
      <Header role={role} authorizationStatus={authorization}></Header>

      {authorization && (
        <>
          <div className="profile-content">
            <div className="profile-image-div">
              <img className="profile-image"></img>
            </div>
            <div className="details-div">
              <div className="details-left">
                <div className="name-position-div">
                  <span className="details-name">
                    {user?.name || ""} {user?.surname || ""}
                  </span>

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
              <div className="details-right">
                <div className="details-right-email-div">
                  <img src={emailIcon} />
                  <span className="details-right-email-span">
                    {user?.email || ""}
                  </span>
                </div>
                
              </div>
            </div>

            <div className="skills-div">
              <div className="skills-header-group">
                <h1 className="skills-header">My Skills</h1>
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
                  onConfirm={(updatedSkills) => handleConfirm("skills", updatedSkills)}
                ></AddSkillModal>
              </div>
              <div className="skills-container">
                {parsedSkills ? (
                  Object.keys(parsedSkills).map((skill) => {
                    const { skillName, percentage, color,level } =
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
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
