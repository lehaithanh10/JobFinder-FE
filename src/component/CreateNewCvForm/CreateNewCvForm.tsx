import {
  Form,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Row,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  EducationDto,
  SkillDto,
  WorkingExperienceDto,
} from "../../api/employee";
import * as _ from "lodash";
import template1 from "../../img/cvTemplatePreview/template1.png";
import { ECvTemplate } from "../../enum-types";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import "./CreateNewCvForm.scss";
import { EResource } from "../../pages/Employee/NewProfile/NewProfile";
import { IUserInfo } from "../../types/user";
import { RootState } from "../../redux/reduxStore";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IEmployeeInfo } from "../../types/employee";
import CvTemplate1 from "../../pages/Cv-template/Cv-template-1/CvTemplate1";
import { uploadFile } from "../../api/uploadFile";
import { uploadResume } from "../../api/resume";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import { notify } from "../../helpers/notify";
import { EResumeMethod } from "../../types/resume";
import Swal from "sweetalert2";
import { convertHtmlElementToPdfFile } from "../../util/convertHtmlElementToPdfFile";

export interface IUserInfoForm {
  name?: string;
  gender?: string;
  profession?: string;
  location?: string;
  mobilePhone?: string;
  email?: string;
  profileDescription?: string;
  facebookLink?: string;
  linkedInLink?: string;
  gitHubLink?: string;
  education?: EducationDto[];
  skill?: SkillDto[];
  workingExperience?: WorkingExperienceDto[];
  skillDescription?: string;
}

