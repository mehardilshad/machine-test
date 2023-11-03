import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../../contexts/Store'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [otp, setOTP] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)
  const [password, SetPassword] = useState('') // Add loading state
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    // Remove non-digit characters and limit to 10 digits
    inputValue = inputValue.replace(/\D/g, '').slice(0, 10)

    setNumber(inputValue)
  }
  const handleOTP = (e) => {
    let inputValue = e.target.value
    // Remove non-digit characters and limit to 10 digits
    inputValue = inputValue.replace(/\D/g, '').slice(0, 10)

    setOTP(inputValue)
  }
  const handleIChange = (e) => {
    let inputValue = e.target.value
    setEmail(inputValue)
  }

  const handleSubmit = async () => {
    setLoading(true)

    if (email && password && number && otp) {
      const response = await axios.post(
        ' https://conext.in/custom_users/api/register/',
        {
          password: password,
          email: email,
          organization: number,
          otp: otp,
        },
      )
      console.log(response.data)

      console.log(response)
      navigate('/login-page')
    } else {
      setErrorMessage('Please fill in the following fields')
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
          <Left>
            <ImageBox>
              <img
                src={require('../../../assets/images/login.jpg')}
                alt="loginimage"
              />
            </ImageBox>
          </Left>
          <Right>
            <TopText>
              <Titile>Let’s Get Started!</Titile>
            </TopText>
            <InputBox>
              <PassBox>
                <img
                  src={
                    require('../../../assets/images/loginpage/lock.svg').default
                  }
                  alt="lock"
                />
              </PassBox>
              <input
                type={viewPassword ? 'text' : 'password'}
                placeholder="Enter a password"
                name="password"
                required
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
              ></input>
              <Eye onClick={() => setViewPassword(!viewPassword)}>
                <img
                  src={
                    require('../../../assets/images/loginpage/visibility.svg')
                      .default
                  }
                  alt="visibility"
                />
              </Eye>
            </InputBox>
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
                id="Mobile"
                maxLength={1}
                className="active"
                placeholder="Enter organization number"
                value={number}
                onChange={handleInputChange}
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
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <ButtonBox
              type="submit"
              onClick={() => {
                handleSubmit()
              }}
            >
              {loading ? 'Loading...' : 'Register'}
            </ButtonBox>
          </Right>
        </Wrapper>
      </Main>
    </>
  )
}

export default RegisterPage
const Main = styled.div`
  padding: 50px 0;
  height: 100vh;
  @media all and (max-width: 1080px) {
    padding: 50px 0;
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  width: 90%;
  margin: 0 auto;
  @media all and (max-width: 1080px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
`
const Left = styled.div`
  width: 55%;
  @media all and (max-width: 1280px) {
    width: 65%;
  }
  @media all and (max-width: 1080px) {
    width: 75%;
    margin-bottom: 50px;
  }
  @media all and (max-width: 640px) {
    width: 85%;
  }
  @media all and (max-width: 480px) {
    width: 90%;
  }
`
const ImageBox = styled.div`
  align-items: center;
  width: 100%;
  @media all and (max-width: 980px) {
    width: 100%;
  }
  img {
    width: 100%;
    display: block;
  }
`
const Right = styled.div`
  width: 40%;
  @media all and (max-width: 1280px) {
    width: 50%;
  }
  @media all and (max-width: 1080px) {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media all and (max-width: 980px) {
  }

  @media all and (max-width: 640px) {
    width: 85%;
  }
  @media all and (max-width: 480px) {
    width: 90%;
  }
`
const TopText = styled.div``
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
const InputBox = styled.div`
  background-color: #f6f7f9;
  display: flex;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 300;
  padding: 10px 20px;
  align-items: flex-end;
  margin-top: 20px;
  width: 80%;
  &.number {
    margin-top: 20px;
  }
  @media all and (max-width: 640px) {
    width: 100%;
  }

  input {
    border: none;
    padding-left: 10px;
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
  cursor: pointer;
  @media all and (max-width: 640px) {
    width: 100%;
  }
`

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`
const PassBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Eye = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
