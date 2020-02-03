import React from 'react';
import { render } from 'react-testing-library';
import { ContactsPage } from './ContactsPage';
import { ContactsList } from '../../components/ContactsList/ContactsList';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import * as stores from '../../stores/index';

const mockContacts = [
  {
    _id: "5ded82bd29a3f671a98aff0d",
    name: "wqqwew22a22w",
    notes: "wefqef",
    belongs_to: "5d3c8b45a70e544177cb8c8a",
    __v: 0
  },
  {
    _id: "5ded82bd29a3f671a98aff03",
    name: "wqqwew22aw",
    notes: "wefqef",
    belongs_to: "5d3c8b45a70e544177cb8c8a",
    __v: 0
  }
]

describe('<ContactsPage />', () => {
  it('renders', () => {
    const {getByText} = render(
      <Provider {...stores}>
        <BrowserRouter>
          <ContactsPage/>
        </BrowserRouter>
      </Provider>
    );  
    getByText("Contacts")
  })
})

describe('<ContactsList />', () => {
  const sortVal=""
  it('renders contact list', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ContactsList sortVal={sortVal} contacts={mockContacts}/>
      </BrowserRouter>
    )
    
    getByText("wqqwew22a22w")
    getByText("wqqwew22aw")

  })

})