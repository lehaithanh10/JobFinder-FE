import { Form, Button, Row } from "react-bootstrap";
import { Grid, makeStyles } from "@material-ui/core";
import { MdAttachMoney } from "react-icons/md";
import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { notify } from "../../shared/notify";
import { useSelector } from "react-redux";
import { IUserInfo } from "../../types/user";
import { RootState } from "../../redux/reduxStore";
import { fetchJobDetail, updateJobPost } from "../../api/job";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";
import { JobInfo } from "../../types/job";
import Swal from "sweetalert2";
import { keywordData } from "../../shared/data";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function UpdateJobPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState<JobInfo>({} as JobInfo);
  const [description, setDescription] = useState<string>("");
  const [requirement, setRequirement] = useState<string>("");

  useEffect(() => {
    handleFetchJobDetail(jobId!);
  }, [jobId]);

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const classes = useStyles();

  const handleFetchJobDetail = async (jobId: string) => {
    const data = await fetchJobDetail(jobId);

    if (isErrorHttpResponse(data)) {
      return Swal.fire(
        "Oops...",
        `There is some thing wrong when get job detail ${data.message.join(
          ", "
        )}`,
        "error"
      );
    } else {
      setJob(data.data);
      setDescription(data.data.description);
      setRequirement(data.data.requirement);
    }
  };

  const handleChangeJob = async (e: any) => {
    console.log("event here", e);
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocationChange = (index: number, value: string) => {
    const updatedLocations = [...job.locations];
    updatedLocations[index] = value;
    handleChangeJob({
      target: {
        name: "locations",
        value: updatedLocations,
      },
    });
  };

  const addLocation = () => {
    handleChangeJob({
      target: {
        name: "locations",
        value: job.locations.concat([""]),
      },
    });
  };

  const removeLocation = (index: number) => {
    const updatedLocations = [...job.locations];
    updatedLocations.splice(index, 1);
    handleChangeJob({
      target: {
        name: "locations",
        value: updatedLocations,
      },
    });
  };

  const handleKeywordSkillChange = (
    index: number,
    value: { title?: string; score?: string }
  ) => {
    const updatedKeywordSkills = [...job.keywords];
    updatedKeywordSkills[index] = {
      ...updatedKeywordSkills[index],
      ...value,
    };
    handleChangeJob({
      target: {
        name: "keywords",
        value: updatedKeywordSkills,
      },
    });
  };

  const addKeywordSkill = () => {
    handleChangeJob({
      target: {
        name: "keywords",
        value: job.keywords.concat([{ title: "" }]),
      },
    });
  };

  const removeKeywordSkill = (index: number) => {
    const updatedKeywordSkills = [...job.keywords];
    updatedKeywordSkills.splice(index, 1);
    handleChangeJob({
      target: {
        name: "keywords",
        value: updatedKeywordSkills,
      },
    });
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    if (jobId) {
      const data = await updateJobPost(jobId, {
        ...job,
        description,
        requirement,
      });

      if (isErrorHttpResponse(data)) {
        return Swal.fire(
          "Oops...",
          `There is some thing wrong update job information ${data.message.join(
            ", "
          )}`,
          "error"
        );
      } else {
        notify("Update job successfully", () => {
          navigate(`/job/${data.data.id}`);
        });
      }
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
          {`Update Job ${!!job.title ? job.title : ""}`}
        </Form.Label>

        <Form.Group>
          <Form.Label>
            <strong style={{ fontSize: "20px" }}>Job Title</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            required
            name="title"
            value={job.title}
            onChange={(e) => handleChangeJob(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>Description</strong>
          </Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={description || "<p> Add your description here </p>"}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "20vh",
                  editor.editing.view.document.getRoot()!
                );
              });
            }}
            onChange={(event, editor) => {
              setDescription(editor.getData());
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>Requirement</strong>
          </Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={requirement || "<p> Add your description here </p>"}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "20vh",
                  editor.editing.view.document.getRoot()!
                );
              });
            }}
            onChange={(event, editor) => {
              setRequirement(editor.getData());
            }}
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
                  name="salary"
                  value={job.salary}
                  onChange={(e) =>
                    handleChangeJob({
                      target: {
                        name: "salary",
                        value: Number(e.target.value),
                      },
                    })
                  }
                ></Form.Control>
              </Grid>
            </Grid>
          </div>
        </Form.Group>

        <Form.Group className="d-flex flex-column">
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>Keyword Skills</strong>
          </Form.Label>
          {!!job.keywords &&
            job.keywords.map((keyword, index: number) => (
              <div className="d-flex mb-2 align-items-end" key={index}>
                <div style={{ width: "40%" }} className="d-flex flex-column">
                  <Form.Label>
                    <strong style={{ fontSize: "18px" }}>Title</strong>
                  </Form.Label>
                  <Form.Control
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
                    list="keyword-data"
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

          <datalist id="data">
            {keywordData.map((option) => (
              <option>{option}</option>
            ))}
          </datalist>

          <Button className="w-25" onClick={addKeywordSkill}>
            Add a keyword skill
          </Button>
        </Form.Group>

        <Form.Group className="d-flex flex-column">
          <Form.Label className="mt-3">
            <strong style={{ fontSize: "20px" }}>Locations</strong>
          </Form.Label>
          {!!job.locations &&
            job.locations.map((location, index) => (
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

          <Button className="w-25" onClick={addLocation}>
            Add a location
          </Button>
        </Form.Group>

        <Form.Check
          type="checkbox"
          checked={!job.active}
          id="custom-switch"
          label="Mark as draft"
          className="mt-4"
          style={{ fontSize: "1.4rem", fontWeight: 600 }}
          onChange={(e: any) => {
            handleChangeJob({
              target: {
                name: "active",
                value: !e.target.checked,
              },
            });
          }}
        />

        <Row className="d-flex justify-content-center">
          <Button className="mt-3 w-25" variant="success" type="submit">
            Save change
          </Button>
        </Row>
      </Form>
    </MainLayout>
  );
}

export default UpdateJobPage;
