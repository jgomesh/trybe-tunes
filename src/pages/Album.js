import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const { id } = match.params;
    // BIND PARA PASSAR A FUNÇÂO PARA O COMPONENTE MusicCard
    this.favSong = this.favSong.bind(this);
    this.state = {
      id,
      musics: [],
      artistFound: '',
      album: '',
      songsFav: [],
      loading: false,
      loading2: false,
    };
  }

  // Alterações antes da renderização
  async componentDidMount() {
    const { id } = this.state;
    // Pegando as musicas do album clicado anteriormente
    const musicsFound = await getMusics(id);
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({
      musics: musicsFound,
      artistFound: musicsFound[0].artistName,
      album: musicsFound[0].collectionName,
      image: musicsFound[0].artworkUrl100,
      songsFav: favSongs,
      loading: false,
    });
  }

  // RESPONSAVEL POR ADICIONAR E REMOVER FAVORITOR
  async favSong({ target }) {
    // INICIA CARREGAMENTO
    this.setState({ loading2: true });
    if (target.checked) {
      // ADICIONA MUSICA AOS FAVORITOS
      await addSong(JSON.parse(target.name));
      // PEGA A NOVA LISTA DE FAVORITOS
      const favSongs = await getFavoriteSongs();
      // ATUALIZA O ESTADO E ESCONDE O CARREGAMENTO
      this.setState({ loading2: false, songsFav: favSongs });
    } else {
      // REMOVE O SOM DA LISTA
      await removeSong(JSON.parse(target.name));
      // PEGA A LISTA ATUALIZADA
      const favSongs = await getFavoriteSongs();
      // ESCONDE CARREGAMENTO ATUALIZA O ESTADO COM A NOVA LISTA
      this.setState({ loading2: false, songsFav: favSongs });
    }
  }

  render() {
    const { artistFound, album, musics, songsFav, loading, loading2, image } = this.state;

    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        {loading ? <section className='songs-container'> <h3>Carregando...</h3> </section> : ''}
        <section className="songs-container">
          <div className="album-found">
            <h3 data-testid="artist-name">{artistFound}</h3>
            <img src={ image } alt={`${album} cover`} />
            <span data-testid="album-name">{album}</span>
          </div>
          {loading2 ? <h3>Carregando...</h3> : (
            <div className="songs">
              {musics.map((music, index) => {
                let result;
                // A primeira posição retornada não é uma musica, pulos ela
                if (index !== 0) {
                  result = (
                    <MusicCard
                      key={ `music${index}` }
                      music={ music } // objeto com todas as infos da musica
                      favSong={ this.favSong } // função que vai favoritas e desfavoritar
                      isChecked={ songsFav.some((saved) => saved.trackId === music.trackId) } // Verifica se ela ja estava favoritada
                    />
                  );
                }
                return result;
                })
              }
            </div>)
          }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
