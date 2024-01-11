import { useEffect, useState } from "react";
import {
  Tab,
  Tabs,
  Button,
  Form,
  Col,
  Row,
  ListGroup,
  Nav,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeInfo } from "../../../api/employee";
import { RootState } from "../../../redux/reduxStore";
import { IEmployeeInfo } from "../../../types/employee";
import { IResumeInfo } from "../../../types/resume";
import { IUserInfo } from "../../../types/user";
import "./Profile.scss";
import MainLayout from "../../../layout/MainLayout";
import { setCurrentEmployee } from "../../../redux/employee/EmployeeAction";

const Profile = () => {
  const dispatch = useDispatch();
  const [resumes, setResumes] = useState<IResumeInfo[]>([]);
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const employee: IEmployeeInfo | undefined = useSelector(
    (state: RootState) => state.employee.currentEmployee
  );

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    let userDetail;
    try {
      // data = await fetchEmployeeInfo();
      // dispatch(setCurrentEmployee(userDetail.data));
      // setResumes(userDetail.resumes);
    } catch (err) {
      userDetail = {};
    }
  };

  const renderResumes = (resumes: IResumeInfo[]) => {
    if (!resumes || resumes.length === 0) {
      return (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
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
    return resumes.map((resume) => (
      <ListGroup.Item
        key={resume.id}
        className="d-flex justify-content-between"
      >
        <Nav.Link href={resume.link}>{resume.title}</Nav.Link>
        <Button variant="danger"> X </Button>
      </ListGroup.Item>
    ));
  };

  //   const uploadFile = (file, typeFile) => {
  //     return new Promise((resolve, reject) => {
  //       const task = storage.child(`${typeFile}/${file.name}`).put(file);
  //       task.on(
  //         'state_changed',
  //         function onProgess() {},
  //         function onError(err) {
  //           reject(err);
  //         },
  //         function onSuccess() {
  //           task.snapshot.ref
  //             .getDownloadURL()
  //             .then(function (downloadURL: string) {
  //               resolve(downloadURL);
  //             });
  //         },
  //       );
  //     });
  //   };

  return (
    <MainLayout>
      <div className="mt-5 d-flex">
        <div className="CV-account">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <div title="Edit Account" className="account-tab">
              <Form className="d-flex flex-column  align-items-start w-100">
                <div className="username">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label column sm="3" className="text-center">
                      Email
                    </Form.Label>
                    {user && (
                      <Col sm="9">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={user.email}
                        />
                      </Col>
                    )}
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="3" className="text-center">
                      Name
                    </Form.Label>
                    {user && (
                      <Col sm="9">
                        <Form.Control
                          name="name"
                          type="name"
                          placeholder={employee?.name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Col>
                    )}
                  </Form.Group>
                </div>
                <div className="cv-container d-flex flex-column text-center">
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="3" className="text-center">
                      YourCV
                    </Form.Label>
                  </Form.Group>
                  {renderResumes(resumes)}
                </div>
                <div
                  className="button-area d-flex justify-content-between mt-5"
                  style={{ width: "45%" }}
                >
                  <Button
                    type="button"
                    variant="success"
                    size="lg"
                    onClick={() => {
                      navigate("/employeeForm");
                    }}
                  >
                    Create New CV
                  </Button>
                </div>
              </Form>
            </div>
          </Tabs>
        </div>
        <div className="recommend-job">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="profile"
              title="Recommend job for you"
              className="rcm-job"
            >
              <h1
                style={{
                  fontWeight: "600",
                  fontSize: "30px",
                  textAlign: "center",
                }}
              >
                {" "}
                Coming soon ...{" "}
              </h1>
            </Tab>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
