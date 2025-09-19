import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, StatusBar, ScrollView, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

const { width, height } = Dimensions.get('window');

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('Alex Johnson');
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState([
    { id: '1', title: 'A Beautiful Day', content: 'Today was an amazing day. I went for a walk in the park and saw the most beautiful sunset...', date: 'Today' },
    { id: '2', title: 'Reflections', content: 'I\'ve been thinking a lot about life and what it means to be truly happy. I think I\'m getting closer to understanding...', date: 'Yesterday' },
    { id: '3', title: 'Weekend Plans', content: 'Planning my weekend getaway. Looking forward to some quiet time in the mountains with a good book.', date: '2 days ago' },
  ]);
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');

  // Request notification permissions
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Notification Permission Required', 'Enable notifications to receive reminders!');
      }
    })();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📖 Time to Journal!",
        body: "Write your thoughts now and keep your diary updated.",
        sound: true,
      },
      trigger: null, // immediate
    });
    Alert.alert('Reminder Sent', 'You will receive a notification shortly!');
  };

  const handleAddEntry = () => {
    if (!newEntryTitle.trim() || !newEntryContent.trim()) {
      Alert.alert('Error', 'Please add both title and content for your entry');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      title: newEntryTitle,
      content: newEntryContent,
      date: 'Just now'
    };

    setEntries([newEntry, ...entries]);
    setNewEntryTitle('');
    setNewEntryContent('');
    setShowNewEntryModal(false);
    Alert.alert('Success', 'New diary entry added!');
  };

  // Render Dashboard Screen
  const renderDashboard = () => (
    <View style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.dashboardHeader}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Digital Diary</Text>
          <TouchableOpacity onPress={sendNotification} style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      {/* Dashboard Content */}
      <ScrollView style={styles.dashboardContent}>
        <Text style={styles.welcomeText}>Welcome back, {name}!</Text>
        
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#667eea' }]}>
            <Ionicons name="document-text-outline" size={30} color="#fff" />
            <Text style={styles.statNumber}>{entries.length}</Text>
            <Text style={styles.statLabel}>Entries</Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: '#f093fb' }]}>
            <Ionicons name="calendar-outline" size={30} color="#fff" />
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#4facfe' }]}>
            <Ionicons name="star-outline" size={30} color="#fff" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Highlights</Text>
          </View>
        </View>
        
        {/* Recent Entries */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Entries</Text>
            <TouchableOpacity onPress={() => setCurrentScreen('entries')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {entries.slice(0, 2).map((entry) => (
            <TouchableOpacity key={entry.id} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                <Text style={styles.entryDate}>{entry.date}</Text>
              </View>
              <Text style={styles.entryPreview} numberOfLines={2}>
                {entry.content}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setShowNewEntryModal(true)}
            >
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.actionGradient}
              >
                <Ionicons name="add" size={24} color="#fff" />
                <Text style={styles.actionText}>New Entry</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={sendNotification}>
              <LinearGradient
                colors={['#ff9a9e', '#fad0c4']}
                style={styles.actionGradient}
              >
                <Ionicons name="notifications" size={24} color="#fff" />
                <Text style={styles.actionText}>Reminders</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Reminder */}
        <View style={styles.reminderCard}>
          <Ionicons name="time-outline" size={24} color="#667eea" />
          <View style={styles.reminderTextContainer}>
            <Text style={styles.reminderTitle}>Daily Reminder</Text>
            <Text style={styles.reminderText}>Set a time to receive journaling reminders</Text>
          </View>
          <TouchableOpacity style={styles.reminderButton}>
            <Text style={styles.reminderButtonText}>Set</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* New Entry FAB */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowNewEntryModal(true)}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={[styles.navItem, currentScreen === 'dashboard' && styles.navItemActive]}>
          <Ionicons name="home" size={24} color={currentScreen === 'dashboard' ? '#667eea' : '#999'} />
          <Text style={[styles.navText, currentScreen === 'dashboard' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'entries' && styles.navItemActive]}
          onPress={() => setCurrentScreen('entries')}
        >
          <Ionicons name="journal" size={24} color={currentScreen === 'entries' ? '#667eea' : '#999'} />
          <Text style={[styles.navText, currentScreen === 'entries' && styles.navTextActive]}>Diary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, currentScreen === 'stats' && styles.navItemActive]}>
          <Ionicons name="stats-chart" size={24} color={currentScreen === 'stats' ? '#667eea' : '#999'} />
          <Text style={[styles.navText, currentScreen === 'stats' && styles.navTextActive]}>Stats</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, currentScreen === 'profile' && styles.navItemActive]}>
          <Ionicons name="person" size={24} color={currentScreen === 'profile' ? '#667eea' : '#999'} />
          <Text style={[styles.navText, currentScreen === 'profile' && styles.navTextActive]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* New Entry Modal */}
      <Modal
        visible={showNewEntryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNewEntryModal(false)}
      >
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidView}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>New Diary Entry</Text>
                <TouchableOpacity onPress={() => setShowNewEntryModal(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <TextInput
                style={styles.titleInput}
                placeholder="Entry Title"
                value={newEntryTitle}
                onChangeText={setNewEntryTitle}
              />
              
              <TextInput
                style={styles.contentInput}
                placeholder="Write your thoughts here..."
                multiline
                numberOfLines={10}
                textAlignVertical="top"
                value={newEntryContent}
                onChangeText={setNewEntryContent}
              />
              
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setShowNewEntryModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleAddEntry}
                >
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.saveButtonGradient}
                  >
                    <Text style={styles.saveButtonText}>Save Entry</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );

  // Render Entries Screen
  const renderEntriesScreen = () => (
    <View style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.dashboardHeader}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => setCurrentScreen('dashboard')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Entries</Text>
          <View style={styles.emptyIcon} />
        </View>
      </LinearGradient>
      
      {/* Entries List */}
      <ScrollView style={styles.dashboardContent}>
        {entries.map((entry) => (
          <TouchableOpacity key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryDate}>{entry.date}</Text>
            </View>
            <Text style={styles.entryPreview} numberOfLines={3}>
              {entry.content}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* New Entry FAB */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowNewEntryModal(true)}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
      
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navItem, currentScreen === 'dashboard' && styles.navItemActive]}
          onPress={() => setCurrentScreen('dashboard')}
        >
          <Ionicons name="home" size={24} color={currentScreen === 'dashboard' ? '#667eea' : '#999'} />
          <Text style={[styles.navText, currentScreen === 'dashboard' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, currentScreen === 'entries' && styles.navItemActive]}>
          <Ionicons name="journal" size={24} color={currentScreen === 'entries' ? '#667eea' : '#999'} />
          <Text style={[styles.navText, currentScreen === 'entries' && styles.navTextActive]}>Diary</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, currentScreen === 'stats' && styles.navItemActive]}>
          <Ionicons name="stats-chart" size={24} color={currentScreen === 'stats' ? '#667eea' : '#999'} />
          <Text style={[styles.navText, currentScreen === 'stats' && styles.navTextActive]}>Stats</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, currentScreen === 'profile' && styles.navItemActive]}>
          <Ionicons name="person" size={24} color={currentScreen === 'profile' ? '#667eea' : '#999'} />
          <Text style={[styles.navText, currentScreen === 'profile' && styles.navTextActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render the appropriate screen based on state
  return (
    <>
      {currentScreen === 'dashboard' && renderDashboard()}
      {currentScreen === 'entries' && renderEntriesScreen()}
    </>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dashboardHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 5,
  },
  backButton: {
    padding: 5,
  },
  emptyIcon: {
    width: 24,
  },
  dashboardContent: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  statLabel: {
    color: '#fff',
    fontSize: 12,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    color: '#667eea',
    fontSize: 14,
  },
  entryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  entryDate: {
    color: '#667eea',
    fontSize: 12,
  },
  entryPreview: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 15,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
  reminderCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reminderTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reminderText: {
    color: '#666',
    fontSize: 14,
  },
  reminderButton: {
    backgroundColor: '#f0f5ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  reminderButtonText: {
    color: '#667eea',
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    // Active state styles
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  navTextActive: {
    color: '#667eea',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  keyboardAvoidView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 150,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    padding: 12,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  saveButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;