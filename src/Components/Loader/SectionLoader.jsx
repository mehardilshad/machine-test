import React from 'react'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import loaderAnimation from '../../../../../Dashboard/task/src/assets/lotties/loader.json'

export default function SectionLoader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {},
  }
  return (
    <Container>
      <Lottie options={defaultOptions} height={90} width={90} />
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`
