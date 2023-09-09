import React, { ChangeEvent } from "react";

export interface InputFieldProps {
    type: string;
    label: string;
    value?: string | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    accept?: string; // Optional for file inputs
    fileInput?: boolean; // Indicate if it's a file input
  }
