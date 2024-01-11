// import Footer from "../../components/Footer/Footer";
import {
  ListGroup,
  Nav,
  Badge,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useState, useEffect } from "react";
// import { parseISO } from "date-fns";
import { IUserInfo } from "../../../types/user";
import { RootState } from "../../../redux/reduxStore";
import { EApplicationStatus, EJobFinderRole } from "../../../enum-types";
import { useSelector } from "react-redux";
import { IApplicationInfo } from "../../../types/application";
import CustomPagination from "../../../component/Pagination/Pagination";
import MainLayout from "../../../layout/MainLayout";
import { IEmployeeInfo } from "../../../types/employee";
import { employeeFetchApplications } from "../../../api/application";
import { isErrorHttpResponse } from "../../../helpers/checkHttpResponseStatus";
import Swal from "sweetalert2";
import { format, parseISO } from "date-fns";

function ManageApplication() {
  const [apps, setApps] = useState<IApplicationInfo[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(8);
  const [applicationFilterType, setApplicationFilterType] = useState("all");

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const employee: IEmployeeInfo | undefined = useSelector(
    (state: RootState) => state.employee.currentEmployee
  );

  const fetchApplications = async () => {
    const params = { page, limit };
    const data = await employeeFetchApplications();

    if (isErrorHttpResponse(data)) {
      Swal.fire("Oops...", data.message.join(", "), "error");
    } else {
      console.log(data.data);
      setApps(data.data);
    }
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const renderApplications = (applications: IApplicationInfo[]) => {
    return !applications.length ? (
      <h1
        style={{
          padding: "20px",
          fontWeight: "600",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        You did not have any application. Let create a CV and apply to your
        dream job...
      </h1>
    ) : (
      applications.map((application) => (
        <ListGroup.Item
          key={application.id}
          style={{ border: "1px solid black" }}
          className="mt-3"
        >
          <div>
            <h3 style={{ cursor: "pointer" }}>{application.job.title}</h3>
          </div>
          <div className="d-flex">
            <strong>Your CV: </strong>
            {application.resume && (
              <Nav.Link
                className="link-primary ms-2"
                href={application.resume.link}
                target="_blank"
                as="a"
              >
                {application.resume.title}
              </Nav.Link>
            )}
          </div>
          <div className="mt-1">
            <strong>Submitted At: </strong>
            {format(parseISO(application.createdAt), "HH:mm dd/MM/yyyy")}
          </div>
          <div className="mt-1">
            <strong>Status: </strong>
            {application.status === EApplicationStatus.PENDING && (
              <Badge bg="warning">Pending</Badge>
            )}
            {application.status === EApplicationStatus.REJECTED && (
              <Badge bg="danger">Rejected</Badge>
            )}
            {application.status === EApplicationStatus.ACCEPTED && (
              <Badge bg="success">Shortlisted</Badge>
            )}
          </div>
        </ListGroup.Item>
      ))
    );
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <MainLayout>
      <div
        className="my-5 px-5 pt-5 d-flex flex-column"
        style={{ backgroundColor: "#fff", minHeight: "68vh" }}
      >
        <div className="d-flex justify-content-between">
          <h1 style={{ fontWeight: "700", fontSize: "40px" }}>
            Manage Applications
          </h1>
          <DropdownButton
            variant="secondary"
            title="Filter Applications"
            className="ms-5  pl-5 pr-5"
          >
            <Dropdown.Item
              onClick={() => {
                setApplicationFilterType("all");
              }}
            >
              All Applications
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setApplicationFilterType("pending");
              }}
            >
              Pending Applications
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setApplicationFilterType("rejected");
              }}
            >
              Rejected Applications
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setApplicationFilterType("shortlisted");
              }}
            >
              Shortlisted Applications
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <ListGroup
          className="ml-5 mr-5 py-3 px-5 flex-grow-1 d-flex flex-column justify-content-center"
          variant="flush"
        >
          {applicationFilterType === "all" && renderApplications(apps)}
          {applicationFilterType === "pending" &&
            renderApplications(
              apps.filter((app) => app.status === EApplicationStatus.PENDING)
            )}
          {applicationFilterType === "rejected" &&
            renderApplications(
              apps.filter((app) => app.status === EApplicationStatus.REJECTED)
            )}
          {applicationFilterType === "shortlisted" &&
            renderApplications(
              apps.filter((app) => app.status === EApplicationStatus.ACCEPTED)
            )}
        </ListGroup>
        {!!total && (
          <CustomPagination
            current={page}
            total={total}
            onChangePage={onChangePage}
            limit={limit}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default ManageApplication;
