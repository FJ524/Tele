import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale } from '@/utils/scaling';
import { AppColors } from '@/constants/Colors';

interface FilterOverlayProps {
  onApplyFilter: (filter: string, intensity: number) => void;
}

const FilterOverlay: React.FC<FilterOverlayProps> = ({ onApplyFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [intensity, setIntensity] = useState(50);

  const filters = [
    { id: 'none', name: 'Original', preview: '#ffffff' },
    { id: 'vintage', name: 'Vintage', preview: '#d4a574' },
    { id: 'blackwhite', name: 'B&W', preview: '#808080' },
    { id: 'sepia', name: 'Sepia', preview: '#704214' },
    { id: 'cool', name: 'Cool', preview: '#4a90e2' },
    { id: 'warm', name: 'Warm', preview: '#ff6b35' },
    { id: 'dramatic', name: 'Dramatic', preview: '#2c3e50' },
    { id: 'bright', name: 'Bright', preview: '#f39c12' },
    { id: 'contrast', name: 'High Contrast', preview: '#000000' },
    { id: 'soft', name: 'Soft', preview: '#ecf0f1' },
    { id: 'vivid', name: 'Vivid', preview: '#e74c3c' },
    { id: 'fade', name: 'Fade', preview: '#95a5a6' },
  ];

  const intensityLevels = [10, 25, 50, 75, 100];

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
    onApplyFilter(filterId, intensity);
  };

  const handleIntensityChange = (newIntensity: number) => {
    setIntensity(newIntensity);
    onApplyFilter(selectedFilter, newIntensity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Filters</Text>
      
      <ScrollView style={styles.content}>
        {/* Filter Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Filter</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.id && styles.selectedFilterButton
                ]}
                onPress={() => handleFilterSelect(filter.id)}
              >
                <View 
                  style={[
                    styles.filterPreview,
                    { backgroundColor: filter.preview }
                  ]} 
                />
                <Text style={[
                  styles.filterName,
                  selectedFilter === filter.id && styles.selectedFilterName
                ]}>
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Intensity Control */}
        {selectedFilter !== 'none' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Filter Intensity: {intensity}%</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {intensityLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.intensityButton,
                    intensity === level && styles.selectedIntensityButton
                  ]}
                  onPress={() => handleIntensityChange(level)}
                >
                  <Text style={[
                    styles.intensityText,
                    intensity === level && styles.selectedIntensityText
                  ]}>
                    {level}%
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Filter Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Combinations</Text>
          <View style={styles.combinationsContainer}>
            <TouchableOpacity
              style={styles.combinationButton}
              onPress={() => {
                setSelectedFilter('vintage');
                setIntensity(75);
                onApplyFilter('vintage', 75);
              }}
            >
              <MaterialIcons name="photo-filter" size={moderateScale(24)} color="white" />
              <Text style={styles.combinationText}>Retro Look</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.combinationButton}
              onPress={() => {
                setSelectedFilter('dramatic');
                setIntensity(100);
                onApplyFilter('dramatic', 100);
              }}
            >
              <MaterialIcons name="movie-filter" size={moderateScale(24)} color="white" />
              <Text style={styles.combinationText}>Cinema</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.combinationButton}
              onPress={() => {
                setSelectedFilter('soft');
                setIntensity(50);
                onApplyFilter('soft', 50);
              }}
            >
              <MaterialIcons name="blur-on" size={moderateScale(24)} color="white" />
              <Text style={styles.combinationText}>Dreamy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.combinationButton}
              onPress={() => {
                setSelectedFilter('vivid');
                setIntensity(75);
                onApplyFilter('vivid', 75);
              }}
            >
              <MaterialIcons name="palette" size={moderateScale(24)} color="white" />
              <Text style={styles.combinationText}>Pop Art</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            setSelectedFilter('none');
            setIntensity(50);
            onApplyFilter('none', 0);
          }}
        >
          <MaterialIcons name="refresh" size={moderateScale(20)} color="white" />
          <Text style={styles.resetText}>Reset to Original</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: moderateScale(20),
  },
  title: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginBottom: moderateScale(20),
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: moderateScale(25),
  },
  sectionTitle: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginBottom: moderateScale(10),
  },
  filterButton: {
    alignItems: 'center',
    marginRight: moderateScale(15),
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedFilterButton: {
    backgroundColor: AppColors.primary,
  },
  filterPreview: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(5),
  },
  filterName: {
    color: 'white',
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  selectedFilterName: {
    fontWeight: '600',
  },
  intensityButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(6),
    marginRight: moderateScale(8),
  },
  selectedIntensityButton: {
    backgroundColor: AppColors.primary,
  },
  intensityText: {
    color: 'white',
    fontSize: moderateScale(14),
  },
  selectedIntensityText: {
    fontWeight: '600',
  },
  combinationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  combinationButton: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  combinationText: {
    color: 'white',
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
    textAlign: 'center',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(10),
  },
  resetText: {
    color: 'white',
    fontSize: moderateScale(14),
    marginLeft: moderateScale(8),
  },
});

export default FilterOverlay;