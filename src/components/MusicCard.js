import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, favSong, isChecked } = this.props;
    const { previewUrl, trackName, trackId } = music;
    return (
      <section>
        <div>
          <span>{trackName}</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <label htmlFor={ `song${trackId}` }>
            Favorita
            <input
              checked={ isChecked }
              onChange={ favSong }
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id={ `song${trackId}` }
              name={ JSON.stringify(music) }
            />
          </label>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf.isRequired,
  favSong: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default MusicCard;
