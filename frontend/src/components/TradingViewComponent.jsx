import TradingViewWidget, { Themes, IntervalTypes } from 'react-tradingview-widget';

export const TradingViewComponent = (props) => {
  return (
    <>
      {
        props.chartstate && (
          <div className="trading-chart">
            <TradingViewWidget
              symbol="NASDAQ:AAPL"
              theme={Themes.DARK}
              autosize
              symbol={props.chartsymbol}
              interval={IntervalTypes.D}
              timezone="Europe/Istanbul"
              style="1"
              locale="en"
              interval="5"
            />
          </div>
      )}
    </>
  )
}