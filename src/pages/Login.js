import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input data-testid="email-input" type="email" id="email" name="email" />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
          />
        </label>
        <button type="submit">Entrar</button>
      </div>
    );
  }
}

export default Login;
