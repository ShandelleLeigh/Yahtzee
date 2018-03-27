import React, { Fragment } from 'react';
import ScoreSection from './ScoreSection';

const ScoreCard = () => (
  <Fragment>
    <ScoreSection lable="Upper" />
    <ScoreSection lable="Lower" />
  </Fragment>
)

export default ScoreCard
