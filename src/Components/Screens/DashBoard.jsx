import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import ChartsContainer from './dashboard/ChartsContainer'
import DashboardTop from './dashboard/DashboardTop'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../contexts/Store'

function DashBoard() {
  const [isCountLoading, setCountLoading] = useState(false)
  const [lineGraphData, setLineGraphData] = useState({})
  const [dateArray, setDateArray] = useState([])
  const [studentArray, setStudentArray] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(Context)
  const [gatePass, setGatePass] = useState([])

  const [is_verified, setVerified] = useState(true)

  var retrievedValue = localStorage.getItem('user_details')
  var parsedObject = JSON.parse(retrievedValue)
  const auth = parsedObject?.access
  // console.log(auth, 'auth')

  const getShortMonthName = (date) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    return monthNames[date.getMonth()].substring(0, 3)
  }

  const user_data = [
    {
      day: 1,
      date: '2023-06-30',
      students: 3,
    },
    {
      day: 2,
      date: '2023-07-01',
      students: 5,
    },
    {
      day: 3,
      date: '2023-07-02',
      students: 3,
    },
    {
      day: 4,
      date: '2023-07-03',
      students: 7,
    },
    {
      day: 5,
      date: '2023-07-04',
      students: 4,
    },
    {
      day: 6,
      date: '2023-07-05',
      students: 8,
    },
    {
      day: 7,
      date: '2023-07-06',
      students: 3,
    },
    {
      day: 8,
      date: '2023-07-07',
      students: 7,
    },
  ]

  // const handleSubmit = async () => {
  //   setLoading(true)

  //   const response = await axios.get(
  //     'https://conext.in/gatePass/api/gate_pass_counts/',
  //     {
  //       headers: {
  //         Authorization: `token ${auth}`,
  //       },
  //     },
  //   )
  //   setGatePass(response.data)
  //   setLoading(false)
  //   setTimeout(() => {
  //     setErrorMessage(null)
  //     setLoading(false)
  //   }, 3000)
  // }

  const handleSubmit = async () => {
    setLoading(true)

    if (auth) {
      const response = await axios.get(
        'https://conext.in/gatePass/api/gate_pass_counts/',
        {
          headers: {
            Authorization: `token ${auth}`,
          },
        },
      )
      setGatePass(response.data)
      setLoading(false)
    } else {
      setErrorMessage('Please enter a valid Email.')
      setVerified(false)
    }
    setLoading(false)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }
  useEffect(() => {
    handleSubmit()
  }, [])
  useEffect(() => {
    const fetchDetails = () => {
      setLineGraphData(user_data)

      let newArr = user_data.reduce((prev, next) => prev.concat(next.date), [])

      newArr = newArr.map((item, index) => {
        const month = getShortMonthName(new Date(item))
        const day = item.slice(item.length - 2)

        return `${day} ${month}`
      })

      const newStudentsArr = user_data.reduce(
        (prev, next) => prev.concat(next.students),
        [],
      )

      setDateArray(newArr)
      setStudentArray(newStudentsArr)
    }
    fetchDetails()
  }, [])
  console.log(gatePass, 'gatePass')
  return (
    <>
      <MainContainer id="main">
        <Cover>
          <Heading>DashBoard</Heading>
          {auth ? (
            <ChartsContainer
              enrolledStudents={'100'}
              onProgress={'70'}
              examCompleted={'30'}
              courseCompleted={'10'}
              studentArr={studentArray}
              dateArr={dateArray}
              gatePass={gatePass}
            />
          ) : (
            <div className="nodata">
              No data Available <br></br> Please login to see the datas
            </div>
          )}
          {auth ? (
            <DashboardTop
              isCountLoading={isCountLoading}
              totalCount={'350'}
              totalStudentsCount={'350'}
              enrolledStudents={'100'}
              notEnrolleStudents={'30'}
              courseCompleted={'10'}
              gatePass={gatePass}
            />
          ) : (
            <div className="nodata"></div>
          )}
        </Cover>
      </MainContainer>
    </>
  )
}

export default DashBoard

const MainContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px 0;
`
const Cover = styled.div`
  div.nodata {
    padding: 100px;
    font-size: 24px;
    text-align: center;
  }
`
const Heading = styled.h3`
  color: #000;
  font-size: 28px;
  font-weight: 600;
`
