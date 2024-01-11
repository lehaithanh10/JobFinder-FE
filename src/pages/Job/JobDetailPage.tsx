import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import { JobInfo } from "../../types/job";
import MainLayout from "../../layout/MainLayout";
import convertUSD from "../../util/convertUSD";
import JobTitleCard from "../../component/JobTitleCard/JobTitleCard";
import { fetchJobDetail } from "../../api/job";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import { Col, Row } from "react-bootstrap";
import { IApiGetCompanyResponse } from "../../types/company";
import CompanyCardJobDetail from "../../component/CompanyCardJobDetail/CompanyCardJobDetail";
import { fetchEmployer } from "../../api/employer";
import Swal from "sweetalert2";

function JobDetailPage() {
  const { id: jobPostId } = useParams();
  const [post, setPost] = useState({} as JobInfo);
  const [company, setCompany] = useState({} as IApiGetCompanyResponse);

  const fetchPost = async (postId: string) => {
    const data = await fetchJobDetail(postId);

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
    fetchPost(jobPostId || "");
  }, [jobPostId]);

  return (
    <MainLayout>
      <Row className="h-100 my-4">
        <Col md={8}>
          {post ? (
            <div style={{ backgroundColor: "#fff" }}>
              <JobTitleCard
                logo={company?.logo || ""}
                title={post.title}
                keywords={post.keywords}
                salary={
                  Number(post.salary) > 0
                    ? convertUSD(Number(post.salary))
                    : "Negotiated"
                }
                id={post.id}
                location={post.locations}
                active={post.active}
                userId={company.userId}
              />
              <div
                className="p-5"
                style={{ borderBottom: "0.5px solid black" }}
              >
                <h2>Job Description</h2>
                <p>{post.description && parse(post.description)}</p>
              </div>
              <div className="p-5">
                <h2>Job Requirements</h2>
                <p>{post.requirement && parse(post.requirement)}</p>
              </div>
            </div>
          ) : (
            <div>No job found...</div>
          )}
        </Col>
        <Col md={4}>
          <CompanyCardJobDetail
            src={company.logo || ""}
            companyName={company.companyName || ""}
            address={company.location || ""}
            companyId={company.id || ""}
            userId={company.userId || ""}
          ></CompanyCardJobDetail>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default JobDetailPage;
