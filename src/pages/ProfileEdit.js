import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.isLoginValid = this.isLoginValid.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
      isDisabled: true,
      send: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    const { name, email, description, image } = userInfo;
    this.setState({ loading: false, name, image, description, email }, this.isLoginValid);
  }

  onInputChange({ target }) {
    this.setState(() => ({ [target.name]: target.value }), this.isLoginValid);
  }

  async updateUserInfo() {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image });
    this.setState({ loading: false, send: true });
  }

  isLoginValid() {
    const { name, email, description, image } = this.state;
    const verify = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;
    const isEmail = verify.test(email);
    if (email.length > 0
        && name.length > 0
        && description.length > 0
        && image.length > 0
        && isEmail) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { loading, name, isDisabled, email, description, image, send } = this.state;
    if (send) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="page-profile-edit" data-testid="page-profile-edit">
        <Header />
        {loading ?  <section className="edit-container"><h3>Carregando...</h3> </section> : (
          <section className="edit-container">
            <form>
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                id="name"
                onChange={ this.onInputChange }
                value={ name }
              />
              <input
                data-testid="edit-input-email"
                type="email"
                name="email"
                id="email"
                onChange={ this.onInputChange }
                value={ email }
              />
              <input
                data-testid="edit-input-description"
                type="description"
                name="description"
                id="description"
                onChange={ this.onInputChange }
                value={ description }
              />
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                id="image"
                onChange={ this.onInputChange }
                value={ image }
              />
              <button
                data-testid="edit-button-save"
                onClick={ this.updateUserInfo }
                disabled={ isDisabled }
                type="button"
              >
                Salvar
              </button>
            </form>
          </section>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
