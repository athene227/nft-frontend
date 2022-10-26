import { Overlay, Tooltip } from 'react-bootstrap';

const ToolTip = (props) => {
  const { placement, Children, target, show } = props;
  return (
    <>
      {/* {['top', 'right', 'bottom', 'left'].map((placement) => ( */}
      <Overlay target={target} show={show} placement={placement}>
        {(props) => (
          <Tooltip {...props}>
            Demo Tooltip
          </Tooltip>
        )}
      </Overlay>
      {/* //   ))} */}
    </>
  );
};

export default ToolTip;
