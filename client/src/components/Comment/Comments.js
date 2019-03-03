import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const Comments = ({ comments, classes }) => {
  console.log('>>>-Comments-comments->', comments)

  return (
    <List className={classes.root}>
      {comments.map((comment, i) => (
        <ListItem key={i} alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar src={comment.author.picture} alt={comment.author.name} />
          </ListItemAvatar>
          <ListItemText
            priamry={comment.text}
            secondary={
              <React.Fragment>
                <Typography
                  component='span'
                  className={classes.inline}
                  color='textPrimary'
                >
                  {comment.text} —
                </Typography>{' '}
                {comment.author.name}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
})

export default withStyles(styles)(Comments)
