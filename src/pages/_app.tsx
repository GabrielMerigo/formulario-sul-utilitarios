import * as S from './_appStyles';
import { VehiclesContextProvider } from '@/contexts/VehiclesContext';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/Global';
import { DefaultTheme } from '../styles/themes/Default';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <VehiclesContextProvider>
      <ThemeProvider theme={DefaultTheme}>
        <Component {...pageProps} />
        <GlobalStyle />
        <S.StyledToastContainer />
      </ThemeProvider>
    </VehiclesContextProvider>
  );
}
