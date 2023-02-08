import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
    }
		html{
        font-size: 62.5%;
    }
    :focus{
        outline:0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['green-400']};
    }
    body{
        background:${(props) => props.theme['gray-600']};
        color:${(props) => props.theme['gray-200']};
        -webkit-font-smoothing:antialiased;
    }
    border-style, input, textarea, button ,strong, span, td, h2,a{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
`;
