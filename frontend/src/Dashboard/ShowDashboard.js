import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import Card from "react-bootstrap/Card";
import "./ShowDashboard.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function ShowDashboard() {
  const [orders, setOrders] = useState([]);
  const displayedOrders = orders.slice(1, 7);

  useEffect(() => {
    axios
      .get("http://localhost:5000/print/orders/admin/122023")
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {});
  }, []);
  // calculate total page
  let totalPageSum = 0;

  for (const order of orders) {
    totalPageSum += order.totalPageUsed;
  }
  // calculate total user
  const uniqueUserIDs = new Set();

  for (const order of orders) {
    uniqueUserIDs.add(order.userID);
  }

  const totalUser = uniqueUserIDs.size;
  const printOrdersCount = [];
  for (let day = 1; day <= 31; day++) {
    printOrdersCount.push({ day: day, pageCount: 0, orderCount: 0 });
  }
  // Loop through each print order
  orders.forEach((order) => {
    // Extract the print time from the order
    const printTime = new Date(order.printTime);

    // Extract the date from the print time
    const day = printTime.getDate();

    // Increment the count for the specific day
    printOrdersCount[day - 1]["pageCount"] += order.totalPageUsed;
    printOrdersCount[day - 1]["orderCount"]++;
  });
  console.log(printOrdersCount);

  return (
    <main className="container-fluid">
      <Row xs="auto" className="flex justify-content-around justify-center">
        <Col className="mx-10">
          <Card className="d-flex flex-nowrap p-3 shadow rounded border border-secondary">
            <Card.Img
              variant="top"
              src="https://icons.veryicon.com/png/o/miscellaneous/icondian/icon-order-1.png"
              className="p-4 img-fluid"
              style={{ maxWidth: "300px" }}
            />
            <Card.Body>
              <Card.Title>Tổng số đơn in</Card.Title>
              <Card.Text>{orders.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-10">
          <Card className="d-flex flex-nowrap p-3 shadow rounded border border-secondary">
            <Card.Img
              variant="top"
              src="https://cdn-icons-png.flaticon.com/512/35/35670.png"
              className="p-4 img-fluid"
              style={{ maxWidth: "300px" }}
            />
            <Card.Body>
              <Card.Title>Tổng số trang in</Card.Title>
              <Card.Text>{totalPageSum}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mx-10">
          <Card className="d-flex flex-nowrap p-3 shadow rounded border border-secondary">
            <Card.Img
              variant="top"
              src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
              className="p-4 img-fluid"
              style={{ maxWidth: "300px" }}
            />
            <Card.Body>
              <Card.Title>Tổng số người dùng</Card.Title>
              <Card.Text>{totalUser}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="charts">
        <ResponsiveContainer width="200%" height="100%">
          <BarChart
            width={1000}
            height={300}
            data={printOrdersCount}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pageCount" fill="#8884d8" name="Số trang in" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="charts">
        <ResponsiveContainer width="200%" height="100%">
          <BarChart
            width={1000}
            height={300}
            data={printOrdersCount}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orderCount" fill="#82ca9d" name="Số đơn in" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* <div className="row mt-3 gx-5">
        <div className="col">
          <div className="d-flex flex-nowrap p-3 shadow rounded border border-secondary">
            <Table>
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: "#EEEEEE",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Tên</TableCell>
                  <TableCell align="center">Số sách mượn</TableCell>
                  <TableCell align="center">Số sách trả</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataUser.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell style={{ padding: "5px" }} align="center">
                      {user.id}
                    </TableCell>
                    <TableCell
                      style={{ padding: "5px", width: "230px" }}
                      align="center"
                    >
                      {user.name}
                    </TableCell>
                    <TableCell style={{ padding: "5px" }} align="center">
                      {user.borrows}
                    </TableCell>
                    <TableCell style={{ padding: "5px" }} align="center">
                      {user.returns}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="col">
          <div className="d-flex flex-nowrap p-3 shadow rounded border border-secondary">
            <Table>
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: "#EEEEEE",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  <TableCell align="center">ISBN</TableCell>
                  <TableCell align="center">Tiêu đề</TableCell>
                  <TableCell align="center">Lượt mượn</TableCell>
                  <TableCell align="center">Lượt trả</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedBooks.map((book) => (
                  <TableRow key={book.ISBN}>
                    <TableCell style={{ padding: "5px" }} align="center">
                      {book.ISBN}
                    </TableCell>
                    <TableCell
                      style={{ padding: "5px", width: "230px" }}
                      align="center"
                    >
                      {book.title}
                    </TableCell>
                    <TableCell style={{ padding: "5px" }} align="center">
                      100
                    </TableCell>
                    <TableCell style={{ padding: "5px" }} align="center">
                      90
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div> */}
    </main>
  );
}

export default ShowDashboard;
