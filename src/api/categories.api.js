import { api } from "@/composables/useApi.js";

export const getCategories = async () => {
  const response = await fetch(api("/api/categories"));
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
};  

export const saveTourCategories = async (tourId, categoryIds) => {
  console.log("Params", tourId, categoryIds )
  const response = await fetch(api(`/api/tours/${tourId}/categories`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryIds }),
  });
  if (!response.ok) {
    throw new Error("Failed to save tour categories");
  }
  return await response.json();
}

export const getTourCategories = async (tourId) => {
  // console.log("GetTourCategories")
  const response = await fetch(api(`/api/tours/${tourId}/categories`), {
  });
  if (!response.ok) {
    throw new Error("Failed to save tour categories");
  }
  const data= await response.json();
  // map naar array
  return data.map(row=>row.id)
}

