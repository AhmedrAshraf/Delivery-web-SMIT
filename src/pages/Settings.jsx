import "./settings.css";
import { TextField, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc, database } from "../db/firebase";

function Settings() {
  const [key, setKey] = useState("");

  useEffect(() => {
    getKey();
  }, []);

  const getKey = async () => {
    const docSnap = await getDoc(doc(database, "setting", "authKey"));
    if (docSnap.exists()) setKey(docSnap.data().key);
  };

  const onSubmit = async () => {
    await setDoc(doc(database, "setting", "authKey"), { key });
    alert("Key Updated & Required to add data in blogs and market reports")
  };

  return (
    <div className="col-12">
      <h2 className="page-header">Settings</h2>
      <div className="card">
        <TextField
          value={key}
          onChange={(e) => setKey(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Api Auth Key"
          variant="outlined"
        />
        <Button
          fullWidth
          onClick={onSubmit}
          variant="contained"
          style={{
            color: "white",
            height: "50px",
            marginTop: "15px",
            borderRadius: "3px",
            backgroundColor: "#1BABAA",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Settings;
