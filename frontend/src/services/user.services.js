import { gql } from '@apollo/client'
import axios from 'axios'
import { print } from 'graphql'
import { settings } from '../config'

export const signup = async (username, password) => {
  const url = settings.server + '/user/signup'

  let result
  try {
    result = await axios.post(url, {
      username,
      password,
    })
    result = result.data
  } catch (ex) {
    result = ex
  }

  return result
}

export const signin = async (username, password) => {
  const response = await axios({
    method: 'POST',
    url: settings.server,
    data: {
      query: print(gql`
        mutation signin($username: String!, $password: String!) {
          signin(input: { username: $username, password: $password }) {
            token
          }
        }
      `),
      variables: {
        username: username,
        password: password,
      },
    },
  })

  return response.data
}
