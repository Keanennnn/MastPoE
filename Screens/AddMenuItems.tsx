import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MenuContext } from './MenuContext';

type RootStackParamList = {
  Home: { newMenuItem?: MenuItem };
  AddMenuItems: undefined;
  FilterMenu: undefined;
  AboutUs: undefined;
};

type AddMenuItemsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddMenuItems'>;

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

interface Errors {
  name?: string;
  description?: string;
  price?: string;
  course?: string;
}

export default function AddMenuItems() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [course, setCourse] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const navigation = useNavigation<AddMenuItemsNavigationProp>();
  const menuContext = useContext(MenuContext)!;
  const { menuItems, addMenuItem, removeMenuItem } = menuContext;

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Starters', value: 'Starters' },
    { label: 'Mains', value: 'Mains' },
    { label: 'Dessert', value: 'Dessert' },
  ]);

  const handleAddItem = () => {
    let newErrors: Errors = {};
    let formIsValid = true;

    // Validate fields
    if (!name) {
      newErrors.name = 'Dish name is required.';
      formIsValid = false;
    }
    if (!description) {
      newErrors.description = 'Description is required.';
      formIsValid = false;
    }
    if (!price) {
      newErrors.price = 'Price is required.';
      formIsValid = false;
    } else if (!/^R\d+$/.test(price)) {
      newErrors.price = 'Price must be an integer with "R" in front (e.g., R100).';
      formIsValid = false;
    }
    if (!course) {
      newErrors.course = 'Please select a course.';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid && course) {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name,
        description,
        course,
        price: parseInt(price.replace('R', '')),
      };

      addMenuItem(newItem);

      // Clear the fields
      setName('');
      setDescription('');
      setCourse(null);
      setPrice('');
      setErrors({});
    }
  };

  const handleRemoveItem = (id: string) => {
    removeMenuItem(id);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Add a NEW Menu Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        placeholderTextColor="#AAAAAA"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#AAAAAA"
        value={description}
        onChangeText={setDescription}
      />
      {errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}

      <DropDownPicker
        open={open}
        value={course}
        items={items}
        setOpen={setOpen}
        setValue={setCourse}
        setItems={setItems}
        placeholder="Select Course"
        style={styles.picker}
        dropDownContainerStyle={styles.dropDownPicker}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
        placeholderStyle={{
          color: "#AAAAAA",
        }}
      />
      {errors.course && <Text style={{ color: 'red' }}>{errors.course}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Price (e.g., R100)"
        placeholderTextColor="#AAAAAA"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      {errors.price && <Text style={{ color: 'red' }}>{errors.price}</Text>}

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.buttonText}>ADD MENU ITEM</Text>
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={menuItems.length > 1 ? { justifyContent: 'space-between' } : { justifyContent: 'center' }}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
        renderItem={({ item }: { item: MenuItem }) => (
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>{item.course}</Text>
            <Text style={styles.coursePrice}>{item.name} - R{item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
              <Text style={styles.buttonText}>REMOVE ITEM</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6E6E',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#424242',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
  },
  picker: {
    backgroundColor: '#424242',
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 15,
  },
  dropDownPicker: {
    backgroundColor: '#424242',
  },
  addButton: {
    backgroundColor: '#FF6E6E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseCard: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: '#424242',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 200,
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6E6E',
    marginBottom: 5,
  },
  coursePrice: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
