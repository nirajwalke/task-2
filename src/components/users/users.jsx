import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Pagination, Form } from "react-bootstrap";
import "./users.css";
import { useParams, Link } from "react-router-dom";

const Users = (props) => {
  const [masterData, setMasterData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const pageSize = 10;

  useEffect(() => {
    fetch("https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json").then((resultMain) => {
      resultMain.json().then((respMain) => {
        console.warn("result", respMain);
        fetch("https://json-server-task-1.herokuapp.com/taskusers/").then((result) => {
      result.json().then((resp) => {
        console.warn("result", resp);
        let fullData = [...respMain, ...resp];
        setMasterData(fullData);
        let tempData = fullData.slice(0, 10);
        setData(tempData);
        setFilteredData(fullData);
      });
    });
      });
    
  })}, []);

  const previousPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const nextPage = () => {
    if (filteredData.length > pageSize * pageNo) {
      setPageNo(pageNo + 1);
    }
  };

  const onSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  const onSearch = (e) => {
    setPageNo(1);
    let tempFilteredData = masterData.filter(
      (d) =>
        d.first_name.toLowerCase().startsWith(searchKey.toLowerCase()) ||
        d.last_name.toLowerCase().startsWith(searchKey.toLowerCase())
    );
    let tempData = tempFilteredData.slice(0, 10);
    setData(tempData);
    setFilteredData(tempFilteredData);
  };

  const onSort = (key, direction) => {
    let i = 1;
    if (direction === "desc") {
      i = -1;
    }
    let tempData = filteredData.sort((a, b) =>
      a[key] > b[key] ? 1 * i : -1 * i
    );
    setPageNo(1);
    setFilteredData(tempData);
    setData(tempData.slice(1, 10));
  };

  useEffect(() => {
    buildData();
  }, [pageNo]);

  const buildData = () => {
    let startRecord = (pageNo - 1) * pageSize;
    let endRecord = pageSize * pageNo;
    let tempData = filteredData.slice(startRecord, endRecord);
    setData(tempData);
  };

  // useEffect(() => {
  //   console.log("id", id);
  //   fetch("http://localhost:3000/users/" + id)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data);
  //     })
  //     .catch((e) => {
  //       console.log("Eror", JSON.stringify(e));
  //     });
  // }, [id]);

  const getArrowUp = (key) => {
    return (
      <span
        onClick={() => {
          onSort(key, "asc");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-up"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </span>
    );
  };

  const getArrowDown = (key) => {
    return (
      <span
        onClick={() => {
          onSort(key, "desc");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
          />
        </svg>
      </span>
    );
  };

  return (
    <>
      <h2 as="Col">User Details</h2>
      <Row>
        <Col width="50%"></Col>
        <Col>
          <Row>
            <Col md={6}>
              <Form.Control placeholder="Search" onChange={onSearchChange} />
            </Col>
            <Col md={1}>
              <Button type="button" className="btn" onClick={onSearch}>
                <svg width="15px" height="15px">
                  <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                </svg>
              </Button>
            </Col>
            <Col md={1}>
              <Button onClick={previousPage}>{"<"}</Button>
            </Col>
            <Col md={2}>
              <Pagination size="sm">
                {pageNo > 1 && (
                  <Pagination.Item key={pageNo - 1}>
                    {pageNo - 1}
                  </Pagination.Item>
                )}
                <Pagination.Item key={pageNo} active>
                  {pageNo}
                </Pagination.Item>
                {pageNo < Math.abs(filteredData.length / 10) && (
                  <Pagination.Item key={pageNo + 1}>
                    {pageNo + 1}
                  </Pagination.Item>
                )}
              </Pagination>
            </Col>
            <Col md={1}>
              <Button onClick={nextPage}>{">"}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              {getArrowDown("first_name")}First Name{getArrowUp("first_name")}
            </th>
            <th>
              {getArrowDown("last_name")}Last Name{getArrowUp("last_name")}
            </th>
            <th>
              {getArrowDown("company_name")}Company Name
              {getArrowUp("company_name")}
            </th>
            <th>
              {getArrowDown("city")}City{getArrowUp("city")}
            </th>
            <th>
              {getArrowDown("state")}State{getArrowUp("state")}
            </th>
            <th>
              {getArrowDown("zip")}Zip{getArrowUp("zip")}
            </th>
            <th>
              {getArrowDown("email")}Email{getArrowUp("email")}
            </th>
            <th>
              {getArrowDown("web")}Web{getArrowUp("web")}
            </th>
            <th>
              {getArrowDown("age")}Age{getArrowUp("age")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item?.first_name}</td>
              <td>{item?.last_name}</td>
              <td>{item?.company_name}</td>
              <td>{item?.city}</td>
              <td>{item?.state}</td>
              <td>{item?.zip}</td>
              <td>{item?.email}</td>
              <td>
                <Link to={"//" + item?.web} target="_blank">
                  {item?.web}
                </Link>
              </td>
              <td>{item?.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Link as={Col} to={"/login"}>
          <Button type="button">Login</Button>
        </Link>
      </Row>
    </>
  );
};

export default Users;
