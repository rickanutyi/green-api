import React from "react";

import Input from "shared/ui/input/Input";
import Button from "shared/ui/button/Button";
import { useAuth } from "shared/hooks/auth";

import { AuthForm, PageWrapper, Title } from "./authPageStyles";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const [instanceId, setInstanceId] = React.useState("");
    const [apiToken, setApiToken] = React.useState("");
    const { login } = useAuth();

    const navigate = useNavigate();

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        login({ apiTokenInstance: apiToken, idInstance: instanceId });
        navigate("/chat");
    };

    return (
        <PageWrapper>
            <div>
                <Title>GREEN API</Title>
                <AuthForm onSubmit={submit}>
                    <Input
                        value={instanceId}
                        onChange={(e) => setInstanceId(e.currentTarget.value)}
                        placeholder="idInstance"
                        required
                    />
                    <Input
                        value={apiToken}
                        onChange={(e) => setApiToken(e.currentTarget.value)}
                        placeholder="apiTokenInstance"
                        required
                    />
                    <Button type="submit">Войти</Button>
                </AuthForm>
            </div>
        </PageWrapper>
    );
}

export default AuthPage;
