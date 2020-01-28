const get = url => {
  return Promise.resolve({data: 
    {"_id":{"$oid":"5e0beb43d81185003d10d1dd"},"showCreditLink":true,"bannerURL":"https://reddex.s3.amazonaws.com/1579744910881/1500x500.jpeg","accent":"#ff5542","theme":"dark","user_id":{"$oid":"5d6b1c07b8a582003d42e622"},"createdAt":{"$date":{"$numberLong":"1577839427061"}},"updatedAt":{"$date":{"$numberLong":"1579744911668"}},"__v":{"$numberInt":"0"},"facebook":null,"instagram":"storiesaftermidnight","introduction":"A Youtube Narrator trying to give you a good spook... with my voice.","patreon":null,"podcast":"https://open.spotify.com/show/1PZtWmKZftMks0NXKO4mRw","subdomain":"storiesaftermidnight","submissionForm":true,"title":"Stories After Midnight","twitter":"s_a_midnight","twitterId":"s_a_midnight","twitterTimeline":true,"youtube":"https://www.youtube.com/channel/UCGB-bGTeEWfGKLNx2Wi9ytQ","youtubeId":"UCGB-bGTeEWfGKLNx2Wi9ytQ","youtubeTimeline":true}
  })
}

exports.get = get;