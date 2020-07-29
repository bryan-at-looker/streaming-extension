import React from 'react';
import { Tooltip } from '@looker/components';
import styled from 'styled-components';

const STARS = 5

export function StarsComponent( {val, rendered}: any) {
  const percent = (val/STARS).toLocaleString("en", {style: "percent", minimumFractionDigits: 0})
  return (
    <Tooltip content={`${rendered||val} out of ${STARS} stars`} placement="right">
      {(eventHandlers, ref) => (
        <StyledDivStars ref={ref} {...eventHandlers}>
        <StyledDivTop style={{width: percent}}>★★★★★</StyledDivTop>
        <StyledDivBottom>☆☆☆☆☆</StyledDivBottom>
      </StyledDivStars>
      )}
    </Tooltip>
  );
}


const StyledDivStars = styled.div`
unicode-bidi: bidi-override;
color: white;
font-size: 25px;
height: 25px;
margin: 0 auto;
position: relative;
padding: 0;
text-shadow: 0px 1px 0 #a2a2a2;
`
// body > div > div > div:nth-child(2) > div > div > div > div > ul > a:nth-child(1) > div > div > div > span > span.TextBase-sc-1sjok63-0.Text-sc-1wcc5y1-0.cswHzG
const StyledDivTop = styled.div`
color: #FF7112;
padding: 0;
position: absolute;
z-index: 1;
display: block;
top: 0;
left: 0;
overflow: hidden;
`
const StyledDivBottom = styled.div`
padding: 0;
display: block;
z-index: 0;
`
