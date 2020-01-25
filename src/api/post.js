import Axios from "axios"
import { toast } from "react-toastify";

const token = window.localStorage.getItem("token")
const BACKEND = process.env.REACT_APP_BACKEND;
export const saveContact = (data) => {
  return Axios.post(`${BACKEND}/api/contacts/save`, {
    ...data
  }, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const getContacts = () => {
  return Axios.get(`${BACKEND}/api/contacts/all`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const updateContact = (contact) => {
  return Axios.post(`${BACKEND}/api/contacts/update`, {
    ...contact
  }, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const saveStoryToReadingList = (data) => {
  return Axios.post(`${BACKEND}/api/profile/save_story`, {
    ...data
  },
  {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const addDomainAlias = async (alias) => {
  // Get Netlify Site to read existing domain aliases
  const domainAlias = `${alias}.reddex.app`;

  const getSite = await fetch(`https://api.netlify.com/api/v1/sites/6f408e3a-aac3-4ef1-8fd0-bd0934530cb1`, {
      headers: {
          'User-Agent': `Tyrel Chambers (tychambers3@gmail.com)`,
          Authorization: `Bearer ${process.env.REACT_APP_NETLIFY_ACCESS_TOKEN}`,
      },
  });
  const site = await getSite.json();

  // If Netlify Site does not have the domain alias we want to add
  if (!site.domain_aliases.includes(domainAlias)) {
      // Update the Netlify Site to include the domain alias we want to add
      await fetch(`https://api.netlify.com/api/v1/sites/6f408e3a-aac3-4ef1-8fd0-bd0934530cb1`, {
          method: 'PUT',
          headers: {
              'User-Agent': `Tyrel Chambers (tychambers3@gmail.com)`,
              Authorization: `Bearer ${process.env.REACT_APP_NETLIFY_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              domain_aliases: [
                  ...site.domain_aliases,
                  domainAlias,
              ],
          }),
      });
  }
}

export const activateWebsite = async () => {
  return Axios.post(`${BACKEND}/api/site/activate`, {},
  {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const updateWebsite = async (data) => {
  return Axios.post(`${BACKEND}/api/site/update`, {
    ...data
  },
  {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const submitStoryForm = (data) => {
  return Axios.post(`${BACKEND}/api/submissionForm/submit`, {
    ...data
  })
  .then(res => res.data)
}

export const requestReset = (email) => {
  return Axios.post(`${BACKEND}/api/reset/get_reset_token`, {
    email
  })
  .then(res => res.data)
  .catch(err => toast.error(err.response.data))
}

export const resetPassword = (data) => {
  return Axios.post(`${BACKEND}/api/reset`, {
    ...data
  })
  .then(res => res.data)
}

export const createNewDefaultMessage = (text) => {
  return Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/default_message`, {
    text
  }, {
    headers: {
      token
    }
  })
  .then(res => {
    toast.success("Message saved")
    return res.data
  })
  .catch(err => {
    toast.error("Something went wrong, try again");
    console.log(err);
  });
}

export const createNewAltMessage = (text) => {
  return Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/alt_message`, {
    text
  }, {
    headers: {
      token
    }
  })
  .then(res => {
    toast.success("Message saved")
    return res.data
  })
  .catch(err => {
    toast.error("Something went wrong, try again");
    console.log(err);
  });
}