import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Artist extends React.Component {
  render() {
    const { song } = this.props;
    const { collectionName, artworkUrl100, artistName, collectionId } = song;
    return (
      <div className="album">
        <span>
          {' '}
          Name:
          {collectionName}
        </span>
        <img src={ artworkUrl100 } alt={ `${collectionName} cover` } />
        <span>{artistName}</span>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          More
        </Link>
      </div>
    );
  }
}

Artist.propTypes = {
  song: PropTypes.objectOf.isRequired,
};

export default Artist;
