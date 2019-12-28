
export const deleteDomainAlias = async (alias) => {
  const domainAlias = `${alias}.reddex.app`;

  const getSite = await fetch(`https://api.netlify.com/api/v1/sites/6f408e3a-aac3-4ef1-8fd0-bd0934530cb1`, {
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
    await fetch(`https://api.netlify.com/api/v1/sites/6f408e3a-aac3-4ef1-8fd0-bd0934530cb1`, {
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