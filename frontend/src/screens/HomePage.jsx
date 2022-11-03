import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
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
import TradingViewWidget, { Themes, IntervalTypes } from 'react-tradingview-widget';
import Menu from "../components/layouts/menu";
import Loading from "../components/loading";
import { IoBarChartSharp } from "react-icons/io5";
import useSound from 'use-sound';
import mySound from '../assets/Alarm07.wav';
import TableContainer from "../components/tableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Overview from './apiconfig/Overview.json';
import { SERVER_URL,SIGNAL_DATA } from '../config/index';
import { ToastContainer, toast } from "react-toastify";

let signalForRequest = "GETALL";
export default function HomePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartstate, setChartstate] = useState(false);
  const [chartsymbol, setChartsymbol] = useState(false);
  const [futurestate, setFuturestate] = useState(false);
  const [playSound] = useSound(mySound);
  const [signal, setSignal] = useState("GETALL");

  let req = require('./apiconfig/Overview.json');

  const loadGridData = () => {
    let link = SERVER_URL;
    let payload = {};
    let actionMethod = 'post'
    switch(SIGNAL_DATA[signalForRequest].VALUE) {
      case 4:
        actionMethod = 'get';
        link = SERVER_URL + '/signal/market';
        break;
      case 5:
        actionMethod = 'get';
        link = SERVER_URL + '/signal/kucoin';    
        break;
      case 6:
        actionMethod = 'get';
        link = SERVER_URL + '/signal/bitfinex';
        break;
      case 7:
        actionMethod = 'get';
        link = SERVER_URL + '/signal/ftx';
        break;
      case 8:
        actionMethod = 'get';
        link = SERVER_URL + '/signal/future'
        break;
      default:
        actionMethod = 'post';
        link = SERVER_URL + '/signal/spot';
        payload = {
          type: signalForRequest
        }
        break;
    }
    
    axios({
      method : actionMethod,
      url : link,
      data : payload
    })
    .then((res) => {
      const recvData = res.data;
      if(!recvData.status) {
        toast.error(recvData.message);
        return;
      }
      setData(recvData.data);
    })
    .catch((e) => console.error(e));
  }
  useEffect(() => {
    let timer = setInterval(() => {
      loadGridData();
    }, 10000);
    return () => {
      clearInterval(timer);
    }
  }, []);
  useEffect(() => {
    signalForRequest = signal;
  }, [signal]);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="HomePage">
      <ToastContainer />
      <Menu setSignal={setSignal} signal={signal}/>
        <Container>
          <DataGrid
              dataSource={data}
              allowColumnReordering={true}
            >
              <GroupPanel visible={true} />
              <Grouping autoExpandAll={true} />
              <FilterRow visible={true} />
              <Selection mode={'single'} />
              <Column dataField={'Signal_Time'} caption={'Signal Time'}/>  
              <Column dataField={'Count'} caption={'Count'}/>  
              <Column dataField={'Symbol'} caption={'Symbol'}/>  
              <Column dataField={'Last_Price'} caption={'Last Price'}/>  
              <Column dataField={'Percent'} caption={'Percent'}/>  
              <Column dataField={'24h_change'} caption={'24h change'}/>  
              <Column dataField={'Total'} caption={'Total'}/>
              {
                SIGNAL_DATA[signal].VALUE == 8 ? (
                  <Column dataField={'Signal'} caption={'Signal'}/>
                ) : (
                  <Column dataField={'Series'} caption={'Series'}/>
                )
              }  
              {
                SIGNAL_DATA[signal].VALUE == 8 ? (
                  <Column dataField={'Success'} caption={'Success'}/>
                ) : (
                  <></>
                )
              }  
              <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
              <Paging defaultPageSize={10} />
          </DataGrid>
        </Container>
      {
        chartstate && (
          <div className="trading-chart">
            <TradingViewWidget
              symbol="NASDAQ:AAPL"
              theme={Themes.DARK}
              autosize
              symbol={chartsymbol}
              interval={IntervalTypes.D}
              timezone="Europe/Istanbul"
              style="1"
              locale="en"
              interval="5"
            />
          </div>
      )}
    </div>
  );
}
