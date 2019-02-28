import React, { Component } from 'react';

class Flat extends Component {
  render() {
    const { url, title, img, city, price, area, room, desc } = this.props.datas;
    return (
      <article>
        <a href={url} target="_blank">
          <h3>{title}</h3>
          <div>
            <img src={img} alt={title} />
          </div>
          <div>{city}</div>
          <div>{price}</div>
          <div>{area}</div>
          <div>{room}</div>
          <div>{desc}</div>
        </a>
      </article>
    );
  }
}

export default Flat;
