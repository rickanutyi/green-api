import styled from "@emotion/styled";
import React from "react";
import { colors } from "shared/theme/colors";

const StyledInput = styled("input")({
    backgroundColor: colors.light,
    borderRadius: "8px",
    outline: "none",
    border: "none",
    padding: "12px 12px",
    color: colors.white,
    fontSize: "16px",
    "&::placeholder": {
        color: colors.text_gray,
    },
});

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <StyledInput ref={ref} {...props} />;
});

export default Input;
