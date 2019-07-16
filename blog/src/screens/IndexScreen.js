import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BlogContext from '../context/BlogContext';

const IndexScreen = () => {
  const { data, addBlogPost } = useContext(BlogContext);

  console.log(data);

  return (
    <View>
      <Text>Index Screen</Text>
      <Button title="Add Post" onPress={addBlogPost} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default IndexScreen;
