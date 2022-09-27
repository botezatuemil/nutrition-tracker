import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
  ILoadedEventArgs,
  ChartTheme,
} from "@syncfusion/ej2-react-charts";
import {ChartComponent as ChartData} from "../../interfaces/index";

const LineChart: React.FC<{ chartData: ChartData[] | undefined }> = (
  props
) => {

  return (
    <ChartComponent
      id="line-chart"
      width="100%"
      height="100%"
      className="w-[50vw] h-[50vh]"
      primaryXAxis={{
        valueType: "DateTime",
        labelFormat: "dd/MM",
        intervalType: "Days",
        edgeLabelPlacement: "Shift",
        majorGridLines: { width: 0 },
      }}
      primaryYAxis={{
        labelFormat: "{value}",
        rangePadding: "None",
        minimum: 0,
        maximum: 4000,
        interval: 500,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
      }}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background="#fff"
      legendSettings={{ background: "white" }}
    >
       <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
     
        {props.chartData?.map((chart : ChartData) => 
          
          
          <SeriesDirective
            dataSource={chart.lineChart}
            xName="x"
            yName="y"
            name={chart.name}
            width={2}
            marker={{ visible: true, width: 10, height: 10 }}
            type="Line"
          />
        )}

        {/* {lineCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)} */}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
