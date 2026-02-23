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
  "Диагностика бесплатная. Приносите свою технику и мы предложим варианты ремонта. В случае согласия на ремонт, стоимость диагностики включается в общую стоимость работ.",
  "Ваши данные мы сохраняем при переустановках ПО на накопительные диски. Мы гарантируем полную сохранность и конфиденциальность ваших данных. При необходимости можем сделать резервную копию.",
  "Компьютер - приносите ваш системный блок и этого достаточно, все подключим и проверим. Ноутбук - протрите его снаружи от пыли и грязи, обязательно приносите с собой зарядное устройство.",
  "Мы принимаем оплату наличными, банковскими картами (Visa, MasterCard, МИР), а также переводом на карту. Для юридических лиц предоставляем все закрывающие документы.",
  "Работаем с оригинальными и проверенными аналогами. Оригинал дороже, но имеет официальную гарантию; аналог — чуть дешевле, но тоже проверен нашими специалистами. Перед заменой мы обязательно согласуем вариант и стоимость с вами.",
];

const FaqPage = () => {
  const [ans, setAns] = useState<number | null>(null);

  return (
    <div className={s.page}>
      <div className={"container"}>
        <NavigateLine />
        <h3 className={s.tittle}>Вопросы & Ответы</h3>
        <div className={s.box}>
          <div className={s.hr}></div>
          {question.map((q, i) => (
            <div key={i}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
