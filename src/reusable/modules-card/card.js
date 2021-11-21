import React from "react";
import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Card = ({ icon, module, bgColor, path, moduleName, permission }) => {
  console.log(permission);
  const history = useHistory();
  // const dispatch = useDispatch()
  const setModule = (name) => {
    // dispatch({ type: "SET_MODULE", name });
    // console.log(name)
    console.log(moduleName);
    return localStorage.setItem("currentModule", name);
  };
  return (
    <div
      onClick={() => {
        if (permission === 1) {
          history.push(path);
        } else if (permission === 0) {
          alert("You dont have permision to access this module");
        }
        setModule(moduleName);
      }}
      style={{ backgroundColor: bgColor }}
      className="module"
    >
      <div className="module-icon">{icon}</div>
      <span className="module-text">{module}</span>
    </div>
  );
};

export default Card;
