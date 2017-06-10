import React, { Component } from "react"
import { connect } from "react-redux"
import request from "axios"

import { spellsActions, loadingActions } from "../logic/core/index"
import store from "../store"
import LoadingSpinner from "../components/LoadingSpinner"
import Sidebar from "../components/Sidebar"
import SpellList from "../components/SpellList"

const mapStateToProps = ({ spells, loading }) => ({ spells, loading })

class Spells extends Component {
  componentWillMount() {
    store.dispatch(loadingActions.loadingUpdate({ loading: true }))
  }

  componentDidMount() {
    return request
      .get('/api/v1/spells.json', { responseType: 'json' })
      .then(res => {
        store.dispatch(spellsActions.spellsInitFromAPI(res.data))
        store.dispatch(loadingActions.loadingUpdate({ loading: false }))
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
