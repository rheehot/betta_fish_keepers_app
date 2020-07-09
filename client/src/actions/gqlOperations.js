import gql from 'graphql-tag'

const gqlCreateUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`

const gqlUpdateUser = gql`
  mutation($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
    }
  }
`

const gqlGetMe = gql`
  query {
    me {
      id
      name
      email
    }
  }
`

const gqlLogin = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
      user {
        id
        name
      }
    }
  }
`

const gqlGetPosts = gql`
  query {
    posts {
      id
      title
      body
    }
  }
`

export { gqlCreateUser, gqlUpdateUser, gqlGetMe, gqlLogin, gqlGetPosts }
