import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../../contexts/Store'
import { general } from '../../../axiosConfig'

function ResetPassword() {
  const [checked, setChecked] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [number, setNumber] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [otp, setOTP] = useState('')

  const [id, setId] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [country, setCountry] = useState([])
  const [loading, setLoading] = useState(false)

  // Add loading state

  const navigate = useNavigate()

  const handleIChange = (e) => {
    let inputValue = e.target.value
    setEmail(inputValue)
  }

  const handleOTP = (e) => {
    let inputValue = e.target.value
    // Remove non-digit characters and limit to 10 digits
    inputValue = inputValue.replace(/\D/g, '').slice(0, 10)

    setOTP(inputValue)
  }

  const handleSubmit = async () => {
    setLoading(true)

    if (email && password && otp) {
      const response = await axios.post(
        'https://conext.in/custom_users/api/reset_password/',
        {
          email_address: email,
          otp: otp,
          new_password: password,
        },
      )

      if (response.data.status === true) {
        navigate('/otp-page')
      } else {
        setErrorMessage(
          'An error occurred while registering. Please try again.',
        )
      }
    } else {
      setErrorMessage('Please enter a valid Email.')
    }
    setLoading(false)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <>
      <Main>
        <Wrapper>
          <Right>
            <TopText>
              <Titile>Reset Password</Titile>
              <SubTitile>
                Enter your email and received OTP along with new password
              </SubTitile>
            </TopText>
            <InputBox>
              <input
                type="email"
                id="email"
                maxLength={30}
                className="active"
                placeholder="Enter your email address"
                value={email}
                onChange={handleIChange}
              />
            </InputBox>
            <InputBox className="number">
              <input
                type="tel"
                maxLength={4}
                className="active"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOTP}
              />
            </InputBox>
            <InputBox>
              <input
                type="text"
                id="email"
                maxLength={30}
                className="active"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => {
                  const textValue = e.target.value
                  setPassword(textValue)
                }}
              />
            </InputBox>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            <ButtonBox
              type="submit"
              onClick={() => {
                handleSubmit()
                navigate('/login-page')
              }}
            >
              {loading ? 'Loading...' : 'Update'}
            </ButtonBox>
          </Right>
        </Wrapper>
      </Main>
    </>
  )
}

export default ResetPassword
const Main = styled.div`
  padding: 100px 0 50px 0;
  height: 100vh;
  background: #f6f7f9;
`
const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`
const Right = styled.div`
  padding: 50px 0;
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
  @media all and (max-width: 480px) {
    margin: 0 auto;
    font-size: 14px;
    width: 80%;
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
  width: 50%;
  @media all and (max-width: 768px) {
    width: 80%;
  }
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
  width: 50%;
  border: none;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
`
const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`
