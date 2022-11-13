import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { Button, Container, Row, Card, Col, Form } from "react-bootstrap";
export const percentCellRender = (cellData) => {
  let val = cellData.value;
  if(val < 0) {
    return (
      <>
        <FaLongArrowAltDown style={{color: 'red', 'marginTop': '-3'}}/> {val} %
      </>
    )
  }
  else {
    return (
      <>
        <FaLongArrowAltUp style={{color: 'green', 'marginTop': '-3'}}/> {val} %
      </>
    )
  }
}
export const onedayChangeCellRender = (cellData) => {
  let val = cellData.value;
  if(val < 0) {
    return (
      <>
        <FaLongArrowAltDown style={{color: 'red', 'marginTop': '-3'}}/> {val}
      </>
    )
  }
  else {
    return (
      <>
        <FaLongArrowAltUp style={{color: 'green', 'marginTop': '-3'}}/> {val}
      </>
    )
  }
}

export const signalCellRender =(cellData) => {
  let val = cellData.value;
  if(val.includes('Long')) {
    return (
      <>
        <FaLongArrowAltUp style={{color: 'green', 'marginTop': '-3'}}/> {val}
      </>
    )
  }
  if(val.includes('Short')) {
    return (
      <>
        <FaLongArrowAltDown style={{color: 'red', 'marginTop': '-3'}}/> {val}
      </>
    )
  }
}