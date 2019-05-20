import React, { Component } from 'react';
import { firestore } from '../firebase';

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    posts: []
  };

  unsubscribe = null;

  componentDidMount = async () => {
    // subscribe to the posts collection
    this.unsubscribe = firestore.collection('posts').onSnapshot( (snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  }

  componentWillUnmount() {
    // unsubscribe to the posts collection
    this.unsubscribe();
  }

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={ user } />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
