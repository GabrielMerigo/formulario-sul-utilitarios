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
        border-radius:10px;
        box-shadow: 0 0 0 2px ${(props) => props.theme['gray-100']};
    }
    body{
        background:${(props) => props.theme['gray-900']};
        color:${(props) => props.theme['gray-50']};
        -webkit-font-smoothing:antialiased;
    }
    border-style, input, textarea, button ,strong, span, td, h2,h3,h4,a,label,legend{
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
`;
