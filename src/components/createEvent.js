import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { Link } from 'react-router-native'

import firebase from 'firebase';
import '@firebase/firestore'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  DatePickerIOS
} from 'react-native'


class createEvent extends Component {

  state = {
    chosenDate: new Date(),
    location: "",
    summary: "",
    data: ""
  }

  componentWillMount() {
    let data = this.props.match.params.group
    this.setState({ data })
  }

  setDate = (chosenDate) => {
    this.setState({ chosenDate })
  }

  setLocation = (location) => {
    this.setState({ location })
  }

  setSummary = (summary) => {
    this.setState({ summary })
  }

  onCreateEvent = async () => {
    let { location, summary, chosenDate } = this.state;

    await firebase
          .firestore()
          .collection('groups')
          .doc(this.state.data)
          .collection('events')
          .add({
              location,
              summary,
              chosenDate: chosenDate.toString()
          })
    this.props.history.push(`/adminPanel/${this.state.data}`)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 28}}
          >
            <Link
              style={{ padding: 5, backgroundColor: '#0097A7', borderRadius: 40, marginLeft: 20}}
              to='/welcome'>
              <Text> Back </Text>
            </Link>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={{fontSize: 25}}> Create Event </Text>
        </View>
        <View style={styles.firstBox}>
          <TextInput
            style={styles.textInputOne}
            placeholder={"Location"}
            value={this.props.organizer}
            onChangeText={location => this.setLocation(location)}
            />
        </View>
        <View style={styles.summaryBox}>
          <TextInput
            style={styles.sum}
            placeholder={"Summary"}
            multiline = {true}
            value={this.props.summary}
            onChangeText={summary => this.setSummary(summary)}
           />
        </View>
        <View style={styles.rest}>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={date => this.setDate(date)}
          />

        </View>
        <View style={styles.tBox}>
            <TouchableOpacity
              onPress={() => this.onCreateEvent()}
              style={styles.button}>
                {
                  'fix' !== 'fix'
                  ? <ActivityIndicator size="small" color="#0097A7" />
                  : <Text style={{fontWeight: 'bold'}}> Create </Text>
                }
            </TouchableOpacity>
        </View>
      </View>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

const styles = StyleSheet.create({
  headerTop: {
    backgroundColor: '#00838F',
    height: '10%',
  },
  header: {
    backgroundColor: '#26C6DA',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bubble: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 50
  },
  firstBox: {
    backgroundColor: '#26C6DA',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textInputOne: {
    width: '70%',
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 19,
    padding: 5
  },
  summaryBox: {
    height: '20%',
    backgroundColor: '#26C6DA',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  sum: {
    flex: 1,
    margin: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontSize: 19,
    padding: 5
  },
  tBox: {
    height: '15%',
    backgroundColor: '#26C6DA',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: '40%',
    backgroundColor: '#00838F',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rest: {
    flex: 1,
    backgroundColor: '#26C6DA'
  }
})


export default connect(mapStateToProps)(createEvent);
