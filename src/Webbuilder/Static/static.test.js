import React from 'react';
import { render, waitForElement, waitForDomChange } from '@testing-library/react'
import { getSiteConfig, StaticChild } from './Static';

jest.mock('../../__mocks__/axios.js')

describe('<StaticChild />', () => {
  let config = {};
  let props;
  beforeEach(async () => {
    const subdomain = "storiesaftermidnight"
    const setConfig = () => {}
    config = await getSiteConfig(subdomain, setConfig)
    let subForm = {
      email: "",
      senderName: "",
      message: "",
      sentToOthers: false
    }
    const setSubForm = () => {}
    props = {
      setSubForm,
      subForm,
      config
    }
  })
  it('renders with config', async () => {
    const {getByText} = render(<StaticChild {...props}/>);
    getByText("Stories After Midnight")
  })

  it('shows submission form if true', () => {
    const {getByText} = render(<StaticChild {...props}/>);
    getByText('Your Name or Alias')
  })

  it('doesn\'t show submission form if false', () => {
    const cProps = {
      ...props
    }
    cProps.config.submissionForm = false
    const { queryByText } = render(<StaticChild {...cProps}/>);

    expect(queryByText('Your Name or Alias')).toBeNull()
  })

  it('shows twitterline if true', () => {
    const cProps = {
      ...props
    }
    cProps.config.twitterTimeline = true;
    const {container} = render(<StaticChild {...props}/>);

    expect(container.querySelector('.static-twitter-timeline').innerHTML).toBeTruthy()
  })

  it('doesn\'t show twitterline if false', () => {
    const cProps = {
      ...props
    }
    cProps.config.twitterTimeline = false;
    const {container} = render(<StaticChild {...props}/>);

    expect(container.querySelector('.static-twitter-timeline')).toBeNull()

  })
 
  it('shows youtube timeline if true', async () => {
    const cProps = {
      ...props
    }
    cProps.config.youtubeTimeline = true;
    cProps.config.youtubeId = 'UCGB-bGTeEWfGKLNx2Wi9ytQ';

    const {getByText} = render(<StaticChild {...props}/>);
    
    getByText('Latest Youtube Videos')
  })

  it('doesn\'t youtube timeline if false', () => {
    const cProps = {
      ...props
    }
    cProps.config.youtubeTimeline = false;
    const {container} = render(<StaticChild {...props}/>);
    expect(container.querySelector('.static-youtube-item')).toBeNull();
  })

  it('shows introduction if true', () => {
    const cProps = {
      ...props
    }
    cProps.config.introduction = "Hey"
    const {getByText} = render(<StaticChild {...props}/>);
    getByText("About Me")
  })

  it('doesn\'t show introduction if empty', () => {
    const cProps = {
      ...props
    }
    cProps.config.introduction = ""
    const {queryByText} = render(<StaticChild {...props}/>);
    expect(queryByText('About Me')).toBeNull()
  })
})