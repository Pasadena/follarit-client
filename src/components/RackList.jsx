import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './RackList.css';

const RackList = ({ rackListQuery }) => {
  console.log(rackListQuery);

  return (
  <div className="RackList">
    { rackListQuery && rackListQuery.loading && <Loading /> }
    { rackListQuery && rackListQuery.error && <Error /> }
    { rackListQuery && rackListQuery.racks && rackListQuery.racks.map(rack => <Rack rack={rack} />) }
  </div>
)};

const Rack = ({ rack }) => (
  <div className="Rack">
    <div className="Rack-Header">{rack.name}</div>
    <div className="Rack-Body">
      <div className="Rack-Body-Column">
        <div>
          Available bikes: {rack.bikes_avail}
        </div>
        <div>
          Slots total: {rack.slots_total}
        </div>
        <div>
          Slots available: {rack.slots_avail}
        </div>
      </div>
      <div className="Rack-Body-Column">
        Last updated: { asDate(rack.last_seen) }
      </div>
    </div>
  </div>
);

const asDate = (timeStamp) => {
  console.log(timeStamp);
  console.log(new Date(timeStamp));
  return new Date(timeStamp).toLocaleDateString({ day: '2-digit', year: 'numeric', month: '2-digit' });
}

const Loading = () => (
  <div>The query is executing. Stay put!</div>
)

const Error = () => (
  <div>Cannot load rack data! Something weird happened!</div>
);

const RACK_LIST_QUERY = gql`
  query RackListQuery {
    racks {
      name,
      bikes_avail,
      slots_total,
      slots_avail,
      last_seen
    }
  }
`;

export default graphql(RACK_LIST_QUERY, { name: 'rackListQuery' })(RackList);