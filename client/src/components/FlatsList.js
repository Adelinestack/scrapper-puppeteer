import React, { Component } from 'react';
import axios from 'axios';
import Flat from './Flat';

const getFlatsDatasFromDb = () => axios.get('/getDatas');

const getFlatsDatas = async () => {
  const { data } = await getFlatsDatasFromDb();
  return data;
};

class FlatsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatsDatas: [],
    };
  }

  componentDidMount() {
    this.fetchFlatsDatas();
  }

  async fetchFlatsDatas() {
    const flatsDatas = await getFlatsDatas();
    this.setState({
      flatsDatas,
    });
  }

  render() {
    const { flatsDatas } = this.state;
    const flatsList = flatsDatas.map(flat => <Flat datas={flat} />);
    return (
      <section>
        <h2>Liste des appartements</h2>
        <div>{flatsList}</div>
      </section>
    );
  }
}

export default FlatsList;
