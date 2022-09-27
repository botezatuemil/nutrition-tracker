import {
  ChartComponent,
  DateTime,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
} from "@syncfusion/ej2-react-charts";
import React from "react";

const AreaChart = () => {
  let data1: any[] = [
    { x: new Date(2002, 0, 1), y: 2.2 },
    { x: new Date(2003, 0, 1), y: 3.4 },
    { x: new Date(2004, 0, 1), y: 2.8 },
    { x: new Date(2005, 0, 1), y: 1.6 },
    { x: new Date(2006, 0, 1), y: 2.3 },
    { x: new Date(2007, 0, 1), y: 2.5 },
    { x: new Date(2008, 0, 1), y: 2.9 },
    { x: new Date(2009, 0, 1), y: 3.8 },
    { x: new Date(2010, 0, 1), y: 1.4 },
    { x: new Date(2011, 0, 1), y: 3.1 },
  ];
  
  return (
    <ChartComponent
      height="80%"
      id="charts"
      style={{ textAlign: "center" }}
      primaryXAxis={{
        valueType: "DateTime",
        labelFormat: "y",
        majorGridLines: { width: 0 },
        intervalType: "Years",
        edgeLabelPlacement: "Shift",
      }}
      primaryYAxis={{
        labelFormat: "{value}%",
        lineStyle: { width: 0 },
        maximum: 4,
        interval: 1,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
      }}
      chartArea={{ border: { width: 0 } }}
    >
      <Inject services={[SplineAreaSeries, DateTime, Legend]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data1}
          xName="x"
          yName="y"
          name="US"
          opacity={0.5}
          type="SplineArea"
          width={2}
        ></SeriesDirective>
        
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default AreaChart;
