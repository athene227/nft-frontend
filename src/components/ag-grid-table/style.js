import Styled from 'styled-components';
const GridWrapper = Styled.div`

.QB-dataTable{
    height: ${(props) => `${props.height}px`};
    padding-top: 0px;
    padding-left: 0px;
    font-weight:400;
    overflow:auto;

}
 .QB-dataTable.drawer-table{
    height: calc(100vh - 766px);
    padding-top: 25px;
    padding-left: 5px;
}
.QB-dataTable .ag-header{
    
}
.QB-dataTable{
    .ag-root{
        width:100% ; 
    }
    
}
.QB_dataTable .ag-cell{
    border-bottom:1px solid rgba(255,255,255,0.1);

}
.QB-dataTable .ag-header-viewport{
    /* border-bottom:1px solid ${({ theme }) => theme.colors.labelColor}; */
    border-bottom:1px solid rgba(255,255,255,0.1);
    border-radius: 4px 4px 0px 0px;
    
}
.QB-dataTable .ag-header-viewport .ag-header-cell{
    color: ${({ theme }) => theme.colors.labelColor};
    font-weight: 500;
    font-size: ${({ theme }) => theme.colors.baseFontSizeXs};
    line-height: 14px;
    padding: 10px 8px;
    &:first-of-type{
        padding-left:16px;
    }
}
.QB-dataTable .ag-header-viewport .ag-header-cell::after{
    background-color: rgba(255,255,255,0.1);
    border-right:none;
}
.QB-dataTable .ag-center-cols-viewport .ag-cell-value{
    font-size: ${({ theme }) => theme.colors.baseFontSize};
    line-height: 18px;
    /* color: ${({ theme }) => theme.colors.bodyText}; */
    color:#FFFFFF;
    display: flex;
    align-items:flex-start; 
    padding: 0 8px;
    font-weight:400;
    &:first-of-type{
        
    }
    
}
.QB-dataTable .ag-center-cols-viewport .ag-cell{
    &:first-of-type{
        .ag-cell-wrapper{
            .ag-cell-value{
                padding-left:8px;
            }
        }
    }
    &:last-of-type{
        .ag-cell-wrapper{
            .ag-cell-value{
                padding-right:8px;
            }
        }
    }
}
.QB-dataTable .ag-center-cols-viewport .ag-cell-wrapper{
    height: auto;
    min-height: 56px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    a{
        color: ${({ theme }) => theme.colors.primaryColor};
        text-decoration:none;
    }
}
.QB-dataTable .ag-center-cols-viewport .ag-right-aligned-cell .ag-cell-wrapper .ag-cell-value{
    justify-content:end;
    .icon-right-arrow{
        font-size:10px;
        cursor:pointer;
    }
}

.QB-dataTable  .ag-row-even,
.QB-dataTable  .ag-row-odd,
.QB-dataTable  .ag-row{
    border-bottom-color: rgba(255,255,255,0.1);
    background-color:${({ theme }) => theme.colors.surface};
}

.QB-dataTable  .ag-paging-panel{
background-color: ${({ theme }) => theme.colors.surface};
}
.QB-dataTable .ag-paging-button{
    border-left: 1px solid rgba(255,255,255,0.1);
    padding: 8px 8px 8px 10px;
    color: ${({ theme }) => theme.colors.primaryVariant};
}
.QB-dataTable .ag-paging-button .ag-icon{
    font-weight: bold;
}
.QB-dataTable .ag-tool-panel-wrapper{
    width: 320px;
}
.QB-dataTable .ag-rtl .ag-side-bar-left,
.QB-dataTable .ag-ltr .ag-side-bar-right{
    border: top 1px;

}
.title-image{
    img{
        margin-right:8px;
    }
}
`;
export { GridWrapper };
