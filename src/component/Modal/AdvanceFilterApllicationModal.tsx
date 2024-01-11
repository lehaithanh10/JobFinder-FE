import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AdvancedFilterApplicationParams } from "../../pages/Job/ListApplicants";
import { keywordData, schoolData } from "../../shared/data";

interface AdvanceFilterApplicationModalProps {
  showModal: boolean;
  title: string;
  advanceFilter: AdvancedFilterApplicationParams;
  handleClose: () => void;
  handleAdvanceFilter: (params: AdvancedFilterApplicationParams) => void;
}

const AdvanceFilterApplicationModal: React.FC<
  AdvanceFilterApplicationModalProps
> = ({ showModal, title, handleClose, handleAdvanceFilter, advanceFilter }) => {
  const [schoolNames, setSchoolNames] = useState(
    advanceFilter.schoolNames as string[]
  );
  const [skills, setSkills] = useState(advanceFilter.skillTitles as string[]);

  const [yearsOfWorkingExp, setYearsOfWorkingExp] = useState<
    number | undefined
  >(advanceFilter.yearsOfWorkingExp);

  useEffect(() => {
    setSchoolNames(advanceFilter.schoolNames);
    setSkills(advanceFilter.skillTitles);
    setYearsOfWorkingExp(advanceFilter.yearsOfWorkingExp);
  }, [advanceFilter]);

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills(skills.concat([""]));
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSchoolNameChange = (index: number, value: string) => {
    const updatedSchoolNames = [...schoolNames];
    updatedSchoolNames[index] = value;
    setSchoolNames(updatedSchoolNames);
  };

  const addSchoolName = () => {
    setSchoolNames(schoolNames.concat([""]));
  };

  const removeSchoolName = (index: number) => {
    const updatedSkills = [...schoolNames];
    updatedSkills.splice(index, 1);
    setSchoolNames(updatedSkills);
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 d-flex flex-column align-items-center">
        <div className="w-100 d-flex">
          <Form.Group className="w-100 d-flex flex-column">
            <Form.Label className="mt-3">
              <strong style={{ fontSize: "20px" }}>Skills</strong>
            </Form.Label>
            {skills &&
              skills.map((skill, index) => (
                <div className="d-flex mb-2 w-75" key={index}>
                  <Form.Control
                    list="keyword-data"
                    className="w-75"
                    as="input"
                    value={skill}
                    onChange={(e: any) =>
                      handleSkillChange(index, e.target.value)
                    }
                  ></Form.Control>
                  <Button
                    variant="danger"
                    style={{
                      width: "5vw",
                      marginLeft: "10px",
                      fontSize: "15px",
                      maxHeight: "5vh",
                    }}
                    onClick={() => removeSkill(index)}
                  >
                    x
                  </Button>
                </div>
              ))}
            <datalist id="keyword-data">
              {keywordData.map((option) => (
                <option>{option}</option>
              ))}
            </datalist>

            <Button className="w-50" onClick={addSkill}>
              Add a skill
            </Button>
          </Form.Group>

          <Form.Group className="w-100 d-flex flex-column">
            <Form.Label className="mt-3">
              <strong style={{ fontSize: "20px" }}>School Name</strong>
            </Form.Label>
            {schoolNames &&
              schoolNames.map((schoolName, index: number) => (
                <div className="d-flex mb-2 w-75" key={index}>
                  <Form.Control
                    list="school-data"
                    className="w-75"
                    as="input"
                    value={schoolName}
                    onChange={(e: any) =>
                      handleSchoolNameChange(index, e.target.value)
                    }
                  ></Form.Control>
                  <Button
                    variant="danger"
                    style={{
                      width: "5vw",
                      marginLeft: "10px",
                      fontSize: "15px",
                      maxHeight: "5vh",
                    }}
                    onClick={() => removeSchoolName(index)}
                  >
                    x
                  </Button>
                </div>
              ))}
            <datalist id="school-data">
              {schoolData.map((option) => (
                <option>{option}</option>
              ))}
            </datalist>

            <Button className="w-50" onClick={addSchoolName}>
              Add a school name
            </Button>
          </Form.Group>
        </div>

        <Form.Group className="w-100">
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>
              Years Of Working Experience
            </strong>
          </Form.Label>
          <Form.Control
            as="select"
            required
            name="yearsOfWorkingExperience"
            onChange={(e: any) => {
              setYearsOfWorkingExp(e.target.value);
              console.log(yearsOfWorkingExp);
            }}
          >
            <option value={0} disabled selected>
              0 year
            </option>
            <option value={1}>1 year</option>
            <option value={2}>2 years</option>
            <option value={4}>4 years</option>
            <option value={8}>8+ years</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            console.log("yearsOfWorkingExp", yearsOfWorkingExp);
            return handleAdvanceFilter({
              skillTitles: skills,
              schoolNames,
              yearsOfWorkingExp,
            });
          }}
          variant="success"
        >
          Filter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdvanceFilterApplicationModal;
