import React, { useState, useEffect, useContext } from 'react';
import { Card, Heading, FlexItem, Text, Flex } from '@looker/components';
import styled from 'styled-components';
import { NumberToColoredPercent } from './NumberToColoredPercent';
import { StarsComponent } from './StarsComponent';
import {
  ExtensionContext,
  ExtensionContextData
} from "@looker/extension-sdk-react"
import { ExtensionHostApi } from "@looker/extension-sdk"

const IMAGE_FIELD = 'peacock_sample.image'
const TITLE_FIELD = 'peacock_sample.title'
const TREND_FIELD = 'peacock_sample.trend'
const VIEWS_FIELD = 'peacock_sample.views'
const STARS_FIELD = 'peacock_sample.rating'
const DASHBOARD_ID = '4'
const DASHBOARD_FILTER = 'Title'

export function CarouselComponent( {data}: any) {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const extensionHost = extensionContext.extensionSDK as ExtensionHostApi

  const slides = data.map((row: any, i: number)=>{
    return <FlexItem key={i} mb="xlarge">
        <StyledCard 
            onClick={()=>{ extensionHost.openBrowserWindow(`/dashboards-next/${DASHBOARD_ID}?${DASHBOARD_FILTER}=${row[TITLE_FIELD]['filterable_value'] || row[TITLE_FIELD]['value'] }`, "_blank") }}
            // href={`/dashboards-next/27?Cool=${row[TITLE_FIELD]['filterable_value'] || row[TITLE_FIELD]['value'] }`}
            raised
            m="medium"
            p="small"
        >
          <img src={row[IMAGE_FIELD].value} />
          <Heading
            mt="large"
            fontSize="xlarge">{row[TITLE_FIELD].value}
          </Heading>
          <span>
            <Text>{row[VIEWS_FIELD].rendered} views  </Text>
            <NumberToColoredPercent val={row[TREND_FIELD].value} query_running={false}></NumberToColoredPercent>
          </span>
          <StarsComponent val={row[STARS_FIELD].value} rendered={row[STARS_FIELD].rendered}></StarsComponent>
        </StyledCard>  
      </FlexItem>
  })

  return (
    <StyledFlex>{slides}</StyledFlex>
  );
}

const StyledCard = styled(Card)`
  width: 300px;
  height: 400px;
  text-align: center;
  align-items: center;
`

const StyledFlex = styled(Flex)`
  overflow-x: scroll;
`