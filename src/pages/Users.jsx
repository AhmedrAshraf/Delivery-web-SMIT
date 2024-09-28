import {
  doc,
  limit,
  query,
  getDoc,
  getDocs,
  orderBy,
  collection,
  startAfter,
} from "firebase/firestore";
import {
  Box,
  Grid,
  Modal,
  Switch,
  Button,
  InputLabel,
  Typography,
  NativeSelect,
  FormControlLabel,
} from "@mui/material";
import "./users.css";
import moment from "moment";
import React, { useEffect } from "react";
import { database } from "../db/firebase";
import Close from "@mui/icons-material/Close";

const style = {
  p: 4,
  top: "50%",
  width: 500,
  left: "50%",
  boxShadow: 24,
  position: "absolute",
  bgcolor: "background.paper",
  transform: "translate(-50%, -50%)",
};

const Users = () => {
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [services, setServices] = React.useState([]);
  const [lastVisible, setLastVisible] = React.useState(null);

  useEffect(() => {
    getDocs(
      query(
        collection(database, "users"),
        orderBy("createdAt", "desc"),
        limit(12)
      )
    ).then((docSnap) => {
      setLastVisible(docSnap.docs[docSnap.docs.length - 1]);
      setUsers(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const getNextPage = async () => {
    const docSnap = await getDocs(
      query(
        collection(database, "users"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(12)
      )
    );
    setPage(page + 1);
    setLastVisible(docSnap.docs[docSnap.docs.length - 1]);
    let newUsers = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers((prev) => [...prev, ...newUsers]);
  };

  const handleOpen = (item) => {
    setOpen(true);
    setUser(item);
    getDoc(doc(database, "selectedServices", item.id))
      .then((doc) => {
        setServices(doc.data()?.services || []);
      })
      .catch((e) => alert(e.message));
  };

  const handleSwitch = (e) => {
    setChecked(e.target.checked);
  };

  const handleStatusSelect = (e, service) => {
    let newServices = services.findIndex(
      (item) => item.brand === service.brand
    );
    services[newServices].status = e.target.value;
    setServices([...services]);
  };

  const tableHead = [
    "Image",
    "Name",
    "Email",
    "Phone",
    "Selected Services",
    "Created Date",
  ];

  return (
    <div>
      <div className="col-12">
        <h2 className="page-header">Customers</h2>
        <div className="card">
          <div className="card__body">
            {users.length ? (
              <div className="table-wrapper">
                <table>
                  <thead style={{ backgroundColor: "#eeeeee" }}>
                    <tr>
                      {tableHead.map((item, idx) => (
                        <th key={idx}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleOpen(item)}
                        style={{
                          height: "60px",
                          cursor: "pointer",
                          backgroundColor: index % 2 !== 0 && "#fafafa",
                        }}
                      >
                        <td>
                          <img
                            alt="user"
                            width={40}
                            height={40}
                            style={{
                              marginTop: "10px",
                              marginLeft: "10px",
                              borderRadius: "100px",
                            }}
                            src={
                              item.userImg ||
                              item.image ||
                              "https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png"
                            }
                          />
                        </td>
                        <td>{item?.name || "Scrap Admin User"}</td>
                        <td>{item?.email}</td>
                        <td>{item?.phoneNumber || "Not Provided"}</td>
                        <td>
                          {item?.activeServices ? "Selected" : "Not Selected"}
                        </td>
                        <td>{new Date(item.createdAt).toDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <table>
                  <thead style={{ backgroundColor: "#eeeeee" }}>
                    <tr>
                      {tableHead.map((item, idx) => (
                        <th key={idx}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                </table>
                <div
                  style={{
                    color: "gray",
                    margin: "20px 0",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  No More Users
                </div>
              </div>
            )}
            {users.length > 0 && (
              <div
                style={{
                  marginTop: 50,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" style={{backgroundColor:"#1BABAA"}} onClick={getNextPage}>
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="modal-popup">
          <Grid item display="flex" justifyContent={"space-between"}></Grid>
          <Box id="user-wrapper">
            <Grid item id="top-modal">
              <div className="blank"></div>
              <div className="switch-container">
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleSwitch}
                      inputProps={{ "aria-label": "controlled" }}
                      value={checked}
                      style={{ color: "#57D6E7" }}
                    />
                  }
                  label={<span style={{ fontWeight: "700" }}>Contacted:</span>}
                  labelPlacement="top"
                />
              </div>
              <div className="center">
                <img
                  src={
                    user?.userImg ||
                    user?.image ||
                    "https://freepngimg.com/thumb/google/66726-customer-account-google-service-button-search-logo.png"
                  }
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "100px",
                  }}
                  alt="users profile"
                  id="user-image"
                />
                <Typography
                  variant="h6"
                  component="h2"
                  style={{ marginTop: 10 }}
                >
                  {user?.name || "Scrap Admin User"}
                </Typography>
              </div>
              <div className="blank-left">
                <Close
                  onClick={() => setOpen(false)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </Grid>
            <div id="info-section">
              <div id="info-left">
                <Grid
                  item
                  ml={"10px"}
                  justifyContent="center"
                  display={"flex"}
                  flexDirection="column"
                >
                  <Typography variant="h6" component="h2" id="text">
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Email:
                    </span>{" "}
                    {user?.email}
                  </Typography>
                  <Typography variant="h6" component="h2" id="text">
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Phone number:
                    </span>{" "}
                    {user?.phoneNumber || "Not Provided"}
                  </Typography>
                  <Typography variant="h6" component="h2" id="text">
                    <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Address:
                    </span>{" "}
                    {user?.address || user?.city || "Not Provided"}
                  </Typography>
                </Grid>
              </div>

              <div id="info-right">
                <div id="info-right">
                  <Grid
                    item
                    ml={"10px"}
                    justifyContent="center"
                    display={"flex"}
                    flexDirection="column"
                  >
                    {services && services.length > 0 ? (
                      <div id="info-right">
                        <h3
                          style={{ textAlign: "center", marginBottom: "5px" }}
                        >
                          Services
                        </h3>
                        <div id="info-right">
                          <Grid
                            item
                            ml={"10px"}
                            justifyContent="center"
                            display={"flex"}
                            flexDirection="column"
                          >
                            <div className="servicesRow">
                              {services.map((service, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    width: "20%",
                                    display: "flex",
                                    margin: "10px 10px",
                                    textAlign: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                  }}
                                >
                                  <div className="service-logo">
                                    <img
                                      src={service.image}
                                      alt={service.brand}
                                      className="serviceIMG"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                  <InputLabel id="demo-simple-select-label"></InputLabel>
                                  <NativeSelect
                                    style={{ fontSize: "14px" }}
                                    // InputLabel="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={service.status}
                                    onChange={(e) =>
                                      handleStatusSelect(e, service)
                                    }
                                  >
                                    {service.status === "Active" ? (
                                      <>
                                        <option value={"Active"}>Active</option>
                                        <option value={"Pending"}>
                                          Pending
                                        </option>
                                      </>
                                    ) : (
                                      <>
                                        <option value={"Pending"}>
                                          Pending
                                        </option>
                                        <option value={"Active"}>Active</option>
                                      </>
                                    )}
                                  </NativeSelect>
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: "700",
                                      margin: "10px 0px",
                                    }}
                                  >
                                    Completetion Date:{" "}
                                    <span style={{ fontWeight: "400" }}>
                                      {moment(service.timestamp).format(
                                        "MM/DD/YYYY"
                                      )}
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    Package:
                                    <span style={{ fontWeight: "400" }}>
                                      {service.package
                                        .split(" ")
                                        .slice(0, 5)
                                        .join(" ")}
                                      {service.package.split(" ").length > 5
                                        ? "..."
                                        : ""}{" "}
                                    </span>
                                  </span>
                                  <Typography
                                    variant="h6"
                                    component="h2"
                                    style={{ marginTop: 10 }}
                                  >
                                    {service.name}
                                  </Typography>
                                </div>
                              ))}
                            </div>
                          </Grid>
                        </div>
                      </div>
                    ) : (
                      <div className="servicesRow">
                        <span
                          style={{
                            width: "100%",
                            color: "gray",
                            margin: "20px 0",
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          No services to display
                        </span>
                      </div>
                    )}
                  </Grid>
                </div>
              </div>
            </div>
            <div id="info-section">
              <table style={{ border: "1px solid black" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "150px",
                        fontWeight: "bold",
                        border: "1px solid black",
                      }}
                      colSpan={1}
                    >
                      Admin
                    </td>
                    <td
                      style={{
                        width: "150px",
                        fontWeight: "bold",
                        border: "1px solid black",
                      }}
                      colSpan={1}
                    >
                      Contact Date
                    </td>
                    <td
                      style={{ fontWeight: "bold", border: "1px solid black" }}
                      colSpan={3}
                    >
                      Notes
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "bold",
                        border: "1px solid black",
                      }}
                    >
                      Jonny
                    </td>
                    <td
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "bold",
                        border: "1px solid black",
                      }}
                    >
                      1/11/1111
                    </td>
                    <td
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "bold",
                        border: "1px solid black",
                      }}
                      colSpan={10}
                    >
                      He wants to be...
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ border: "1px solid black", height: "50px" }}
                    ></td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}></td>
                  </tr>
                  <tr>
                    <td
                      style={{ height: "100px", border: "1px solid black" }}
                    ></td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }} colSpan={10}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Users;
