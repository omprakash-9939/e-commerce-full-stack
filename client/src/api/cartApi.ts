import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const cartApi = {
  get: (token: string) =>
    axios.post(`${backendUrl}/api/cart/get`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  add: (token: string, itemId: string, size: string) =>
    axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (token: string, itemId: string, size: string, quantity: number) =>
    axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

