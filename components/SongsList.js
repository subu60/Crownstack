import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import SongDetail from './SongDetail';

export default function SongsList() {
  const [songsList, setSongsList] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isFetching, setIsFetching] = React.useState(false);
  let songData = React.useRef({});
  React.useEffect(() => {
    // Added setTimeout() just to see the loader
    setTimeout(() => {
      fetch('https://itunes.apple.com/search?term=Michael+jackson')
        .then((res) => res.json())
        .then((response) => {
          setLoading(false);
          setIsFetching(false);
          if (response && response.results) {
            setSongsList(response.results);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }, 1000);
  }, [isFetching]);

  const showModalHandler = (value, item) => {
    songData.current = item;
    setShowModal(value);
  };

  const onRefresh = () => {
    setIsFetching(true);
  };

  return (
    <View style={styles.container}>
      {showModal ? (
        <SongDetail
          visible={showModal}
          closeModalhandler={() => showModalHandler(false)}
          songData={songData}
        />
      ) : null}
      {!loading ? (
        <FlatList
          data={songsList}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => onRefresh()}
          initialNumToRender={20}
          ListFooterComponent={
            <View style={{ height: 20, backgroundColor: 'white' }} />
          }
          refreshing={isFetching}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => showModalHandler(true, item)}>
                <View style={styles.listView}>
                  <View style={{ borderWidth: 0, padding: 10, width: 90 }}>
                    <Image
                      style={styles.imageStyle}
                      source={{ uri: item.artworkUrl100 }}
                    />
                  </View>
                  <View style={styles.itemView}>
                    <Text
                      numberOfLines={2}
                      style={{ color: 'rgb(75,150,206)' }}>
                      {item.trackName ? item.trackName : item.collectionName}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.itemText}>{item.artistName}</Text>
                      <Text style={[styles.itemText, { paddingLeft: 20 }]}>
                        {`${item.collectionPrice}m`}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="rgb(1,122,208)" />
          <Text style={{ color: 'rgb(1,122,208)' }}>{`Please wait`}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  listView: {
    height: 100,
    borderBottomWidth: 3,
    backgroundColor: 'rgb(255,255,255)',
    flexDirection: 'row',
    borderBottomColor: 'rgb(246,246,246)',
  },
  itemView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemText: {
    color: 'rgb(75,150,206)',
    fontWeight: 'bold',
  },
  imageStyle: {
    flex: 1,
    borderRadius: 5,
    resizeMode: 'stretch',
  },
});
