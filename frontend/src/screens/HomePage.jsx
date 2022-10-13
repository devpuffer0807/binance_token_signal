import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useAuth } from "../config/AuthProvider";
import { Navigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
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
import { SERVER_URL } from "../config";
import { IoBarChartSharp } from "react-icons/io5";

const changeCellColor = (cellData) => {
  let value = Math.round(cellData.value * 10000) / 10000;
  return (
    value < 0 ? <span style={{color: 'red'}}>{value}</span> : value
  );
}
const lastPriceRound = (cellData) => {
  let value = +cellData.value;
  return (
    value < 0 ? <span style={{color: 'red'}}>{value}</span> : value
  );
}
const renderSignalTimeGridCell = (cellData) => {
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  // console.log(cellData);
  var date = new Date(cellData.value);
  // Hours part from the timestamp
  var hours = date.getHours();
  if(hours < 10) hours = "0" + hours;
  // Minutes part from the timestamp
  var minutes = date.getMinutes();
  if(minutes < 10) minutes = "0" + minutes;
  // Seconds part from the timestamp
  var seconds = date.getSeconds();
  if(seconds < 10) seconds = "0" + seconds;
  // Months part from the timestamp
  var month = date.getMonth() + 1;
  if(month < 10) month = "0" + month;
  // Days part from the timestamp
  var day = date.getDate();
  if(day < 10) day = "0" + day;
  return (
      day + "/" + month + "-" + hours + ":" + minutes + ":" + seconds
  );
}
let socket;
export default function HomePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [chartstate, setChartstate] = useState(false);
  const [chartsymbol, setChartsymbol] = useState(false);
  const [futurestate, setFuturestate] = useState(false);

  
  useEffect(() => {
    socket = socketIOClient(SERVER_URL);
    socket.on("TransactionData", (arg) => {
      setData(arg);
      setLoading(false);
    });
  }, []);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  const symbolCellRender = (cellData) => {
    return (
      <Button 
        variant="outline-success"
        style={{width:'100%'}} 
        onMouseEnter={() => {
          setChartstate(true);
          setChartsymbol(cellData.value);
        }}
        onMouseLeave={() => {
          setChartstate(false);
        }}
        onClick={() => {
          if(!futurestate) {
            window.open('https://www.binance.com/en/trade/' + cellData.value,'_blank');
          }
          else{
            window.open('https://www.binance.com/en/futures/' + cellData.value,'_blank');
          }
        }}
        >{cellData.value}
      </Button>
    );
  }
  const chartCellRender = (cellData) => {
    return (
      <Button
        variant="primary"
        onClick={() => {
          window.open('https://www.tradingview.com/chart/?symbol=BINANCE%3A' + cellData.value);
        }}
      >
        <IoBarChartSharp/>
      </Button>
    );
  }
  

  return (
    <div className="HomePage">
      <Loading spinnerShow={loading} message={"loading"} />
      <Menu socket={socket} setLoading={setLoading} setFuturestate={setFuturestate} futurestate={futurestate} />
      <Container>
        <Row className="py-4">
          <DataGrid
            dataSource={data}
            keyExpr={'_id'}
            allowColumnReordering={true}
            // defaultSelectedRowKeys={selectedKeys}
          >
            <GroupPanel visible={true} />
            <Grouping autoExpandAll={true} />
            <FilterRow visible={true} />
            <Selection mode={'single'}/>
            
          
            <Column
              dataField={'_id'}
              caption={'ID'}
              allowSorting={false}
              allowFiltering={false}
              allowGrouping={false}
              allowReordering={false}
              width={100}
              visible={false}
            />
            <Column 
              dataField={'eventTime'} 
              caption={'Signal Time'} 
              cellRender={renderSignalTimeGridCell}
              
            />  
            {/* <Column dataField={'symbol'} caption={'Count'}  />   */}
            <Column dataField={'symbol'} caption={'Symbol'} cellRender={symbolCellRender}/>  
            <Column dataField={'curDayClose'} caption={'Last Price'} cellRender={lastPriceRound}/>  
            <Column dataField={'priceChangePercent'} caption={'Percent'} cellRender={changeCellColor}/> 
            <Column dataField={'priceChange'} caption={'24h Change'} cellRender={changeCellColor}/>  
            <Column dataField={'totalTrades'} caption={'Total'} cellRender={changeCellColor}/>  
            <Column dataField={'symbol'} caption={'TW'} cellRender={chartCellRender}/>  

            <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
          </DataGrid>
        </Row>
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
