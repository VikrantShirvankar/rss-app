/**
 *
 * Demo
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import makeSelectRss from './selectors';
import reducer from './reducer';
import Feeds from '../../components/Feeds';
import { getRssFeeds, clearData } from './actions';

export class Rss extends React.Component {
  constructor() {
    super();
    this.state = {
      links: [],
      link: null,
      linkValidation: null,
    };
  }

  componentDidMount() {
    const { match, dispatch } = this.props;
    const data = JSON.parse(localStorage.getItem('links'));
    if (data && data.length) {
      this.setState({ links: data });
      const filterLink = data.filter(d => d.id === parseInt(match.params.id, 10));
      if(filterLink && filterLink.length) {
        dispatch(getRssFeeds(filterLink[0].link));
      }
    }
  }

  addLink(e) {
    e.preventDefault();
    const { links, link } = this.state;
    const { dispatch, history } = this.props;
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (re.test(link)) {
      const linksData = [{ id: new Date().getTime(), link }, ...links];
      this.setState({ links: linksData, link: null, linkValidation: null });
      localStorage.setItem('links', JSON.stringify(linksData));
      dispatch(getRssFeeds(link));
      history.push(`/${linksData[0].id}`);
    } else {
      this.setState({ link: null, linkValidation: 'Invalid Link' });
    }
  }

  removeLink(e, id) {
    e.stopPropagation();
    const { links } = this.state;
    const { dispatch, match, history } = this.props;
    const data = links.filter(p => p.id !== id);
    this.setState({ links: data });
    if(parseInt(match.params.id, 10) === id) {
      dispatch(clearData());
      history.push('/');
    }
    localStorage.setItem('links', JSON.stringify(data));
  }

  onSelect(id, link) {
    const { dispatch, history, match } = this.props;
    if(parseInt(match.params.id, 10) !== id) {
      dispatch(getRssFeeds(link));
      history.push(`/${id}`);
    }
  }

  render() {
    const { links, linkValidation, link } = this.state;
    const {
      rss: { feedsData, loading, errorMsg },
      match,
    } = this.props;
    const activeLinkStyle = { backgroundColor: 'grey', color: '#fff', borderRadius: '10px' };
    const normalLinkStyle = { backgroundColor: 'lightgrey', color: '#000', borderRadius: '10px' };

    return (
        <div className="row m-0">
          <div className="col-sm-12 col-lg-4 col-xl-3">
            <div className="p-3" style={{ borderBottom: '3px solid grey' }}>
              <form onSubmit={e => this.addLink(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter link"
                    required
                    value={this.state.link || undefined}
                    onChange={e => this.setState({ link: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <div className="p-2 text-danger">{linkValidation}</div>
              </form>
            </div>
            <div className="p-3">
              {links.map(l => (
                <div
                  role="presentation"
                  className="p-2 mb-2 row m-0"
                  style={parseInt(match.params.id, 10) === l.id ? activeLinkStyle : normalLinkStyle }
                  key={l.id}
                  onClick={() => this.onSelect(l.id, l.link)}
                >
                  <div className="col-10 text-truncate">{l.link}</div>
                  <div role="presentation" className="col-2 text-center" onClick={(e) => this.removeLink(e, l.id)}>
                    <i className="fa fa-times" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-sm-12 col-lg-8 col-xl-9" style={{ borderLeft: '3px solid grey', minHeight: '610px' }}>
            {
              !loading ?
                <Fragment>
                  <div className="p-3 d-flex justify-content-center align-items-center">
                    <h1>{feedsData.feed ? feedsData.feed.title : ''}</h1>
                  </div>
                  <div className="p-2 p-lg-5">
                    {feedsData.items && feedsData.items.length
                      ? feedsData.items.map(item => <Feeds key={item.title} item={item} />)
                      : <div className="text-center">
                          <h2>No data found</h2>
                          <p>{errorMsg}</p>
                        </div>}
                  </div>
                </Fragment> :
                <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: 300 }}>
                  <div className="spinner-border" role="status" >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
            }
          </div>
        </div>
    );
  }
}

Rss.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  rss: makeSelectRss(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'rss', reducer });

export default compose(
  withReducer,
  withConnect,
)(Rss);
