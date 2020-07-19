import React from 'react';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div style={{padding: '50px', textAlign: 'left'}}>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Layout