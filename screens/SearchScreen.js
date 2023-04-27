import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import GradientIconButton from "../components/GradientIconButton";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import IconInput from "../components/IconInput";

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "Business people"));
        const querySnapshot = await getDocs(q);
        const businessesData = querySnapshot.docs.map((doc) => doc.data());
        setBusinesses(businessesData);
        setSearchList(businessesData);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const searchData = () => {
    setHasSearched(false);
    if (input.trim() === "") {
      setSearchList([]);
      setHasSearched(true);
      return;
    }
    const searchTerm = input.toLowerCase();
    const filteredBusinesses = businesses.filter(
      (item) =>
        item.business &&
        item.business.toLowerCase().includes(searchTerm) &&
        item.uid !== undefined
    );
    setSearchList(filteredBusinesses);
    setHasSearched(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Business", { id: item.uid })}
      style={styles.button}
    >
      <View style={styles.buttonContainer}>
        {/* Add image component here if available */}
        <Text style={styles.buttonText}>{item.business}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.title}>Search</Text>
          <View style={styles.searchSection}>
            <IconInput
              text="Search"
              handleChange={setInput}
            />
            <TouchableOpacity onPress={searchData}>
              <Icon style={styles.icon} name="search" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
          {hasSearched && (
            <FlatList
              data={searchList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
	  backgroundColor: "#102C54",
	  flex: 1,
	},
	input: {
	  backgroundColor: "white",
	  paddingHorizontal: 25,
	  paddingVertical: 0,
	  borderRadius: 100,
	  width: "90%",
	  paddingVertical: 15,
	  fontSize: 18, // Increase the font size
	},
	searchSection: {
	  flexDirection: "row",
	  width: "90%",
	  marginTop: 10, // Increase the top margin
	  marginLeft: 15,
	  justifyContent: "space-between",
	  alignItems: "center",
	},
	title: {
	  color: "white",
	  fontWeight: "bold",
	  fontSize: 36,
	  marginLeft: 15,
	  marginTop: 30,
	  borderRadius: 100,
	},
	icon: {
	  flexDirection: "row",
	  justifyContent: "space-between",
	  alignItems: "center",
	  borderRadius: 50,
	  height: 30,
	  paddingHorizontal: 10,
	},
	button: {
	  backgroundColor: "#FFF",
	  borderRadius: 30,
	  paddingVertical: 15, // Increase the padding vertically
	  paddingHorizontal: 20,
	  marginBottom: 15, // Increase the bottom margin
	  marginHorizontal: 15,
	  alignSelf: "stretch",
	},
	buttonContainer: {
	  flexDirection: "row",
	  justifyContent: "center",
	  alignItems: "center",
	},
	buttonText: {
	  color: "#102C54",
	  fontSize: 20, // Increase the font size
	  fontWeight: "bold", // Add font weight
	},
  });
  