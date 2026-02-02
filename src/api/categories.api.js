import { apiUrl, assetUrl, apiFetch } from "@/composables/useApi.js";

export const getCategories = async () => {
  const response = await apiFetch("/admin/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  
  return await response.json();
};  

export const saveCategory = async (category) => {
  console.log("Saving category in .api.js", JSON.stringify(category));
  const url = category.id ? apiUrl(`/admin/categories/${category.id}`) : apiUrl("/admin/categories");
  const response = await fetch(url, {
    method: category.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error("Failed to save category");
  }
  return await response.json();
}

export const saveTourCategories = async (tourId, categoryIds) => {
  console.log("Params", tourId, categoryIds )
  const response = await apiFetch(`/admin/tours/${tourId}/categories`, {
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
  const response = await apiFetch(`/admin/tours/${tourId}/categories`, {
  });
  if (!response.ok) {
    throw new Error("Failed to save tour categories");
  }
  const data= await response.json();
  // map naar array
  return data.map(row=>row.id)
}

