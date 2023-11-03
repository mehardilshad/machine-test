import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'

const Topbar = ({ isExpand, setExpand }) => {
  function showSideMenu() {
    let element = document.getElementById('menu')
    element.classList.toggle('active')
  }

  return (
    <>
      <Container>
        <Head>
          <ImageContainer>
            <LogoLink to={'/dashboard'}>Dashboard</LogoLink>
          </ImageContainer>
          <ImageContainer>
            <LogoLink to={'/courses'}> Courses</LogoLink>
          </ImageContainer>
          <ImageContainer>
            <LogoLink to={'/students'}> Students</LogoLink>
          </ImageContainer>
        </Head>
      </Container>
    </>
  )
}

export default Topbar

const HeaderIcon = styled.img`
  display: none;
  @media (max-width: 768px) {
    cursor: pointer;
    display: none;
    width: 19px;
  }
`
const Container = styled.header`
  padding: 0 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background: #a4a4a4;
  height: 75px;
  z-index: 200;
  @media (max-width: 768px) {
    height: 60px;
    padding: 0 30px;
  }
`
const Head = styled.header`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 980px) {
    width: 100%;
  }
`

const ImageContainer = styled.h1`
  width: auto;
`
const LogoLink = styled(NavLink)`
  color: #fff;
  font-family: 'gordita_medium';
  font-size: 20px;
  &.active {
    /* border-left: 2px solid #000; */
    color: black;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  div {
    display: flex;
    align-items: center;
    justify-content: right;
  }
`
