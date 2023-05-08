import { ToastContainer } from 'react-toastify';
import styled, { css } from 'styled-components';

export const StyledToastContainer = styled(ToastContainer)`
  ${({ theme }) => css`
    .Toastify__toast {
      white-space: pre-wrap;
    }

    .Toastify__toast-body {
      font-size: 1.3rem;
    }

    .Toastify__progress-bar-theme--light {
      background: linear-gradient(to left, ${theme['blue-500']}, ${theme['gray-400']});
    }

    .success.Toastify__toast-theme--light {
      color: ${theme['gray-50']};
      background: ${theme['green-400']};
      &:hover {
        background: ${theme['green-500']};
      }
    }

    .error.Toastify__toast-theme--light {
      color: ${theme['gray-50']};
      background: ${theme['red-400']};
      &:hover {
        background: ${theme['red-500']};
      }
    }
  `}
`;
