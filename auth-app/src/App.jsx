import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      // 🔥 CALL BACKEND LOGIN API
      const res = await axios.post("http://localhost:3001/login", {
        username: data.username,
        password: data.password,
      });

      // 🔐 SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      setMessage("Login Successful ✅");

      // 🚀 REDIRECT TO DASHBOARD
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      setMessage("Invalid Credentials ❌");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 10,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login Form
        </Typography>

        {message && (
          <Alert
            severity={message.includes("Successful") ? "success" : "error"}
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default App;