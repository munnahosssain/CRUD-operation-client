import { Button } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDeleteUser = _id => {
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
      headers: {},
      body: "",
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.deletedCount);
        if (data.deletedCount > 0) {
          toast("Deleted successfully");
          const remaining = users.filter(user => user._id !== _id);
          setUsers(remaining);
        }
      });
  };

  return (
    <div>
      <h1>Total Users: {users.length}</h1>
      {users.map(user => (
        <div key={user._id}>
          <h2>
            {user.name} {user.email}{" "}
            <Link to={`/update/${user._id}`}>
              <Button variant="contained">
                <CiEdit />
              </Button>
            </Link>{" "}
            <Button
              onClick={() => handleDeleteUser(user._id)}
              variant="outlined"
              size="small"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Users;
