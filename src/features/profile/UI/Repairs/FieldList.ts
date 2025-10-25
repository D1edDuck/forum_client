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
  {
    type: "radio",
    id: "all",
    name: "status",
    value: "all",
    label: "Все",
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
    id: "number",
    name: "number",
  },
];

const fieldList = [
  { title: "Статус", inputs: Status },
  { title: "Дата", inputs: Date },
  { title: "Номер", inputs: Number },
];

export default fieldList;
