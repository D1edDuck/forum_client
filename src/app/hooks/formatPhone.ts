export const formatPhoneNumber = (phone: string | null): string => {
  if (!phone) return "Не указано";

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    if (cleaned.startsWith("7") || cleaned.startsWith("8")) {
      const country = cleaned[0] === "8" ? "7" : cleaned[0];
      const code = cleaned.slice(1, 4);
      const first = cleaned.slice(4, 7);
      const second = cleaned.slice(7, 9);
      const third = cleaned.slice(9, 11);

      return `+${country} ${code} ${first} ${second} ${third}`;
    }
  }

  if (cleaned.length === 10) {
    const code = cleaned.slice(0, 3);
    const first = cleaned.slice(3, 6);
    const second = cleaned.slice(6, 8);
    const third = cleaned.slice(8, 10);

    return `+7 ${code} ${first} ${second} ${third}`;
  }

  return phone;
};
