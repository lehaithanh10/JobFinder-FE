import { Button, Form } from "react-bootstrap";
import { EducationDto } from "../../api/employee";
import { CreateEmployeeEducationDto } from "../../api/employee-education";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { keywordData, schoolData } from "../../shared/data";

interface FormEducationProps {
  handleChangeEducation: (event: any) => void;
  submitAddEducation: (event: any) => void;
  submitSaveEducation: (event: any) => void;
  education?: EducationDto | CreateEmployeeEducationDto;
}

const FormEducation = (props: FormEducationProps) => {
  return (
    <div>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>School Name</Form.Label>
            <Form.Control
              list="school-data"
              placeholder="Ex: Hanoi University of Science and Technology"
              name="schoolName"
              value={props.education?.schoolName}
              onChange={props.handleChangeEducation}
            />
            <datalist id="school-data">
              {schoolData.map((option) => (
                <option>{option}</option>
              ))}
            </datalist>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Field of study</Form.Label>
            <Form.Control
              placeholder="Ex: Information Technology"
              name="studyField"
              value={props.education?.studyField}
              onChange={props.handleChangeEducation}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex justify-content-between"
            controlId="formGrid"
          >
            <div className="w-50 me-2">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                name="startingDate"
                placeholder="Start date"
                max={new Date().toISOString().split("T")[0]}
                value={
                  props.education?.startingDate
                    ? new Date(props.education.startingDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={props.handleChangeEducation}
              />
            </div>
            <div className="w-50">
              <Form.Label>End date</Form.Label>
              <Form.Control
                type="date"
                name="endingDate"
                placeholder="End date"
                max={new Date().toISOString().split("T")[0]}
                value={
                  props.education?.endingDate
                    ? new Date(props.education.endingDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={props.handleChangeEducation}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={
                props.education?.description ||
                "<p> Add your description here </p>"
              }
              onChange={(event, editor) => {
                props.handleChangeEducation({
                  target: {
                    name: "description",
                    value: editor.getData(),
                  },
                });
              }}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            {props.education && props.education.id ? (
              <Button
                onClick={props.submitSaveEducation}
                style={{ width: "20%" }}
                variant="primary"
                type="button"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={props.submitAddEducation}
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

export default FormEducation;
