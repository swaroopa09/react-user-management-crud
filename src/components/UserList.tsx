import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { User, FormField } from "../types";

interface Props {
  users: User[];
  fields: FormField[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<Props> = ({
  users,
  fields,
  onEdit,
  onDelete,
}) => {
  if (users.length === 0) return null;

  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" mb={2} align="center">
        User List
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell key={field.name}>{field.label}</TableCell>
            ))}
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {fields.map((field) => (
                <TableCell key={field.name}>
                  {user[field.name]}
                </TableCell>
              ))}
              <TableCell align="center">
                <Button size="small" onClick={() => onEdit(user)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    if (window.confirm("Delete user?")) {
                      onDelete(user.id!);
                    }
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserList;
