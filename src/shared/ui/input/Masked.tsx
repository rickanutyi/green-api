import { IMaskMixin } from "react-imask";
import Input, { InputProps } from "./Input";

export const MaskedInput = IMaskMixin<
    IMask.AnyMaskedOptions,
    false,
    string,
    HTMLInputElement,
    InputProps
>(({ inputRef, ...props }) => <Input ref={inputRef} {...props} />);
