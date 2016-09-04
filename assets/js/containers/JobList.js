import { Table } from 'react-bootstrap';

import React from 'react';
import { connect } from 'react-redux';
import Job from '../components/JobComponent';
import { toggleEdit } from '../actions/actions'


const JobList = ({ jobs, onItemClick }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Job Title</th>
            <th width="85">Hourly Rate</th>
            <th width="85">Tax Rate</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => {
            return (
              <Job
                key={job.title}
                job={job}
                onClick={() => onItemClick(job.title)}
              />
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default JobList
