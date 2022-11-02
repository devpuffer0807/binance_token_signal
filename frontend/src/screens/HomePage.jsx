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
import { SERVER_URL } from '../config/index';
import { ToastContainer, toast } from "react-toastify";

const columnInfo = {
  "name": "NAME",
  "close": "PRICE",
  "change": "CHG%",
  "change_abs": "CHG",
  "high": "HIGH",
  "low": "LOW",
  "volume": "VOL",
  "24h_vol|5": "VOL 24H IN USD",
  "recommendall": "TECHNICAL RATING",
  "exchange": "EXCHANGE",
};

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

  useEffect(() => {
    let timer = setInterval(() => {
      axios({
        method : 'get',
        url : SERVER_URL + "/signals/getall",
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
    }, 10000);
    return () => {
      clearInterval(timer);
    }
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
