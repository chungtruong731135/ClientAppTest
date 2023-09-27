import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getToken } from '../../../utils/authStorage';
import styles from '../../../css/management/BranchListStyles';
import { useNavigation } from '@react-navigation/native';


const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = await getToken();

        const response = await fetch('http://10.0.2.2:5000/api/v1/branches', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBranches(data.data);
        } else {
          console.error('Error fetching branches:', response.status);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching branches:', error);
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.heading}>Danh sách chi nhánh:</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Thêm chi nhánh mới</Text>
                </TouchableOpacity>
        </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Tên</Text>
          <Text style={styles.tableHeaderCell}>Địa chỉ</Text>
          <Text style={styles.tableHeaderCell}>Hành động</Text>
        </View>
        <FlatList
          data={branches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.address}</Text>
              <View style={styles.tableCell}>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('BranchDetails', { id: item.id })}
                  >
                    <Text style={styles.actionButtonText}>Xem</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Xoá</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default BranchList;
