import React, { useState, useEffect, useContext } from 'react'
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'
import differenceInMinutes from 'date-fns/difference_in_minutes'

import { Subscription } from 'react-apollo'
import {
  PIN_ADDED_SUBSCRIPTION,
  PIN_UPDATED_SUBSCRIPTION,
  PIN_DELETED_SUBSCRIPTION
} from '../graphql/subscriptions'

import { useClient } from '../client'
import Context from '../Context'
import { GET_PINS_QUERY } from '../graphql/queries'
import { DELETE_PIN_MUTATION } from '../graphql/mutations'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/DeleteTwoTone'
import PinIcon from './PinIcon'
import Blog from './Blog'

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
}

const Map = ({ classes }) => {
  // setup the views in 'mapbox://styles/mapbox/streets-v9' to one of:
  // {'basic','streets','bright','light','dark','stelitile'}
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  useEffect(() => {
    getPins()
  }, [])

  const [viewport, setViewport] = useState(INITIAL_VIEWPORT)
  const [userPosition, setUserPosition] = useState(null)
  useEffect(() => {
    getUserPosition()
  }, [])

  const [popup, setPopup] = useState(null)

  const getPins = async () => {
    const { getPins } = await client.request(GET_PINS_QUERY)
    dispatch({ type: 'GET_PINS', payload: getPins })
  }

  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        setViewport({ ...viewport, latitude, longitude })
        setUserPosition({ latitude, longitude })
      })
    }
  }

  const handleMapClick = ({ lngLat, leftButton }) => {
    // console.log(event)
    if (!leftButton) return
    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' })
    }
    const [longitude, latitude] = lngLat
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude, latitude }
    })
  }

  const highlightNewPin = pin => {
    const isNewPin =
      differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 120
    return isNewPin ? 'limeGreen' : 'darkblue'
  }

  const handelSelectPin = pin => {
    setPopup(pin)
    dispatch({ type: 'SET_PIN', payload: pin })
  }

  const isAuthUser = () => state.currentUser._id === popup.author._id

  const handleDeletePin = async pin => {
    const variables = { pinId: pin._id }
    await client.request(DELETE_PIN_MUTATION, variables)
    // dispatch({ type: 'DELETE_PIN', payload: deletePin })
    setPopup(null)
  }

  return (
    <div className={classes.root}>
      <ReactMapGL
        width='100vw'
        height='calc(100vh - 64px)'
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxApiAccessToken='pk.eyJ1IjoiZGVyaXZhZG8iLCJhIjoiY2pzbWl2dTl0MDIwMDN6c3p2aGI3NWkxaCJ9.DPL6ao8Re7MESlHQwdbIJw'
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
        onClick={handleMapClick}
      >
        {/* navigation controls       */}
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>

        {/* pin for users current position */}
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            OffsetTop={-37}
          >
            <PinIcon size={25} color={'red'} />
          </Marker>
        )}

        {/* Draft pin */}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            OffsetTop={-37}
          >
            <PinIcon size={40} color={'red'} />
          </Marker>
        )}

        {/* Created pins */}
        {state.pins.map(pin => (
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            OffsetTop={-37}
          >
            <PinIcon
              onClick={() => handelSelectPin(pin)}
              size={20}
              color={highlightNewPin(pin)}
            />
          </Marker>
        ))}
        {/* popup dialog */}
        {popup && (
          <Popup
            anchor='top'
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <img
              className={classes.popupImage}
              src={popup.image}
              alt={popup.title}
            />
            <div className={classes.popupTab}>
              <Typography>
                {popup.latitude.toFixed(6)},{popup.longitude.toFixed(6)}
              </Typography>
              {isAuthUser() && (
                <Button onClick={() => handleDeletePin(popup)}>
                  <DeleteIcon className={classes.deleteIcon} />
                </Button>
              )}
              {/* <Typography>

                  </Typography>
                  <Typography>

                  </Typography> */}
            </div>
          </Popup>
        )}
      </ReactMapGL>
      <Subscription
        subscription={PIN_ADDED_SUBSCRIPTION}
        OnSubscriptionData={({ subscriptionData }) => {
          const { pinAdded } = subscriptionData.data
          console.log('>>>-Map-pinAdded->', pinAdded)
          dispatch({ type: 'CREATE_PIN', payload: pinAdded })
        }}
      />
      <Subscription
        subscription={PIN_UPDATED_SUBSCRIPTION}
        OnSubscriptionData={({ subscriptionData }) => {
          const { pinUpdated } = subscriptionData.data
          console.log('>>>-Map-pinUpdated->', pinUpdated)
          dispatch({ type: 'CREATE_COMMENT', payload: pinUpdated })
        }}
      />
      <Subscription
        subscription={PIN_DELETED_SUBSCRIPTION}
        OnSubscriptionData={({ subscriptionData }) => {
          const { pinDeleted } = subscriptionData.data
          console.log('>>>-Map-pinDeleted->', pinDeleted)
          dispatch({ type: 'DELETE_PIN', payload: pinDeleted })
        }}
      />
      <Blog />
    </div>
  )
}

const styles = {
  root: {
    display: 'flex'
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  navigationControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '1em'
  },
  deleteIcon: {
    color: 'red'
  },
  popupImage: {
    padding: '0.4em',
    height: 200,
    width: 200,
    objectFit: 'cover'
  },
  popupTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

export default withStyles(styles)(Map)
