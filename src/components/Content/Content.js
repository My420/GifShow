import React, { Component } from "react";
import "./content.scss";
import ItemList from "../ItemList/ItemList";
import { connect } from "react-redux";
import { createRequestFromURL } from "../../utils/utils";
import { loadData } from "../../ActionCreator/index";

class Content extends Component {
  state = {
    offset: 0
  };

  componentWillMount() {
    console.log(`********** willmount`, this.props);
    const url = this.props.match.url;
    const request = createRequestFromURL(url);
    this.props.loadData(request);
  }

  componentWillReceiveProps(nextProps) {
    console.log(`********** resiveprops`);
    if (nextProps.match.url !== this.props.match.url) {
      const url = nextProps.match.url;
      const request = createRequestFromURL(url);
      nextProps.loadData(request);
    }
  }

  render() {
    const { isAutoplay, isLoading, data } = this.props;
    console.log(`render ----- Content`);
    return (
      <ItemList isAutoplay={isAutoplay} isLoading={isLoading} data={data} />
    );
  }
}

const mapStateToProps = store => {
  return {
    isAutoplay: store.isAutoplay,
    isLoading: store.data.isLoading,
    data: store.data.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: request => {
      dispatch(loadData(request));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
