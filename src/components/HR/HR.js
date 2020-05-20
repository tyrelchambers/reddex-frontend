import React from 'react'

const styles = {
  height: "1px",
  backgroundColor: "var(--highlight)",
  width: "100%",
  marginTop: "1em",
  marginBottom: '1em'
}
const HR = ({classes}) => {
  return (
    <div style={{...styles}} className={`hr ${classes ? classes : ""}`}>
      
    </div>
  )
}

export default HR
