import Axios from "axios"

export const getImportedStory = (url) => {
  return Axios.get(url).then(res => res.data[0].data.children[0].data)
}

