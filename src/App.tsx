import styled from "@emotion/styled";
import { store } from "model/store";
import ChatPage from "pages/Chat";
import AuthPage from "pages/Login";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "routes/PrivateRoute";
import { colors } from "shared/theme/colors";

const Root = styled("div")({
    backgroundColor: colors.dark,
    width: "100%",
    height: "100vh",
    padding: '20px',
    "@media (max-width: 420px)": {
        padding: '0px'
    },
});

function App() {
    return (
        <Root>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<AuthPage />} />
                        <Route
                            path="/*"
                            element={
                                <PrivateRoute>
                                    <Routes>
                                        <Route path="/chat" element={<ChatPage/>} />
                                    </Routes>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </Root>
    );
}

export default App;
