import { Row, Col, Image, Button } from "react-bootstrap";
import profileImage from "../../../img/defaultImage/default-placeholder.png";
import "./NewProfile.scss";
import MainLayout from "../../../layout/MainLayout";
import {
  AiOutlineEdit,
  AiOutlineGift,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { HiOutlineLocationMarker, HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import EmployeeEducation from "../../../component/EmployeeProfile/EmployeeEducation/EmployeeEducation";
import EmployeeWorkingExperience from "../../../component/EmployeeProfile/EmployeeWorkingExperience/EmployeeWorkingExperinence";
import EmployeeSkill from "../../../component/EmployeeProfile/EmployeeSkill/EmployeeSkill";
import { useEffect, useState } from "react";
import ModalWorkingExperience from "../../../component/Modal/ModalWorkingExperience";
import ModalEducation from "../../../component/Modal/ModalEducation";
import ConfirmationModal from "../../../component/Modal/ComfirmModal";
import ModalSkill from "../../../component/Modal/ModalSkill";
import { useNavigate, useParams } from "react-router-dom";
import ModalEditGeneralInformation from "../../../component/Modal/ModalEditGeneralInformation";
import { RootState } from "../../../redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { IEmployeeInfo } from "../../../types/employee";
import {
  EducationDto,
  SkillDto,
  WorkingExperienceDto,
  fetchEmployeeInfo,
  updateEmployeeInfo,
} from "../../../api/employee";
import {
  CreateEmployeeEducationDto,
  createEmployeeEducation,
  deleteEmployeeEducation,
  updateEmployeeEducation,
} from "../../../api/employee-education";
import { isErrorHttpResponse } from "../../../helpers/checkHttpResponseStatus";
import { setCurrentEmployee } from "../../../redux/employee/EmployeeAction";
import {
  CreateEmployeeSkillDto,
  createEmployeeSkill,
  deleteEmployeeSkill,
  updateEmployeeSkill,
} from "../../../api/employee-skill";
import {
  CreateEmployeeWorkingExperienceDto,
  createEmployeeWorkingExperience,
  deleteEmployeeWorkingExperience,
  updateEmployeeWorkingExperience,
} from "../../../api/employee-woking-experience";
import { IResumeInfo } from "../../../types/resume";
import EmployeeResume from "../../../component/EmployeeProfile/EmployeeResume/EmployeeResume";
import { employeeDeleteResume, employeeGetResume } from "../../../api/resume";
import { IUserInfo } from "../../../types/user";
import { EJobFinderRole } from "../../../enum-types";
import { GeneralInformation } from "../../../component/Form/FormEditGeneralInformation";
import parse from "html-react-parser";
import Swal from "sweetalert2";

export enum ModalListState {
  EDIT_GENERAL_INFO = "edit-general-info",
  SKILL = "skill",
  EDUCATION = "education",
  WORKING_EXPERIENCE = "working-experience",
  CONFIRM = "confirm",
  CLOSE = "close",
}

export enum EResource {
  SKILL = "skill",
  EDUCATION = "education",
  WORKING_EXPERIENCE = "working-experience",
  RESUME = "resume",
}

const NewProfile = (): JSX.Element => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id: userId } = useParams();

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const employee: IEmployeeInfo | undefined = useSelector(
    (state: RootState) => state.employee.currentEmployee
  );

  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE
  );
  const [modalTitle, setModalTitle] = useState<string>("");

  const [currentGeneralInformation, setCurrentGeneralInformation] =
    useState<GeneralInformation>({} as GeneralInformation);

  const [currentWorkingExperience, setCurrentWorkingExperience] = useState<
    WorkingExperienceDto | CreateEmployeeWorkingExperienceDto | undefined
  >(undefined);

  const [currentSkill, setCurrentSkill] = useState<
    SkillDto | CreateEmployeeSkillDto | undefined
  >(undefined);

  const [currentEducation, setCurrentEducation] = useState<
    EducationDto | CreateEmployeeEducationDto | undefined
  >(undefined);

  const [resumes, setResumes] = useState<IResumeInfo[]>([]);

  const [choosenToDeleteResource, setChoosenToDeleteResource] = useState<
    { type: EResource; id: string } | undefined
  >(undefined);

  useEffect(() => {
    if (user?.role !== EJobFinderRole.EMPLOYEES) {
      fetchEmployeeDetail(userId);
    } else {
      fetchEmployeeResume();
    }

    setCurrentGeneralInformation({
      name: employee?.name,
      profession: employee?.profession,
      email: employee?.email,
      mobilePhone: employee?.mobilePhone,
      dateOfBirth: employee?.dateOfBirth,
      profileDescription: employee?.profileDescription,
      location: employee?.location,
    });
  }, [user, userId]);

  const fetchEmployeeDetail = async (userId?: string) => {
    const employeeDetail = await fetchEmployeeInfo(userId || "");
    if (isErrorHttpResponse(employeeDetail)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get your information ${employeeDetail.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      dispatch(setCurrentEmployee(employeeDetail.data!));
    }
  };

  const fetchEmployeeResume = async () => {
    const resumeData = await employeeGetResume();
    if (isErrorHttpResponse(resumeData)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get your CV ${resumeData.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      setResumes(resumeData.data!);
    }
  };

  const handleChangeGeneralInformation = (e: any) => {
    setCurrentGeneralInformation({
      ...currentGeneralInformation,
      [e.target.name]: e.target.value,
    });
  };

  const submitChangeGeneralInformation = async (e: any) => {
    if (currentGeneralInformation) {
      const data = await updateEmployeeInfo(currentGeneralInformation);

      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when update your general information CV ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            ...currentGeneralInformation,
          })
        );
      }

      setModalState(ModalListState.CLOSE);
    } else {
      // fire warning here
    }
  };

  const handleChangeEducation = (e: any) => {
    setCurrentEducation({
      ...currentEducation,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEducation = async (e: any) => {
    if (currentEducation) {
      const data = await createEmployeeEducation(currentEducation);

      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when add new education information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            education: [...employee!.education!, data.data!],
          })
        );
      }

      setModalState(ModalListState.CLOSE);
    } else {
      // fire warning here
    }
  };

  const handleSaveEducation = async (e: any) => {
    if (currentEducation) {
      const data = await updateEmployeeEducation(
        currentEducation,
        currentEducation.id || ""
      );

      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when update your education information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            education: employee!.education!.map((edu) => {
              if (edu.id === currentEducation.id) {
                return currentEducation;
              }
              return edu;
            }),
          })
        );
      }
      setModalState(ModalListState.CLOSE);
    } else {
      // fire warning here
    }
  };

  const handleChangeSkill = (e: any) => {
    setCurrentSkill({
      ...currentSkill,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = async (e: any) => {
    if (currentSkill) {
      const data = await createEmployeeSkill(currentSkill);

      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when add new skill information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            skill: [...employee!.skill!, data.data!],
          })
        );
      }

      setModalState(ModalListState.CLOSE);
    } else {
      // fire warning here
    }
  };

  const handleSaveSkill = async (e: any) => {
    if (currentSkill) {
      const data = await updateEmployeeSkill(
        currentSkill,
        currentSkill.id || ""
      );

      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when update your skill information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            skill: employee!.skill!.map((skill) => {
              if (skill.id === currentSkill.id) {
                return currentSkill;
              }
              return skill;
            }),
          })
        );
      }
      setModalState(ModalListState.CLOSE);
    } else {
      // fire warning here
    }
  };

  const handleChangeWorkingExperience = (e: any) => {
    console.log(currentWorkingExperience);
    setCurrentWorkingExperience({
      ...currentWorkingExperience,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddWorkingExperience = async (e: any) => {
    if (currentWorkingExperience) {
      const data = await createEmployeeWorkingExperience(
        currentWorkingExperience
      );

      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when add new working experience information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            workingExperience: [...employee!.workingExperience!, data.data!],
          })
        );
      }

      setModalState(ModalListState.CLOSE);
    } else {
      // fire warning here
    }
  };

  const handleSaveWorkingExperience = async (e: any) => {
    if (currentWorkingExperience) {
      const data = await updateEmployeeWorkingExperience(
        currentWorkingExperience,
        currentWorkingExperience.id || ""
      );

      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when update your working experience information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            workingExperience: employee!.workingExperience!.map(
              (workingExp) => {
                if (workingExp.id === currentWorkingExperience.id) {
                  return currentWorkingExperience;
                }
                return workingExp;
              }
            ),
          })
        );
      }
      setModalState(ModalListState.CLOSE);
    } else {
      // fire warning here
    }
  };

  const handleDeleteResource = async (resource: {
    type: EResource;
    id: string;
  }) => {
    console.log(resource);
    if (resource.type === EResource.EDUCATION) {
      const data = await deleteEmployeeEducation(resource.id);
      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when delete your education information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            education: employee!.education!.filter(
              (edu) => edu.id !== resource.id
            ),
          })
        );
      }
    } else if (resource.type === EResource.SKILL) {
      const data = await deleteEmployeeSkill(resource.id);
      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when delete your skill information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            skill: employee!.skill!.filter((skill) => skill.id !== resource.id),
          })
        );
      }
    } else if (resource.type === EResource.WORKING_EXPERIENCE) {
      const data = await deleteEmployeeWorkingExperience(resource.id);
      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when delete your working experience information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        dispatch(
          setCurrentEmployee({
            ...employee!,
            workingExperience: employee!.workingExperience!.filter(
              (workingExp) => workingExp.id !== resource.id
            ),
          })
        );
      }
    } else {
      const data = await employeeDeleteResume(resource.id);
      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong when delete your CV ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        setResumes(resumes.filter((resume) => resume.id !== resource.id));
      }
    }

    setModalState(ModalListState.CLOSE);
  };

  const handleCloseModal = () => {
    setModalState(ModalListState.CLOSE);
  };

  const renderWorkingExperience = (
    workingExperices: WorkingExperienceDto[]
  ) => {
    if (!workingExperices || workingExperices.length === 0) {
      return (
        <div className="d-flex justify-content-center text-center w-100 mt-2">
          <h4 style={{ fontWeight: "600", fontSize: "20px" }}>
            No working experience information was found ...
          </h4>
        </div>
      );
    }

    return workingExperices.map((workingExperice) => (
      <EmployeeWorkingExperience
        userId={userId || ""}
        key={workingExperice.id}
        position={workingExperice.position}
        companyName={workingExperice.companyName}
        companyAddress={workingExperice.companyAddress}
        startingDate={workingExperice.startingDate}
        endingDate={workingExperice.endingDate}
        responsibility={workingExperice.responsibility}
        onClickDeleteButton={() => {
          setModalTitle("Confirm Delete Working Experience");
          setModalState(ModalListState.CONFIRM);
          setChoosenToDeleteResource({
            type: EResource.WORKING_EXPERIENCE,
            id: workingExperice.id || "",
          });
        }}
        onClickEditButton={() => {
          setModalTitle("Edit Working Experience");
          setModalState(ModalListState.WORKING_EXPERIENCE);
          setCurrentWorkingExperience(workingExperice);
        }}
      />
    ));
  };

  const renderEducation = (educations: EducationDto[]) => {
    if (!educations || educations.length === 0) {
      return (
        <div className="d-flex justify-content-center text-center w-100 mt-2">
          <h4 style={{ fontWeight: "600", fontSize: "20px" }}>
            No education information was found ...
          </h4>
        </div>
      );
    }

    return educations.map((education, index: number) => (
      <EmployeeEducation
        userId={userId || ""}
        key={index}
        schoolName={education.schoolName}
        studyField={education.studyField}
        startingDate={education.startingDate}
        endingDate={education.endingDate}
        description={education.description}
        onClickDeleteButton={() => {
          setModalTitle("Confirm Delete Education");
          setModalState(ModalListState.CONFIRM);
          setChoosenToDeleteResource({
            type: EResource.EDUCATION,
            id: education.id || "",
          });
        }}
        onClickEditButton={() => {
          setModalTitle("Edit Education");
          setModalState(ModalListState.EDUCATION);
          setCurrentEducation(education);
        }}
      />
    ));
  };

  const renderSkill = (skills: SkillDto[]) => {
    if (!skills || skills.length === 0) {
      return (
        <div className="d-flex justify-content-center text-center w-100 mt-2">
          <h4 style={{ fontWeight: "600", fontSize: "20px" }}>
            No skill was found ...
          </h4>
        </div>
      );
    }

    return skills.map((skill, index: number) => (
      <EmployeeSkill
        userId={userId || ""}
        key={index}
        title={skill.title}
        onClickDeleteButton={() => {
          setModalTitle("Confirm Delete Skill");
          setModalState(ModalListState.CONFIRM);
          setChoosenToDeleteResource({
            type: EResource.SKILL,
            id: skill.id || "",
          });
        }}
        onClickEditButton={() => {
          setModalTitle("Edit Skill");
          setModalState(ModalListState.SKILL);
          setCurrentSkill(skill);
        }}
      />
    ));
  };

  const renderResumes = (resumes: IResumeInfo[]) => {
    if (!resumes || resumes.length === 0) {
      return (
        <div className="d-flex justify-content-center w-100">
          <h4
            style={{
              fontWeight: "600",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            No CV was found ...
          </h4>
        </div>
      );
    }

    return resumes.map((resume, index: number) => (
      <EmployeeResume
        key={index}
        title={resume.title}
        link={resume.link}
        method={resume.method}
        onClickDeleteButton={() => {
          setModalTitle("Confirm Delete CV");
          setModalState(ModalListState.CONFIRM);
          setChoosenToDeleteResource({
            type: EResource.RESUME,
            id: resume.id || "",
          });
        }}
      />
    ));
  };

  return (
    <MainLayout>
      <Row
        style={{ backgroundColor: "#fff" }}
        className="align-items-center mt-4 p-4 rounded"
      >
        <Col xs={3} md={3} className="text-center">
          <Image src={profileImage} roundedCircle className="w-100" />
        </Col>
        <Col xs={9} md={9}>
          <div>
            <div className="d-flex justify-content-between">
              <h1 className="mb-2" style={{ color: "#0a66c2" }}>
                {employee?.name}
              </h1>
              {user?.userId === userId &&
                user?.role === EJobFinderRole.EMPLOYEES && (
                  <FiEdit
                    className="link-primary"
                    size={28}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setModalTitle("Edit General Information");
                      setModalState(ModalListState.EDIT_GENERAL_INFO);
                    }}
                  />
                )}
            </div>
            <h4 className="mb-2"> {employee?.profession}</h4>

            <div className="d-flex justify-content-between flex-wrap mb-3">
              {employee?.email && (
                <div className="mb-1 d-flex align-items-center w-50">
                  <AiOutlineMail />
                  <div className="ms-1">{employee?.email}</div>
                </div>
              )}
              {employee?.mobilePhone && (
                <div className="mb-1 d-flex align-items-center w-50">
                  <AiOutlinePhone />
                  <div className="ms-1">{employee.mobilePhone}</div>
                </div>
              )}

              {employee?.dateOfBirth && (
                <div className="mb-1 d-flex align-items-center w-50">
                  <AiOutlineGift />
                  <div className="ms-1">
                    {new Date(employee.dateOfBirth).toLocaleString("en-US", {
                      month: "2-digit",
                      year: "numeric",
                      day: "2-digit",
                    })}
                  </div>
                </div>
              )}
              {employee?.location && (
                <div className="mb-1 d-flex align-items-center w-50">
                  <HiOutlineLocationMarker />
                  <div className="ms-1">{employee.location}</div>
                </div>
              )}
            </div>
            {employee?.profileDescription && (
              <p>{parse(employee.profileDescription)}</p>
            )}
          </div>
        </Col>
      </Row>

      <Row className="mt-4 p-4 rounded" style={{ backgroundColor: "#fff" }}>
        <div className="border-bottom border-2 mb-3 w-100 d-flex justify-content-between align-items-center">
          <h3 style={{ color: "#0a66c2" }}>Working Experience</h3>
          {user?.userId === userId &&
            user?.role === EJobFinderRole.EMPLOYEES && (
              <div>
                <Button
                  className="p-1 mb-2 mx-2"
                  variant="success"
                  onClick={() => {
                    setModalTitle("Add Working Experience");
                    setModalState(ModalListState.WORKING_EXPERIENCE);
                    setCurrentWorkingExperience(undefined);
                  }}
                >
                  <AiOutlinePlusCircle size={28} />
                </Button>
              </div>
            )}
        </div>
        <div>
          {employee?.workingExperience &&
            renderWorkingExperience(employee?.workingExperience)}
        </div>
      </Row>

      <Row className="mt-4 p-4 rounded" style={{ backgroundColor: "#fff" }}>
        <div className="border-bottom border-2  w-100 d-flex justify-content-between align-items-center">
          <h3 style={{ color: "#0a66c2" }}>Skills</h3>
          {user?.userId === userId &&
            user?.role === EJobFinderRole.EMPLOYEES && (
              <Button className="p-1 mb-2" variant="success">
                <AiOutlinePlusCircle
                  size={28}
                  onClick={() => {
                    setModalTitle("Add Skill");
                    setModalState(ModalListState.SKILL);
                    setCurrentSkill(undefined);
                  }}
                />
              </Button>
            )}
        </div>
        <div>{employee?.skill && renderSkill(employee.skill)}</div>
      </Row>

      <Row className="mt-4 p-4 rounded" style={{ backgroundColor: "#fff" }}>
        <div className="border-bottom border-2 mb-3 w-100 d-flex justify-content-between align-items-center">
          <h3 style={{ color: "#0a66c2" }}>Education</h3>
          {user?.userId === userId &&
            user?.role === EJobFinderRole.EMPLOYEES && (
              <Button
                onClick={() => {
                  setModalTitle("Add Education");
                  setModalState(ModalListState.EDUCATION);
                  setCurrentEducation(undefined);
                }}
                className="p-1 mb-2"
                variant="success"
              >
                <AiOutlinePlusCircle size={28} />
              </Button>
            )}
        </div>
        <div>{employee?.education && renderEducation(employee.education)}</div>
      </Row>

      {user?.role === EJobFinderRole.EMPLOYEES && user.userId === userId && (
        <Row className="my-4 p-4 rounded" style={{ backgroundColor: "#fff" }}>
          <div className="border-bottom border-2 mb-3 w-100 d-flex justify-content-between align-items-center">
            <h3 style={{ color: "#0a66c2" }}>Your CV</h3>

            <div className="py-2">
              <Button
                variant="success"
                className="me-2"
                onClick={() => {
                  navigate("/employeeForm");
                }}
              >
                Create New CV
              </Button>
              <Button
                variant="danger"
                className="me-2"
                onClick={() => navigate("/uploadCv")}
              >
                Upload New CV
              </Button>
            </div>
          </div>
          <div className="mb-2" style={{ fontWeight: 500, color: "gray" }}>
            ** Only CV created by our system can be edited **
          </div>
          <div>{employee && resumes && renderResumes(resumes)}</div>
        </Row>
      )}
      <ModalEditGeneralInformation
        title={modalTitle}
        showModal={modalState === ModalListState.EDIT_GENERAL_INFO}
        handleClose={handleCloseModal}
        generalInformation={currentGeneralInformation}
        handleChangeGeneralInformation={handleChangeGeneralInformation}
        submitChangeGeneralInformation={submitChangeGeneralInformation}
      />
      <ModalWorkingExperience
        title={modalTitle}
        showModal={modalState === ModalListState.WORKING_EXPERIENCE}
        handleClose={handleCloseModal}
        workingExperience={currentWorkingExperience}
        submitAddWorkingExperience={handleAddWorkingExperience}
        submitSaveWorkingExperience={handleSaveWorkingExperience}
        handleChangeWorkingExperience={handleChangeWorkingExperience}
      />
      <ModalSkill
        title={modalTitle}
        showModal={modalState === ModalListState.SKILL}
        handleClose={handleCloseModal}
        skill={currentSkill}
        submitAddSkill={handleAddSkill}
        submitSaveSkill={handleSaveSkill}
        handleChangeSkill={handleChangeSkill}
      />
      <ModalEducation
        title={modalTitle}
        showModal={modalState === ModalListState.EDUCATION}
        handleClose={handleCloseModal}
        education={currentEducation}
        submitAddEducation={handleAddEducation}
        submitSaveEducation={handleSaveEducation}
        handleChangeEducation={handleChangeEducation}
      />
      <ConfirmationModal
        showModal={modalState === ModalListState.CONFIRM}
        title={modalTitle}
        handleDeleteResource={handleDeleteResource}
        choosenToDeleteResource={choosenToDeleteResource}
        handleClose={handleCloseModal}
      />
    </MainLayout>
  );
};

export default NewProfile;
