// src/components/Auth/SignOut.js

import React, { useContext } from 'react'
import { GoogleLogout } from 'react-google-login'
import { withStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'

import Context from '../../Context'

const SignOut = ({ classes }) => {
  const { dispatch } = useContext(Context)

  const onSignOut = () => {
    dispatch({ type: 'SIGN_OUT_USER' })
    console.log('>>>-SignOut-state-> Sign out user')
  }

  return (
    <GoogleLogout
      onLogoutSuccess={onSignOut}
      buttonText='Sign Out'
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography variant='body1' className={classes.buttonText}>
            Sign Out
          </Typography>
          <ExitToAppIcon className={classes.buttonIcon} />
        </span>
      )}
    />
  )
}

const styles = {
  root: {
    cursor: 'pointer',
    display: 'flex'
  },
  buttonText: {
    color: 'orange'
  },
  buttonIcon: {
    marginLeft: '5px',
    color: 'orange'
  }
}

export default withStyles(styles)(SignOut)
