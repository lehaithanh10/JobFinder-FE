import { Button, Card } from "react-bootstrap";
import defaultImage from "../../img/defaultImage/default-placeholder.png";
import { useNavigate } from "react-router-dom";

export interface ICompanyCardJobDetailProp {
  src: string;
  companyName: string;
  address: string;
  companyId: string;
  userId: string;
}

const CompanyCardJobDetail = (props: ICompanyCardJobDetailProp) => {
  const { src, companyName, address, userId } = props;
  const navigate = useNavigate();

  const redirectCompany = () => {
    navigate(`/company/${userId}`);
  };

  return (
    <div className="w-100">
      <Card>
        <Card.Img
          placeholder=""
          className="img min-vh-30"
          variant="top"
          src={src || defaultImage}
        />
        <Card.Body>
          <Card.Title className="text-center">{companyName}</Card.Title>
        </Card.Body>
        <Card.Footer className="d-flex flex-column align-items-center justify-content-center">
          <small className="address">{address}</small>
          <Button
            className="w-100 mt-2"
            variant="danger"
            onClick={redirectCompany}
          >
            About Us
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CompanyCardJobDetail;
