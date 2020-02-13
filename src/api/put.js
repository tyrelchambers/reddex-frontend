export const deleteDomainAlias = async (alias) => {
  const domainAlias = `${alias}.${process.env.REACT_APP_SUBDOMAIN_HOST}`;

  const getSite = await fetch(`https://api.netlify.com/api/v1/sites/${process.env.REACT_APP_NETLIFY_SITE}`, {
    headers: {
        'User-Agent': `Tyrel Chambers (tychambers3@gmail.com)`,
        Authorization: `Bearer ${process.env.REACT_APP_NETLIFY_ACCESS_TOKEN}`,
    },
  });
  const site = await getSite.json();

  // If Netlify Site does not have the domain alias we want to add
  if (site.domain_aliases.includes(domainAlias)) {
    const _ = []

    site.domain_aliases.map(x => {
      if (x !== domainAlias) {
        _.push(x)
      }

    })
 
      // Update the Netlify Site to include the domain alias we want to add
    await fetch(`https://api.netlify.com/api/v1/sites/${process.env.REACT_APP_NETLIFY_SITE}`, {
        method: 'PUT',
        headers: {
            'User-Agent': `Tyrel Chambers (tychambers3@gmail.com)`,
            Authorization: `Bearer ${process.env.REACT_APP_NETLIFY_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            domain_aliases: [
                ..._,
            ],
        }),
    });
  }
}

