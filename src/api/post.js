import Axios from "axios"

const token = window.localStorage.getItem("token")

export const saveContact = (data) => {
  return Axios.post(`${process.env.REACT_APP_BACKEND}/api/contacts/save`, {
    ...data
  }, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const getContacts = () => {
  return Axios.get(`${process.env.REACT_APP_BACKEND}/api/contacts/all`, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const updateContact = (contact) => {
  return Axios.post(`${process.env.REACT_APP_BACKEND}/api/contacts/update`, {
    ...contact
  }, {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const saveStoryToReadingList = (data) => {
  return Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/save_story`, {
    ...data
  },
  {
    headers: {
      token
    }
  })
  .then(res => res.data)
}

export const addDomainAlias = async (siteId = "971dce32-5b61-4718-9e10-2598704895d9", alias) => {
  // Get Netlify Site to read existing domain aliases
  const domainAlias = `${alias}.reddex.app`;

  const getSite = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
      headers: {
          'User-Agent': `Tyrel Chambers (tychambers3@gmail.com)`,
          Authorization: `Bearer ${process.env.REACT_APP_NETLIFY_ACCESS_TOKEN}`,
      },
  });
  const site = await getSite.json();
  // If Netlify Site does not have the domain alias we want to add
  if (!site.domain_aliases.includes(domainAlias)) {
      // Update the Netlify Site to include the domain alias we want to add
      await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
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