import React from 'react'
import loginModel from './model'
import useModel from 'form/useModel'

const LoginForm = ({ data }) => {
  const model = useModel(loginModel, data)
  const { email, password } = model

  const submit = () => {
    // console.log('Data', model.data)
    console.log('Error', model.errors)
  }
  const passwordChange = e => {
    password.extractFromEvent(e)
  }
  const commonChange = e => {
    model.extractFromEvent(e)
  }

  console.log('email', email)
  console.log('password', password)

  return (
    <div>
      <div>
        <label htmlFor={email.name}>{email.label}</label>
        <br />
        <input
          type='text'
          name={email.name}
          id={email.name}
          value={email.value}
          onChange={commonChange}
        />
        {!email.isValid ? <p>{email.error.message}</p> : <p />}
      </div>
      <div>
        <label htmlFor={password.name}>{password.label}</label>
        <br />
        <input
          type='password'
          name={password.name}
          id={password.name}
          value={password.value}
          onChange={passwordChange}
        />
        {!password.isValid ? <p>{password.error.message}</p> : <p />}
      </div>
      <div>
        <button type='submit' onClick={submit}>
          Login
        </button>
      </div>
    </div>
  )
}

export default () => {
  return <LoginForm
    data={{
      email: 'nguyenquocdat',
      password: 'Nqdat.278'
    }}
  />
}
