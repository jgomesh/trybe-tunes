import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Artist from '../components/Artist';

class Search extends React.Component {
  constructor() {
    super();
    this.isSearchValid = this.isSearchValid.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);

    this.state = {
      searchInput: '',
      disabledButton: true,
      loading: false,
      artistSongs: [],
      userSearched: false,
      lastSearched: '',
    };
  }

  onInputChange({ target }) {
    this.setState(() => ({ [target.name]: target.value }), this.isSearchValid);
  }

  async onClickSearch() {
    const { searchInput } = this.state;
    this.setState({ loading: true, userSearched: false, lastSearched: searchInput });
    const artistSongs = await searchAlbumsAPI(searchInput);
    this.setState({
      searchInput: '',
      loading: false,
      artistSongs,
      userSearched: true,
    });
  }

  isSearchValid() {
    const { searchInput } = this.state;
    const minNameLength = 2;
    if (searchInput.length >= minNameLength) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  render() {
    const {
      disabledButton,
      searchInput,
      loading,
      userSearched,
      lastSearched,
      artistSongs } = this.state;
    const loadingElement = <h3>Carregando...</h3>;
    const arSg = artistSongs.length === 0;

    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        {loading ? loadingElement : (
          <form className="forms">
            <input
              type="text"
              onChange={ this.onInputChange }
              name="searchInput"
              value={ searchInput }
              data-testid="search-artist-input"
              required
            />
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ this.onClickSearch }
              disabled={ disabledButton }
            >
              Pesquisar
            </button>
          </form>
        )}
        {userSearched
          && (
            <div className="albums">
              {arSg && <h3>Nenhum álbum foi encontrado</h3>}
              {arSg === false
              && (
                <div className='results'>
                  Resultado de álbuns de:
                  {` ${lastSearched}`}
                </div>
              )}
              {arSg === false && artistSongs.map((song, index) => {
                const artistComponent = <Artist key={ `song${index}` } song={ song } />;
                return artistComponent;
              })}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
