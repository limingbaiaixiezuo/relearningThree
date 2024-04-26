import React, { useState } from 'react';
import { Map, fromJS } from 'immutable';

const state = Map({
    address: Map({
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA'
    })
  }) as Map<string, any>;

const Immutable: React.FC = () => {
  const [state, setState] = useState<Map<string, any>>(
    fromJS({
      name: 'John Doe',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA'
      }
    })
  );

  const updateAddress = () => {
    setState(state.setIn(['address', 'city'], 'New City'));
  };

  return (
    <div>
      <p>Name: {state.get('name')}</p>
      <p>Age: {state.get('age')}</p>
      <p>
        Address: {(state.getIn(['address', 'street']) as string)},{' '}
        {(state.getIn(['address', 'city']) as string)}, {(state.getIn(['address', 'state']) as string)}
        </p>
      <button onClick={updateAddress}>Update Address</button>
    </div>
  );
};

export default Immutable;