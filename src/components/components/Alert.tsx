import React from 'react';
import { ALERT_TYPE } from 'src/enums';

interface IProps {
  text: string;
  type: ALERT_TYPE;
}

export default function Alert(props: IProps) {
  const { text, type } = props;
  return (
    <div className={`alert alert-${type || ALERT_TYPE.PRIMARY}`} role="alert">
      {text || 'A simple primary alert—check it out!'}
    </div>
  );
}
