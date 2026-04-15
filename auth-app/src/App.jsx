import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3001/login", data);

      localStorage.setItem("token", res.data.token);
      setMessage("Login Successful ✅");
    } catch (err) {
      setMessage("Invalid Credentials ❌");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, p: 4, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h4">Login Form</Typography>

        {message && (
          <Alert severity={message.includes("Successful") ? "success" : "error"} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...register("username", { required: "Username required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password", { required: "Password required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default App;