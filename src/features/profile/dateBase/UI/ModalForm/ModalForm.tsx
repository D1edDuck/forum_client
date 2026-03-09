import s from "./index.module.css";
import { useEffect, useState, useRef } from "react";

type FormData<T> = {
  [K in keyof T]: T[K];
};

interface IProps<T extends { id: number | string }> {
  item: T;
  closeEdit: () => void;
  onSave?: (updatedItem: T) => void;
  onImageUpload?: (file: File, id: number | string) => Promise<string>;
}

function ModalForm<T extends { id: number | string }>({
  item,
  closeEdit,
  onSave,
  onImageUpload,
}: IProps<T>) {
  const [formData, setFormData] = useState<FormData<T>>(item);
  const [imagePreview, setImagePreview] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentImageField, setCurrentImageField] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setFormData(item);

    const previews: Record<string, string> = {};
    Object.entries(item).forEach(([key, value]) => {
      if (isImageField(key) && typeof value === "string" && value) {
        const fullUrl = `${import.meta.env.VITE_API_URL_IMAGE}${value}`;
        previews[key] = fullUrl;
      }
    });
    setImagePreview(previews);
  }, [item]);

  const isImageField = (key: string): boolean => {
    return (
      key.toLowerCase().includes("image") ||
      key.toLowerCase().includes("photo") ||
      key.toLowerCase().includes("avatar") ||
      key.toLowerCase().includes("img") ||
      key === "imageUrl" ||
      key === "photoUrl"
    );
  };

  const handleImageClick = (key: string) => {
    setCurrentImageField(key);
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentImageField || !onImageUpload) return;

    if (!file.type.startsWith("image/")) {
      alert("Пожалуйста, выберите изображение");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Размер файла не должен превышать 5MB");
      return;
    }

    try {
      setUploading((prev) => ({ ...prev, [currentImageField]: true }));

      const previewUrl = URL.createObjectURL(file);
      setImagePreview((prev) => ({ ...prev, [currentImageField]: previewUrl }));

      const imageUrl = await onImageUpload(file, item.id);

      const typedKey = currentImageField as keyof T;
      setFormData((prev) => ({
        ...prev,
        [typedKey]: imageUrl as T[keyof T],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Ошибка при загрузке изображения");
      setImagePreview((prev) => {
        const newPrev = { ...prev };
        delete newPrev[currentImageField];
        return newPrev;
      });
    } finally {
      setUploading((prev) => ({ ...prev, [currentImageField]: false }));
      setCurrentImageField(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = async (key: string) => {
    const typedKey = key as keyof T;
    setFormData((prev) => ({
      ...prev,
      [typedKey]: "" as T[keyof T],
    }));
    setImagePreview((prev) => {
      const newPrev = { ...prev };
      delete newPrev[key];
      return newPrev;
    });
  };

  const handleInputChange = <K extends keyof T>(key: K, value: string) => {
    setFormData((prev) => {
      const originalValue = item[key];
      let parsedValue: T[K];

      if (typeof originalValue === "number") {
        parsedValue = (Number(value) || 0) as T[K];
      } else if (typeof originalValue === "boolean") {
        parsedValue = (value === "true" || value === "✓") as T[K];
      } else if (originalValue === null) {
        parsedValue = value as T[K];
      } else if (
        typeof originalValue === "object" &&
        originalValue !== null &&
        !isImageField(key as string)
      ) {
        try {
          parsedValue = JSON.parse(value) as T[K];
        } catch {
          parsedValue = value as T[K];
        }
      } else {
        parsedValue = value as T[K];
      }

      return {
        ...prev,
        [key]: parsedValue,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    closeEdit();
  };

  const getEntityName = (item: T): string => {
    if ("name" in item && typeof item.name === "string") {
      return item.name;
    }
    if ("title" in item && typeof item.title === "string") {
      return item.title;
    }
    return "элемента";
  };

  const formatLabel = (key: string): string => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/_/g, " ")
      .replace(/image|photo|avatar|img|url/gi, "")
      .trim();
  };

  const formatValueForInput = (value: T[keyof T]): string => {
    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "object" && !(value instanceof File)) {
      return JSON.stringify(value, null, 2);
    }

    if (typeof value === "boolean") {
      return value ? "✓" : "✕";
    }

    return String(value);
  };

  return (
    <div className={s.overlay} onClick={closeEdit}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Редактирование {getEntityName(item)}</h3>
        <div className={s.modalSubtitle}>
          ID: {item.id} • Изменения сохранятся после подтверждения
        </div>

        <form className={s.modalForm} onSubmit={handleSubmit}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />

          {Object.entries(formData).map(([key, value]) => {
            const typedKey = key as keyof T;

            if (isImageField(key)) {
              const imageUrl =
                imagePreview[key] ||
                (typeof value === "string" && value
                  ? `${import.meta.env.VITE_API_URL_IMAGE}${value}`
                  : null);

              return (
                <div key={key} className={s.inputGroup}>
                  <label>{formatLabel(key)}</label>

                  <div className={s.imageUploadContainer}>
                    {imageUrl ? (
                      <div className={s.imagePreviewWrapper}>
                        <img
                          src={imageUrl}
                          alt={formatLabel(key)}
                          className={s.imagePreview}
                          onClick={() => handleImageClick(key)}
                        />
                        <div className={s.imageOverlay}>
                          <button
                            type="button"
                            className={s.changeImageBtn}
                            onClick={() => handleImageClick(key)}
                          >
                            <span className={s.btnIcon}>🖼</span>
                            Изменить
                          </button>
                          <button
                            type="button"
                            className={s.removeImageBtn}
                            onClick={() => handleRemoveImage(key)}
                          >
                            <span className={s.btnIcon}>🗑</span>
                            Удалить
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={s.imageUploadPlaceholder}
                        onClick={() => handleImageClick(key)}
                      >
                        <div className={s.uploadIcon}>📷</div>
                        <p>Нажмите для загрузки изображения</p>
                        <span className={s.uploadHint}>
                          PNG, JPG, GIF до 5MB
                        </span>
                      </div>
                    )}

                    {uploading[key] && (
                      <div className={s.uploadProgress}>
                        <div className={s.spinner} />
                        <span>Загрузка...</span>
                      </div>
                    )}

                    {key === "id" && (
                      <span className={s.idHint}>ID нельзя изменить</span>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={key} className={s.inputGroup}>
                <label htmlFor={`field-${key}`}>
                  {formatLabel(key)}
                  {key === "id" && <span className={s.idBadge}>ID</span>}
                </label>

                {typeof item[typedKey] === "boolean" ? (
                  <select
                    id={`field-${key}`}
                    value={formatValueForInput(value)}
                    onChange={(e) =>
                      handleInputChange(typedKey, e.target.value)
                    }
                    disabled={key === "id"}
                    className={s.select}
                  >
                    <option value="✓">Да</option>
                    <option value="✕">Нет</option>
                  </select>
                ) : (
                  <input
                    id={`field-${key}`}
                    type={
                      typeof item[typedKey] === "number" ? "number" : "text"
                    }
                    defaultValue={formatValueForInput(value)}
                    disabled={
                      key === "id" ||
                      key === "userId" ||
                      key === "created_at" ||
                      key === "user" ||
                      key === "categoryId"
                    }
                    onChange={(e) =>
                      handleInputChange(typedKey, e.target.value)
                    }
                    placeholder={`Введите ${formatLabel(key).toLowerCase()}`}
                    step={
                      typeof item[typedKey] === "number" ? "any" : undefined
                    }
                  />
                )}

                {key === "id" && (
                  <span className={s.idHint}>ID нельзя изменить</span>
                )}
              </div>
            );
          })}

          <div className={s.modalActions}>
            <button type="button" onClick={closeEdit} className={s.cancelBtn}>
              <span className={s.btnIcon}></span>
              Отмена
            </button>
            <button
              type="submit"
              className={s.saveBtn}
              disabled={Object.values(uploading).some(Boolean)}
            >
              <span className={s.btnIcon}></span>
              {Object.values(uploading).some(Boolean)
                ? "Загрузка..."
                : "Сохранить изменения"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
