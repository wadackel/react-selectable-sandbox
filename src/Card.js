import React from "react";

const Card = (props) => {
  const {
    children,
    style,
    selected
  } = props;

  const finalStyle = {
    ...style,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    background: "#efefef",
    color: "#ccc",
    fontSize: 18,
    fontWeight: "bold"
  };

  return (
    <div style={!selected ? finalStyle : {
      ...finalStyle,
      border: "2px solid #4078c0",
      transform: "scale(.95)"
    }}>
      {children}
    </div>
  );
};

export default Card;
