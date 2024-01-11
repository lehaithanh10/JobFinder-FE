import { Col, Form, Button, Row } from "react-bootstrap";
import React, { useState } from "react";
import Data, { keywordData } from "../../shared/data";
import convertUSD from "../../util/convertUSD";

export interface ISearchBarProp {
  filterSearch: React.Dispatch<React.SetStateAction<{}>>;
}

export interface ISearchBarForm {
  keyword?: string;
  locations?: string[];
  salary?: number;
}

const SearchBar = (props: ISearchBarProp) => {
  const [searchBarForm, setSearchBarForm] = useState<ISearchBarForm>(
    {} as ISearchBarForm
  );

  const [salaryValue, setSalaryValue] = useState<number>(500);
  const [locationValue, setLocationValue] = useState<string>("All");

  const handleSalaryRangeChange = (e: any) => {
    setSalaryValue(e.target.value);
    setSearchBarForm({
      ...searchBarForm,
      salary: e.target.value,
    });
  };

  const handleLocationChange = (e: any) => {
    setLocationValue(e.target.value);
    setSearchBarForm({
      ...searchBarForm,
      ...(e.target.value !== "All"
        ? { locations: [e.target.value] }
        : { locations: [] }),
    });
  };

  const onChangeForm = (e: any) => {
    const { name, value } = e.target;
    setSearchBarForm({
      ...searchBarForm,
      [name]: value,
    });
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    props.filterSearch(searchBarForm);
  };

  return (
    <Form
      className="p-4"
      style={{ backgroundColor: "rgb(33,37,41)" }}
      onSubmit={handleSubmitForm}
    >
      <div className="d-flex justify-content-start mb-3">
        <h1 style={{ color: "white", fontSize: "35px" }}>
          5000+ IT Jobs for developers
        </h1>
      </div>
      <Row className="d-flex justify-content-center align-items-start ml-1">
        <Col sm={3} className="my-1 h-100">
          <Form.Label style={{ color: "white", fontSize: "18px" }}>
            Keyword
          </Form.Label>

          <Form.Control
            list="keyword-data"
            placeholder="Search Keywords skill"
            name="keyword"
            value={searchBarForm.keyword}
            onChange={onChangeForm}
          />
          <datalist id="keyword-data">
            {keywordData.map((option) => (
              <option>{option}</option>
            ))}
          </datalist>
        </Col>

        <Col sm={3} className="my-1">
          <Form.Label style={{ color: "white", fontSize: "18px" }}>
            Location
          </Form.Label>
          <Form.Control
            as="select"
            className="mr-sm-2"
            name="locations"
            value={locationValue}
            onChange={handleLocationChange}
          >
            {Data.locationData.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </Form.Control>
        </Col>

        <Col sm={2} className="my-1">
          <Form.Label style={{ color: "white", fontSize: "20px" }}>
            Salary range
          </Form.Label>
          <Form.Range
            value={salaryValue}
            onChange={handleSalaryRangeChange}
            min={100}
            max={20000}
            step={100}
            name="salary"
          />
          <p style={{ color: "white", fontSize: "15px" }}>
            Value: {salaryValue && convertUSD(salaryValue)}
          </p>
        </Col>
        <Col xs="auto" className="mt-3">
          <br></br>
          <Button type="submit">Find Jobs</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
