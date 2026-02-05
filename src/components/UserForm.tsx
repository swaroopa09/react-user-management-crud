import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User, FormField } from "../types";
import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  Divider,
} from "@mui/material";

interface UserFormProps {
  onSubmit: (data: User) => void;
  initialData?: User;
  fields: FormField[];
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
  fields,
  onCancel,
}) => {
  const isEditMode = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialData ?? {},
  });

  useEffect(() => {
    reset(initialData ?? {});
  }, [initialData, reset]);

  const submitHandler: SubmitHandler<User> = (data) => {
    const payload = isEditMode
      ? { ...initialData, ...data } // ✅ keep id on update
      : data;

    onSubmit(payload);
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        maxWidth: 500,
        mx: "auto",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={1}>
        {isEditMode ? "Edit User" : "Create User"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2.5}>
          {fields.map((field) => (
            <TextField
              key={field.name as string}
              label={field.label}
              type={field.type}
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register(field.name as any, {
                required: field.required
                  ? `${field.label} is required`
                  : false,
                pattern: field.pattern
                  ? { value: field.pattern, message: "Invalid format" }
                  : undefined,
              })}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message as string}
            />
          ))}

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            {isEditMode && (
              <Button variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button variant="contained" type="submit">
              {isEditMode ? "Update User" : "Create User"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default UserForm;
