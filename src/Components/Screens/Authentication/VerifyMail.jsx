import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../../../contexts/Store'

function VerifyMail() {
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false) // Add loading state
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Context)

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    inputValue = inputValue.replace(/\D/g, '').slice(0, 10)
    setOrg(inputValue)
  }
  const handleIChange = (e) => {
    let inputValue = e.target.value
    setEmail(inputValue)
  }

  const handleSubmit = async () => {
    setLoading(true)

    if (email) {
      const response = await axios.post(
        ' https://conext.in/custom_users/api/verify_email/',
        {
          email_address: email,
          org: org,
        },
      )
      console.log(response.data)
      if (response.data.status === true) {
        navigate('/register-page')
        dispatch({
          type: 'UPDATE_USER',
          verified_mail: email,
        })
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
          <Left>
            <ImageBox>
              <img
                src={require('../../../assets/images/image.png')}
                alt="loginimage"
              />
            </ImageBox>
          </Left>
          <Right>
            <TopText>
              <Titile>Let’s Get Started!</Titile>
            </TopText>
            <InputBox>
              <input
                type="text  "
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
                id="org"
                className="active"
                placeholder="Enter organization number"
                value={org}
                onChange={handleInputChange}
              />
            </InputBox>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            <ButtonBox
              type="submit"
              onClick={() => {
                handleSubmit()
                // navigate("/register-page");
              }}
            >
              {loading ? 'Loading...' : 'Verify'}
            </ButtonBox>

            <Expert>
              Login if you already have an <Log to="/login-page">account!</Log>{' '}
            </Expert>
          </Right>
        </Wrapper>
      </Main>
    </>
  )
}

export default VerifyMail
const Main = styled.div`
  padding: 150px 0 50px 0;
  height: 100vh;
  @media all and (max-width: 1080px) {
    padding: 100px 0 50px 0;
  }
  @media all and (max-width: 480px) {
    padding: 70px 0 50px 0;
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
    gap: 50px;
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

const Bar = styled.p`
  margin: 0;
  color: #dededf;
  margin-left: 5px;
  border-right: 1px solid #dededf;
  width: 5px;
  height: 20px;
`
const InputBox = styled.div`
  background-color: #f6f7f9;
  display: flex;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 300;
  padding: 10px 20px;
  align-items: center;
  margin-top: 30px;
  width: 80%;
  @media all and (max-width: 640px) {
    width: 100%;
  }
  &.number {
    margin-top: 20px;
  }

  input {
    border: none;
    padding-left: 10px;
    font-size: 18px;
    width: 100%;
    @media all and (max-width: 640px) {
      width: 100%;
    }
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
  margin-top: 20px;
  width: 80%;
  border: none;
  font-size: 18px;
  cursor: pointer;
  @media all and (max-width: 640px) {
    width: 100%;
  }
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
