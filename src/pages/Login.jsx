import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: username.trim(),
          password: password.trim(),
        }
      );

      console.log("Login Success:", res.data);

      
      dispatch(
        setUser({
          user: res.data,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        })
      );

      // localStorage
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      alert("Login Success ✅");

      // redirect 
      navigate("/products");

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
      }}
    >
      <Card
        sx={{
          width: 350,
          borderRadius: 4,
          boxShadow: 5,
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            fontWeight="bold"
          >
            Login
          </Typography>

          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1,
              fontWeight: "bold",
              background: "linear-gradient(to right, #667eea, #764ba2)",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            mt={2}
            color="text.secondary"
          >
            credential : email:  emilys/ password :   emilyspass
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;