const CreateNewCvForm = () => {
  const [userInfoForm, setUserInfoForm] = useState<IUserInfoForm>(
    {} as IUserInfoForm
  );

  const [userCVInfo, setUserCVInfo] = useState<IUserInfoForm>(
    {} as IUserInfoForm
  );

  const [cvTemplate, setCvTemplate] = useState<ECvTemplate>(
    ECvTemplate.TEMPLATE1
  );

  const [cvTitle, setCvTitle] = useState<string>("");

  const [showCVDemo, setShowCVDemo] = useState<boolean>(false);

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const employee: IEmployeeInfo | undefined = useSelector(
    (state: RootState) => state.employee.currentEmployee
  );

  const [userWorkingExperiences, setUserWorkingExperiences] = useState<
    WorkingExperienceDto[]
  >([
    {
      position: "",
      companyName: "",
      companyAddress: "",
      responsibility: "<p> Add your description here </p>",
      startingDate: "",
      endingDate: "",
    },
  ]);

  const [userWorkingExperiencesHover, setUserWorkingExperiencesHover] =
    useState<boolean[]>([false] as boolean[]);

  const [userEducations, setUserEducations] = useState<EducationDto[]>([
    {
      startingDate: "",
      endingDate: "",
      degree: "",
      studyField: "",
      schoolName: "",
      description: "<p> Add your description here </p>",
    },
  ] as EducationDto[]);

  const [userEducationsHover, setUserEducationsHover] = useState<boolean[]>([
    false,
  ] as boolean[]);

  const [userSkills, setUserSkills] = useState<SkillDto[]>([{}] as SkillDto[]);

  useEffect(() => {
    fetchEmployeeDetailInfo();
  }, [user]);

  const navigate = useNavigate();

  const fetchEmployeeDetailInfo = async () => {
    setUserInfoForm({
      name: employee?.name,
      gender: employee?.gender,
      profession: employee?.profession,
      location: employee?.location,
      mobilePhone: employee?.mobilePhone,
      email: employee?.email,
      profileDescription: employee?.profileDescription,
      facebookLink: employee?.facebookLink,
      linkedInLink: employee?.linkedInLink,
      gitHubLink: employee?.gitHubLink,
    });
  };

  const handleChangeInfoForm = (e: any) => {
    setUserInfoForm({
      ...userInfoForm,
      [e.target.name]: e.target.value,
    });
  };

  const addUserWorkingExperience = () => {
    setUserWorkingExperiences(
      userWorkingExperiences.concat({
        position: "",
        companyName: "",
        companyAddress: "",
        responsibility: "<p> Add your description here </p>",
        startingDate: "",
        endingDate: "",
      })
    );
    setUserWorkingExperiencesHover(userWorkingExperiencesHover.concat(false));
  };

  const handleChangeUserWorkingExperience = (e: any, index: number) => {
    const updatedUserWorkingExperiences = [...userWorkingExperiences];
    updatedUserWorkingExperiences[index] = {
      ...updatedUserWorkingExperiences[index],
      [e.target.name]: e.target.value,
    };
    setUserWorkingExperiences(updatedUserWorkingExperiences);
  };

  const removeUserWorkingExperience = (index: number) => {
    const updatedUserWorkingExperiences = userWorkingExperiences;
    updatedUserWorkingExperiences.splice(index, 1);

    setUserWorkingExperiences(updatedUserWorkingExperiences);
    const updatedUserWorkingExperiencesHover = [...userWorkingExperiencesHover];
    updatedUserWorkingExperiencesHover.splice(index, 1);
    setUserWorkingExperiencesHover(updatedUserWorkingExperiencesHover);
  };

  const addUserEducation = () => {
    setUserEducations(
      userEducations.concat({
        startingDate: "",
        endingDate: "",
        degree: "",
        studyField: "",
        schoolName: "",
        description: "<p> Add your description here </p>",
      })
    );
    setUserEducationsHover(userEducationsHover.concat(false));
  };

  const handleChangeUserEducation = (e: any, index: number) => {
    const updatedUserEducations = [...userEducations];
    updatedUserEducations[index] = {
      ...updatedUserEducations[index],
      [e.target.name]: e.target.value,
    };
    setUserEducations(updatedUserEducations);
  };

  const removeUserEducation = (index: number) => {
    const updatedUserEducations = userEducations;
    updatedUserEducations.splice(index, 1);
    setUserEducations(updatedUserEducations);
    const updatedUserEducationsHover = [...userEducationsHover];
    updatedUserEducationsHover.splice(index, 1);
    setUserEducationsHover(updatedUserEducationsHover);
  };

  const addUserSkill = () => {
    setUserSkills(userSkills.concat({}));
  };

  const handleChangeUserSkill = (e: any, index: number) => {
    console.log(index, e.target.value);
    const updatedUserSkills = [...userSkills];
    updatedUserSkills[index] = {
      ...updatedUserSkills[index],
      [e.target.name]: e.target.value,
    };
    setUserSkills(updatedUserSkills);

    console.log(userSkills);
  };

  const removeUserSkill = (index: number) => {
    const updatedUserSkills = [...userSkills];
    updatedUserSkills.splice(index, 1);
    setUserSkills(updatedUserSkills);
  };

  const addProfileResource = (resourceType: EResource) => {
    if (resourceType === EResource.WORKING_EXPERIENCE) {
      const updatedUserWorkingExperiences = userWorkingExperiences.concat(
        employee!.workingExperience!
      );

      setUserWorkingExperiences(updatedUserWorkingExperiences);
      setUserWorkingExperiencesHover([
        ...userWorkingExperiencesHover,
        ...(!_.isEmpty(employee?.workingExperience)
          ? employee?.workingExperience!.map(() => false)!
          : []),
      ]);
    } else if (resourceType === EResource.EDUCATION) {
      const updatedUserEducations = userEducations.concat(employee!.education!);
      setUserEducations(updatedUserEducations);
      setUserEducationsHover([
        ...userEducationsHover,
        ...(!_.isEmpty(employee?.education)
          ? employee?.education!.map(() => false)!
          : []),
      ]);
    } else {
      setUserSkills(userSkills.concat(employee!.skill!));
    }
  };

  const handleMouseEnterUserResource = (
    index: number,
    resourceType?: EResource
  ) => {
    if (resourceType === EResource.WORKING_EXPERIENCE) {
      const updatedUserWorkingExperiencesHover = [
        ...userWorkingExperiencesHover,
      ];
      updatedUserWorkingExperiencesHover[index] = true;
      setUserWorkingExperiencesHover(updatedUserWorkingExperiencesHover);
    }
    if (resourceType === EResource.EDUCATION) {
      const updatedUserEducationsHover = [...userEducationsHover];
      updatedUserEducationsHover[index] = true;
      setUserEducationsHover(updatedUserEducationsHover);
    }
  };

  const handleMouseLeaveUserResource = (
    index: number,
    resourceType?: EResource
  ) => {
    if (resourceType === EResource.WORKING_EXPERIENCE) {
      const updatedUserWorkingExperiencesHover = [
        ...userWorkingExperiencesHover,
      ];
      updatedUserWorkingExperiencesHover[index] = false;
      setUserWorkingExperiencesHover(updatedUserWorkingExperiencesHover);
    }
    if (resourceType === EResource.EDUCATION) {
      const updatedUserEducationsHover = [...userEducationsHover];
      updatedUserEducationsHover[index] = false;
      setUserEducationsHover(updatedUserEducationsHover);
    }
  };

  // sum up all the information into one object
  const handleGenerateResume = async (e: any) => {
    e.preventDefault();
    setUserCVInfo({
      name: userInfoForm.name,
      gender: userInfoForm.gender,
      profession: userInfoForm.profession,
      location: userInfoForm.location,
      mobilePhone: userInfoForm.mobilePhone,
      email: userInfoForm.email,
      profileDescription: userInfoForm.profileDescription,
      facebookLink: userInfoForm.facebookLink,
      linkedInLink: userInfoForm.linkedInLink,
      gitHubLink: userInfoForm.gitHubLink,
      education: userEducations,
      skill: userSkills,
      workingExperience: userWorkingExperiences,
      skillDescription: userInfoForm.skillDescription,
    });
    setShowCVDemo(true);
  };

  const createNewCv = async () => {
    const element = document.getElementById("fileToPrint");
    if (element) {
      // Convert the HTML element to canvas
      const file = await convertHtmlElementToPdfFile(element, cvTitle);
      const uploadFileData = await uploadFile(file);
      console.log(uploadFileData);
      if (isErrorHttpResponse(uploadFileData)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when upload your CV ${uploadFileData.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        const createResumeData = uploadResume({
          title: cvTitle,
          link: uploadFileData.data,
          employeeId: employee?.id || "",
          name: userInfoForm.name,
          gender: userInfoForm.gender,
          profession: userInfoForm.profession,
          location: userInfoForm.location,
          mobilePhone: userInfoForm.mobilePhone,
          email: userInfoForm.email,
          profileDescription: userInfoForm.profileDescription,
          facebookLink: userInfoForm.facebookLink,
          linkedInLink: userInfoForm.linkedInLink,
          gitHubLink: userInfoForm.gitHubLink,
          education: userEducations,
          skill: userSkills,
          workingExperience: userWorkingExperiences,
          skillDescription: userInfoForm.skillDescription,
          method: EResumeMethod.CREATE,
        });
        if (isErrorHttpResponse(createResumeData)) {
          return Swal.fire(
            "Oops...",
            "There is some thing wrong when upload your CV",
            "error"
          );
        } else {
          notify("Create CV successfully", () =>
            navigate(`/employee/profile/${employee?.userId}`)
          );
        }
      }
    }
  };

  return (
    <MainLayout>
      <div className="my-5 d-flex justify-content-center align-items-center">
        {!showCVDemo && (
          <Form
            className="px-4"
            style={{ maxWidth: "100%", backgroundColor: "#fff" }}
          >
            <h1
              className="font-weight-bold text-dark py-3 text-center"
              style={{ fontWeight: "700", fontSize: "40px" }}
            >
              Personal Information
            </h1>
            <Row className="mb-3">
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel>Full Name</FormLabel>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.name}
                  required
                />
              </FormGroup>
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel>Gender</FormLabel>
                <FormControl
                  as="select"
                  name="gender"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.gender}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </FormControl>
              </FormGroup>
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel>Profession</FormLabel>
                <FormControl
                  type="text"
                  placeholder="e.g: Full stack developer"
                  name="profession"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.profession}
                  required
                />
              </FormGroup>
            </Row>
            <Row className="mb-3">
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel> Mobile Phone </FormLabel>
                <FormControl
                  type="text"
                  placeholder="+01 23 456 789"
                  name="mobilePhone"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.mobilePhone}
                  required
                />
              </FormGroup>
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel> Email </FormLabel>
                <FormControl
                  type="email"
                  placeholder="info@domain.com"
                  name="email"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.email}
                  required
                />
              </FormGroup>
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel>Location</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Lahore, Pakistan"
                  name="location"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.location}
                  required
                />
              </FormGroup>
            </Row>
            <Row className="mb-3">
              <FormGroup as={Col} sm={12} className="mt-3 w-100">
                <Form.Label>Describe Yourself</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={
                    userInfoForm.profileDescription ||
                    "<p> Add your description here </p>"
                  }
                  onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "20vh",
                        editor.editing.view.document.getRoot()!
                      );
                    });
                  }}
                  onChange={(event, editor) => {
                    handleChangeInfoForm({
                      target: {
                        name: "profileDescription",
                        value: editor.getData(),
                      },
                    });
                  }}
                />
              </FormGroup>
            </Row>
            <h1
              className="text-dark text-center font-weight-bold py-4"
              style={{
                fontWeight: "700",
                fontSize: "40px",
              }}
            >
              Social Detail
            </h1>
            <Row className="mb-3">
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel>GitHub Link</FormLabel>
                <FormControl
                  type="text"
                  placeholder="e.g: https://github.com/johnDoe123"
                  name="gitHubLink"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.gitHubLink}
                  required
                />
              </FormGroup>
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel>LinkedIn Link</FormLabel>
                <FormControl
                  type="text"
                  placeholder="e.g: www.linkedin.com/in/johnDoe123"
                  name="linkedInLink"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.linkedInLink}
                  required
                />
              </FormGroup>
              <FormGroup
                as={Col}
                sm={12}
                md={4}
                className="d-flex flex-column align-items-start"
              >
                <FormLabel>Facebook Link</FormLabel>
                <FormControl
                  type="text"
                  placeholder="e.g: https://www.facebook.com/johnDoe123"
                  name="facebookLink"
                  onChange={handleChangeInfoForm}
                  value={userInfoForm.facebookLink}
                  required
                />
              </FormGroup>
            </Row>
            <h1
              className="text-dark text-center font-weight-bold py-4"
              style={{ fontWeight: "700", fontSize: "40px" }}
            >
              Working Experiences
            </h1>
            {userWorkingExperiences.map((workingExperience, index) => (
              <div
                key={index}
                className="mb-3"
                onMouseEnter={() =>
                  handleMouseEnterUserResource(
                    index,
                    EResource.WORKING_EXPERIENCE
                  )
                }
                onMouseLeave={() =>
                  handleMouseLeaveUserResource(
                    index,
                    EResource.WORKING_EXPERIENCE
                  )
                }
              >
                {!!userWorkingExperiencesHover[index] && (
                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={() => removeUserWorkingExperience(index)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <div
                  style={{
                    border: "1px solid transparent",
                    transition: "border-color 0.3s ease",
                    borderColor: userWorkingExperiencesHover[index]
                      ? "#27b64a"
                      : "transparent",
                  }}
                  className="component p-2"
                >
                  <Row className="mb-3">
                    <FormGroup
                      as={Col}
                      sm={12}
                      md={6}
                      className="d-flex flex-column align-items-start"
                    >
                      <FormLabel> Position </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="e.g: Junior web developer"
                        name="position"
                        onChange={(e: any) =>
                          handleChangeUserWorkingExperience(e, index)
                        }
                        value={workingExperience.position}
                        required
                      />
                    </FormGroup>
                    <FormGroup
                      as={Col}
                      sm={12}
                      md={6}
                      className="d-flex flex-column align-items-start"
                    >
                      <FormLabel> Company Name </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="e.g: Shopee"
                        name="companyName"
                        onChange={(e: any) =>
                          handleChangeUserWorkingExperience(e, index)
                        }
                        value={workingExperience.companyName}
                        required
                      />
                    </FormGroup>
                  </Row>
                  <Row className="mb-3">
                    <FormGroup
                      as={Col}
                      sm={12}
                      md={4}
                      className="d-flex flex-column align-items-start"
                    >
                      <FormLabel>Starting Date</FormLabel>
                      <FormControl
                        type="date"
                        name="startingDate"
                        onChange={(e: any) =>
                          handleChangeUserWorkingExperience(e, index)
                        }
                        value={
                          workingExperience?.startingDate
                            ? new Date(workingExperience.startingDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                      />
                    </FormGroup>
                    <FormGroup
                      as={Col}
                      sm={12}
                      md={4}
                      className="d-flex flex-column align-items-start"
                    >
                      <FormLabel>Ending Date</FormLabel>
                      <FormControl
                        type="date"
                        name="endingDate"
                        onChange={(e: any) =>
                          handleChangeUserWorkingExperience(e, index)
                        }
                        value={
                          workingExperience?.endingDate
                            ? new Date(workingExperience.endingDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        required
                      />
                    </FormGroup>
                    <FormGroup as={Col} sm={12} className="mt-3">
                      <FormLabel>Describe your responsibility</FormLabel>
                      <CKEditor
                        editor={ClassicEditor}
                        data={
                          workingExperience?.responsibility ||
                          "<p> Add your description here </p>"
                        }
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "20vh",
                              editor.editing.view.document.getRoot()!
                            );
                          });
                        }}
                        onChange={(event, editor) => {
                          return handleChangeUserWorkingExperience(
                            {
                              target: {
                                name: "responsibility",
                                value: editor.getData(),
                              },
                            },
                            index
                          );
                        }}
                      />
                    </FormGroup>
                  </Row>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-around">
              <Button
                className="w-25 p-2"
                variant="success"
                onClick={addUserWorkingExperience}
              >
                Add another working experience
              </Button>

              {!_.isEmpty(employee?.workingExperience) && (
                <Button
                  className="w-25 p-2"
                  variant="success"
                  onClick={(e) =>
                    addProfileResource(EResource.WORKING_EXPERIENCE)
                  }
                >
                  Add your profile working experience to CV
                </Button>
              )}
            </div>

            <h1
              className="text-center py-4"
              style={{ fontWeight: "700", fontSize: "40px" }}
            >
              Educational Detail
            </h1>

            {userEducations.map((education, index) => (
              <div
                key={index}
                className="mb-3"
                onMouseEnter={() =>
                  handleMouseEnterUserResource(index, EResource.EDUCATION)
                }
                onMouseLeave={() =>
                  handleMouseLeaveUserResource(index, EResource.EDUCATION)
                }
              >
                {!!userEducationsHover[index] && (
                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={() => removeUserEducation(index)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <div
                  style={{
                    border: "1px solid transparent",
                    transition: "border-color 0.3s ease",
                    borderColor: userEducationsHover[index]
                      ? "#27b64a"
                      : "transparent",
                  }}
                  className="component p-2"
                >
                  <Row className="mb-3">
                    <FormGroup
                      as={Col}
                      sm={12}
                      md={6}
                      className="d-flex flex-column align-items-start"
                    >
                      <FormLabel>Field of study (Major) </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="e.g: Computer sciences"
                        name="studyField"
                        onChange={(e: any) =>
                          handleChangeUserEducation(e, index)
                        }
                        value={education.studyField}
                        required
                      />
                    </FormGroup>
                    <FormGroup
                      as={Col}
                      sm={12}
                      md={6}
                      className="d-flex flex-column align-items-start"
                    >
                      <FormLabel> School Name </FormLabel>
                      <FormControl
                        type="text"
                        placeholder="e.g: govt school"
                        name="schoolName"
                        onChange={(e: any) =>
                          handleChangeUserEducation(e, index)
                        }
                        value={education.schoolName}
                        required
                      />
                    </FormGroup>
                  </Row>
                  <Row className="mb-3">
                    <FormGroup
                      as={Col}
                      sm={12}
                      md={4}
                      className="d-flex flex-column align-items-start"
                    >
                      <FormLabel>Starting Date</FormLabel>
                      <FormControl
                        type="date"
                        name="startingDate"
                        onChange={(e: any) =>
                          handleChangeUserEducation(e, index)
                        }
                        value={
                          education?.startingDate
                            ? new Date(education.startingDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                      />
                    </FormGroup>
                    <FormGroup
                      as={Col}
                      sm={12}
                      md={4}
                      className="d-flex flex-column align-items-start"
                    >
                      <FormLabel>Ending Date</FormLabel>
                      <FormControl
                        type="date"
                        name="endingDate"
                        onChange={(e: any) =>
                          handleChangeUserEducation(e, index)
                        }
                        value={
                          education?.endingDate
                            ? new Date(education.endingDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                      />
                    </FormGroup>
                  </Row>
                  <Row className="mb-3">
                    <FormGroup as={Col} sm={12}>
                      <FormLabel>Description</FormLabel>
                      <CKEditor
                        editor={ClassicEditor}
                        data={
                          education.description ||
                          "<p> Add your description here </p>"
                        }
                        onReady={(editor) => {
                          editor.editing.view.change((writer) => {
                            writer.setStyle(
                              "height",
                              "20vh",
                              editor.editing.view.document.getRoot()!
                            );
                          });
                        }}
                        onChange={(event, editor) => {
                          handleChangeUserEducation(
                            {
                              target: {
                                name: "description",
                                value: editor.getData(),
                              },
                            },
                            index
                          );
                        }}
                      />
                    </FormGroup>
                  </Row>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-around">
              <Button
                className="w-25 p-2"
                variant="success"
                onClick={addUserEducation}
              >
                Add another education
              </Button>

              {!_.isEmpty(employee?.education) && (
                <Button
                  className="w-25 p-2"
                  variant="success"
                  onClick={(e) => addProfileResource(EResource.EDUCATION)}
                >
                  Add your profile education to CV
                </Button>
              )}
            </div>

            <Row className="my-4">
              <h1
                className="text-center py-4"
                style={{ fontWeight: "700", fontSize: "40px" }}
              >
                Skill Detail
              </h1>
              <FormGroup as={Col} sm={12}>
                {userSkills.map((skill, index: number) => (
                  <div className="w-100" key={index}>
                    <Form.Label>Skill Name</Form.Label>
                    <div className="d-flex mb-3">
                      <Form.Control
                        className="w-50 me-3"
                        placeholder="Ex: Node.js"
                        name="title"
                        onChange={(e) => handleChangeUserSkill(e, index)}
                        value={skill.title}
                      />
                      <Button
                        variant="danger"
                        onClick={() => removeUserSkill(index)}
                      >
                        x
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="d-flex justify-content-around mb-4">
                  <Button
                    className="w-25 p-2"
                    variant="success"
                    onClick={addUserSkill}
                  >
                    Add another skill
                  </Button>

                  {!_.isEmpty(employee?.education) && (
                    <Button
                      className="w-25 p-2"
                      variant="success"
                      onClick={(e) => addProfileResource(EResource.SKILL)}
                    >
                      Add your profile skill to CV
                    </Button>
                  )}
                </div>
              </FormGroup>

              <FormGroup as={Col} sm={12}>
                <Form.Label>
                  Write More Description About Your Skills
                </Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={
                    userInfoForm?.skillDescription ||
                    "<p> Add your description here </p>"
                  }
                  onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "20vh",
                        editor.editing.view.document.getRoot()!
                      );
                    });
                  }}
                  onChange={(event, editor) => {
                    handleChangeInfoForm({
                      target: {
                        name: "skillDescription",
                        value: editor.getData(),
                      },
                    });
                  }}
                />
              </FormGroup>
            </Row>
            <div className="w-100">
              <h1
                className="text-center text-dark w-100 pt-4 font-weight-bold"
                style={{ fontWeight: 700, fontSize: "25px" }}
              >
                Resume Template
              </h1>
              <Row id="checkboxes" className="w-100">
                <FormGroup as={Col} sm={12} md={12}>
                  <Form.Check className="w-100 d-flex flex-column align-items-center">
                    <div className="my-3 d-flex align-items-center">
                      <Form.Check.Input
                        type="radio"
                        name="CVChoose"
                        checked
                        onChange={() => {
                          setCvTemplate(ECvTemplate.TEMPLATE1);
                        }}
                      />
                      <Form.Check.Label
                        className="mx-2"
                        style={{ fontSize: "20px" }}
                      >
                        Template 1
                      </Form.Check.Label>
                    </div>

                    <img
                      alt="CV Template 1"
                      src={template1}
                      style={{ height: "300px", width: "300px" }}
                    ></img>
                  </Form.Check>
                </FormGroup>
              </Row>
            </div>
            <div className="w-100 d-flex flex-column align-items-center mt-4">
              <h1
                className="text-center w-100 pt-4"
                style={{ fontWeight: 700, fontSize: "25px" }}
              >
                Resume Title
              </h1>
              <Form.Control
                className="w-50 me-3"
                placeholder="Ex: Fullstack CV"
                name="title"
                onChange={(e) => setCvTitle(e.target.value)}
                value={cvTitle}
              />
            </div>

            <Button
              variant="dark"
              className="py-3 my-3 w-100"
              onClick={handleGenerateResume}
            >
              Generate CV
            </Button>
          </Form>
        )}
        {showCVDemo && (
          <div className="w-75">
            {cvTemplate === ECvTemplate.TEMPLATE1 && (
              <CvTemplate1
                name={userCVInfo.name}
                gender={userCVInfo.gender}
                profession={userCVInfo.profession}
                location={userCVInfo.location}
                mobilePhone={userCVInfo.mobilePhone}
                email={userCVInfo.email}
                profileDescription={userCVInfo.profileDescription}
                facebookLink={userCVInfo.facebookLink}
                linkedInLink={userCVInfo.linkedInLink}
                gitHubLink={userCVInfo.gitHubLink}
                education={userCVInfo.education}
                skill={userCVInfo.skill}
                workingExperience={userCVInfo.workingExperience}
                skillDescription={userCVInfo.skillDescription}
                handleBackToEditButton={() => setShowCVDemo(false)}
                handleSaveCVButton={() => createNewCv()}
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CreateNewCvForm;
