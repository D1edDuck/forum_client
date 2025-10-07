import s from "./index.module.css";

interface IProps {
  loading: boolean;
  error: string | null;
}

const LoadingError = ({ loading, error }: IProps) => {
  if (loading) {
    return <p className={s.find}>Загрузка..</p>;
  }
  if (error) {
    return <p className={s.error}>Ошибка: {error}</p>;
  }
};

export default LoadingError;
