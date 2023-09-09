import { InputFieldProps } from "@/models/input-field-model";
import React from "react";

const InputField: React.FC<InputFieldProps> = ({
  type,
  label,
  value = '',
  onChange,
  disabled,
  accept,
  fileInput,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label">
        {label} <span className="text-danger">*</span>{" "}
      </label>
      <div className="col">
        {fileInput ? (
          <input
            type="file"
            accept={accept}
            onChange={onChange}
            className="form-control"
          />
        ) : (
          <input
            type={type}
            className="form-control"
            value={value}
            disabled={!disabled}
            onChange={onChange}
            required
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
