import React from "react";
import { Button, Form } from "react-bootstrap";
// import { renderErrorMessage } from '../../helpers';

interface FormUpdateDetailEventProps {
  errSearch?: any;
  searchedFamily?: [];
  formUpdateEvent: any;
  handleUpdateEvent: (event: any) => void;
  submitUpdatevent: (event: any) => void;
  handleChooseFamily: (event: any, family: any) => void;
  disableButton: boolean;
  errorMessage?: string[];
}
export const renderSearchFamily = (
  listFamily: [],
  handleChooseFamily: (event: any, family: any) => void
) => {
  return listFamily.map((family: any) => {
    return (
      <>
        <div
          onClick={(e) => handleChooseFamily(e, family)}
          className="alert alert-success"
          style={{ width: "100%", cursor: "pointer" }}
          role="alert"
          id={family.id}
        >
          Địa chỉ : {family.address} <br />
          Chủ hộ : {family.owner}
        </div>
      </>
    );
  });
};

const FormUpdateDetailEvent = (props: FormUpdateDetailEventProps) => {
  return (
    <div>
      <div>
        {/* {props.errSearch && renderErrorMessage(props.errSearch)}
        {props.errorMessage && renderErrorMessage(props.errorMessage)} */}

        <Form className="add-member-form" onSubmit={props.submitUpdatevent}>
          <Form.Group className="mb-3">
            <Form.Label>Tên chủ hộ</Form.Label>
            <Form.Control
              placeholder={props.formUpdateEvent.owner || "Tên chủ hộ"}
              name="owner"
              onChange={props.handleUpdateEvent}
            />
          </Form.Group>
          {props.searchedFamily &&
            renderSearchFamily(props.searchedFamily, props.handleChooseFamily)}

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ hộ</Form.Label>
            <Form.Control
              placeholder={props.formUpdateEvent.address || "Địa chỉ hộ"}
              name="address"
              onChange={props.handleUpdateEvent}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số tiền thu (VND)</Form.Label>
            <Form.Control
              placeholder="Số tiền thu"
              name="amount"
              onChange={props.handleUpdateEvent}
            />
          </Form.Group>

          <Form.Group controlId="formGrid">
            <Form.Label>Thời gian thu</Form.Label>
            <Form.Control
              type="date"
              name="time"
              placeholder="Chọn ngày bắt đầu"
              // max={today}
              onChange={props.handleUpdateEvent}
            />
          </Form.Group>

          <div className="button-add">
            <Button
              style={{ width: "20%" }}
              variant="primary"
              type="submit"
              disabled={props.disableButton}
            >
              Thêm
            </Button>
          </div>
          <p style={{ fontStyle: "italic", fontSize: 12 }}>
            *Nhập tên chủ hộ để thực hiện tìm kiếm hộ gia đình nhanh hơn
          </p>
        </Form>
      </div>
    </div>
  );
};

export default FormUpdateDetailEvent;
