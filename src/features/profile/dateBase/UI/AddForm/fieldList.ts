const formConfig = {
  repair: [
    {
      name: "cause",
      label: "Причина обращения",
      type: "select",
      required: true,
      options: [
        { label: "Ремонт компьютера", value: "repair" },
        { label: "Заправка картриджа", value: "cartridge" },
      ],
    },
    {
      name: "comment",
      label: "Комментарий",
      type: "textarea",
      placeholder: "Кратко опишите проблему или пожелания",
    },
  ],

  user: [
    { name: "name", label: "Имя", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Номер телефона", type: "tel", required: true },
    { name: "password", label: "Пароль", type: "password", required: true },
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
