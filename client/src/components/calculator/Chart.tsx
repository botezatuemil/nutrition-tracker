import { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';


const MacroChart : React.FC<{protein: number, fat : number, carbs: number, calories: number}> = (props) => {

  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const label : string = `${props.calories}\r\nkcal`;
  const data = [
    { title: 'Protein', value: props.protein, color: '#3F74F9' },
    { title: 'Fat', value: props.fat, color: '#FCCC0B' },
    { title: 'Carbs', value: props.carbs, color: '#EF5A81' },
  ]

  const defaultLabelStyle = {
    fontSize: '6px',
    fontFamily: 'jakarta',
    fill: 'black',
   
  };
  
    const shiftSize = 25;
    return (
      <PieChart
        data={data}
        radius={PieChart.defaultProps.radius - shiftSize}
       
        label={({ dataEntry }) => label}
        
        labelPosition={0}
        lineWidth={15}
        paddingAngle={1}
        
        labelStyle={{
          ...defaultLabelStyle,
        }}
        animate
        onMouseOver={(_, index) => {
          setHovered(index);
         
        }}
        onMouseOut={(_, index) => {
          setHovered(undefined);
        }}
        
        // onMouseOut={(_, index) => {
        //   setHovered(index === hovered ? undefined : index);
        //   console.log(index)
        // }}
      >
        
      </PieChart>
    );

}

export default MacroChart;