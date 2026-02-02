import { apiFetch } from "../composables/useApi";

export const usersApi = {
  async register(userData) {
    const response = await apiFetch("/admin/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Registration failed");
    }

    return await response.json();
  },
};  

export const loginApi = {
  async login(credentials) {
    const response = await apiFetch("/admin/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Login failed");
    }

    return await response.json();
  },
};  
