import React, { Component } from 'react';
import { View } from 'react-native';
import YTSearch from 'youtube-api-search';
import AppHeader from './components/Header';
import SearchBar from './components/SeachBar';
import VideoList from './components/VideoList';

const API_KEY = '<YouTube API Key>';

export default class App extends Component {
  state = {
    loading: false,
    videos: []
  }

  componentWillMount() {
    this.searchYT('React Native');
  }

  onPressSearch = term => {
    this.searchYT(term);
  }

  searchYT = term => {
    this.setState({loading: true});
    YTSearch({key: API_KEY, term }, videos => {
      this.setState({
        loading: false,
        videos: videos
      });
    });
  }

  render() {
    const { loading, videos } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#ddd' }}>
        <AppHeader headerText='Simple YouTube Search' />
        <SearchBar
          loading={loading}
          onPressSearch={ this.onPressSearch }
        />
        <VideoList videos={videos} />
      </View>
    );
  }
}