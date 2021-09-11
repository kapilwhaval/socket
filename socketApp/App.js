import React, { useEffect, useState } from 'react';
import { Button, Dimensions, TextInput, View, Text, SafeAreaView, ScrollView } from 'react-native';
import io from "socket.io-client";

let socket = null;
const ChatScreen = ({ roomId, name }) => {

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    socket = io('http://192.168.0.40:5002', { query: { roomId } });
    socket.on('receiveMessage', (data) => { setMessages((prevMessages) => [...prevMessages, data]) })
  }, [])

  const sendMessage = () => {
    socket.emit('sendMessage', { message: text, sender: name })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}>
      <ScrollView>
        {messages.map((item, index) => item.sender === name ? (
          <View style={{ alignSelf: 'flex-end', marginVertical: 5 }} key={index}>
            <View style={{ backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50, minWidth: 50 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>{item.message}</Text>
            </View>
            <Text style={{ color: 'grey', textAlign: 'right', marginRight: 5, fontSize: 12 }}>{`-${item.sender}`}</Text>
          </View>
        ) :
          (
            <View style={{ alignSelf: 'flex-start', marginVertical: 5 }} key={index}>
              <View style={{ backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 50, minWidth: 50 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>{item.message}</Text>
              </View>
              <Text style={{ color: 'grey', textAlign: 'left', marginLeft: 5, fontSize: 12 }}>{`-${item.sender}`}</Text>
            </View>
          ))}
      </ScrollView>
      <View style={{ position: 'absolute', width: Dimensions.get('window').width, bottom: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
        <TextInput placeholderTextColor='black' style={{ flex: 1, borderWidth: 1, borderColor: 'black', color: 'black' }} placeholder='Type you message here' onChangeText={setText} value={text} />
        <Button disabled={!text} title='Send' onPress={() => sendMessage()} />
      </View>
    </SafeAreaView>
  );
}

const App = () => {

  const [text, setText] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [name, setName] = useState('');

  return (
    <View style={{ flex: 1 }}>
      {roomId && name ? <ChatScreen roomId={roomId} name={name} /> : (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 200, backgroundColor: 'white' }}>
          <TextInput placeholderTextColor='black' placeholder='Enter your room ID' onChangeText={setText} value={text} style={{ borderWidth: 1, borderRadius: 1, color: 'black' }} />
          <TextInput placeholderTextColor='black' placeholder='Enter your name' onChangeText={setName} value={name} style={{ borderWidth: 1, borderRadius: 1, color: 'black' }} />
          <Button disabled={!text} title='Submit' onPress={() => setRoomId(text)} />
        </View>
      )}
    </View>
  );
}

export default App;