import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Swal from "sweetalert2";
import MainLayout from "../../layout/MainLayout";
import { notify } from "../../helpers/notify";
import { useDispatch, useSelector } from "react-redux";
import { IUserInfo } from "../../types/user";
import { RootState } from "../../redux/reduxStore";
import { IApiGetCompanyResponse } from "../../types/company";
import { validateImageFile } from "../../util/validateImageFile";
import defaultImage from "../../img/defaultImage/default-placeholder.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { uploadFile } from "../../api/uploadFile";
import { isErrorHttpResponse } from "../../helpers/checkHttpResponseStatus";
import {
  UpdateEmployeeInfo,
  employerUpdateTheirInformation,
} from "../../api/employer";
import { setCurrentCompany } from "../../redux/company/CompanyAction";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

function UpdateProfile() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user: IUserInfo | undefined = useSelector(
    (state: RootState) => state.user.currentUser
  );

  const company: IApiGetCompanyResponse | undefined = useSelector(
    (state: RootState) => state.company.currentCompany
  );

  const [currenImgs, setCurrentImgs] = useState(
    company?.companyImages || ([""] as string[])
  );
  const [imagesFromUser, setImagesFromUser] = useState([] as { url: string }[]);
  const [description, setDescription] = useState(company?.description);
  const [name, setName] = useState(company?.companyName);
  const [locations, setLocations] = useState(company?.location);
  const [logo, setLogo] = useState(undefined);
  const [logoUrl, setLogoUrl] = useState(company?.logo || "");
  const classes = useStyles();

  const renderImages = (images: { url: string }[]) => {
    return images.map((image, index: number) => (
      <div key={index} className=" d-flex align-items-start ms-1">
        <Image src={image.url} rounded height="171" width="180" />
        <Button
          variant="danger"
          size="sm"
          className="ms-2 rounded ratio ratio-16x9"
          onClick={() => deleteUploadImage(image.url)}
        >
          X
        </Button>
      </div>
    ));
  };

  const renderCurrentImgs = (imageLinks: string[]) => {
    return imageLinks.map((imageLink, index: number) => (
      <div key={index} className="d-flex align-items-start ms-1">
        <Image src={imageLink} rounded height="171" width="180" />
        <Button
          variant="danger"
          size="sm"
          className="ms-2 rounded ratio 16x9"
          onClick={() => deleteCurrentImg(imageLink)}
        >
          X
        </Button>
      </div>
    ));
  };

  const handleUploadImage = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    if (!validateImageFile(file.type)) {
      return Swal.fire("Oops...", "Must upload image file only!", "error");
    }
    const url = URL.createObjectURL(file);
    file.url = url;
    setImagesFromUser([...imagesFromUser, file]);
  };

  const handleUploadLogo = (e: any) => {
    const newLogo = e.target.files[0];
    console.log(newLogo);

    if (!validateImageFile(newLogo.type))
      return Swal.fire("Oops...", "Must upload image file only!", "error");
    const url = URL.createObjectURL(newLogo);
    setLogoUrl(url);
    setLogo(newLogo);
  };

  const deleteUploadImage = (url: string) => {
    setImagesFromUser(imagesFromUser.filter((image) => image.url !== url));
  };

  const deleteCurrentImg = (url: string) => {
    setCurrentImgs(currenImgs.filter((link) => link !== url));
  };

  const handleChangeDescription = (e: any) => {
    console.log(description);
    setDescription(e.target.value);
  };

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e: any) => {
    setLocations(e.target.value);
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    let linkImages = [];

    if (imagesFromUser.length > 0) {
      const customImages = imagesFromUser.map((image) => {
        return image;
      });
      for (let image of customImages) {
        const imageLinkData = await uploadFile(image);
        if (isErrorHttpResponse(imageLinkData)) {
          return Swal.fire(
            "Oops...",
            "There is some thing wrong when upload your image",
            "error"
          );
        } else {
          linkImages.push(imageLinkData.data);
        }
      }
    }

    const form = {} as UpdateEmployeeInfo;

    if (logo) {
      const imageLinkData = await uploadFile(logo);
      if (isErrorHttpResponse(imageLinkData)) {
        return Swal.fire(
          "Oops...",
          "There is some thing wrong when upload your image",
          "error"
        );
      } else {
        form.logo = imageLinkData.data;
      }
    }

    if (description) {
      form.description = description;
    }
    if (name) {
      form.companyName = name;
    }
    if (locations) {
      form.location = locations;
    }

    form.companyImages = currenImgs.concat(linkImages);

    console.log(form);

    const res = await employerUpdateTheirInformation(form);

    if (isErrorHttpResponse(res)) {
      return Swal.fire("Oops...", res.message.join(", "), "error");
    } else {
      dispatch(setCurrentCompany(res.data));
      notify(`Update company's profile successed`, () => {
        navigate(`/company/${company?.userId}`);
      });
    }
  };

  // if (!user || role === "employee") return <Redirect to="/" />;

  return (
    <MainLayout>
      <Form
        style={{ backgroundColor: "#fff" }}
        className="p-5 my-5"
        onSubmit={handleSubmitForm}
      >
        <Form.Group className="mt-2">
          <Form.Label>
            <h4>
              <strong>Company email</strong>
            </h4>
          </Form.Label>
          <Form.Control type="text" readOnly defaultValue={user?.email} />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>
            <h4>
              <strong>Company Logo</strong>
            </h4>
          </Form.Label>
          <Row className="mb-2">
            <Col className="d-flex" xs={12} md={6}>
              <Image
                src={logoUrl || defaultImage}
                rounded
                height="171"
                width="180"
              />
              <div className="d-flex flex-column align-items-center">
                <Button
                  variant="danger"
                  size="sm"
                  style={{ height: "4vh", width: "60%" }}
                  onClick={() => {
                    setLogo(undefined);
                    setLogoUrl("");
                  }}
                >
                  X
                </Button>
                <div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="logo-button-file"
                    type="file"
                    onChange={handleUploadLogo}
                  />
                  <label htmlFor="logo-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>
            <h4>
              <strong>Company Name</strong>
            </h4>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={user?.name || "Enter company name"}
            onChange={onChangeName}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>
            <h4>
              <strong>Description</strong>
            </h4>
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
              handleChangeDescription({
                target: {
                  name: "description",
                  value: editor.getData(),
                },
              });
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-2">
            <h4>
              <strong>Locations</strong>
            </h4>
          </Form.Label>
          <div className="d-flex mb-2">
            <Form.Control
              className="w-50"
              as="input"
              value={locations}
              onChange={(e) => handleLocationChange(e)}
            ></Form.Control>
          </div>
        </Form.Group>
        {!!company?.companyImages.length && (
          <Form.Group className="mt-2">
            <Form.Label>
              <h4>
                <strong>Current Images</strong>
              </h4>
            </Form.Label>
            <div className="d-flex mb-2">{renderCurrentImgs(currenImgs)}</div>
          </Form.Group>
        )}
        <Form.Group className="mt-2 ">
          <div className="d-flex align-items-center">
            <div className="h-100 py-3 d-flex align-items-center">
              <h4>
                <strong>Upload Images</strong>
              </h4>
            </div>
            <div>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handleUploadImage}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          </div>
          <div className="d-flex mb-2">{renderImages(imagesFromUser)}</div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </MainLayout>
  );
}

export default UpdateProfile;
