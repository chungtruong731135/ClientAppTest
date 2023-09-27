import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { getToken } from '../../../utils/authStorage';
import styles from '../../../css/management/BranchDetailsStyles';

const BranchDetails = ({ route }) => {
  const [branchData, setBranchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = route.params;

  useEffect(() => {
    const fetchBranchDetails = async () => {
      try {
        const token = await getToken();

        const response = await fetch(`http://10.0.2.2:5000/api/v1/branches/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBranchData(data.data);
        } else {
          console.error('Error fetching branch details:', response.status);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching branch details:', error);
        setIsLoading(false);
      }
    };

    fetchBranchDetails();
  }, [id]);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {branchData && (
        <>
          <Image source={{ uri: branchData.logo }} style={styles.logo} />
          <Text style={styles.name}>{branchData.name}</Text>
          <Text style={styles.phoneNumber}>{branchData.phoneNumber}</Text>
          <Text style={styles.email}>{branchData.email}</Text>
          <Text style={styles.website}>{branchData.website}</Text>
          <Text style={styles.address}>{branchData.address}</Text>
          <Text style={styles.description}>{branchData.description}</Text>
        </>
      )}
    </View>
  );
};


export default BranchDetails;
