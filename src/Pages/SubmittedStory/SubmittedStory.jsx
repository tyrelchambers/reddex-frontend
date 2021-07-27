import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { H1 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const SubmittedStory = () => {
  const [state, setState] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fn = async () => {
      const story = await getAxios({
        url: `/submitted/${id}`,
      });
      setState(story);
    };

    fn();
  }, []);

  if (!state) return null;

  return (
    <DisplayWrapper>
      <div className="max-w-2xl mt-10 w-full ml-auto mr-auto">
        <H1>{state.story_title}</H1>
        <div
          dangerouslySetInnerHTML={{ __html: state.body }}
          className="mt-4"
        ></div>
      </div>
    </DisplayWrapper>
  );
};

export default SubmittedStory;
