import React from 'react'
import styled from 'styled-components'
import DoughnutChart from './DoughnutChart'
import LineChart from './LineChart'
import { Link } from 'react-router-dom'

function ChartsContainer({
  enrolledStudents,
  examCompleted,
  courseCompleted,
  onProgress,
  studentArr,
  dateArr,
  campus_id,
  gatePass,
}) {
  const items = [
    {
      id: 1,
      count: courseCompleted,
      title: 'Course Completed',
      name: 'course',
    },
    {
      id: 2,
      count: examCompleted,
      title: 'Exam Completed',
      name: 'exam',
    },
    {
      id: 3,
      count: onProgress,
      title: 'On Progress',
      name: 'progress',
    },
  ]

  const gatePassData = {
    applied_gatepass_count: 56432,
    approved_gatepass_count: 25289,
    processing_gatepass_count: 14345,
    rejected_gatepass_count: 18897,
  }
  return (
    <MainContainer>
      {/* <Heading>Dashboard</Heading> */}
      <Cover>
        <LineChartContainer>
          <Top>
            <Heading>Gatepass Counts Over Time</Heading>
          </Top>
          <LineCard>
            <LineChart data={gatePassData} />
          </LineCard>
        </LineChartContainer>
        <BarChartContainer>
          <Heading>Students Status</Heading>
          <Card>
            <TopSection>
              <Title>Gate pass Count</Title>
            </TopSection>
            <BottomSection>
              <LeftSection>
                <Section>
                  <Circle></Circle>
                  <CountSection>
                    <Para>Applied gatepass Count</Para>
                    <Count>{gatePass.applied_gatepass_count}</Count>
                  </CountSection>
                </Section>
                <Section>
                  <Circle></Circle>
                  <CountSection>
                    <Para>Approved gatepass Count</Para>
                    <Count>{gatePass.approved_gatepass_count}</Count>
                  </CountSection>
                </Section>
                <Section>
                  <Circle></Circle>
                  <CountSection>
                    <Para>Processing gatepass Count</Para>
                    <Count>{gatePass.processing_gatepass_count}</Count>
                  </CountSection>
                </Section>
                <Section>
                  <Circle></Circle>
                  <CountSection>
                    <Para>rejected gatepass Count</Para>
                    <Count>{gatePass.rejected_gatepass_count}</Count>
                  </CountSection>
                </Section>
              </LeftSection>
              {enrolledStudents > 0 && (
                <RightSection>
                  <DoughnutChart
                    enrolledStudents={enrolledStudents}
                    onProgress={onProgress}
                    examCompleted={examCompleted}
                    courseCompleted={courseCompleted}
                    data={gatePassData}
                  />
                </RightSection>
              )}
            </BottomSection>
          </Card>
        </BarChartContainer>
      </Cover>
    </MainContainer>
  )
}

export default ChartsContainer

const MainContainer = styled.div`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Cover = styled.div`
  /* min-width: 1200px; */
  width: 100%;
  margin: 30px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  @media all and (max-width: 1280px) {
    flex-direction: column;
  }
  @media all and (max-width: 1080px) {
    margin: 0 auto;
  }
`
const LineChartContainer = styled.div`
  width: 55%;

  @media all and (max-width: 1280px) {
    margin: 0 auto 50px auto;
    width: 90%;
  }
  @media all and (max-width: 768px) {
    width: 100%;
  }
`
const BarChartContainer = styled.div`
  width: 40%;

  @media all and (max-width: 1280px) {
    width: 90%;
    margin: 0 auto;
  }
  @media all and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`
const Title = styled.p`
  color: #000;
  font-size: 16px;
`
const TotalCount = styled(Link)`
  color: #000;
  font-size: 16px;
  /* font-family: 'gordita_medium'; */
`
const BottomSection = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media all and (max-width: 480px) {
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
`
const LeftSection = styled.div`
  width: 50%;
  @media all and (max-width: 480px) {
    width: 80%;
  }
`
const Heading = styled.h6`
  color: #000;
  /* font-family: 'gordita_medium'; */
  font-size: 22px;
  @media all and (max-width: 768px) {
    font-size: 18px;
  }
`
const LineCard = styled.div`
  border: 1px solid #2c2c2c;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px 15px 10px 10px;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
`
const Card = styled.div`
  border: 1px solid #2c2c2c;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 12px;
  padding: 20px 20px 20px 25px;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
`
const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #4e5053;
`
const Section = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  :last-child {
    margin-bottom: 0;
  }
`
const Circle = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  margin-top: 3px;
  background: ${(props) =>
    props.type === 'course'
      ? '#6a7ce7'
      : props.type === 'exam'
      ? '#ef8637'
      : '#404255'};
`
const CountSection = styled.div`
  display: flex;
`
const Count = styled.p`
  color: #000;
  margin-bottom: 10px;
  /* font-family: 'gordita_medium'; */
  font-size: 14px;
  margin-left: 10px;
`
const Para = styled.p`
  color: #000;
  font-size: 12px;
`
const RightSection = styled.div`
  width: 50%;
  @media all and (max-width: 480px) {
    margin-bottom: 30px;
    width: 80%;
  }
`
const Top = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
`
