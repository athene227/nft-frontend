import 'ag-grid-community/dist/styles/ag-grid.css';

import { AgGridReact } from 'ag-grid-react';
import React from 'react';

import { GridWrapper } from './style';

interface IProps {
  gridReady: any;
  defaultColDef: any;
  headerHeight: any;
  columnDefinitions: any;
  user_referrals: any;
  sidebarOpen: any;
  height: any;
  rowHeight: any;
  onSortChange: any;
  className: any;
}

const Index = (props: IProps) => {
  const {
    gridReady,
    defaultColDef,
    headerHeight,
    columnDefinitions,
    user_referrals,
    sidebarOpen,
    height,
    rowHeight,
    onSortChange,
    className
  } = props;

  return (
    <GridWrapper height={height} className={className}>
      <div className={`ag-theme-balham QB-dataTable`}>
        <AgGridReact
          onGridReady={gridReady}
          deltaRowDataMode={false}
          animateRows={true}
          defaultColDef={defaultColDef}
          columnDefs={columnDefinitions}
          headerHeight={headerHeight}
          onSortChanged={onSortChange}
          rowData={user_referrals}
          rowHeight={rowHeight}
          enableCellTextSelection={true}
          getRowNodeId={({ id }) => id}
          pagination={false}
          sideBar={sidebarOpen ? 'columns' : false}
          enableRangeSelection={true}
          suppressRowClickSelection={true}
          suppressScrollOnNewData={true}
          paginationPageSize={10}
        />
      </div>
    </GridWrapper>
  );
};
export default Index;
