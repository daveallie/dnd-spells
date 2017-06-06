import React, { Component } from "react"
import { connect } from "react-redux"
import request from "axios"

import { setAllFromAPI } from "../store/spells/actions"
import { setLoadingState } from "../store/loading/actions"
import store from "../store"
import LoadingSpinner from "../components/LoadingSpinner"
import Sidebar from "../components/Sidebar"
import SpellList from "../components/SpellList"

const mapStateToProps = ({ spells, loading }) => ({ spells, loading })

class Spells extends Component {
  componentWillMount() {
    store.dispatch(setLoadingState(true))
  }

  componentDidMount() {
    return request
      .get('/api/v1/spells.json', { responseType: 'json' })
      .then(res => {
        store.dispatch(setAllFromAPI(res.data))
        store.dispatch(setLoadingState(false))
      })
      .catch(error => this.setState({ fetchCommentsError: error }))
  }

  render() {
    return (
      <div>
        <LoadingSpinner fullPage={true} hidden={!this.props.loading} />
        <Sidebar/>
        <SpellList spells={this.props.spells}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Spells)
