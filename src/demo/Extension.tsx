import React, { useContext, useEffect, useState } from 'react'
import { ExtensionContext } from '@looker/extension-sdk-react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { hot } from "react-hot-loader/root"
import { MainContainer } from './MainContainer'
import styled from 'styled-components'
import { PeacockSvg } from './PeacockSvg'
import { newQueryTaskPoller } from '../helpers'
import { Box, FlexItem, Flex } from '@looker/components'
import { TopbarNavigation } from './TopbarNavigation'

const QUERY_ID = 4679;

const ExtensionInternal = () => {
  // static contextType = ExtensionContext
  // context!: React.ContextType<typeof ExtensionContext>
  const [summary, setSummary] = useState<any>({});
  const [iteration, setIteration] = useState<any>(false);
  
  const context = useContext(ExtensionContext)
  const sdk = context.coreSDK

  useEffect(() => {
    // window.addEventListener('scroll', (e)=>{ console.log(window.scrollY) }) 
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
      const logo = document.getElementById('logo')
      if (logo) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          logo.style.height = "40px";
        } else {
          logo.style.height = "75px";
          // document.getElementById("logo").style.fontSize = "35px";
        }
      }
    }
    newQueryTaskPoller(sdk, QUERY_ID, 'json_detail', setSummary)
  }, [])

  if (summary && summary.data && summary.data.length && iteration) {
  // if( true ) {
    return (
      <>
        <StyledFlex alignItems="center" justifyContent="flex-start" id="topbar" >
          <FlexItem mr="xxlarge">
            <StyledLogoBox id="logo">
              <PeacockSvg font_fill="white"></PeacockSvg>
            </StyledLogoBox>
          </FlexItem>
          <FlexItem >
            <TopbarNavigation/>
          </FlexItem>
        </StyledFlex>
        <StyledBox>
          <MainContainer summary={summary}></MainContainer>
        </StyledBox>
      </>
    )  
  } else {
    return <FullScreen pl="xxxxlarge">
      <PeacockSvg 
        font_fill="white" 
        loading={"true"}
        setIteration={setIteration}
      />
    </FullScreen>
  }
  
}

const StyledFlex = styled(Flex)`
background-color: black;
overflow: hidden;
transition: 0.4s; /* Adds a transition effect when the padding is decreased */
position: fixed; /* Sticky/fixed navbar */
width: 100%;
top: 0; /* At the top */
z-index: 99;
`

const StyledLogoBox = styled.div`
height: 75px;
margin: 12px;
transition: 0.6s;
`

const StyledBox = styled.div`
width: 100vw;
margin-top: 99px;
background-color: black;
`

const FullScreen = styled(Box)`
width: 100vw;
height: 100vh;
background-color: black;
`

export const Extension = hot(withRouter(ExtensionInternal))
