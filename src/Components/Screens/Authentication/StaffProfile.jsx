import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../../contexts/Store'
import { format } from 'date-fns'

function StaffProfile() {
  const { state } = useContext(Context)
  const [fullName, setFullName] = useState('')
  const [number, setNumber] = useState('')
  const [depno, setDepno] = useState('')
  const [selectedDate, setSelectedDate] = useState()
  const [designation, setDesignation] = useState('')
  const [address, setAddress] = useState('')
  const [blood, setBlood] = useState('')
  const [emergency, setEmergency] = useState('')

  const [selectedFiles, setSelectedFiles] = useState({
    pic: null,
  })
  const handleFileChange = (event, contentName) => {
    const file = event.target.files[0]

    setSelectedFiles((prev) => ({
      ...prev,
      [contentName]: file,
    }))
  }
  var retrievedValue = localStorage.getItem('user_details')
  var parsedObject = JSON.parse(retrievedValue)
  const auth = parsedObject?.access
  console.log(auth, 'auth')

  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(Context)
  const navigate = useNavigate()

  const handleDateChange = (event) => {
    const selectedDate = event.target.value
    const formattedDate = format(new Date(selectedDate), 'yyyy-MM-dd')

    setSelectedDate(formattedDate)
  }

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    // Remove non-digit characters and limit to 10 digits
    inputValue = inputValue.replace(/\D/g, '').slice(0, 10)
    setNumber(inputValue)
  }

  const handleSubmit = async () => {
    setLoading(true)
    console.log(selectedFiles, 'selected')
    if (fullName) {
      const response = await axios.post(
        ' https://conext.in/custom_users/api/create_staff_profile/',
        {
          name: fullName,
          dob: selectedDate,
          mobile: number,
          department: depno,
          designation: designation,
          picture: selectedFiles.pic,
          address: address,
          emergency_contact: emergency,
          blood_group: blood,
        },
        {
          headers: {
            Authorization: `token ${auth}`,
          },
        },
      )
      console.log(response.data.data)

      // dispatch({
      //   type: 'UPDATE_USER',
      //   verified_mail: email,
      // })
      navigate('/dashboard')
    } else {
      setErrorMessage('Please fill all the above fields')
    }
    setLoading(false)
    setTimeout(() => {
      setErrorMessage(null)
      setLoading(false)
    }, 3000)
  }
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
      setLoading(false)
    }, 6000)
  }, [])

  return (
    <>
      <Main>
        <Wrapper>
          <Right>
            <TopText>
              <Titile>Setup your profile!</Titile>
              <SubTitile>Please enter your Details</SubTitile>
            </TopText>
            <InputBox>
              <input
                type="text"
                id="name"
                maxLength={30}
                className="active"
                placeholder="Enter your Full Name"
                value={fullName}
                onChange={(e) => {
                  const textValue = e.target.value.replace(/[^A-Za-z " "]/g, '')
                  setFullName(textValue)
                }}
                // value={firstName}
              />
            </InputBox>

            <InputBox className="number">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </InputBox>
            <InputBox className="number">
              <input
                type="tel"
                id="Mobile"
                maxLength={10}
                className="active"
                placeholder="Enter phone number"
                value={number}
                onChange={handleInputChange}
              />
            </InputBox>
            <InputBox className="number">
              <input
                type="tel"
                id="Mobile"
                maxLength={1}
                className="active"
                placeholder="Enter Depart number"
                value={depno}
                onChange={(e) => {
                  const textValue = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 10)
                  setDepno(textValue)
                }}
              />
            </InputBox>
            <InputBox className="number">
              <input
                type="tel"
                id="Mobile"
                maxLength={20}
                className="active"
                placeholder="Enter your Designation"
                value={designation}
                onChange={(e) => {
                  const textValue = e.target.value
                  setDesignation(textValue)
                }}
              />
            </InputBox>
            <InputBox className="number">
              <label>Upload your picture</label>
              <input
                type="file"
                placeholder="Upload your picture"
                accept=".pdf, .jpg, .png, .jpeg" // Specify accepted file types
                selectedFile={selectedFiles.pic}
                handleFileChange={handleFileChange}
              />
            </InputBox>
            <InputBox>
              <input
                type="text"
                id="name"
                maxLength={30}
                className="active"
                placeholder="Enter your Address"
                value={address}
                onChange={(e) => {
                  const textValue = e.target.value
                  setAddress(textValue)
                }}
              />
            </InputBox>
            <InputBox className="number">
              <input
                type="tel"
                id="Mobile"
                maxLength={10}
                className="active"
                placeholder="Enter Your emergency contact"
                value={emergency}
                onChange={(e) => {
                  const textValue = e.target.value
                  setEmergency(textValue)
                }}
              />
            </InputBox>
            <InputBox>
              <input
                type="text"
                id="name"
                maxLength={10}
                className="active"
                placeholder="Enter your Blood group"
                value={blood}
                onChange={(e) => {
                  const textValue = e.target.value
                  setBlood(textValue)
                }}
              />
            </InputBox>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <Bottom>
              <ButtonBox
                type="submit"
                onClick={() => {
                  handleSubmit()
                  // navigate('/forgot-password')
                }}
              >
                {loading ? 'Loading...' : 'Create'}
              </ButtonBox>
              <Expert>
                Login if you already have an{' '}
                <Log to="/login-page">account!</Log>{' '}
              </Expert>
            </Bottom>
          </Right>
        </Wrapper>
      </Main>
    </>
  )
}

export default StaffProfile
const Main = styled.div`
  padding: 50px 0 50px 0;
  background: #f6f7f9;
`
const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`

const Right = styled.div`
  padding: 30px 0;
  margin: 0 auto;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 7px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media all and (max-width: 980px) {
    width: 75%;
  }
  @media all and (max-width: 640px) {
    width: 85%;
  }
  @media all and (max-width: 640px) {
    width: 95%;
  }
`
const Bottom = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TopText = styled.div`
  text-align: center;
`
const Titile = styled.h5`
  font-size: 24px;
  font-weight: 500;
  margin: 30px 0 7px 0;

  @media all and (max-width: 1440px) {
    margin-top: 15px;
  }
  @media all and (max-width: 1050px) {
    font-size: 22px;
  }
`
const SubTitile = styled.p`
  color: #7a838a;
  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
  @media all and (max-width: 1050px) {
    font-size: 14px;
  }
`

const InputBox = styled.div`
  background-color: #f6f7f9;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 300;
  padding: 10px 20px;
  align-items: flex-end;
  margin-top: 40px;
  width: 80%;
  &.number {
    margin-top: 40px;
  }
  label {
    margin-bottom: 5px;
  }
  input {
    border: none;

    font-size: 18px;
    width: 100%;
    cursor: pointer;
    @media all and (max-width: 1280px) {
      font-size: 16px;
    }
    :focus {
      outline: none;
    }

    ::placeholder {
      font-size: 16px;
      font-weight: 400;
    }
  }
  input[type='file'] {
    border: none;
    margin-top: 10px;
    font-size: 18px;
    width: 100%;
    cursor: pointer;
  }
`
const ButtonBox = styled.button`
  background-color: #366ee3;
  color: #fff;
  text-align: center;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 40px;
  width: 80%;
  border: none;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
`
const Log = styled(Link)`
  color: #2b3990;
  text-decoration: none;
`
const Expert = styled.h5`
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
  text-align: center;
  color: #818181;
  margin-top: 20px;
  width: 80%;
`
const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`
