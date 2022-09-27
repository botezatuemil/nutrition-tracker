import {
  ChartComponent,
  ColumnSeries,
  DataLabel,
  DateTime,
  Inject,
  Legend,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  SplineSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import React from "react";
import { LineChart } from "../../interfaces";

const AreaChart: React.FC<{waterData: LineChart[] | undefined}> = (props) => {
  console.log(props.waterData)
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
        labelFormat: "dd/MM",
        majorGridLines: { width: 0 },
        intervalType: "Days",
        edgeLabelPlacement: "Shift",
      }}
      primaryYAxis={{
        labelFormat: "{value} L",
        lineStyle: { width: 0 },
        maximum: 5,
        interval: 0.5,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
      }}
      tooltip={{ enable: true }}
      chartArea={{ border: { width: 0 } }}
    >
      <Inject services={[ColumnSeries, DateTime, Legend, Tooltip, DataLabel]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={props.waterData}
          xName="x"
          yName="y"
          name="Water"
          opacity={0.5}
          type="Column"
          marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}
          width={2}
        ></SeriesDirective>
        
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default AreaChart;
