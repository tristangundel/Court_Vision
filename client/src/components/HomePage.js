import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// class HomePage extends React.Component {
//   render() {
//     return <Container className='bg-dark'></Container>;
//   }
// }

// export default HomePage;

import api from "./teams";

const IndexPage = () => {
  // Create state variables
  let [responseData, setResponseData] = React.useState("");
  // fetches data
  const fetchData = (e) => {
    e.preventDefault();
    api
      .getData()
      .then((response) => {
        setResponseData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>{responseData.title}</h1>
      <button onClick={(e) => fetchData(e)} type='button'>
        Click Me For Data
      </button>
      {responseData.dates &&
        responseData.dates.map((date) => {
          return <p>{date}</p>;
        })}
    </div>
  );
};
export default IndexPage;
