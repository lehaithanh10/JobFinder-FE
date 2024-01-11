import { Button, Form } from "react-bootstrap";
import { WorkingExperienceDto } from "../../api/employee";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface FormWorkingExperienceProps {
  handleChangeWorkingExperience: (event: any) => void;
  submitAddWorkingExperience: (event: any) => void;
  submitSaveWorkingExperience: (event: any) => void;
  workingExperience?: WorkingExperienceDto;
}

const FormWorkingExperience = (props: FormWorkingExperienceProps) => {
  return (
    <div>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              placeholder="Ex: Developer"
              name="position"
              value={props.workingExperience?.position}
              onChange={props.handleChangeWorkingExperience}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Company name</Form.Label>
            <Form.Control
              placeholder="Ex: Microsoft"
              name="companyName"
              value={props.workingExperience?.companyName}
              onChange={props.handleChangeWorkingExperience}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              placeholder="Ex: Hanoi, Vietnam"
              name="companyAddress"
              value={props.workingExperience?.companyAddress}
              onChange={props.handleChangeWorkingExperience}
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
                  props.workingExperience?.startingDate
                    ? new Date(props.workingExperience.startingDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={props.handleChangeWorkingExperience}
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
                  props.workingExperience?.endingDate
                    ? new Date(props.workingExperience.endingDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={props.handleChangeWorkingExperience}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Responsibility</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={
                props.workingExperience?.responsibility ||
                "<p> Add your description here </p>"
              }
              onChange={(event, editor) => {
                props.handleChangeWorkingExperience({
                  target: {
                    name: "responsibility",
                    value: editor.getData(),
                  },
                });
              }}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            {props.workingExperience && props.workingExperience.id ? (
              <Button
                onClick={props.submitSaveWorkingExperience}
                style={{ width: "20%" }}
                variant="primary"
                type="button"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={props.submitAddWorkingExperience}
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

export default FormWorkingExperience;
