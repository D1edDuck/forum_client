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
    label: "Ожидание",
  },
  {
    type: "radio",
    id: "active",
    name: "status",
    value: "active",
    label: "В работе",
  },
  {
    type: "radio",
    id: "archive",
    name: "status",
    value: "archive",
    label: "Архивные",
  },
  {
    type: "radio",
    id: "rejected",
    name: "status",
    value: "rejected",
    label: "Отклоненные",
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

interface IFieldList {
  title: string;
  inputs: typeof Status | typeof Date | typeof Number;
  variant: "left" | "right";
}

const fieldList: IFieldList[] = [
  { title: "Статус", inputs: Status, variant: "right" },
  { title: "Дата", inputs: Date, variant: "right" },
  { title: "Номер", inputs: Number, variant: "left" },
];

export default fieldList;
