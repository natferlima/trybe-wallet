import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const MIN_LENGTH = 6;
      const REGEX_VALID_EMAIL = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/;
      /* Encontrado em: https://stackoverflow.com/questions/647282/is-there-an-onselect-event-or-equivalent-for-html-select */
      const { email, password } = this.state;
      if ((password.length >= MIN_LENGTH) && (REGEX_VALID_EMAIL.test(email))) {
        this.setState({ disabled: false });
      }
    });
  }

  render() {
    const { sendNewEmail } = this.props;
    const { email, disabled } = this.state;
    return (
      <div>
        <input
          placeholder="Email"
          data-testid="email-input"
          type="email"
          id="email"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          id="password-input"
          name="password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => sendNewEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  sendNewEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendNewEmail: (email) => dispatch(loginUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
