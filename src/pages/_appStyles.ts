import { ToastContainer } from 'react-toastify';
import styled, { css } from 'styled-components';

export const StyledToastContainer = styled(ToastContainer)`
  ${({ theme }) => css`
  .Toastify__toast-body {
    font-size: 1.3rem;
  }

  .Toastify__progress-bar-theme--dark {
    background: linear-gradient( to left,${theme['blue-500']},${theme['gray-400']})

`}
`;
