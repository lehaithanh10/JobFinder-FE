import { useNavigate, useParams } from "react-router-dom";
import {
  ListGroup,
  Button,
  DropdownButton,
  Dropdown,
  Badge,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { IUserInfo } from "../../types/user";
import { RootState } from "../../redux/reduxStore";
import { useSelector } from "react-redux";
import { JobInfo } from "../../types/job";
import { IApplicationInfo } from "../../types/application";
import MainLayout from "../../layout/MainLayout";
import { EApplicationStatus } from "../../enum-types";
import { fetchJobDetail } from "../../api/job";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import {
  fetchJobPostApplications,
  replyEmployeeApplication,
} from "../../api/application";
import format from "date-fns/format";
import { notify } from "../../helpers/notify";
import AdvanceFilterApplicationModal from "../../component/Modal/AdvanceFilterApllicationModal";
import _ from "lodash";
import Swal from "sweetalert2";

export enum ModalStateFilterApplication {
  OPEN = "open",
  CLOSE = "close",
}

export type AdvancedFilterApplicationParams = {
  skillTitles: string[];
  schoolNames: string[];
  yearsOfWorkingExp?: number;
};

function ListApplicants() {
  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const { jobId } = useParams();
  const [post, setPost] = useState({} as JobInfo);
  const [applications, setApplications] = useState([] as IApplicationInfo[]);

  const [filter, setFilter] = useState<string>("all");
  const navigate = useNavigate();

  const [advancedFilterApplication, setAdvancedFilterApplication] =
    useState<AdvancedFilterApplicationParams>({
      schoolNames: [],
      skillTitles: [],
      yearsOfWorkingExp: undefined,
    });

  const [modalState, setModalState] = useState<ModalStateFilterApplication>(
    ModalStateFilterApplication.CLOSE
  );

  const handleAdvancedFilterApplication = (
    params: AdvancedFilterApplicationParams
  ) => {
    setAdvancedFilterApplication(params);
    setModalState(ModalStateFilterApplication.CLOSE);
  };

  const getDetailJobPost = async (jobPostId: string) => {
    const data = await fetchJobDetail(jobPostId);

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
    }
  };

  const getJobPostApplications = async (
    params?: AdvancedFilterApplicationParams
  ) => {
    const data = await fetchJobPostApplications(jobId!, params);

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get job's applications ${data.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      console.log("data here", data);
      setApplications(data.data);
    }
  };

  const replyApplication = async (
    appId: string,
    status: EApplicationStatus
  ) => {
    const data = await replyEmployeeApplication(appId, status);

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when reply application ${data.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      notify(
        `${
          status === EApplicationStatus.ACCEPTED ? "Accept" : "Reject"
        } aplication successfully`,
        () => {}
      );
      setApplications(
        applications.map((app) => {
          if (app.id === appId) {
            return { ...app, status: EApplicationStatus.ACCEPTED };
          }
          return app;
        })
      );
    }
  };

  const renderApplications = (applications: IApplicationInfo[]) => {
    return applications.length ? (
      applications.map((application, index: number) => (
        <div className="mb-3 border border-secondary py-2" key={index}>
          <div>
            <div className="d-flex justify-content-between mt-2">
              <strong>
                Applicant name:{" "}
                {(
                  application.resume.name ||
                  application.employee.email ||
                  application.employee.name
                ).toUpperCase()}
                <Badge
                  className="ms-2"
                  style={{ cursor: "pointer" }}
                  bg="primary"
                  onClick={() =>
                    navigate(`/employee/profile/${application.employee.userId}`)
                  }
                >
                  View Profile
                </Badge>
                {/* <Button className="h-50">View Profile</Button> */}
              </strong>
              {application.status === EApplicationStatus.REJECTED && (
                <Badge bg="danger">Rejected</Badge>
              )}
              {application.status === EApplicationStatus.PENDING && (
                <Badge bg="primary">Pending</Badge>
              )}
              {application.status === EApplicationStatus.ACCEPTED && (
                <Badge bg="success">Shortlisted</Badge>
              )}
            </div>
          </div>
          <div className="my-2">
            <strong>Applicant CV:</strong>
            <a
              className="ms-2 my-2"
              href={application.resume.link}
              target="_blank"
              rel="noreferrer"
            >
              Click here to download
            </a>
          </div>
          <div>
            <strong>Applicant message:</strong>
            <div className="my-2">{application.message}</div>
          </div>
          <div className="d-flex">
            <strong>Created At: </strong>
            <div className="ms-1">
              {format(parseISO(post.createdAt), "HH:mm dd/MM/yyyy")}
            </div>
          </div>
          <div className="d-flex mt-2 justify-content-between">
            {application.status === EApplicationStatus.PENDING && (
              <>
                <div className="d-flex mt-2 justify-content-between">
                  <Button
                    variant="info"
                    onClick={() =>
                      replyApplication(
                        application.id,
                        EApplicationStatus.ACCEPTED
                      )
                    }
                  >
                    Shortlist Application
                  </Button>
                </div>
                <div className="d-flex mt-2 justify-content-between">
                  <Button
                    className="mr-4"
                    variant="danger"
                    onClick={() =>
                      replyApplication(
                        application.id,
                        EApplicationStatus.REJECTED
                      )
                    }
                  >
                    Reject Application
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      ))
    ) : (
      <h3 className="p-5 mt-5 text-center">No Applications found...</h3>
    );
  };

  useEffect(() => {
    getDetailJobPost(jobId || "");
    getJobPostApplications();
  }, [jobId]);

  useEffect(() => {
    console.log(advancedFilterApplication);
    getJobPostApplications(advancedFilterApplication);
  }, [advancedFilterApplication]);

  //   if (post && post.owner !== user._id) return <Redirect to="/" />;

  return (
    <MainLayout>
      <div
        className="w-100 d-flex flex-column my-5"
        style={{ backgroundColor: "#fff", minHeight: "80vh" }}
      >
        <div className="d-flex w-100 justify-content-between align-items-center pt-4 px-5">
          <strong style={{ fontSize: "30px", width: "65%" }}>
            {post && post.title} Applications
          </strong>

          <div className="d-flex">
            <DropdownButton
              variant="secondary"
              title="Filter By Status"
              className="pe-2"
            >
              <Dropdown.Item
                onClick={() => {
                  setFilter("all");
                }}
              >
                All Applications
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setFilter(EApplicationStatus.PENDING);
                }}
              >
                Pending Applications
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setFilter(EApplicationStatus.REJECTED);
                }}
              >
                Rejected Applications
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setFilter(EApplicationStatus.ACCEPTED);
                }}
              >
                Shortlisted Applications
              </Dropdown.Item>
            </DropdownButton>
            <Button
              variant="success"
              className="w-50"
              onClick={() => setModalState(ModalStateFilterApplication.OPEN)}
            >
              Advanced Filter
            </Button>
          </div>
        </div>

        <ListGroup
          className="ms-5 me-5 p-5 flex-grow-1 d-flex align-items-center"
          variant="flush"
        >
          {(!_.isEmpty(advancedFilterApplication.skillTitles) ||
            !_.isEmpty(advancedFilterApplication.schoolNames) ||
            !!advancedFilterApplication.yearsOfWorkingExp) && (
            <div className="d-flex w-100 justify-content-between">
              <div
                className="ms-2 my-2 w-75"
                style={{ fontWeight: 600, fontSize: "25px" }}
              >
                {`Result for: ${
                  !_.isEmpty(advancedFilterApplication.skillTitles)
                    ? `skill: ${advancedFilterApplication.skillTitles.join(
                        ", "
                      )}`
                    : ""
                }${
                  !_.isEmpty(advancedFilterApplication.schoolNames)
                    ? ` school name: ${advancedFilterApplication.schoolNames.join(
                        ", "
                      )}`
                    : ""
                }${
                  advancedFilterApplication.yearsOfWorkingExp
                    ? ` years of working experience: ${advancedFilterApplication.yearsOfWorkingExp} year(s)`
                    : ""
                }`}
              </div>
              <div className="w-25 d-flex align-items-center justify-content-end">
                <Button
                  onClick={() =>
                    setAdvancedFilterApplication({
                      schoolNames: [],
                      skillTitles: [],
                      yearsOfWorkingExp: undefined,
                    } as AdvancedFilterApplicationParams)
                  }
                  variant="danger"
                >
                  Clear all filter
                </Button>
              </div>
            </div>
          )}
          <Row className="d-flex justify-content-center align-items-center w-100">
            {post && filter === "all" && renderApplications(applications)}
            {post &&
              filter !== "all" &&
              renderApplications(
                applications.filter((app) => app.status === filter)
              )}
          </Row>
        </ListGroup>
        <AdvanceFilterApplicationModal
          title={`Advance Filter Application for job ${post.title}`}
          showModal={modalState === ModalStateFilterApplication.OPEN}
          handleClose={() => setModalState(ModalStateFilterApplication.CLOSE)}
          handleAdvanceFilter={handleAdvancedFilterApplication}
          advanceFilter={advancedFilterApplication}
        />
      </div>
    </MainLayout>
  );
}

export default ListApplicants;
