import {
  query,
  where,
  orderBy,
  limit,
  getDocs,
  database,
  collection,
  getCountFromServer,
} from "../db/firebase";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Table from "../components/table/Table";
import React, { useEffect, useState } from "react";
import StatusCard from "../components/status-card/StatusCard";

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
  ],
};

const renderOrderHead = (item, index) => {
  return <th key={index}>{item}</th>;
};

const renderOrderBody = (item, index) => {
  return (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.user}</td>
      <td>{item.price}</td>
      <td>{item.date}</td>
    </tr>
  );
};

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [vendorsCount, setVendorsCount] = useState(0);
  const [pickupCount, setPickupCount] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    getCounts();
    getTopCustomers();
  }, []);

  const getTopCustomers = async () => {
    const topCustomersQuery = query(
      collection(database, "users"),
      orderBy("points", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(topCustomersQuery);
    const topCustomersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTopCustomers(topCustomersList);
  };

  const getCounts = async () => {
    getCountFromServer(collection(database, "pickupRequests")).then(
      (snapshot) => {
        setPickupCount(snapshot.data().count);
      }
    );

    getCountFromServer(
      query(collection(database, "users"), where("isVendor", "!=", true))
    ).then((snapshot) => {
      setUsersCount(snapshot.data().count);
    });

    getCountFromServer(
      query(collection(database, "users"), where("isVendor", "==", true))
    ).then((snapshot) => {
      setVendorsCount(snapshot.data().count);
    });
  };

  return (
    <div className="dashboard">
      <div style={{ display: "flex", marginLeft: 20 }}>
        {/* <MenuBar/> */}
        <h2 className="page-header">Dashboard</h2>
      </div>
      <div className="row">
        <div className="col-12 fullWidthOnMobile" style={{ padding: 0 }}>
          <div className="row">
            <div className="col-6">
              <StatusCard
                icon="bx bx-user-pin"
                title="Pickup Requests"
                count={pickupCount}
              />
            </div>
            <div className="col-6">
              <StatusCard
                icon="bx bx-id-card"
                title="Vendors Requests"
                count={vendorsCount}
              />
            </div>
            <div className="col-6">
              <StatusCard
                icon="bx bx-id-card"
                title="Total Users"
                count={usersCount}
              />
            </div>
            <div className="col-6">
              <StatusCard
                icon="bx bx-user-pin"
                title="Total Customers"
                count={topCustomers.length}
              />
            </div>
          </div>
        </div>
        <div className="col-4 fullWidthOnMobile">
          <div className="card">
            <div className="card__header">
              <h3>Top Customers</h3>
            </div>
            <div className="card__body text-align-left-important">
              <Table
                headData={["User Name", "Points"]}
                bodyData={topCustomers}
                renderHead={(item, index) => <th key={index}>{item}</th>}
                renderBody={(item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.points}</td>
                  </tr>
                )}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View All</Link>
            </div>
          </div>
        </div>
        <div className="col-8 fullWidthOnMobile">
          <div className="card">
            <div className="card__header">
              <h3>Latest Orders</h3>
            </div>
            <div className="card__body">
              <Table
                headData={["Order ID", "User", "Total Price", "Date", "Status"]}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
