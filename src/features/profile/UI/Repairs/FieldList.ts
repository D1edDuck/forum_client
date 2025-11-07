const Status = [
  {
    type: "radio",
    id: "fulfilled",
    name: "status",
    value: "fulfilled",
    label: "Готовы",
  },
  {
    type: "radio",
    id: "pending",
    name: "status",
    value: "pending",
    label: "В процессе",
  },
];

const Date = [
  {
    type: "date",
    id: "date",
    name: "date",
  },
];

const Number = [
  {
    type: "number",
    id: "id",
    name: "id",
  },
];

const fieldList = [
  { title: "Статус", inputs: Status },
  { title: "Дата", inputs: Date },
  { title: "Номер", inputs: Number },
];

export default fieldList;
