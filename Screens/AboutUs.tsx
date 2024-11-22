import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const AboutUs: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>About FlavorScape</Text>
      <Text style={styles.paragraph}>
        Welcome to FlavorScape! We are committed to helping chefs and restaurant owners create and manage their perfect menus.
        With our easy-to-use platform, you can add, remove, and filter menu items, making sure your culinary creations shine.
      </Text>
      <Text style={styles.paragraph}>
        Our mission is to elevate the dining experience by empowering chefs to curate unique, well-organized, and flavorful menus. 
        We believe that behind every great dish, there’s a thoughtful chef who deserves the best tools to make it happen.
      </Text>
      <Text style={styles.paragraph}>
        At FlavorScape, we provide a digital platform that combines simplicity with robust features tailored to meet the needs of modern-day culinary professionals. 
        Our application supports chefs in organizing their ideas and maintaining control over their kitchen operations, from fine dining to local eateries.
      </Text>
      <Text style={styles.paragraph}>
        Whether you are running a well-established restaurant or just starting out, our platform is designed to adapt to your needs, offering real-time menu management capabilities, collaboration tools for your team, and detailed analytics to help optimize your offerings.
      </Text>
      <Text style={styles.paragraph}>
        With FlavorScape, you can seamlessly update your menu to reflect seasonal ingredients, customer preferences, and changing trends. 
        We strive to support the creative freedom of chefs, ensuring that your unique culinary vision reaches your customers with ease.
      </Text>
      <Text style={styles.paragraph}>
        Our dedicated support team is always here to help you navigate our platform and make the most out of your experience. 
        We are passionate about food and technology, and we believe in creating meaningful experiences for you and your customers.
      </Text>
      <Text style={styles.footer}>© 2024 FlavorScape. All rights reserved. Empowering chefs, one dish at a time.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6E6E',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  footer: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default AboutUs;

