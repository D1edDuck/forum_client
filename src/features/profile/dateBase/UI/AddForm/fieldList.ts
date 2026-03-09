import { causes } from "@/features/booking/UI/BookingForm/causes";

const formConfig = {
  repair: [
    {
      name: "cause",
      label: "Причина обращения",
      type: "select",
      required: true,
      options: causes,
    },
    {
      name: "comment",
      label: "Комментарий",
      type: "textarea",
      placeholder: "Кратко опишите проблему или пожелания",
    },
  ],

  product: [
    { name: "name", label: "Название", type: "text", required: true },
    { name: "brand", label: "Бренд", type: "text", required: true },
    { name: "model", label: "Модель", type: "text", required: true },
    {
      name: "description",
      label: "Описание",
      type: "textarea",
      placeholder: "Описание товара",
    },
    { name: "price", label: "Цена", type: "number", required: true },
    {
      name: "image",
      label: "Фото Товара",
      type: "file",
      required: true,
      accept: "image/*",
    },
    { name: "stock", label: "Количество", type: "number", required: true },
    {
      name: "categoryId",
      label: "Категория",
      type: "select",
      required: true,
      options: [],
    },
  ],

  category: [
    { name: "name", label: "Название", type: "text", required: true },
    { name: "slug", label: "ссылка", type: "text", required: true },
  ],
} as const;

export default formConfig;
