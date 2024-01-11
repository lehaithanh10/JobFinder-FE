import { Card } from "react-bootstrap";
import "./CompanyCardHome.scss";
import defaultImage from "../../img/defaultImage/default-placeholder.png";

export interface ICompanyCardProp {
  key: string;
  src: string;
  companyName: string;
  address: string;
  onClick: () => void;
}

const CompanyCardHome = (props: ICompanyCardProp) => {
  const { src, companyName, address } = props;
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      className="top-company-detail"
    >
      <Card>
        <div className="d-flex flex-grow justify-content-center">
          <Card.Img
            placeholder=""
            className="img"
            variant="top"
            src={src || defaultImage}
            style={{ aspectRatio: "1/1", maxHeight: "32vh" }}
          />
        </div>
        <Card.Body>
          <Card.Title style={{ minHeight: "6vh" }} className="text-center">
            {companyName}
          </Card.Title>
        </Card.Body>
        <Card.Footer className="company-footer min-vh-50">
          {!!address.length && <small className="address">{address}</small>}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CompanyCardHome;
