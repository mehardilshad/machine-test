// import React from 'react'
// import { Doughnut } from 'react-chartjs-2'
// import { Chart, ArcElement } from 'chart.js'
// import styled from 'styled-components'

// function DoughnutChart({
//   courseCompleted,
//   examCompleted,
//   onProgress,
//   enrolledStudents,
// }) {
//   Chart.register(ArcElement)
//   return (
//     <ChartContainer>
//       <Doughnut
//         data={{
//           datasets: [
//             {
//               data: [courseCompleted, examCompleted, onProgress],
//               backgroundColor: ['#6a7ce7', '#ef8637', '#000'],
//               borderWidth: 0,
//               responsive: true,
//             },
//           ],
//         }}
//         options={{
//           cutout: 50,
//         }}
//       />
//       {courseCompleted > 0 && enrolledStudents > 0 && (
//         <Percentage>
//           <Percent>
//             {Math.round((courseCompleted / enrolledStudents) * 100)}
//             {'%'}
//           </Percent>
//         </Percentage>
//       )}
//     </ChartContainer>
//   )
// }
// export default DoughnutChart

// const ChartContainer = styled.div`
//   position: relative;
//   canvas {
//     height: 157px !important;
//     width: 157px !important;
//     margin: 0 auto;
//   }
// `
// const Percentage = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -42%);
//   /* background: #fff; */
//   border-radius: 50%;
//   width: 70px;
//   height: 70px;
// `
// const Percent = styled.p`
//   transform: translate(15px, 23px);
//   /* font-family: 'gordita_medium'; */
//   font-size: 18px;
//   position: absolute;
//   display: inline-block;
//   top: 53%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart({ data }) {
  // Extract data from the object
  const labels = Object.keys(data)
  const values = Object.values(data)

  // Create the dataset
  const dataset = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#FF5733', // Color for "applied_gatepass_count"
          '#33FF57', // Color for "approved_gatepass_count"
          '#3366FF', // Color for "processing_gatepass_count"
          '#FF33FF', // Color for "rejected_gatepass_count"
        ],
      },
    ],
  }

  // Chart options
  const options = {
    responsive: true,
    cutout: 50, // Adjust the cutout value as needed
  }

  return (
    <div>
      <Doughnut data={dataset} options={options} />
    </div>
  )
}

export default DoughnutChart
