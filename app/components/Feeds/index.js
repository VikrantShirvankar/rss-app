/**
 *
 * Feeds
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Feeds({ ...props }){
  const { title, description, pubDate} = props.item;
  return (
    <div className="px-3 px-lg-5 mb-4" style={{ border: '1px solid grey' }}>
      <div className="pt-5 font-weight-bold"><h3>{title}</h3></div>
      <div className="font-weight-bold pb-4 ">{pubDate}</div>
      <div className="pb-5" dangerouslySetInnerHTML={{__html: description}} />
    </div>
  );
}

Feeds.propTypes = {};

export default Feeds;
