// src/components/Pin/CreatePin.js

import React, { useState, useContext } from 'react'
// import { GraphQLClient } from 'graphql-request'
import axios from 'axios'
import Context from '../../Context'
import { CREATE_PIN_MUTATION } from '../../graphql/mutations'
import { useClient } from '../../client'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined'
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/SaveTwoTone'

const CreatePin = ({ classes }) => {
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleDeleteDraft = () => {
    setTitle('')
    setImage('')
    setContent('')
    console.log('>>>-CreatePin-handleDeleteDraft-dispatch->')
    dispatch({ type: 'DELETE_DRAFT' })
  }

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'aito-cloudinary')
    data.append('cloud_name', 'aito-consulting')
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/aito-consulting/image/upload',
      data
    )
    console.log('>>>-CreatePin-handleImageUpload-res->', res)
    console.log('>>>-CreatePin-handleImageUpload-res.data.url->', res.data.url)
    return res.data.url
  }

  const handelSubmit = async event => {
    try {
      event.preventDefault()
      console.log('>>>-CreatePin-handelSubmit-{title,image,content}->', {
        title,
        image,
        content
      })
      setSubmitting(true)

      const url = await handleImageUpload()
      console.log('>>>-CreatePin-handelSubmit-{title,image,url,content}->', {
        title,
        image,
        url,
        content
      })
      const { latitude, longitude } = state.draft
      const variables = {
        title,
        image: url,
        content,
        latitude,
        longitude
      }
      console.log('>>>-CreatePin-handelSubmit-client->', client)
      const data = await client.request(CREATE_PIN_MUTATION, variables)
      console.log('>>>-CreatePin-handelSubmit-data->', data)
      const { createPin } = data
      console.log('>>>-CreatePin-handelSubmit-createPin->', createPin)
      handleDeleteDraft()
      setSubmitting(false)
    } catch (err) {
      setSubmitting(false)
      console.log('>>>-CreatePin-handelSubmit-error->', err)
    }
  }

  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component='h2'
        variant='h4'
        color='secondary'
      >
        <LandscapeIcon className={classes.iconLarge} />
        Pin Point
      </Typography>
      <div>
        <TextField
          name='title'
          label='Title'
          placeholder='Insert pin title'
          onChange={e => setTitle(e.target.value)}
        />
        <input
          accept='image/*'
          id='image'
          type='file'
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor='image'>
          <Button
            style={{ color: image && 'green' }}
            component='span'
            size='small'
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField
          name='content'
          label='Content'
          multiline
          rows='6'
          margin='normal'
          fullwidth='true'
          variant='outlined'
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={handleDeleteDraft}
          className={classes.button}
          variant='contained'
          color='primary'
        >
          Discard
          <ClearIcon className={classes.leftIcon} />
        </Button>
        <Button
          type='submit'
          className={classes.button}
          variant='contained'
          color='secondary'
          disabled={!title.trim() || !content.trim() || !image || submitting}
          onClick={handelSubmit}
        >
          Submit <SaveIcon className={classes.rigthIcon} />
        </Button>
      </div>
    </form>
  )
}

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%'
  },
  input: {
    display: 'none'
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
})

export default withStyles(styles)(CreatePin)
