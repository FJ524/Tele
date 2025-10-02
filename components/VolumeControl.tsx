import { moderateScale } from '@/utils/scaling';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useVolume } from '../contexts/VolumeContext';

interface VolumeControlProps {
  style?: any;
  showLabel?: boolean;
  onAudioAdded?: (audioUri: string, audioName: string) => void;
  onAudioRemoved?: () => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ style, showLabel = false, onAudioAdded, onAudioRemoved }) => {
  const { 
    volume, isMuted, setVolume, toggleMute, getActualVolume,
    audioTrack, audioVolume, isAudioMuted, setAudioVolume, toggleAudioMute, getActualAudioVolume
  } = useVolume();

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleAudioVolumeChange = (newVolume: number) => {
    setAudioVolume(newVolume);
  };

  const handleAddMusic = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const audioName = asset.name || 'Unknown Audio';
        const audioUri = asset.uri;

        if (onAudioAdded) {
          onAudioAdded(audioUri, audioName);
        }
      }
    } catch (error) {
      console.error('Error picking audio:', error);
      Alert.alert('Error', 'Failed to select audio file');
    }
  };

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <Text style={styles.label}>Audio Controls</Text>
      )}
      
      {/* Video Volume Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Video Volume</Text>
        <View style={styles.volumeContainer}>
          <TouchableOpacity
            style={[styles.muteButton, isMuted && styles.mutedButton]}
            onPress={toggleMute}
          >
            <MaterialIcons 
              name={isMuted ? 'volume-off' : 'volume-up'} 
              size={moderateScale(20)} 
              color="white" 
            />
          </TouchableOpacity>
          
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor="#259B9A"
            maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
            thumbTintColor="#259B9A"
            disabled={isMuted}
          />
          
          <Text style={styles.volumeText}>
            {isMuted ? 'Muted' : `${Math.round(volume)}%`}
          </Text>
        </View>
      </View>

      {/* Audio Track Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Background Music</Text>
        
        {!audioTrack ? (
          <TouchableOpacity style={styles.addMusicButton} onPress={handleAddMusic}>
            <MaterialIcons name="music-note" size={moderateScale(20)} color="white" />
            <Text style={styles.addMusicText}>Add Music</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.audioTrackInfo}>
              <MaterialIcons name="music-note" size={moderateScale(16)} color="#259B9A" />
              <Text style={styles.audioTrackName} numberOfLines={1}>
                {audioTrack.name}
              </Text>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={onAudioRemoved}
              >
                <MaterialIcons name="close" size={moderateScale(16)} color="white" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.volumeContainer}>
              <TouchableOpacity
                style={[styles.muteButton, isAudioMuted && styles.mutedButton]}
                onPress={toggleAudioMute}
              >
                <MaterialIcons 
                  name={isAudioMuted ? 'volume-off' : 'volume-up'} 
                  size={moderateScale(20)} 
                  color="white" 
                />
              </TouchableOpacity>
              
              <Slider
                style={styles.volumeSlider}
                minimumValue={0}
                maximumValue={100}
                value={audioVolume}
                onValueChange={handleAudioVolumeChange}
                minimumTrackTintColor="#259B9A"
                maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                thumbTintColor="#259B9A"
                disabled={isAudioMuted}
              />
              
              <Text style={styles.volumeText}>
                {isAudioMuted ? 'Muted' : `${Math.round(audioVolume)}%`}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    margin: moderateScale(10),
  },
  label: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: moderateScale(15),
    textAlign: 'center',
  },
  section: {
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginBottom: moderateScale(10),
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  muteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: moderateScale(8),
    borderRadius: moderateScale(6),
    marginRight: moderateScale(10),
  },
  mutedButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: moderateScale(10),
  },
  volumeText: {
    color: 'white',
    fontSize: moderateScale(12),
    minWidth: moderateScale(50),
    textAlign: 'center',
  },
  addMusicButton: {
    backgroundColor: 'rgba(37, 155, 154, 0.2)',
    borderColor: '#259B9A',
    borderWidth: 1,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMusicText: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginLeft: moderateScale(8),
  },
  audioTrackInfo: {
    backgroundColor: 'rgba(37, 155, 154, 0.1)',
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  audioTrackName: {
    color: 'white',
    fontSize: moderateScale(12),
    flex: 1,
    marginLeft: moderateScale(8),
  },
  removeButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    padding: moderateScale(4),
    borderRadius: moderateScale(4),
  },
});

export default VolumeControl;

