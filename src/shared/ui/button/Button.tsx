import styled from "@emotion/styled";
import { colors } from "shared/theme/colors";

const StyledButton = styled("button")({
    borderRadius: '8px',
    padding: '12px 12px',
    textAlign: 'center',
    color: colors.white,
    backgroundColor: colors.green,
    border: 'none',
    cursor: 'pointer',
    '&:active': {
        backgroundColor: colors.green_active
    }
});

function Button({ children, ...props }: React.ButtonHTMLAttributes<{}>) {
    return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
