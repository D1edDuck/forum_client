import s from "./index.module.css";

const CatalogService = () => {
  const boxCommon = `${s.box}`;

  return (
    <section>
      <div className={`container pb mb`}>
        <h2 className={s.title}>Каталог товаров</h2>
        <div className={s.grid}>
          <div
            className={`${boxCommon} ${s.boxImage1}`}
            role="img"
            aria-label="Компьютеры"
          >
            <p>Компьютеры</p>
          </div>

          <div
            className={`${boxCommon} ${s.boxImage2}`}
            role="img"
            aria-label="Ноутбуки"
          >
            <p>Ноутбуки</p>
          </div>

          <div
            className={`${boxCommon} ${s.boxImage3}`}
            role="img"
            aria-label="Принтеры"
          >
            <p>Принтеры</p>
          </div>

          <div
            className={`${boxCommon} ${s.boxImage4}`}
            role="img"
            aria-label="Запчасти"
          >
            <p>Запчасти</p>
          </div>

          <div className={s.boxBig}>
            <p className={s.boxBigText}>
              В нашем магазине можно приобрести игровые и офисные компьютеры,
              ноутбуки, мониторы, МФУ и принтеры, компьютерные комплектующие и
              аксессуары. Принимаем заказы на сборку ПК по индивидуальным
              параметрам.
            </p>

            <img
              src="src/assets/img/catalog-big.png"
              alt="Каталог товаров"
              className={s.boxBigImage}
            />

            <div className={s.arrow}>
              <div className={s.arrow_clip}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogService;
