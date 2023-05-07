import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import "../../src/App";

const Update = () => {
  const [success, setSuccess] = useState("");
  const loadedUser = useLoaderData();

  const handleUpdateUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch(`https://crud-operations-g5sb.onrender.com/users/${loadedUser._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast("User Updated successfully");
        }
      });
  };

  return (
    <>
      <h1>{loadedUser.name}</h1>
      <Box
        component="form"
        onSubmit={handleUpdateUser}
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
          defaultValue={loadedUser.name}
        />
        <br />
        <TextField
          required
          name="email"
          label="Email"
          id="outlined-basic"
          variant="outlined"
          defaultValue={loadedUser.email}
        />
        <br />
        <Button type="submit" variant="contained" size="medium">
          Update
        </Button>

        <br />
        {success}
      </Box>
    </>
  );
};

export default Update;
