import "./App.css";
import { Alert, Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { toast } from "react-toastify";

function App() {
  const [success, setSuccess] = useState(false);

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast("User added successfully!");
          setSuccess("User added successfully!");
          form.reset();
        }
      });
  };

  return (
    <>
      <h1>CRUD Operations</h1>
      <Box
        component="form"
        onSubmit={handleAddUser}
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          name="name"
          label="Name"
          id="outlined-basic"
          variant="outlined"
        />
        <br />
        <TextField
          required
          name="email"
          label="Email"
          id="outlined-basic"
          variant="outlined"
        />
        <br />
        <Button type="submit" variant="contained" size="medium">
          Submit
        </Button>

        <br />
        {success}
      </Box>
    </>
  );
}

export default App;
