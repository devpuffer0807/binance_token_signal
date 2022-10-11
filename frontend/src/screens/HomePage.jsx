import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
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
import Menu from "../components/layouts/menu";
import Loading from "../components/loading";
import { SERVER_URL } from "../config";

const changeCellColor = (cellData) => {
  return (
    cellData.value < 0 ? <span style={{color: 'red'}}>{cellData.value}</span> : cellData.value
  );
}
const renderSignalTimeGridCell = (cellData) => {
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(cellData.value * 1000);
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
  var day = date.getDay();
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
  useEffect(() => {
    socket = socketIOClient(SERVER_URL);
    socket.on("TransactionData", (arg) => {
      setData(arg);
      console.log(arg);
      setLoading(false);
    });
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="HomePage">
      <Loading spinnerShow={loading} message={"loading"} />
      <Menu socket={socket} setLoading={setLoading}/>
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
              dataType={'date'}
            />  
            <Column dataField={'closeTradeQuantity'} caption={'Count'} />  
            <Column dataField={'symbol'} caption={'Symbol'} />  
            <Column dataField={'curDayClose'} caption={'Last Price'} />  
            <Column dataField={'priceChangePercent'} caption={'Percent'} cellRender={changeCellColor}/> 
            <Column dataField={'priceChange'} caption={'24h Change'} cellRender={changeCellColor}/>  
            <Column dataField={'totalTrades'} caption={'Total'} />  

            <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
          </DataGrid>
        </Row>
      </Container>
    </div>
  );
}
