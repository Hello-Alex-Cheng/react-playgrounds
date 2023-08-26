import React from 'react'
import {
  useLocation,
  useMatch,
  useMatches,
  useParams,
  useNavigate,
  useHref,
} from 'react-router-dom'

const UserDetail = () => {

  const location = useLocation()
  const match = useMatch('/user/1')
  const params = useParams()
  const navigate = useNavigate()
  const href = useHref('/user')

  console.log(location)
  console.log(match)
  console.log(params)
  console.log(href)

  return (
    <>
      <h1>User Details Page</h1>
      <pre>{JSON.stringify(params, null, 4)}</pre>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  )
}

export default UserDetail
