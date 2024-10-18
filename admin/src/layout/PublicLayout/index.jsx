import React from "react";

const PublicLayout = (props) => {
  return (
    <div>
      <p>Public Layout</p>
      {props.children}
    </div>
  );
};

export default PublicLayout;
