import Styled from 'styled-components';
const SwitchWrapper = Styled.div`
    &.switch,&.expire{
        margin-top:3px;
    
    }
    .react-switch-bg{
            border: 1px solid ${({ theme }) => theme.colors.secondaryVariant};
    }

  `;
export { SwitchWrapper };
