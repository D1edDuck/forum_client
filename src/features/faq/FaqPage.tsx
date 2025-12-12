import NavigateLine from "@/UI/NavigateLine/NavigateLine";
import s from "./index.module.css";
import { useState } from "react";

const question = [
  "Сколько стоит диагностика?",
  "Что с сохранностью и конфиденциальностью данных?",
  "Как подготовить устройство перед сдачей в ремонт?",
  "Какие способы оплаты вы принимаете?",
  "Используете ли вы оригинальные запчасти?",
];

const answer = [
  "Диагностика бесплатная. Приносите свою технику и мы предложим варианты ремонта",
  "Ваши данные мы оставляем при переустановках ПО на накопительные диски. Мы отвечаем за сохранность и конфиденциальность",
  "Компьютер - приносите Ваш системный блок и на этом достаточно, все подключим и проверем. Ноутбук - протрите его снаружи тряпкой от пыли и грязи, приносите с собой зарядное устройство",
  "Мы принимаем оплату как наличкой, банковскими картами так и переводом",
  "Работаем с оригинальными и проверенными аналогами. Оригинал дороже, но имеет свою гарантию; аналог — чуть дешевле, но тоже проверен нами. Перед заменой мы согласуем вариант и стоимость с вами.",
];

const FaqPage = () => {
  const [ans, setAns] = useState<number | null>(null);

  return (
    <div className="container pb mp dlex gap">
      <NavigateLine />
      <h3 className={s.tittle}>Вопросы & Ответы</h3>
      <div className={s.box}>
        <div className={s.hr}></div>
        {question.map((q, i) => (
          <>
            <div className={s.block}>
              <span className={s.quest}>{q}</span>
              <button
                className={`${s.close} ${i === ans ? s.active : ""}`}
                aria-expanded={i === ans}
                aria-controls={`faq-answer-${i}`}
                onClick={() => (ans === i ? setAns(null) : setAns(i))}
              />
            </div>
            <div
              id={`faq-answer-${i}`}
              className={`${s.ans} ${i === ans ? s.open : s.closed}`}
              role="region"
              aria-hidden={i === ans ? "false" : "true"}
            >
              {answer[i]}
            </div>

            <div className={s.hr}></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
