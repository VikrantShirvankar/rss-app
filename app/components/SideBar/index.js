/**
 *
 * SideBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

export class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="row m-0" style={{ minHeight: '610px' }}>
        <div className="col-sm col-lg-3">
          <div className="p-3" style={{ borderBottom: '1px solid grey' }}>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter link" />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="col-sm col-lg-9" style={{ borderLeft: '1px solid red' }}>
          rss
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {};
export default SideBar;
