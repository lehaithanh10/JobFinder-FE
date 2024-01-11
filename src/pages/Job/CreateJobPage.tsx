import { Form, Button, Row } from "react-bootstrap";
import { Grid, makeStyles } from "@material-ui/core";
import { MdAttachMoney } from "react-icons/md";
import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { notify } from "../../shared/notify";
import { useSelector } from "react-redux";
import { IUserInfo } from "../../types/user";
import { RootState } from "../../redux/reduxStore";
import { CKEditor } from "ckeditor4-react";
import { IApiGetCompanyResponse } from "../../types/company";
import { createNewJob } from "../../api/job";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { keywordData } from "../../shared/data";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function CreateJobPage() {
  const [salary, setSalary] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [keywords, setKeywords] = useState([{ title: "" }] as {
    title: string;
    score?: string;
  }[]);
  const [locations, setLocations] = useState([""] as string[]);
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

  const handleLocationChange = (index: number, value: string) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

  const addLocation = () => {
    setLocations([...locations, ""]);
  };

  const removeLocation = (index: number) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };

  const handleKeywordSkillChange = (
    index: number,
    value: { title?: string; score?: string }
  ) => {
    const updatedKeywordSkills = [...keywords];
    updatedKeywordSkills[index] = {
      ...updatedKeywordSkills[index],
      ...value,
    };
    setKeywords(updatedKeywordSkills);
  };

  const addKeywordSkill = () => {
    setKeywords([...keywords, { title: "" }]);
  };

  const removeKeywordSkill = (index: number) => {
    const updatedKeywordSkills = [...keywords];
    updatedKeywordSkills.splice(index, 1);
    setKeywords(updatedKeywordSkills);
  };

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const company: IApiGetCompanyResponse | undefined = useSelector(
    (state: RootState) => state.company.currentCompany
  );

  const classes = useStyles();

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const form = {
      title,
      salary,
      description,
      requirements,
      keywords,
      locations,
      companyId: company?.id || "",
      active,
    };

    console.log("form here", form);
    const data = await createNewJob(form);

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when create new jobs ${data.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      notify("New job is created", () => {
        return navigate(`/job/${data.data.id}`);
      });
    }
  };

  //   if (!user || role === "employee") return <Redirect to="/" />;

  return (
    <MainLayout>
      <Form
        style={{ backgroundColor: "#fff" }}
        className="p-4"
        onSubmit={handleSubmitForm}
      >
        <Form.Label style={{ fontSize: "25px", fontWeight: 700 }}>
          Create New Job
        </Form.Label>

        <Form.Group>
          <Form.Label>
            <strong style={{ fontSize: "20px" }}>Job Title</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>Description</strong>
          </Form.Label>
          <CKEditor onChange={(e: any) => setDescription(e.editor.getData())} />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>Requirement</strong>
          </Form.Label>
          <CKEditor
            onChange={(e: any) => setRequirements(e.editor.getData())}
          />
        </Form.Group>

        <Form.Group>
          <div className={classes.root}>
            <Form.Label className="mt-3" id="input-slider" gutterBottom>
              <strong style={{ fontSize: "20px" }}>Salary</strong>
            </Form.Label>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <MdAttachMoney></MdAttachMoney>
              </Grid>
              <Grid item xs>
                <Form.Control
                  className="w-100"
                  as="input"
                  value={salary}
                  onChange={(e: any) => setSalary(Number(e.target.value))}
                ></Form.Control>
              </Grid>
            </Grid>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>Keyword Skills</strong>
          </Form.Label>
          {keywords.map((keyword, index: number) => (
            <div className="d-flex mb-2 align-items-end" key={index}>
              <div style={{ width: "40%" }} className="d-flex flex-column">
                <Form.Label>
                  <strong style={{ fontSize: "18px" }}>Title</strong>
                </Form.Label>
                <Form.Control
                  list="keyword-data"
                  className="w-100"
                  as="input"
                  value={keyword.title}
                  onChange={(e: any) =>
                    handleKeywordSkillChange(index, { title: e.target.value })
                  }
                ></Form.Control>
              </div>
              <div
                style={{ width: "40%", marginLeft: "1vw" }}
                className="d-flex flex-column"
              >
                <Form.Label>
                  <strong style={{ fontSize: "18px" }}>Score</strong>
                </Form.Label>
                <Form.Control
                  className="w-100"
                  as="input"
                  value={keyword.score}
                  onChange={(e: any) =>
                    handleKeywordSkillChange(index, { score: e.target.value })
                  }
                ></Form.Control>
              </div>

              {index > 0 && (
                <Button
                  variant="danger"
                  style={{
                    width: "5vw",
                    marginLeft: "10px",
                    fontSize: "15px",
                    maxHeight: "5vh",
                  }}
                  onClick={() => removeKeywordSkill(index)}
                >
                  x
                </Button>
              )}
            </div>
          ))}
          <datalist id="keyword-data">
            {keywordData.map((option) => (
              <option>{option}</option>
            ))}
          </datalist>

          <Button onClick={addKeywordSkill}>Add a keyword skill</Button>
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>Locations</strong>
          </Form.Label>
          {locations.map((location, index) => (
            <div className="d-flex mb-2" key={index}>
              <Form.Control
                className="w-50"
                as="input"
                value={location}
                onChange={(e: any) =>
                  handleLocationChange(index, e.target.value)
                }
              ></Form.Control>
              {index > 0 && (
                <Button
                  variant="danger"
                  style={{
                    width: "5vw",
                    marginLeft: "10px",
                    fontSize: "15px",
                    maxHeight: "5vh",
                  }}
                  onClick={() => removeLocation(index)}
                >
                  x
                </Button>
              )}
            </div>
          ))}

          <Button onClick={addLocation}>Add a location</Button>
        </Form.Group>

        <Form.Check
          type="checkbox"
          checked={!active}
          id="custom-switch"
          label="Mark as draft"
          className="mt-4"
          style={{ fontSize: "1.4rem", fontWeight: 600 }}
          onChange={(e: any) => {
            setActive(!e.target.checked);
          }}
        />

        <Row className="d-flex justify-content-center">
          <Button className="mt-3 w-25" variant="success" type="submit">
            Create Job
          </Button>
        </Row>
      </Form>
    </MainLayout>
  );
}

export default CreateJobPage;
