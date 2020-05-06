  /*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React from 'react'
import {Box, Flex} from '@looker/components'
import {ExtensionContext} from '@looker/extension-sdk-react'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import { hot } from "react-hot-loader/root"
import { PeacockLogo } from './PeacockLogo'
import { MainContainer } from './MainContainer'
import styled from 'styled-components'
import { PeacockSvg } from './PeacockSvg'

class ExtensionInternal extends React.Component<any, any> {
  static contextType = ExtensionContext
  context!: React.ContextType<typeof ExtensionContext>

  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {    }
  }

  componentDidMount() {
    // window.addEventListener('scroll', (e)=>{ console.log(window.scrollY) }) 
    window.onscroll = function() {scrollFunction()};

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
   }

  componentDidUpdate() {}

  /*
  // TEMPLATE CODE FOR RUNNING ANY QUERY
  async runQuery() {
      try {
      const result = await this.context.coreSDK.ok(
        this.context.coreSDK.run_inline_query({
          result_format: "json_detail",
          limit: 10,
          body: {
            total: true,
            model: "thelook",
            view: "users",
            fields: ["last_name", "gender"],
            sorts: [`last_name desc`]
          }
        })
      )
      this.setState({
        queryResult: JSON.stringify(result, undefined, 2),
        runningQuery: false
      })
    } catch (error) {
      this.setState({
        queryResult: "",
        runningQuery: false,
        errorMessage: "Unable to run query"
      })
    }
  }
  */


  render() {
    return (
      <>
        <StyledFlex id="topbar" >
            <StyledLogoBox id="logo">
              <PeacockSvg></PeacockSvg>
            </StyledLogoBox>
            
            {/* <PeacockLogo></PeacockLogo> */}
          
        </StyledFlex>
        <StyledBox>
          <MainContainer></MainContainer>
        </StyledBox>   
      </>
    )
  }
}

const StyledFlex = styled.div`
background-color: white;
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
`

export const Extension = hot(withRouter(ExtensionInternal))
