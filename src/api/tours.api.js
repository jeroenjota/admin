import { api } from "../composables/useApi.js";

const getTours = async () => {
  const response = await fetch(api("/api/tours"));
  if (!response.ok) {
    throw new Error("Failed to fetch tours");
  }
  return await response.json();
};

const getTour = async (id) => {
  const response = await fetch(api(`/api/tours/${id}`));
  if (!response.ok) {
    throw new Error("Failed to fetch tour");
  }
  return await response.json();
}

export { getTours , getTour};