import styled from 'styled-components';

const SelectCustomWrapper = styled.div`
  .form-control-select {
    .MuiInputBase-formControl {
      border: 0;
    }
    .MuiSelect-select {
      padding: 1rem;
      margin-bottom: 20px;
      border: none;
      border: solid 1px rgba(255, 255, 255, 0.1);
      background: ${({ theme }) => theme.colors['form_control_bg']};
      border-radius: 3px;
      -moz-border-radius: 6px;
      -webkit-border-radius: 6px;
      height: auto;
      box-shadow: none;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      color: ${({ theme }) => theme.colors['text-light']};

      &:focus {
        background-color: inherit;
        color: ${({ theme }) => theme.colors['text-light']};
        border-color: #86b7fe;
        outline: 0;
      }
    }
    fieldset {
      display: none;
    }
  }
  .form-control-select {
    .MuiInputBase-formControl {
      border: 0;
    }
    .MuiSelect-select {
      font-family: 'DM Sans';
      background: ${({ theme }) => theme.colors['input-holder-bg']};
      border: 1px solid ${({ theme }) => theme.colors['input-holder-border']};
      backdrop-filter: blur(40px);
      font-size: 18px;
      line-height: 23px;
      font-weight: 500;
      padding-left: 30px;
      padding-right: 30px;
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 5px;
      margin-bottom: 0;
      &:focus {
        background: ${({ theme }) => theme.colors['input-holder-focus']};
      }
    }
  }
`;
export default SelectCustomWrapper;