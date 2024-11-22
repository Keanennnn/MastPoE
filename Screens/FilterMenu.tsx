import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MenuContext } from './MenuContext';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

const FilterMenu: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const menuContext = useContext(MenuContext);
  const menuItems = menuContext?.menuItems || [];

  const filteredItems = selectedCourse
    ? menuItems.filter(item => item.course === selectedCourse)
    : menuItems;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Menu by Course</Text>
      
      <View style={styles.filterButtonsContainer}>
        <View style={styles.filterSection}>
          <TouchableOpacity
            style={[styles.filterButton, selectedCourse === 'Starters' && styles.activeFilterButton]}
            onPress={() => setSelectedCourse(selectedCourse === 'Starters' ? null : 'Starters')}
          >
            <Text style={styles.filterButtonText}>Starters</Text>
          </TouchableOpacity>
          {selectedCourse === 'Starters' && (
            <FlatList
              data={filteredItems}
              keyExtractor={item => item.id}
              renderItem={({ item }: { item: MenuItem }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.name} - R{item.price}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              )}
            />
          )}
        </View>
        
        <View style={styles.filterSection}>
          <TouchableOpacity
            style={[styles.filterButton, selectedCourse === 'Mains' && styles.activeFilterButton]}
            onPress={() => setSelectedCourse(selectedCourse === 'Mains' ? null : 'Mains')}
          >
            <Text style={styles.filterButtonText}>Mains</Text>
          </TouchableOpacity>
          {selectedCourse === 'Mains' && (
            <FlatList
              data={filteredItems}
              keyExtractor={item => item.id}
              renderItem={({ item }: { item: MenuItem }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.name} - R{item.price}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              )}
            />
          )}
        </View>

        <View style={styles.filterSection}>
          <TouchableOpacity
            style={[styles.filterButton, selectedCourse === 'Dessert' && styles.activeFilterButton]}
            onPress={() => setSelectedCourse(selectedCourse === 'Dessert' ? null : 'Dessert')}
          >
            <Text style={styles.filterButtonText}>Dessert</Text>
          </TouchableOpacity>
          {selectedCourse === 'Dessert' && (
            <FlatList
              data={filteredItems}
              keyExtractor={item => item.id}
              renderItem={({ item }: { item: MenuItem }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.name} - R{item.price}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6E6E',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterButtonsContainer: {
    width: '100%',
  },
  filterSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#424242',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeFilterButton: {
    backgroundColor: '#FF6E6E',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: '#424242',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6E6E',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});

export default FilterMenu;
