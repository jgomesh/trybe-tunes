import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.favSong = this.favSong.bind(this);
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({ loading: false, favorites: favSongs });
  }

  async favSong({ target }) {
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(JSON.parse(target.name));
      const favSongs = await getFavoriteSongs();
      this.setState({ loading: false, favorites: favSongs });
    } else {
      this.setState({ loading: true });
      await removeSong(JSON.parse(target.name));
      const favSongs = await getFavoriteSongs();
      this.setState({ loading: false, favorites: favSongs });
    }
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <div className="page-favorites"data-testid="page-favorites">
        <Header />
        { loading ? <section className="favorites"><h3>Carregando...</h3></section> : (
        <section className="favorites">
          <div className="favorites-box">
            {favorites.map((music, index) => (
              <MusicCard
                key={ `music${index}` }
                music={ music }
                favSong={ this.favSong }
                isChecked={ favorites.some((saved) => saved.trackId === music.trackId) }
              />)
              )}
          </div>
        </section>
        )}
      </div>
    );
  }
}

export default Favorites;
