"use client";

const ErrorPage = ({ error }) => {
  return (
    <div id="error">
      <h2>An error occured, try to navigate to the correct news!</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default ErrorPage;
