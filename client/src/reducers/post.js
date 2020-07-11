import {
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  CREATE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
  POST_ERROR,
} from '../utils/types'

const initialState = {
  posts: [],
  post: {
    pinGazers: [],
    author: {
      name: null,
      avatar: null,
    },
    createdAt: null,
    comments: [],
  },
  loading: false,
  error: {},
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        post: initialState.post,
        loading: true,
      }
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      }
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      }
    case CREATE_POST:
      if (!payload.published) {
        return state
      }
      return {
        ...state,
        posts: [payload, ...state.posts],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== payload.id),
      }
    case CREATE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: [...state.post.comments, payload] },
      }
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment.id !== payload.id,
          ),
        },
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}
