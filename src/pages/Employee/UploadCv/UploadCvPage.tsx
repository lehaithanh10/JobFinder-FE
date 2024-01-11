import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import {
  isFileIsAcceptedExtensionType,
  isFileSizeIsSmallerThan10MB,
} from "./helper";
import Swal from "sweetalert2";
import { notify } from "../../../helpers/notify";
import { uploadResume } from "../../../api/resume";
import { isErrorHttpResponse } from "../../../helpers/checkHttpResponseStatus";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../../../api/uploadFile";
import { EResumeMethod } from "../../../types/resume";
import { RootState } from "../../../redux/reduxStore";
import { IEmployeeInfo } from "../../../types/employee";
import { useSelector } from "react-redux";

const UploadCvPage = () => {
  const [form, setForm] = useState({
    title: "",
    file: {},
  } as { title: string; file: File });

  const navigate = useNavigate();

  const onChangeForm = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const employee: IEmployeeInfo | undefined = useSelector(
    (state: RootState) => state.employee.currentEmployee
  );

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    if (!isFileIsAcceptedExtensionType(form.file.name)) {
      return Swal.fire(
        "Oops...",
        "CV must be in type of pdf, doc or docx",
        "error"
      );
    } else if (!isFileSizeIsSmallerThan10MB(form.file)) {
      return Swal.fire(
        "Oops...",
        "Your CV file size must be smaller than 10MB",
        "error"
      );
    } else {
      if (form.title && form.file) {
        const uploadFileData = await uploadFile(form.file);
        if (isErrorHttpResponse(uploadFileData)) {
          return Swal.fire(
            "Oops...",
            `There is some thing wrong when upload your new CV ${uploadFileData.message.join(
              ", "
            )}`,
            "error"
          );
        } else {
          const uploadResumeData = await uploadResume({
            title: form.title,
            link: uploadFileData.data,
            method: EResumeMethod.UPLOAD,
            employeeId: employee?.id || "",
          });

          if (isErrorHttpResponse(uploadResumeData)) {
            return Swal.fire(
              "Oops...",
              `There is some thing wrong when upload your new CV ${uploadResumeData.message.join(
                ", "
              )}`,
              "error"
            );
          } else {
            notify("Upload CV successfully", () =>
              navigate(`/employee/profile/${employee?.userId}`)
            );
          }
        }
      }
    }
  };

  const onChangeFile = async (e: any) => {
    console.log(e.target.files);
    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  return (
    <MainLayout>
      <Form
        className="p-5 mt-5"
        style={{ height: "100vh !important", backgroundColor: "#fff" }}
        onSubmit={handleSubmitForm}
      >
        <Form.Group controlId="formBasicEmail" className="mb-5">
          <Form.Label>
            <strong style={{ fontSize: "25px", fontWeight: "600" }}>
              Curriculum Vitae title
            </strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CV name"
            required
            name="title"
            value={form.title}
            onChange={onChangeForm}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-5">
          <Form.Label>
            <strong style={{ fontSize: "25px", fontWeight: "600" }}>
              Upload your CV (.doc,.docx,.pdf)
            </strong>
          </Form.Label>
          <Form.Control
            type="file"
            required
            accept=".doc,.docx,.pdf"
            onChange={onChangeFile}
          />
          <Form.Text className="text-muted">
            Accepted file types: .doc, .docx, .pdf
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </MainLayout>
  );
};

export default UploadCvPage;
