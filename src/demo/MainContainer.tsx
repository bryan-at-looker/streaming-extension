import React, { useState, useEffect, useContext } from 'react';
import {
  ExtensionContext,
  ExtensionContextData,
  LookerSDK
} from "@looker/extension-sdk-react"
import {filter} from 'lodash'
import {newQueryTaskPoller} from '../helpers'
import { CarouselComponent } from './CarouselComponent';
import { Heading } from '@looker/components';
import styled from 'styled-components'

// const QUERY_ID = 4679;

export function MainContainer({summary}: any) {
  // const [summary, setSummary] = useState<any>({});

  // const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  // const sdk: LookerSDK = extensionContext.coreSDK

  useEffect(()=>{
    // newQueryTaskPoller(sdk, QUERY_ID, 'json_detail', setSummary)
  },[])

    const data = createSections(summary?.data)
    console.log(data)
    return (
    <>
      {data.tv && <>
        <ContentHeading title={"TV Shows"} mt='xxsmall'/>
        <CarouselComponent data={data.tv}></CarouselComponent>
      </>}
      {data.movie && <>
        <ContentHeading title={"Movies"}/>
        <CarouselComponent data={data.movie}></CarouselComponent>
      </>}
      {data.promos && <>
        <ContentHeading title={"Promoted Content"}/>
        <CarouselComponent data={data.promos}></CarouselComponent>
      </>}
    </>
  );
}

function createSections (data: any) {
  const type_field = 'peacock_sample.type'
  const promo_field = 'peacock_sample.current_promotion'
  return  {
    tv: filter(data, (o)=>{ return o[type_field]['value'] === 'TV' } ),
    movie: filter(data, (o)=>{ return o[type_field]['value'] === 'Movie' }),
    promos: filter(data, (o)=>{ return o[promo_field]['value'] === 'Yes' }),
  }
}

const ContentHeading = ({ title, mt }: any) => {
  return <StyledHeading 
    mt={(mt)?mt:"xxsmall"}  
    ml="xxxlarge" 
    fontWeight="bold"
  >{title}</StyledHeading>
} 

const StyledHeading = styled(Heading)`
  color: white;
`