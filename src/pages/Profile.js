import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({ loading: false, user: userInfo });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <section className="page-profile" data-testid="page-profile">
        <Header />
        {loading ? <section className="column"><h3>Carregando...</h3></section> : (
          <section className="column">
            <div className="column-item">
              <span>{user.name}</span>
              <img
                data-testid="profile-image"
                src={ user.image }
                alt={ `${user.name} profile` }
              />
              <span>{user.email}</span>
              <p>
                {user.description}
                {' '}
              </p>
              <Link to="/profile/edit">Editar perfil <i class="uil uil-pen"></i></Link>
            </div>
          </section>
        )}
      </section>
    );
  }
}

export default Profile;
