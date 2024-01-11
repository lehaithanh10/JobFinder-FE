export const renderErrorMessage = (errs: string[]) => {
  return errs.map((err) => {
    return (
      <div
        className="alert alert-danger"
        style={{ width: "100%" }}
        role="alert"
      >
        {err}
      </div>
    );
  });
};
