import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createPost } from '../../actions/post'
import { setAlert } from '../../actions/alert'

const CreatePost = ({ isAuthenticated, createPost, setAlert, history }) => {
  const initialState = {
    title: '',
    body: '',
    published: true,
    allowComments: true,
  }

  const [formData, setFormData] = useState(initialState)

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { title, body, published, allowComments } = formData

  const onSubmit = e => {
    e.preventDefault()
    if (!title && !body) {
      return setAlert("Don't leave all blank (Fill at least one)", 'danger')
    }
    createPost(formData, history, '/posts/')
    setFormData(initialState)
  }

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Say Something...</h3>
      </div>
      {isAuthenticated ? (
        <form className="form my-1" onSubmit={e => onSubmit(e)}>
          <textarea
            cols="30"
            rows="1"
            placeholder="Post title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Create a post"
            name="body"
            value={body}
            onChange={e => onChange(e)}
          />
          <input
            type="checkbox"
            name="published"
            checked={published}
            value={published}
            onChange={() => {
              setFormData({ ...formData, published: !published })
            }}
          />
          <label htmlFor="publish"> Publish </label>
          <input
            type="checkbox"
            name="allowComments"
            checked={allowComments}
            value={allowComments}
            onChange={() => {
              setFormData({ ...formData, allowComments: !allowComments })
            }}
          />
          <label htmlFor="allowComments"> allow comments</label>
          <div />
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
        </form>
      ) : (
        <div className="bg-light p-1">Login first...</div>
      )}
    </div>
  )
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { createPost, setAlert })(
  withRouter(CreatePost),
)
