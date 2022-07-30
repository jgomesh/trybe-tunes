import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.isLoginValid = this.isLoginValid.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.state = {
      name: '',
      disabledButton: true,
      loading: false,
      login: false,
    };
  }

  // FUNÇÂO QUE SALVA AS ALTERAÇÕES DE INPUT NO ESTADO
  onInputChange({ target }) {
    this.setState(() => ({ [target.name]: target.value }), this.isLoginValid);
  }

  // VERIFICA SE O LOGIN TEM MAIS DE 3 CARACTERES
  isLoginValid() {
    const { name } = this.state;
    const minNameLength = 3;
    if (name.length >= minNameLength) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  async userLogin() {
    const { name } = this.state;
    this.setState(() => ({ loading: true }));
    await createUser({ name,
      email: 'email@test.com',
      description: 'Lorem ipsum',
      image: 'url-to-image' });
    this.setState(() => ({ login: true }));
  }

  render() {
    const { disabledButton, loading, login } = this.state;
    if (login) {
      return <Redirect to="/search" />;
    }
    const loadingElement = <h3 className="loading">Carregando...</h3>;
    return (
      <section className="login-page" data-testid="page-login">
        {loading ? loadingElement : (
          <form>
            <h1 className="title">Trybefy</h1>
            <input
              onChange={ this.onInputChange }
              type="text"
              name="name"
              data-testid="login-name-input"
              placeholder='Nome do usuário'
            />
            <button
              onClick={ this.userLogin }
              type="button"
              disabled={ disabledButton }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}
      </section>
    );
  }
}

export default Login;
