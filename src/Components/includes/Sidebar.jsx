import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'
import $ from 'jquery'

function SideBar() {
  const [isExpand, setExpand] = useState(false)
  const handleToggle = () => {
    setExpand(!isExpand)
  }
  function useOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setExpand(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef)

  function showSideMenu() {
    let element = document.getElementById('menu')
    element.classList.toggle('active')
  }

  useEffect(() => {
    $('.menu-item').click(function () {
      $(this)
      if ($(this).parent().hasClass('sub-menu')) {
        $(this).parent().find('.drop-down-menu').slideToggle('fast')
      }

      $('.drop-down-menu').not($(this).parent().children()).slideUp('fast')
    })
  }, [])

  return (
    <>
      <Overlay />
      <Container
        id="menu"
        ref={wrapperRef}
        className={isExpand && 'expand'}
        onMouseEnter={() => setExpand(true)}
        onMouseLeave={() => setExpand(false)}
      >
        <SideButtons>
          <ImageContainer>
            <LogoLink to="/"></LogoLink>
          </ImageContainer>
          <Button to="dashboard">
            <Menu className="menu-item">
              <Title>Dashboard</Title>
            </Menu>
          </Button>

          <Button to="/students" className="selected">
            <Menu className="menu-item">
              <Title>Students</Title>
            </Menu>
          </Button>
        </SideButtons>
      </Container>
    </>
  )
}

const Title = styled.span`
  font-family: 'gordita_regular';
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`

const SideButtons = styled.div``
const SubTitle = styled.p`
  font-family: 'gordita_medium';
  font-size: 14px;
  white-space: nowrap;
  color: #fff;
  @media only screen and (max-width: 1550px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    display: block;
  }
  &.selected {
    color: #f7684c;
  }
`
const Menu = styled.div`
  padding: 10px 21px;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`
const Dot = styled.span`
  display: block;
  width: 6px;
  height: 6px;
  background-color: #fff;
  transform: translate(0px, -1px);
  margin-right: 12px;
  border-radius: 12px;
`
const MenuItemIcon = styled.img`
  display: block;
  width: 16px;
  margin-right: 1.125rem;

  @media only screen and (max-width: 768px) {
    margin-right: 1.125rem;
  }
`
const DownIcon = styled.img`
  display: block;
  width: 12px;
  margin-left: 65px;
  transform: rotate(90deg);

  @media only screen and (max-width: 768px) {
    margin-right: 1.125rem;
  }
`
const DownIcon1 = styled.img`
  display: none;
  width: 12px;
  margin-left: 65px;
  margin-right: 1.125rem;
  @media only screen and (max-width: 1550px) {
    margin-right: 0;
  }
  @media only screen and (max-width: 768px) {
    margin-right: 1.125rem;
  }
`
const MenuItemIcon1 = styled.img`
  display: none;
  width: 16px;
  margin-right: 1.125rem;
  @media only screen and (max-width: 1550px) {
    margin-right: 1.125rem;
  }
  @media only screen and (max-width: 768px) {
    margin-right: 1.125rem;
  }
`
const Button = styled(NavLink)`
  width: -webkit-fill-available;
  height: 46px;
  display: flex;
  &.active {
    border-left: 5px solid #fff;
    color: #f7684c;
    background: #615d5d;
    ${MenuItemIcon} {
      display: none;
    }
    ${MenuItemIcon1} {
      display: block;
    }
    ${DownIcon} {
      display: none;
    }
    ${DownIcon1} {
      display: block;
    }
  }
`

const SubButton = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 35px;
  width: -webkit-fill-available;
  height: 46px;
  transition: all 0.4s ease;
  &.active {
    ${SubTitle}
    color: #f7684c;
    img {
      margin-right: 10px;
    }
  }

  cursor: pointer;
  &.active {
    color: #e15d36;
    background-color: #161619;
    &:after {
      content: '';
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      position: absolute;
      background-color: red;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    ${Dot} {
      background-color: #f7684c;
    }
    transition: all 0.4s ease;
  }
`
const Container = styled.aside`
  background: #a4a4a4;
  width: 218px;
  position: fixed;
  z-index: 300;
  top: 70px;
  left: 0;
  transition: all 0.4s ease;
  /* transition: all 0.2s ease; */
  height: calc(100vh - 70px);
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 1550px) {
    width: 55px;
    overflow: hidden;
  }
  @media only screen and (max-width: 768px) {
    top: 60px;
    transform: translateX(-220px);
    width: 220px;
    &.active {
      transform: translateX(0);
    }
  }
  &.expand {
    width: 218px;
    transition: all 0.4s ease;
  }
`
const ImageContainer = styled.h1`
  width: 152px;
  margin-right: 92px;
  display: none;
  margin: 0 auto;
  margin: 32px;
  @media only screen and (max-width: 1280px) {
    width: 147px;
    margin-right: 58px;
  }
  @media only screen and (max-width: 768px) {
    display: block;
  }
  @media only screen and (max-width: 640px) {
    width: 100px;
  }
`
const LogoLink = styled(Link)`
  display: block;
`
const Logo = styled.img`
  display: block;
  width: 100%;
`
const Overlay = styled.div``
const Logout = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
  padding-bottom: 10px;
`

export default SideBar
