import React from 'react'

const UserInboxDumb = ({data}) => {
  return (
    <div key={data.id}>
      {console.log(data)}
    </div>
  )
}

export default UserInboxDumb
