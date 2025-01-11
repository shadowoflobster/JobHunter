import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


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
  const [image, setImage]= useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [authorization, setAuthorization] = useState(false);
  const [role, setRole] = useState();
  const [editableField, setEditableField] = useState(null);
  const [modalOn, setModalOn] = useState(false);
  const [imageError, setImageError]=useState('');
  const [profileHovered, setProfileHovered] = useState(false);
  const imageInputRef=useRef(null);
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
  };
  const handleMouseEnter = () => {
    setProfileHovered(true);
    console.log("in")
  };
  const handleMouseLeave = () => {
    setProfileHovered(false);
    console.log("out")
  };
  const handleImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };


  const handleImageChange=(e)=>{
    const file = e.target.files[0];
    if(file){
      const validFileTypes = ['image/jpeg', 'image/png']
      
      if(validFileTypes.includes(file.type)){
        setImageError('');
        setImage(file);
      }else{
        setImageError("Please choose valid image format(.jpg, .png)")
        
      }
    }
  }
  
  useEffect(()=>{
    if(image){
      handleImageUpload();
    }
  },[image])  

  const handleImageUpload = async () => {
  if(!image) return alert('Please select an image');

  const formData = new FormData();
  formData.append('file',image);
  formData.append('public_id',"userId"+decoded.user_id)
 

  try {
    const response = await fetch('http://localhost/api/uploadImage.php', {
      method: 'POST',
      body: formData
    });

    
    if (response.ok) {
      const data = await response.json();
      console.log('Upload successful:', data);
      const uploadedImageUrl = data.secure_url;
      const imageUrlWithCacheBusting = uploadedImageUrl + '?v=' + Date.now(); 
      console.log('Image URL (with cache busting):', imageUrlWithCacheBusting);
    }   else {
      console.error('Upload failed with status:', response.status);
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
  };

  const url = "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/user_uploads/userId"+decoded.user_id+".jpg";
  const timestamp = new Date().getTime(); 
  useEffect(()=>{
    setImageUrl(`${url}?t=${timestamp}`);
  },)

  return (
    <div className="profile-page">
      <Header role={role} authorizationStatus={authorization}></Header>

      {authorization && (
        <>
          <div className="profile-content">
            <div className="profile-image-div">
              <div className="profile-image-wrapper">
              <img
                className="profile-image"
                src={'https://res.cloudinary.com/dhse9bpvs/image/upload/v1736604621/userId'+decoded.user_id+'.jpg' || "default_image_url"}
                alt="Profile"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              {profileHovered ? (<div 
              className="profile-image-input-cover"
              onClick={handleImageClick}
              onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
              </div>) : null}
              
              


              <input
                ref={imageInputRef}
                type="file"
                className="profile-image-input"
                onChange={handleImageChange}
                style={{display:'none'}}
              />
              {editableField === "image" && (
                <>
                  <button onClick={() => handleConfirm("profile_image")}>
                    Confirm
                  </button>
                  <button onClick={() => setEditableField(null)}>Cancel</button>
                </>
              )}
      </div>
      {imageError && <p style={{ color: 'red', fontSize:"12px" }}>{imageError}</p>}

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
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
