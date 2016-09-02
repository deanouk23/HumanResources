import React from 'react';

class TimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      minutes: '',
      summary: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitleChange(e) {
    this.setState({title: e.target.value})
  }
  handleMinutesChange(e) {
    this.setState({minutes: e.target.value})
  }
  handleSummaryChange(e) {
    this.setState({summary: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault();
    let title = this.state.title.trim();
    let minutes = this.state.minutes.trim();
    let summary = this.state.summary.trim();
    if (!title || !minutes || !summary) {
      return;
    }
    this.props.addTime(title, minutes, summary);
    this.setState({title: '', minutes: '', summary: ''})
  }
  render() {
    return (
      <form className="jobForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Job title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <input
          type="text"
          placeholder="Minutes"
          value={this.state.minutes}
          onChange={this.handleMinutesChange}
        />
        <input type="text"
          placeholder="Summary of work"
          value={this.state.summary}
          onChange={this.handleSummaryChange}
        />
        <input type="submit" value="Push" />
      </form>
    );
  }
}

export default TimeForm