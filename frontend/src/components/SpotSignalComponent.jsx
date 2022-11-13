import React, { useEffect, useState } from "react";
import { Button, Container, Row, Card, Col, Form } from "react-bootstrap";
import { useAuth } from "../config/AuthProvider";
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
import { SERVER_URL } from "../config";
import { toast } from "react-toastify";
import { percentCellRender, onedayChangeCellRender } from './SignalFunctions'
import { TradingViewComponent } from "./TradingViewComponent";
import { Navigate } from "react-router-dom";


export default function SpotSignalComponent(props) {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [chartsymbol, setChartsymbol] = useState(false);
  const [chartstate, setChartstate] = useState(false);
  useEffect(() => {
    loadGridData();
    let timer = setInterval(() => {
      loadGridData();
    }, 10000);
    return () => {
      clearInterval(timer);
    }
  }, []);
  if(!user) {
    return <Navigate to={'/login'} />
  }
  const loadGridData = () => {
    let header = {
      'x-auth-token': user.token,
    }
    let method = 'get';
    if(props.link.includes('spot')) {
      method = 'post';
    }
    const link = SERVER_URL + props.link;
    const payload = {
      type: props.signal
    }
    axios({
      method : method,
      url : link,
      headers: header,
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
          window.open('https://www.binance.com/en/trade/' + val,'_blank');
      }}>{val}</Button>
    )
  }
  return(
    <div className="AllSpot">
      <Container>
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
            <Column dataField={'Total'} caption={'Total'} />
            <Column dataField={'Series'} caption={'Series'}/>  
            <Pager allowedPageSizes={[5, 10, 20]} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
        </DataGrid>
      </Container>
      <TradingViewComponent chartsymbol={chartsymbol} chartstate={chartstate}/>
    </div>
  )
}