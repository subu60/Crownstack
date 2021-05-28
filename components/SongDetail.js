import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';

const SongDetail = (props) => {
  const [play, setPlay] = React.useState(false);
  const closeHanlder = (value) => {
    props.closeModalhandler(value);
  };
  const { trackName, artistName, collectionName } = props.songData.current;
  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={styles.closeButtonView}>
          <TouchableOpacity onPress={() => closeHanlder(false)}>
            <Icon name="close" size={30} type={'AntDesign'} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10 }}>
          <Text numberOfLines={1} style={{ fontSize: 25, fontWeight: 'bold' }}>
            {trackName ? trackName : collectionName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: 'rgb(255,0,24)',
              textDecorationLine: 'underline',
            }}>
            {artistName}
          </Text>
          <View style={{ height: 50 }} />
          <TouchableWithoutFeedback onPress={() => setPlay(!play)}>
            <View style={styles.playButtonView}>
              <Icon
                name={play ? 'ios-pause' : 'ios-play'}
                size={30}
                type="ionicon"
                color={'white'}
              />
              <Text style={styles.playPauseText}>
                {play ? 'Pause' : 'Play'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SongDetail;

const styles = StyleSheet.create({
  closeButtonView: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  playButtonView: {
    flexDirection: 'row',
    height: 50,
    width: 120,
    backgroundColor: 'rgb(255,0,0)',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  playPauseText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
});
