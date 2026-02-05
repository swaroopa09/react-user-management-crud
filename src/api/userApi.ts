import axios from "axios";
import { User } from "../types";

// Replace this with your MockAPI URL
const API_URL = "https://63fxxxx.mockapi.io/users";

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch users", error);
    throw error;
  }
};

export const createUser = async (user: User) => {
  try {
    await axios.post(API_URL, user);
  } catch (error) {
    console.error("Failed to create user", error);
    throw error;
  }
};

export const updateUser = async (id: number, user: User) => {
  try {
    await axios.put(`${API_URL}/${id}`, user);
  } catch (error) {
    console.error("Failed to update user", error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Failed to delete user", error);
    throw error;
  }
};
