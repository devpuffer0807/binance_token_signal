import React, { useEffect, useState } from "react";
import { Button, Container, Row, Card, Col, Form } from "react-bootstrap";
import { useAuth } from "../config/AuthProvider";
import { Navigate } from "react-router-dom";
import DataGrid, {
  Column,
  FilterRow,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  Selection
} from 'devextreme-react/data-grid';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { SERVER_URL,SIGNAL_DATA } from '../config/index';
import { toast } from "react-toastify";
import { percentCellRender, onedayChangeCellRender, signalCellRender, longCellRender, shortCellRender } from './SignalFunctions'
import { TradingViewComponent } from "./TradingViewComponent";

export default function FutureSignalComponent(props) {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [chartstate, setChartstate] = useState(false);
  const [chartsymbol, setChartsymbol] = useState(false);
  const [amount, setAmount] = useState(10);
  const [profit, setProfit] = useState(10);
  const [checkprofit, setCheckprofit] = useState(true);
  const [stoploss, setStoploss] = useState(10);
  const [checkstoploss, setCheckstoploss] = useState(true);
  const [leverage, setLeverage] = useState(75);
  const [keystatus, setKeystatus] = useState("");
  const loadGridData = () => {
    let header = {
      'x-auth-token': user.token,
    }
    axios({
      method : 'get',
      url : SERVER_URL + '/signal/future',
      headers: header,
    })
    .then((res) => {
      const recvData = res.data;
      if(!recvData.status) {
        toast.error(recvData.message);
        return;
      }
      setData(recvData.data);
    })
    .catch((e) => {
      toast.warning(e.response.data.message);
      if(e.response.status == 402) {
        window.location.replace('/membership');
      }
      if(e.response.status == 401) {
        window.location.replace('/login');
        return;
      }
    });
    if(props.trade) {
      axios({
        method: 'get',
        url : SERVER_URL + '/trade/balance',
        headers: header
      })
      .then((res) => {
        if(res.data.status) {
          console.log(res)
          setKeystatus(res.data.message + 'Total Futures Wallet Balance = ' + res.data.data.Balance);
        }
        else {
          setKeystatus(res.data.message )
        }
      })
      .catch((e) => {
        console.error(e);
      })
    }
  }
  const newOrder = (value) => {
    console.log(value);
  }
  useEffect(() => {
    loadGridData();
    let timer = setInterval(() => {
      loadGridData();
    }, 10000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }
  const longCellRender = (cellData) => {
    let val = cellData.value;
    return (
      <Button variant="success" className="w-100" onClick={() => {newOrder(val, 'long')}}>Long</Button>
    )
  }
  const shortCellRender = (cellData) => {
    let val = cellData.value;
    return (
      <Button variant="danger" className="w-100" onClick={() => {newOrder(val, 'short')}}>Short</Button>
    )
  }
  const symbolCellRender = (cellData) => {
    let val = cellData.value;
    return (
      <Button className="w-100" onMouseEnter={(e) => {
        setChartsymbol(val);
        setChartstate(true);
      }} 
      onMouseLeave={() => setChartstate(false)}
      onClick={() => {
        window.open('https://www.binance.com/en/futures/' + val,'_blank');
      }}>{val}</Button>
    )
  }
  return (
    <div className="future-signal-component">
      <Container>
        {!props.trade ? (
            <DataGrid
              dataSource={data}
              allowColumnReordering={true}
            >
              <GroupPanel visible={true} />
              <Grouping autoExpandAll={true} />
              <FilterRow visible={true} />
              <Selection mode={'single'} />
              <Column dataField={'Signal_Time'} caption={'Signal Time'} />  
              <Column dataField={'Count'} caption={'Count'}/>  
              <Column dataField={'Symbol'} caption={'Symbol'} cellRender={symbolCellRender}/>  
              <Column dataField={'Last_Price'} caption={'Last Price'} />  
              <Column dataField={'Percent'} caption={'Percent'} cellRender={percentCellRender} alignment={'left'}/>  
              <Column dataField={'24h_change'} caption={'24h change'} cellRender={onedayChangeCellRender} alignment={'left'}/>  
              <Column dataField={'Total'} caption={'Total'}/>
              <Column dataField={'Signal'} caption={'Signal'} />
              <Column dataField={'Success'} caption={'Success'}/>
              <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
              <Paging defaultPageSize={10} />
            </DataGrid>
        ) : (
          <>
            <Card className="mt-3">
              <Card.Header>Automatic Position Settings</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Amount</Form.Label>
                      <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Profit</Form.Label>
                      <Form.Control type="number" value={profit} onChange={(e) => setProfit(e.target.value)} placeholder="Enter profit" />
                      <Form.Check type="checkbox" checked={checkprofit} onChange={() => setCheckprofit(!checkprofit)} label="Take" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                        <Form.Label>Stop Loss</Form.Label>
                        <Form.Control type="number" value={stoploss} onChange={(e) => setStoploss(e.target.value)} placeholder="Enter Stop loss" />
                        <Form.Check type="checkbox" checked={checkstoploss} onChange={() => setCheckstoploss(!checkstoploss)} label="Take" />
                      </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Leverage Percent</Form.Label>
                      <Form.Control type="number" value={leverage} onChange={(e) => setLeverage(e.target.value)} placeholder="Enter Leverage" />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Header>{keystatus}</Card.Header>
              <Card.Body>
              </Card.Body>
            </Card>
            <Card className="mt-3">
              <Card.Body>
                <DataGrid
                  dataSource={data}
                  allowColumnReordering={true}
                >
                  <GroupPanel visible={true} />
                  <Grouping autoExpandAll={true} />
                  <FilterRow visible={true} />
                  <Selection mode={'single'} />
                  <Column dataField={'Signal_Time'} caption={'Signal Time'} />  
                  <Column dataField={'Count'} caption={'Count'} width={'7%'}/>  
                  <Column dataField={'Symbol'} caption={'Symbol'} cellRender={symbolCellRender}/>  
                  <Column dataField={'Last_Price'} caption={'Last Price'} width={'10%'}/>  
                  <Column dataField={'Percent'} caption={'Percent'} cellRender={percentCellRender} alignment={'left'} width={'10%'}/>  
                  <Column dataField={'24h_change'} caption={'24h change'} cellRender={onedayChangeCellRender} alignment={'left'} width={'10%'}/>  
                  <Column dataField={'Total'} caption={'Total'} />
                  <Column dataField={'Signal'} caption={'Signal'} cellRender={signalCellRender}/>
                  <Column dataField={'Symbol'} caption={'Long'} cellRender={longCellRender}/>
                  <Column dataField={'Symbol'} caption={'Short'} cellRender={shortCellRender}/>
                  <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
                  <Paging defaultPageSize={10} />
                </DataGrid>
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
      <TradingViewComponent chartsymbol={chartsymbol} chartstate={chartstate}/>
    </div>
  )
}