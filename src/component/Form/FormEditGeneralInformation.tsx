import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Form } from "react-bootstrap";

export type GeneralInformation = {
  name?: string;
  profession?: string;
  email?: string;
  mobilePhone?: string;
  dateOfBirth?: string;
  profileDescription?: string;
  location?: string;
};

interface FormModalEditGeneralInformationProps {
  generalInformation: GeneralInformation;
  handleChangeGeneralInformation: (event: any) => void;
  submitChangeGeneralInformation: (event: any) => void;
}

const FormModalEditGeneralInformation = (
  props: FormModalEditGeneralInformationProps
) => {
  return (
    <div>
      <div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Ex: Kyle John"
              name="name"
              value={props.generalInformation.name}
              onChange={props.handleChangeGeneralInformation}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder="Ex: +84987654321"
              name="mobilePhone"
              value={props.generalInformation.mobilePhone}
              onChange={props.handleChangeGeneralInformation}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profession</Form.Label>
            <Form.Control
              placeholder="Ex: Fullstack Developer"
              name="profession"
              value={props.generalInformation.profession}
              onChange={props.handleChangeGeneralInformation}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex justify-content-between"
            controlId="formGrid"
          >
            <div className="w-100 me-2">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                max={new Date().toISOString().split("T")[0]}
                // value={
                //   props.generalInformation.dateOfBirth
                //     ? new Date(props.generalInformation.dateOfBirth)
                //         .toISOString()
                //         .split("T")[0]
                //     : ""
                // }
                onChange={props.handleChangeGeneralInformation}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              placeholder="Ex: Hanoi, Vietnam"
              name="location"
              value={props.generalInformation.location}
              onChange={props.handleChangeGeneralInformation}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Description</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={
                props.generalInformation?.profileDescription ||
                "<p> Add your description here </p>"
              }
              onChange={(event, editor) => {
                props.handleChangeGeneralInformation({
                  target: {
                    name: "profileDescription",
                    value: editor.getData(),
                  },
                });
              }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              onClick={props.submitChangeGeneralInformation}
              style={{ width: "20%" }}
              variant="primary"
              type="button"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FormModalEditGeneralInformation;
