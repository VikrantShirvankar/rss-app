/**
 *
 * Feeds
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Feeds({ ...item }){
  return (
    <div className="px-3 px-lg-5 mb-4" style={{ border: '1px solid grey' }}>
      <div className="pt-5 pb-4">{item.item.title}</div>
      <div className="pb-5">{item.item.description}</div>
    </div>
  );
}

Feeds.propTypes = {};

export default Feeds;
