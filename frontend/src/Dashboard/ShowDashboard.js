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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
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
      .get("http://localhost:5000/print/orders/admin/042023")
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
  const dataUser = [
    {
      id: 1,
      name: "Lê Hoàng Anh Vũ",
      borrows: 24,
      returns: 20,
    },
    {
      id: 2,
      name: "Lê Quốc An",
      borrows: 24,
      returns: 20,
    },
    {
      id: 3,
      name: "Đỗ Văn Bâng",
      borrows: 24,
      returns: 20,
    },
    {
      id: 4,
      name: "Trương Đức Dũng",
      borrows: 24,
      returns: 20,
    },
    {
      id: 5,
      name: "Cù Hoàng Nguyễn Sơn",
      borrows: 24,
      returns: 20,
    },
    {
      id: 6,
      name: "Nguyễn Tấn Cường",
      borrows: 24,
      returns: 20,
    },
    {
      id: 7,
      name: "Lê Minh Thiên",
      borrows: 24,
      returns: 20,
    },
  ];
  const dataChart = [
    {
      name: "Tháng 6",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Tháng 7",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Tháng 8",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Tháng 9",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Tháng 10",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Tháng 11",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Tháng 12",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
              <Card.Title>Tổng số đơn in</Card.Title>
              <Card.Text>{totalUser}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={dataChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amt" fill="#8884d8" name="Số sách trả" />
            <Bar dataKey="uv" fill="#82ca9d" name="Số sách mượn" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dataChart}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Số lượt truy cập"
            />
            <Line
              type="monotone"
              dataKey="amt"
              stroke="#82ca9d"
              name="Số sách mượn"
            />
          </LineChart>
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
