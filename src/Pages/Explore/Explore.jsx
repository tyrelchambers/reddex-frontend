import React, { useState, useEffect } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Explore.scss";
import { getAxios } from "../../api";
import { H1, H1Subtitle } from "../../components/Headings/Headings";

const Explore = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    getAxios({
      url: "/channels/",
      options: {
        withToken: false,
      },
    }).then((res) => {
      if (res) {
        setChannels([...res]);
      }
    });
  }, []);

  const channelsList = channels.map((x, id) => <Channel x={x} key={id} />);

  return (
    <DisplayWrapper>
      <div className="container explore-wrapper">
        <H1 className="text-center">Explore different channels</H1>
        <H1Subtitle>
          Explore the horror sites hosted by Reddex and maybe you'll find your
          new favourite channel to watch. Maybe take a shot at writing a story
          for them!
        </H1Subtitle>

        <div className="channels-list">{channelsList}</div>
      </div>
    </DisplayWrapper>
  );
};

const Channel = ({ x }) => {
  return (
    <a
      className="channel-item"
      href={`https://${x.subdomain}.${process.env.REACT_APP_SUBDOMAIN_HOST}`}
      target="_blank"
      rel="noreferrer noopener"
      style={{
        background: `url(${
          x.thumbnail ? x.thumbnail : x.banner_url
        }) center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div className="channel-item-body flex items-center">
        <h2 className="mr-2 font-bold">{x.title}</h2>
      </div>
    </a>
  );
};

export default Explore;
