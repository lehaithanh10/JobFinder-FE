import {
  ListGroup,
  Button,
  DropdownButton,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import CustomPagination from "../../component/Pagination/Pagination";
import MainLayout from "../../layout/MainLayout";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import parseISO from "date-fns/parseISO";
import { JobInfo } from "../../types/job";
import {
  UpdateJobDto,
  deleteJobPost,
  fetchJobs,
  updateJobPost,
} from "../../api/job";
import { RootState } from "../../redux/reduxStore";
import { useSelector } from "react-redux";
import { IUserInfo } from "../../types/user";
import { IApiGetCompanyResponse } from "../../types/company";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import ConfirmationModal from "../../component/Modal/ComfirmModal";
import { ModalListState } from "../Employee/NewProfile/NewProfile";
import Swal from "sweetalert2";

function ManageJobPosts() {
  const [posts, setPosts] = useState([] as JobInfo[]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(12);
  const [filter, setFilter] = useState("all");

  const [modalState, setModalState] = useState<ModalListState>(
    ModalListState.CLOSE
  );

  const [chosenToDeleteJob, setChosenToDeleteJob] = useState<
    { id: string; name: string } | undefined
  >(undefined);

  const navigate = useNavigate();

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const company: IApiGetCompanyResponse | undefined = useSelector(
    (state: RootState) => state.company.currentCompany
  );

  const fetchPosts = async () => {
    const data = await fetchJobs({
      companyId: company?.id || "6448fc520ee1cc30ca710f2c",
      page: page,
      pageSize: limit,
    });

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get your company's jobs ${data.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      setPosts(data.data);
      setTotal(data.total);
    }
  };

  const handleUpdateJob = async (jobPostId: string, data: UpdateJobDto) => {
    const response = await updateJobPost(jobPostId, data);
    if (isErrorHttpResponse(response)) {
      return Swal.fire(
        "Oops...",
        `Some thing wrong when update your post: ${response.message.join(",")}`,
        "error"
      );
    } else {
      setPosts(
        posts.map((post) => {
          if (post.id === jobPostId) {
            return response.data;
          }
          return post;
        })
      );
    }
  };

  const handleDeleteJob = async (job: { id: string }) => {
    const data = await deleteJobPost(job.id);
    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `Some thing wrong when delete your post: ${data.message.join(",")}`,
        "error"
      );
    } else {
      setPosts(posts.filter((post) => post.id !== job.id));
      setModalState(ModalListState.CLOSE);
    }
  };

  const renderPosts = (posts: JobInfo[]) => {
    if (posts.length === 0)
      return (
        <div className="mt-5 mb-5">
          <h1>No job to display...</h1>
        </div>
      );
    return posts.map((post, index: number) => (
      <ListGroup.Item
        key={index}
        style={{ border: "solid black 1px", marginTop: "2vh" }}
      >
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="w-75 d-flex justify-content-start align-items-center">
            <div
              style={{ fontSize: "25px", fontWeight: "600" }}
              className="pe-2"
            >
              {post.title}
            </div>
            <Badge pill bg={post.active ? "primary" : "warning"}>
              {post.active ? "active" : "draft"}
            </Badge>
          </div>
          <div>
            <AiOutlineEdit
              style={{ cursor: "pointer" }}
              className="me-2 link-primary"
              size={28}
              onClick={() => {
                navigate(`/updateJobPost/${post.id}`);
              }}
            />
            <HiOutlineTrash
              style={{ cursor: "pointer" }}
              className="me-2 link-danger"
              size={28}
              onClick={() => {
                setChosenToDeleteJob({ id: post.id, name: post.title });
                setModalState(ModalListState.CONFIRM);
              }}
            />
          </div>
        </div>
        <div>
          Created At: {format(parseISO(post.createdAt), "HH:mm dd/MM/yyyy")}
        </div>
        <div className="d-flex mt-2 justify-content-between">
          <div>
            <Button
              variant="primary"
              onClick={() => navigate(`/job-applications/${post.id}`)}
            >
              Show Applications
            </Button>
            <Button
              className="ms-2"
              variant="info"
              onClick={() => navigate(`/job/${post.id}`)}
            >
              View Detail
            </Button>
          </div>
          {!post.active && (
            <Button
              variant="info"
              onClick={() => handleUpdateJob(post.id, { active: true })}
            >
              Re-open Job
            </Button>
          )}
          {post.active && (
            <Button
              variant="danger"
              onClick={() => handleUpdateJob(post.id, { active: false })}
            >
              Mark job as draft
            </Button>
          )}
        </div>
      </ListGroup.Item>
    ));
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  // if (!user || role === "employoee") return <Redirect to="/" />;

  return (
    <MainLayout>
      <div className="w-100 my-5" style={{ backgroundColor: "#fff" }}>
        <div className="d-flex justify-content-between align-items-center pt-4 px-5">
          <strong style={{ fontSize: "30px" }}> Company Recent Jobs</strong>
          <DropdownButton
            variant="secondary"
            title="Filter Posts"
            className="d-flex align-items-center ml-5 mr-5 pl-5 pr-5"
          >
            <Dropdown.Item
              onClick={() => {
                setFilter("all");
              }}
            >
              All Posts
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setFilter("active");
              }}
            >
              Active Posts
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setFilter("draft");
              }}
            >
              Draft Posts
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="p-2">
          <ListGroup variant="flush" className="ml-5 mr-5 mt-2 px-5">
            {filter === "all" && renderPosts(posts)}
            {filter === "active" &&
              renderPosts(posts.filter((post) => post.active))}
            {filter === "draft" &&
              renderPosts(posts.filter((post) => !post.active))}
          </ListGroup>

          <CustomPagination
            current={page}
            total={total}
            onChangePage={onChangePage}
            limit={limit}
          />
          <ConfirmationModal
            showModal={modalState === ModalListState.CONFIRM}
            title={`Confirm Delete Job`}
            handleDeleteResource={handleDeleteJob}
            choosenToDeleteResource={chosenToDeleteJob}
            handleClose={() => {
              setModalState(ModalListState.CLOSE);
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default ManageJobPosts;
