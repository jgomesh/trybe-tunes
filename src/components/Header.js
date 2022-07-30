import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userObject = await getUser(); // PEGA O OBJETO DO USUARIO SALVO
    this.setState({ loading: false, user: userObject }); // SALVA NO ESTADO
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <h6>Carregando...</h6>
            : <h6 data-testid="header-user-name" className="user"><i class="uil uil-user"></i>{user.name}</h6>
        }
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
