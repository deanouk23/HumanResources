import { connect } from 'react-redux'
import { toggleEdit } from '../actions/actions'
import DisplayItems from '../components/DisplayItems'

const getVisibleTodos = (items, filter) => {
  console.log("Received getVisibleTodos dispatch ", filter);
  switch (filter) {
    case 'SHOW_JOBS':
      return items.jobs
    case 'SHOW_TIME':
      return items.time
    case 'SHOW_INVOICES':
      return items.invoices
  }
}

const getJobTitles = (jobs) => {
  return jobs.keys();
}

const mapStateToProps = (state) => {
  return {
    items: getVisibleTodos(state.displayItems.data, state.visibilityFilter),
    filter: state.visibilityFilter,
    jobTitles: Object.keys(state.displayItems.data.jobs)
  }
}

const mapDispatchToProps = () => {
  return {}
}

const VisibleItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayItems)

export default VisibleItemList