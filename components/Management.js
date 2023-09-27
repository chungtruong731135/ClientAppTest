import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../css/ManagementStyles';
import { getToken } from '../utils/authStorage';
import { useNavigation } from '@react-navigation/native';

const Management = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();

        const response = await fetch('http://10.0.2.2:5000/api/personal/profile', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

        const data = await response.json();
        setUserInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Text>Xin chào, {userInfo.userName}</Text>
        )}
      </View>

      <View style={styles.sidebar}>
        {['Quản lý chi nhánh', 'Quản lý nhân viên chi nhánh'].map(category => (
          <TouchableOpacity key={category} style={styles.button} onPress={() => navigation.navigate('BranchList')}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {selectedCategory && <Text style={styles.heading}>{selectedCategory}</Text>}
      </View>
    </View>
  );
};

export default Management;
