import React, { useState } from "react"
import Switch from "react-switch";
import { SwitchWrapper } from './style'
const SwitchButton = (props) => {
  const { name, text, checked, onChange, onColor, offColor, offHandleColor, onHandleColor } = props;
  return (
    <SwitchWrapper className={`d-flex grid-column-gap-15 align-items-center ${props.className}`}>
      <Switch
        id={name}
        uncheckedIcon={false}
        height={12}
        onColor={onColor}
        offColor={offColor}
        offHandleColor={offHandleColor}
        onHandleColor={onHandleColor}
        width={24}
        handleDiameter={8}
        checked={checked}
        onChange={onChange}
        checkedIcon={false}
        className="react-switch" />
      {text && <span>{text}</span>}
    </SwitchWrapper>
  )
}
export default SwitchButton;
