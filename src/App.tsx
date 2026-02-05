import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Alert } from "@mui/material";

import { User, FormField } from "./types";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./api/userApi";

const formFields: FormField[] = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    pattern: /^[0-9]{10}$/,
  },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "dob", label: "Date of Birth", type: "date" },
];

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      if (editingUser) {
        await updateUser(editingUser.id!, user);
        setEditingUser(undefined);
      } else {
        await createUser(user);
      }
      setShowForm(false);
      await loadUsers();
    } catch {
      setError("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(id);
      await loadUsers();
    } catch {
      setError("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!showForm && (
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button
            variant="contained"
            onClick={() => setShowForm(true)}
            disabled={loading}
          >
            Add User
          </Button>
        </Box>
      )}

      {showForm && (
        <UserForm
          fields={formFields}
          initialData={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingUser(undefined);
          }}
        />
      )}

      {loading && (
        <Typography align="center" mt={3}>
          Loading...
        </Typography>
      )}

      {!showForm && !loading && users.length > 0 && (
        <UserList
          users={users}
          fields={formFields}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
};

export default App;
