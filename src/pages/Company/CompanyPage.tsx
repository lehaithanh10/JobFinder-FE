import { Carousel, Col, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CustomPagination from "../../component/Pagination/Pagination";
import MainLayout from "../../layout/MainLayout";
import JobCard from "../../component/JobCard/JobCard";
import CompanyTitleCard from "../../component/CompanyTitleCard/CompanyTitleCard";
import { JobInfo } from "../../types/job";
import { IApiGetCompanyResponse } from "../../types/company";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import { fetchJobs } from "../../api/job";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  employerFetchTheirInformation,
  fetchEmployer,
} from "../../api/employer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { IUserInfo } from "../../types/user";
import { EJobFinderRole } from "../../enum-types";
import parse from "html-react-parser";
import Swal from "sweetalert2";

function CompanyPage() {
  const [page, setPage] = useState(1);
  const [company, setCompany] = useState({} as IApiGetCompanyResponse);

  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(6);
  const [posts, setPosts] = useState([] as JobInfo[]);
  const [images, setImages] = useState([] as string[]);

  const { id: userId } = useParams();

  const navigate = useNavigate();

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const fetchCompany = async () => {
    const data = await fetchEmployer({ userId: userId || "" });

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
      setImages(data.data.companyImages);
      fetchPosts(data.data.id);
    }
  };

  const fetchPosts = async (companyId: string) => {
    const data = await fetchJobs({
      companyId,
      page: page,
      pageSize: limit,
    });

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get jobs ${data.message.join(", ")}`,
        "error"
      );
    } else {
      setPosts(data.data);
      setTotal(data.total);
    }
  };

  const renderPosts = (posts: JobInfo[]) => {
    if (posts.length === 0)
      return (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <h1>No job from this company...</h1>
        </div>
      );
    return posts.map((post) => (
      <Col lg="6" md="12">
        <JobCard
          id={post.id}
          logo={company?.logo || ""}
          title={post.title}
          salary={post.salary}
          requirement={post.requirement}
          keywords={post.keywords}
          location={post.locations.join(", ")}
          createdAt={post.createdAt}
          onClick={() => navigate(`/job/${post.id}`)}
        />
      </Col>
    ));
  };

  const renderImages = (images: string[]) => {
    return images.map((img) => (
      <Carousel.Item className="w-100 ratio ratio-16x9">
        <Image alt="company activity" src={img} />
      </Carousel.Item>
    ));
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    fetchCompany();
  }, [page, userId]);

  useEffect(() => {
    fetchPosts(userId || "");
  }, [page]);

  return (
    <MainLayout>
      <CompanyTitleCard
        title={company?.companyName || ""}
        location={company?.location || ""}
        logo={company?.logo || ""}
        companyId={company?.id || ""}
        email={company?.email || ""}
      />

      {!!images.length && (
        <div
          className="row mt-5 pt-3 d-flex justify-content-center"
          style={{ backgroundColor: "#fff" }}
        >
          <strong className="px-4 mt-4" style={{ fontSize: "30px" }}>
            Company Activity Image
          </strong>
          <Carousel className="p-5 w-75">{renderImages(images)}</Carousel>
        </div>
      )}

      <div
        className="row my-5 py-3 d-flex justify-content-center"
        style={{ backgroundColor: "#fff" }}
      >
        <strong className="px-4 my-3" style={{ fontSize: "30px" }}>
          Company Description | {company?.companyName}
        </strong>
        <strong className="px-4 mb-3" style={{ fontSize: "25px" }}>
          {company?.companyFullName}
        </strong>
        {company?.description && (
          <div className="px-4">{parse(company?.description)}</div>
        )}
      </div>

      <div
        className="row mb-5 py-3 d-flex justify-content-center "
        style={{ backgroundColor: "#fff" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <strong className="px-4 my-4" style={{ fontSize: "30px" }}>
              Recent Jobs
            </strong>
            {user?.role === EJobFinderRole.EMPLOYERS &&
              user.userId === company.userId && (
                <AiOutlinePlusCircle
                  className="mx-4"
                  style={{ cursor: "pointer" }}
                  size={42}
                  onClick={() => navigate("/createJobPost")}
                />
              )}
          </div>
          {user?.role === EJobFinderRole.EMPLOYERS &&
            user.userId === company.userId && (
              <a className="p-4" href="/manageJobPost">
                See all ...
              </a>
            )}
        </div>

        <Row style={{ width: "100%" }}> {renderPosts(posts)}</Row>

        <CustomPagination
          current={page}
          total={total}
          onChangePage={onChangePage}
          limit={limit}
        />
      </div>
    </MainLayout>
  );
}
export default CompanyPage;
