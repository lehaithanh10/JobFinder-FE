import { Button, Form } from "react-bootstrap";
import { SkillDto } from "../../api/employee";
import { CreateEmployeeSkillDto } from "../../api/employee-skill";
import { keywordData } from "../../shared/data";

interface FormSkillProps {
  handleChangeSkill: (event: any) => void;
  submitAddSkill: (event: any) => void;
  submitSaveSkill: (event: any) => void;
  skill?: SkillDto | CreateEmployeeSkillDto;
}

const FormSkill = (props: FormSkillProps) => {
  return (
    <div>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Skill Name</Form.Label>
            <Form.Control
              list="keyword-data"
              placeholder="Ex: Node.js"
              name="title"
              onChange={props.handleChangeSkill}
              value={props.skill?.title}
            />
          </Form.Group>
          <datalist id="keyword-data">
            {keywordData.map((option) => (
              <option>{option}</option>
            ))}
          </datalist>

          <div className="d-flex justify-content-between">
            {props.skill && props.skill.id ? (
              <Button
                onClick={props.submitSaveSkill}
                style={{ width: "20%" }}
                variant="primary"
                type="button"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={props.submitAddSkill}
                style={{ width: "20%" }}
                variant="success"
                type="button"
              >
                Add
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormSkill;
