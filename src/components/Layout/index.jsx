import React from 'react';
import { useHistory } from 'react-router-dom'; 
const Layout = ({ children }) => {
  const history = useHistory();
  
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default Layout