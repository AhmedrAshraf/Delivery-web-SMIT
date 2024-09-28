import {
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  IconButton,
  CssBaseline,
  InputAdornment,
} from "@mui/material";
import {
  doc,
  auth,
  getDoc,
  database,
  signInWithEmailAndPassword,
} from "../db/firebase";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/Green-Logo.png"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Login({ history }) {
  const [showPsw, setShowPsw] = React.useState(false);
  const [error, setError] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const getUid = React.useCallback(async () => {
    const uid = await localStorage.getItem("uid");
    if (uid) navigate("/admin/dashboard");
  }, [history]);

  React.useEffect(() => {
    getUid();
  }, [getUid]);

  const handleEmailChange = (event) => {
    setError("");
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setError("");
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
          getDoc(doc(database, "admin", user.user.uid)).then((doc) => {
            if (doc.data()) {
              localStorage.setItem("uid", user.user.uid);
              navigate("/admin/dashboard")
            } else {
              setError("You are not an admin");
            }
          });
        })
        .catch((error) => setError(error.message));
    } else {
      setError("Please fill all the fields");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <img src={Logo} alt="logo" width={250} />
            </div>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginTop: "150px" }}
            >
              Login Admin Panel
            </Typography>
            <Box sx={{ mt: 1, width: "80%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={email}
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit(event);
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                name="password"
                placeholder="Password"
                type={showPsw ? "text" : "password"}
                autoComplete="current-password"
                onChange={handlePasswordChange}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit(event);
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPsw(!showPsw)}>
                        {showPsw ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <span
                  style={{
                    color: "red",
                    fontSize: 16,
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}>
                  *{error}.
                </span>
              )}
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // style={{ backgroundColor: "#282828" }}>
                style={{ backgroundColor: "#1BABAA" }}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
