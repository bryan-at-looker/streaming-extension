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

const QUERY_ID = 3829;

export function MainContainer() {
  const [summary, setSummary] = useState<any>({});

  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk: LookerSDK = extensionContext.coreSDK

  useEffect(()=>{
    newQueryTaskPoller(sdk, QUERY_ID, 'json_detail', setSummary)
  },[])

    const data = createSections(summary?.data)
    return (
    <>
      {data.tv && <>
        <StyledHeading title={"TV Shows"} mt='xxsmall'/>
        <CarouselComponent data={data.tv}></CarouselComponent>
      </>}
      {data.movie && <>
        <StyledHeading title={"Movies"}/>
        <CarouselComponent data={data.movie}></CarouselComponent>
      </>}
      {data.promos && <>
        <StyledHeading title={"Promoted Content"}/>
        <CarouselComponent data={data.promos}></CarouselComponent>
      </>}
    </>
  );
}

function createSections (data: any) {
  const type_field = 'peacock_sample.type'
  const promo_field = 'peacock_sample.current_promotion'
  console.log(data)
  return  {
    tv: filter(data, (o)=>{ return o[type_field]['value'] === 'TV' } ),
    movie: filter(data, (o)=>{ return o[type_field]['value'] === 'Movie' }),
    promos: filter(data, (o)=>{ return o[promo_field]['value'] === 'Yes' }),
  }
}

const StyledHeading = ({ title, mt }: any) => {
  return <Heading mt={(mt)?mt:"xxsmall"}  ml="xxxlarge" fontWeight="bold">{title}</Heading>
} 