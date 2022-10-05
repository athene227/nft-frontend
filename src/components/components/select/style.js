import styled from 'styled-components';
const SelectWrapper = styled.div`
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
      font-family: 'DM Sans';
      background: ${({ theme }) => theme.colors['input-holder-bg']};
      border: 1px solid ${({ theme }) => theme.colors['input-holder-border']};
      backdrop-filter: blur(40px);
      font-size: 18px;
      line-height: 23px;
      font-weight: 500;
      padding-left: 30px;
      padding-right: 30px;
      display: flex;
      align-items: center;
      /* Note: backdrop-filter has minimal browser support */

      border-radius: 5px;
      margin-bottom: 0;
      &:focus {
        background-color: inherit;
        color: ${({ theme }) => theme.colors['text-light']};
        /* border-color: #86b7fe; */

        box-shadow: 0 0 0 0.25rem rgb(13, 110, 253, 0.25);
        border: 1px solid ${({ theme }) => theme.colors['input-holder-border']};
        outline: 0;
        background: ${({ theme }) => theme.colors['input-holder-focus']};
      }
      img {
        width: 25px;
        margin-right: 8px;
      }
    }
    fieldset {
      display: none;
    }
    .MuiSelect-icon {
      color: #ffffff;
      right: 20px;
    }
  }
`;
const CollectionSelect = styled.div`
  margin-bottom: 25px;
  .btn-main {
    padding: 9px 15px;
    margin-bottom: 13px;
  }
`;
export { SelectWrapper, CollectionSelect };
