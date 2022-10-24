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
let payload = Overview;
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

  let req = require('./apiconfig/Overview.json');

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     axios({
  //       method: 'post',
  //       url: SERVER_URL + '/scan',
  //       data: payload
  //     })
  //     .then((response) => {
  //       const recvData = response.data;
  //       if(!recvData.status) {
  //         console.error(recvData.message);
  //         return;
  //       }
  //       else {
  //         setData(recvData.data);
  //       }
  //     }).catch((e) => console.error(e));
  //   }, 10000);
  //   return () => {
  //     clearInterval(timer);
  //   }
  // }, []);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  
  
  

  return (
    <div className="HomePage">
      <Loading spinnerShow={loading} message={"loading"} />
      <Menu setLoading={setLoading} setFuturestate={setFuturestate} futurestate={futurestate} />
      {/* <Container> */}
        {/* <Row className="py-4"> */}
          <DataGrid
              dataSource={data}
              allowColumnReordering={true}
              
              // defaultSelectedRowKeys={selectedKeys}
            >
              <GroupPanel visible={true} />
              {
                payload.columns.map((col) => {
                  if(col == "Recommend.All") {
                    col = "recommendall";
                  }
                  if(columnInfo[col]){
                    return(
                      <Column key={col} dataField={col} caption={columnInfo[col]} cellRender={(cellData) => {
                        let value = cellData.value;
                        if(col == "close" || col == "change_abs") {
                          return (
                            value < 0 ? <span style={{color: 'red'}}>{value.toFixed(10)}</span> : <span style={{color: 'green'}}>{value.toFixed(10)}</span>
                          ); 
                        }
                        if(col == "high" || col == "low") {
                          return (
                            value.toFixed(10)
                          ); 
                        }
                        if(col == "volume" || col == "24h_vol|5") {
                          if(value == null) {
                            return "-";
                          }
                          if(value < 1000) {
                            value = value * 1000;
                            return Math.round(value) / 1000;
                          }
                          if(value >= 1000 && value < 1000000) {
                            return Math.round(value) / 1000 + 'K';
                          }
                          if(value >= 1000000 && value < 1000000000) {
                            value = value / 1000;
                            return (Math.round(value) / 1000) + 'M';
                          }
                          if(value >= 1000000000) {
                            value = value / 1000000;
                            return Math.round(value) / 1000 + 'B';
                          }
                        }
                        
                        if(col == "recommendall") {
                          if(value == null) {
                            return "-"
                          }
                          if((value > -0.1 && value < 0) || (value < 0.1 && value >= 0)) {
                            return "-Neutral";
                          } 
                          if(value <= -0.5) {
                            return "Strong Sell";
                          }
                          if(value >= 0.5) {
                            return "Strong Buy";
                          }
                          if(value < 0.5 && value >= 0.1) {
                            return "Buy";
                          }
                          if(value > -0.5 && value <= -0.1) {
                            return "Sell";
                          }
                        }
                        return cellData.value;
                      }}/>  
                    )
                  }
                })
              }
              <Grouping autoExpandAll={true} />
              <FilterRow visible={true} />
              <Selection mode={'single'} />
              <Paging defaultPageSize={10000000} />
            </DataGrid>
        {/* </Row> */}
      {/* </Container> */}
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
