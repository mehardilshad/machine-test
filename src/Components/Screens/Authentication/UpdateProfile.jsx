import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UpdateProfile() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleIChange = (e) => {
    let inputValue = e.target.value
    setEmail(inputValue)
  }

  const handleSubmit = async () => {
    setLoading(true)

    if (email) {
      console.log(email)
      const response = await axios.post(
        'https://conext.in/custom_users/api/update-profile/',
        {
          email_address: email,
        },
      )
      console.log(response.data)

      if (response.data.status === true) {
        navigate('/login-page')
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
              <Titile>Update Profile</Titile>
              <SubTitile>
                Enter your email and received OTP along with new password
              </SubTitile>
            </TopText>
            <InputBox>
              <input
                type="text"
                id="email"
                maxLength={30}
                className="active"
                placeholder="Enter new username"
                value={email}
                onChange={handleIChange}
              />
            </InputBox>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            <ButtonBox
              type="submit"
              onClick={() => {
                handleSubmit()
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

export default UpdateProfile
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
