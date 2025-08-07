import AsyncStorage, { useAsyncStorage as useReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const useAsyncStorage = <T>(key: string) => {
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getItem, setItem, removeItem } = useReactNativeAsyncStorage(key);

  // Function to get data from AsyncStorage
  const getData = useCallback(async () => {
    try {
      const jsonValue = await getItem();
      if (jsonValue !== null) {
        setValue(JSON.parse(jsonValue));
      }
    } catch (e) {
      setError(`Failed to fetch data from storage, ${e}`);
    }
  }, [getItem]);

  // Function to set data in AsyncStorage
  const setData = async (newValue: T) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      await setItem(jsonValue);
      setValue(newValue);
    } catch (e) {
      setError(`Failed to save data to storage, ${e}`);
    }
  };

  // Function to remove data from AsyncStorage
  const removeData = async () => {
    try {
      await removeItem();
      setValue(null);
    } catch (e) {
      setError(`Failed to remove data from storage, ${e}`);
    }
  };

  // Function to clear data from AsyncStorage
  const clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getData();
  }, [getData]);

  return { value, setData, removeData, error, clear, getData };
};

export default useAsyncStorage;
