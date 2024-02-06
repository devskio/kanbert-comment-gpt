import * as React from "react";
import { createRoot } from 'react-dom/client';

// import ICSettings from "../components/ICSettings";
// import Logo from "../components/Logo";
import useChromeStorage from "./hooks/useChromeStorage";
// import { WELCOME_PAGE } from "../utils/constants";
import * as Styled from "./popup.styled";
import "./common.css";

const Popup = () => {
    const [openAIKey, setOpenAIKey, { loading: loadingOpenAIKey }] = useChromeStorage<string>(
        "kanbert-comment-openapi-key",
        ""
    );

    const [fullName, setFullName, { loading: loadingFullName }] = useChromeStorage<string>(
        "kanbert-comment-full-name",
        ""
    );

    // const handleOptions = () => {
    //     chrome.runtime.openOptionsPage();
    // };

    return (
        <Styled.Wrapper>
            {/*<Logo className="logo" />*/}

            {/* OPENAI API Key */}
            <label htmlFor="name">Enter your full name:</label>
            <input
                id="name"
                placeholder="John Doe"
                type="text"
                value={fullName}
                disabled={loadingFullName}
                onChange={(e) => {
                    setFullName(e.target.value);
                }}
            />

            {/* OPENAI API Key */}
            <label htmlFor="open-api-key">Enter your OpenAI API key:</label>
            <input
                id="open-api-key"
                placeholder="xxxxxxxx"
                type="text"
                value={openAIKey}
                disabled={loadingOpenAIKey}
                onChange={(e) => {
                    setOpenAIKey(e.target.value);
                }}
            />

            {/*/!* Help *!/*/}
            {/*<p>*/}
            {/*    Have some questions? More information{" "}*/}
            {/*    <a target="_blank" href={WELCOME_PAGE}>*/}
            {/*        here.*/}
            {/*    </a>*/}
            {/*</p>*/}

            {/*/!* Settings *!/*/}
            {/*<Styled.SettingsBtn onClick={handleOptions}>*/}
            {/*    <span>Options</span>*/}
            {/*    <ICSettings width={14} height={14} />*/}
            {/*</Styled.SettingsBtn>*/}

            {/*<p>*/}
            {/*    <a href="https://social-comments-gpt.com/" target="_blank">*/}
            {/*        social-comments-gpt.com*/}
            {/*    </a>{" "}*/}
            {/*    &copy; 2022*/}
            {/*</p>*/}
        </Styled.Wrapper>
    );
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Popup />);