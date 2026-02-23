import s from "./index.module.css";

const Loader = () => {
  return (
    <div className={s.overlay}>
      <div className={s.loader}>
        <div className={s.spinner} />
        <div className={s.logo}>Форум.ру</div>
        <div className={s.progress}>
          <div className={s.progressBar} />
        </div>
        <div className={s.text}>Загрузка...</div>
      </div>
    </div>
  );
};

export default Loader;
