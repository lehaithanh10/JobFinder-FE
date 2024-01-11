import { Badge, Card } from "react-bootstrap";
import { RiCoinsFill } from "react-icons/ri";
import defaultImage from "../../img/defaultImage/default-placeholder.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JobCard.scss";
import { JobKeyWord } from "../../types/job";

export interface IJobCardProp {
  id: string;
  logo: string;
  title: string;
  salary: number;
  requirement: string;
  keywords?: JobKeyWord[];
  location?: string;
  createdAt: string;
  onClick: () => void;
}

const renderTags = (tags: JobKeyWord[]) => {
  return tags.map((tag, id) => {
    return (
      <Badge
        key={id}
        style={{ marginRight: "5%", backgroundColor: "red" }}
        pill
      >
        {tag.title}
      </Badge>
    );
  });
};

const renderStatus = (createdAt: string) => {
  let timeFooter = "minute(s)";

  let diffTime = Math.floor(
    Math.abs(new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60)
  );
  if (diffTime > 60) {
    diffTime = Math.floor(diffTime / 60);
    timeFooter = "hour(s)";
    if (diffTime > 24) {
      diffTime = Math.floor(diffTime / 24);
      timeFooter = "day(s)";
    }
  }

  return `${diffTime} ${timeFooter} ago`;
};

const JobCard = (props: IJobCardProp) => {
  const { logo, title, salary, keywords, createdAt, location } = props;
  return (
    <div
      onClick={props.onClick}
      className="top-job-detail"
      style={{ cursor: "pointer", minHeight: "30vh" }}
    >
      <Card className="mb-2 d-flex align-items-center">
        <Card.Img
          className="job-logo ratio ratio-1x1"
          variant="top"
          src={logo || defaultImage}
        />

        <Card.Body className="py-4">
          <Card.Title className="text-left" style={{ minHeight: "10vh" }}>
            {title}
          </Card.Title>
          <Card.Text className="job-middle">
            <div
              className="d-flex align-items-center w-50"
              style={{ color: "green" }}
            >
              <RiCoinsFill size={28}></RiCoinsFill>
              <div style={{ marginLeft: "5px", fontSize: "20px" }}>
                {salary}
              </div>
            </div>
          </Card.Text>
          <Card.Text className="job-bottom">
            <div
              className="tag-list"
              style={{ width: "70%", minHeight: "15vh" }}
            >
              {renderTags(keywords || [])}
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between flex-column py-4 h-100">
          <small className="text-muted text-center">{location}</small>
          <small className="text-muted text-center">
            {renderStatus(createdAt)}
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default JobCard;
