import React, { useContext, useState } from 'react'

// packages
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../contexts/Store'
import { general } from '../../../axiosConfig'

function LoginPage() {
  const navigate = useNavigate()
  //states
  const [viewPassword, setViewPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, SetPassword] = useState('')
  const { dispatch } = useContext(Context)
  const [data, SetData] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    // e.preventDefault()

    if (username && password) {
      general
        .post('/login/', {
          username,
          password,
        })
        .then(function (response) {
          const { StatusCode } = response.data
          console.log(response.data.token)
          const user_details = {
            is_verified: true,
            role: '',
            access: response.data.token,
          }
          dispatch({
            type: 'UPDATE_USER',
            user_details,
          })
          SetData(response.data.token)
          navigate('/staff-profile')
        })
        .catch(function (error) {
          console.log(error.response.data.non_field_errors)
          setErrorMessage(error.response.data.non_field_errors)
          navigate('/login-page')
        })
    } else {
      setErrorMessage('Please enter a valid Email.')
    }
    setLoading(false)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
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
            <Titile>Welcome Again, Login</Titile>
            <SubTitile>
              Please enter your registered Email as Username and Password
            </SubTitile>
          </TopText>

          <InputUser>
            <UserBox>
              <img
                src={
                  require('../../../assets/images/loginpage/account_circle.svg')
                    .default
                }
                alt="account_circle"
              />
            </UserBox>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </InputUser>
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
              placeholder="Enter Password"
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
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          <For to="/forgot-password">Forget Password?</For>
          <ButtonBox onClick={handleSubmit}>Login</ButtonBox>
          <Expert>
            Don't you have an account?{' '}
            <Log to="/verify-mail"> Create Account</Log>{' '}
          </Expert>
        </Right>
      </Wrapper>
    </Main>
  )
}

export default LoginPage

const Main = styled.div`
  padding: 150px 0 70px 0;
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
const SubTitile = styled.p`
  color: #7a838a;
  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
  @media all and (max-width: 1050px) {
    font-size: 14px;
  }
`

const InputUser = styled.div`
  background-color: #f6f7f9;
  display: flex;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 300;
  padding: 10px 20px;
  align-items: center;
  margin-top: 50px;
  width: 80%;
  @media all and (max-width: 640px) {
    width: 100%;
  }

  input {
    border: none;
    background-color: #f6f7f9;
    padding-left: 10px;
    height: 20px;
    font-size: 20px;
    width: 100%;
    cursor: pointer;
    :focus {
      outline: none;
      border: 1px solid #f1f2f378;
    }

    ::placeholder {
      font-size: 14px;
      font-weight: 400;
    }
  }
`
const InputBox = styled.div`
  background-color: #f6f7f9;
  display: flex;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 300;
  padding: 10px 20px;
  align-items: center;
  margin-top: 10px;
  width: 80%;
  @media all and (max-width: 640px) {
    width: 100%;
  }

  input {
    border: none;
    background-color: #f6f7f9;
    padding-left: 10px;
    height: 20px;
    font-size: 20px;
    width: 100%;
    cursor: pointer;
    :focus {
      outline: none;
      border: 1px solid #f1f2f378;
    }

    ::placeholder {
      font-size: 14px;
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
  text-decoration: underline;
`
const Expert = styled.h5`
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
  text-align: center;
  color: #818181;
  margin-top: 20px;
  width: 80%;
  @media all and (max-width: 1280px) {
    font-size: 15px;
  }
`
const Eye = styled.div`
  margin-right: 15px;
  margin-top: 7px;
`
const UserBox = styled.div`
  margin-top: 5px;
`
const PassBox = styled.div`
  margin-top: 5px;
`

const For = styled(Link)`
  text-decoration: underline;
  color: #2b3990;
  text-align: end;
  display: block;
  margin-top: 15px;
  width: 80%;
  @media all and (max-width: 1280px) {
    font-size: 12px;
  }
  @media all and (max-width: 640px) {
    width: 100%;
  }
`
const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`
