import { IRepair } from "./type";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBookingPOST(repair: IRepair) {
  try {
    const res = await fetch(`${API_URL}/repair`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(repair),
    });

    if (!res.ok) throw new Error("Ошибка запроса");

    alert("Запрос отправлен");
  } catch (error) {
    console.log(error);
  }
}
