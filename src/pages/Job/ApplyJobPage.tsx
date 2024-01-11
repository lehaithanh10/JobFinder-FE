import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { notify } from "../../helpers/notify";
import MainLayout from "../../layout/MainLayout";
import { RootState } from "../../redux/reduxStore";
import { IUserInfo } from "../../types/user";
import { useSelector } from "react-redux";
import { IResumeInfo } from "../../types/resume";
import { JobInfo } from "../../types/job";
import { fetchJobDetail } from "../../api/job";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import { fetchEmployer } from "../../api/employer";
import { IApiGetCompanyResponse } from "../../types/company";
import { employeeGetResume } from "../../api/resume";
import { IEmployeeInfo } from "../../types/employee";
import { employeeCreateApplication } from "../../api/application";

function ApplyJobPage() {
  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const employee: IEmployeeInfo | undefined = useSelector(
    (state: RootState) => state.employee.currentEmployee
  );

  const navigate = useNavigate();

  const { jobId } = useParams();
  const [post, setPost] = useState({} as JobInfo);
  const [form, setForm] = useState({
    resumeId: "",
    message: "",
    employeeId: employee?.id || "",
    jobPostId: jobId || "",
  });
  const [company, setCompany] = useState({} as IApiGetCompanyResponse);
  const [resumes, setResumes] = useState<IResumeInfo[]>([]);

  const fetchPost = async (jobId: string) => {
    const data = await fetchJobDetail(jobId);

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get job detail ${data.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      setPost(data.data);
      fetchCompany(data.data.companyId);
    }
  };

  const fetchResumes = async () => {
    const resumeData = await employeeGetResume();

    if (isErrorHttpResponse(resumeData)) {
      Swal.fire("Oops...", resumeData.message.join(", "), "error");
    } else {
      setResumes(resumeData.data!);
    }
  };

  const fetchCompany = async (companyId: string) => {
    const data = await fetchEmployer({ companyId });

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get company information ${data.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      setCompany(data.data);
    }
  };

  useEffect(() => {
    fetchPost(jobId || "");
    fetchResumes();
  }, []);

  const renderResume = (resumes: IResumeInfo[]) => {
    return resumes.map((resume, index: number) => (
      <option key={index} value={resume.id}>
        {resume.title}
      </option>
    ));
  };

  const onChangeForm = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    if (!form.resumeId) {
      Swal.fire("Oops...", "You need to attach a CV.", "error");
    } else {
      const data = await employeeCreateApplication(form);

      if (isErrorHttpResponse(data)) {
        Swal.fire("Oops...", data.message.join(", "), "error");
      } else {
        notify("Your application has send", () => {
          navigate("/employee/applications");
        });
      }
    }
  };

  //   if (!user || role === "employer") return <Redirect to="/" />;

  return (
    <MainLayout>
      <div className="mt-5 d-flex justify-content-center">
        <Form
          className="p-5"
          style={{ width: "80%", backgroundColor: "#fff" }}
          onSubmit={handleSubmitForm}
        >
          <Form.Label>
            <h2>
              Apply for {post && post.title} at {company && company.companyName}
            </h2>
          </Form.Label>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>
              <h3>Attach your CV</h3>
            </Form.Label>
            <Form.Control
              as="select"
              required
              name="resumeId"
              onChange={onChangeForm}
            >
              <option disabled selected>
                Select a CV
              </option>
              {renderResume(resumes)}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-2 d-flex justify-content-between">
            <Link to="/uploadcv">
              <strong>...Or upload new CV?</strong>
            </Link>
            <Link to="/employeeForm">
              <strong>...Or create new CV?</strong>
            </Link>
          </Form.Group>
          <Form.Group className="mt-4" controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <strong>Message to employer</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="message"
              value={form.message}
              onChange={onChangeForm}
              maxLength={500}
            />
          </Form.Group>
          <Button
            size="lg"
            className="mt-3 w-100"
            variant="success"
            type="submit"
          >
            Send my CV
          </Button>
        </Form>
      </div>
    </MainLayout>
  );
}

export default ApplyJobPage;
