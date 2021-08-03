import { getAxios } from ".";

export const getVisitorToken = async () => {
  return await getAxios({
    url: "/tokens/visitorToken",
  });
};
