import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompanyCardHome from "../../component/CompanyCardHome/CompanyCardHome";
import JobCard from "../../component/JobCard/JobCard";
import NavbarControl from "../../component/Navbar/Navbar";
import { JobInfo } from "../../types/job";
import "./Home.scss";
import SearchBar, { ISearchBarForm } from "../../component/SearchBar/SearchBar";
import CustomPagination from "../../component/Pagination/Pagination";
import { fetchEmployers } from "../../api/employer";
import { fetchJobs } from "../../api/job";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import { IApiGetCompanyResponse } from "../../types/company";
import Footer from "../../component/Footer/Footer";
import defaultImage from "../../img/defaultImage/default-placeholder.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MAX_CARD_RENDER_ON_PAGE = 4;

const Home = () => {
  const [companies, setCompanies] = useState<IApiGetCompanyResponse[]>([]);
  const [totalCompany, setTotalCompany] = useState(0);
  const [totalJob, setTotalJob] = useState(0);
  const [jobs, setJobs] = useState<JobInfo[]>([]);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [currentCompanyPage, setCurrentCompanyPage] = useState(1);
  const [queriesFetchPost, setQueriesFetchPost] = useState(
    {} as ISearchBarForm
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompany();
  }, [currentCompanyPage]);

  useEffect(() => {
    fetchJobPost();
  }, [queriesFetchPost]);

  useEffect(() => {
    fetchJobPost();
  }, [currentJobPage]);

  const changeCurrentJobPage = (page: number) => {
    console.log("job page here", page);
    setCurrentJobPage(page);
  };

  const changeCurrentCompanyPage = (page: number) => {
    setCurrentCompanyPage(page);
  };

  const fetchCompany = async () => {
    const data = await fetchEmployers({
      page: currentCompanyPage,
      pageSize: MAX_CARD_RENDER_ON_PAGE,
    });

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get companies ${data.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      console.log(data);
      setCompanies(data.data);
      setTotalCompany(data.total);
    }
  };

  const fetchJobPost = async () => {
    const data = await fetchJobs({
      ...queriesFetchPost,
      active: true,
      page: currentJobPage,
      pageSize: MAX_CARD_RENDER_ON_PAGE,
    });

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get jobs ${data.message.join(", ")}`,
        "error"
      );
    } else {
      console.log("job here", data.data);
      setJobs(data.data.filter((job) => job.active));
      setTotalJob(data.total);
    }
  };

  const renderCompanies = (companies: IApiGetCompanyResponse[]) => {
    if (companies.length === 0) {
      return (
        <div className="mt-5 mb-5">
          <h1
            style={{
              paddingBottom: "20px",
              fontWeight: "600",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            No company found...
          </h1>
        </div>
      );
    }

    return companies.map((company, index: number) => {
      return (
        <Col lg="3" md="12">
          <CompanyCardHome
            key={index.toString()}
            src={company.logo || ""}
            companyName={company.companyName}
            address={company.location || ""}
            onClick={() => navigate(`company/${company.userId}`)}
          ></CompanyCardHome>
        </Col>
      );
    });
  };

  const renderJobs = (jobs: JobInfo[]) => {
    if (jobs.length === 0) {
      return (
        <div className="mt-5 mb-5">
          <h1
            style={{
              paddingBottom: "20px",
              fontWeight: "600",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            No job found...
          </h1>
        </div>
      );
    }

    return jobs.map((job, index: number) => {
      return (
        <Col lg="6" md="12">
          <JobCard
            key={index}
            id={job.id}
            logo={job.company.logo || defaultImage}
            title={job.title}
            salary={job.salary}
            location={job.locations.join(", ")}
            requirement={job.requirement}
            keywords={job.keywords}
            createdAt={job.createdAt}
            onClick={() => navigate(`job/${job.id}`)}
          ></JobCard>
        </Col>
      );
    });
  };

  return (
    <div className="d-flex w-100 flex-column">
      <NavbarControl></NavbarControl>
      <SearchBar filterSearch={setQueriesFetchPost} />

      <Container>
        <div className="d-flex flex-column align-items-start mt-5">
          <div className="w-100 d-flex align-item-center">
            <h1
              style={{
                marginLeft: "10px",
                fontWeight: "700",
                fontSize: "40px",
              }}
            >
              Top Job
            </h1>
            {(queriesFetchPost.keyword ||
              queriesFetchPost.locations ||
              queriesFetchPost.salary) && (
              <div
                className="ms-2 my-auto"
                style={{ fontWeight: 600, fontSize: "25px" }}
              >{`(Result for: ${queriesFetchPost.keyword}${
                queriesFetchPost.locations
                  ? ` location: ${queriesFetchPost.locations[0]}`
                  : ""
              }${
                queriesFetchPost.salary
                  ? ` salary: ${queriesFetchPost.salary}`
                  : ""
              })`}</div>
            )}
          </div>
          <Row className="d-flex w-100">{renderJobs(jobs)}</Row>
          <Row
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            {!!totalJob && (
              <CustomPagination
                onChangePage={changeCurrentJobPage}
                current={currentJobPage}
                total={totalJob}
                limit={MAX_CARD_RENDER_ON_PAGE}
              ></CustomPagination>
            )}
          </Row>
        </div>

        <div className="d-flex flex-column align-items-start mt-5">
          <h1
            style={{
              marginLeft: "10px",
              fontWeight: "700",
              fontSize: "40px",
            }}
          >
            Top Company
          </h1>
          <Row style={{ width: "100%" }}>{renderCompanies(companies)}</Row>
          <Row
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            {!!totalCompany && (
              <CustomPagination
                onChangePage={changeCurrentCompanyPage}
                current={currentCompanyPage}
                total={totalCompany}
                limit={MAX_CARD_RENDER_ON_PAGE}
              ></CustomPagination>
            )}
          </Row>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Home;
