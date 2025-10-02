import { AppColors } from '@/constants/Colors';
import { moderateScale } from '@/utils/scaling';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface TextOverlayProps {
  onAddText: (text: string, style: any) => void;
  onAddTemplate?: (template: string) => void;
  onAddAnimation?: (animation: string) => void;
}

const TextOverlay: React.FC<TextOverlayProps> = ({ onAddText, onAddTemplate, onAddAnimation }) => {
  const [inputText, setInputText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [selectedFont, setSelectedFont] = useState('normal');
  const [selectedEffect, setSelectedEffect] = useState('none');

  const colors = ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const fonts = ['normal', 'bold', 'italic'];
  const effects = [
    { id: 'none', name: 'None', icon: 'text-fields' },
    { id: 'fade', name: 'Fade In', icon: 'fade-in' },
    { id: 'slide', name: 'Slide In', icon: 'arrow-forward' },
    { id: 'zoom', name: 'Zoom In', icon: 'zoom-in' },
    { id: 'bounce', name: 'Bounce', icon: 'bounce' },
    { id: 'typewriter', name: 'Typewriter', icon: 'keyboard' }
  ];

  const handleAddText = () => {
    if (inputText.trim()) {
      onAddText(inputText, {
        color: selectedColor,
        fontWeight: selectedFont === 'bold' ? 'bold' : 'normal',
        fontStyle: selectedFont === 'italic' ? 'italic' : 'normal',
        effect: selectedEffect,
      });
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Text</Text>
      
      <ScrollView style={styles.content}>
        {/* Text Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enter Text</Text>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your text here..."
            placeholderTextColor="#666"
            multiline
          />
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Color</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorButton
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Font Style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Style</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {fonts.map((font) => (
              <TouchableOpacity
                key={font}
                style={[
                  styles.fontButton,
                  selectedFont === font && styles.selectedFontButton
                ]}
                onPress={() => setSelectedFont(font)}
              >
                <Text style={[
                  styles.fontButtonText,
                  selectedFont === font && styles.selectedFontButtonText,
                  font === 'bold' && { fontWeight: 'bold' },
                  font === 'italic' && { fontStyle: 'italic' }
                ]}>
                  {font.charAt(0).toUpperCase() + font.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Text Effects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Effects</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {effects.map((effect) => (
              <TouchableOpacity
                key={effect.id}
                style={[
                  styles.effectButton,
                  selectedEffect === effect.id && styles.selectedEffectButton
                ]}
                onPress={() => setSelectedEffect(effect.id)}
              >
                <MaterialIcons 
                  name={effect.icon as any} 
                  size={moderateScale(20)} 
                  color={selectedEffect === effect.id ? AppColors.primary : 'white'} 
                />
                <Text style={[
                  styles.effectButtonText,
                  selectedEffect === effect.id && styles.selectedEffectButtonText
                ]}>
                  {effect.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewContainer}>
            <Text style={[
              styles.previewText,
              {
                color: selectedColor,
                fontWeight: selectedFont === 'bold' ? 'bold' : 'normal',
                fontStyle: selectedFont === 'italic' ? 'italic' : 'normal',
              }
            ]}>
              {inputText || 'Sample Text'}
            </Text>
          </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddText}>
          <MaterialIcons name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>Add Text to Video</Text>
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
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    fontSize: moderateScale(16),
    minHeight: moderateScale(80),
    textAlignVertical: 'top',
  },
  colorButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(10),
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorButton: {
    borderColor: AppColors.primary,
  },
  fontButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(6),
    marginRight: moderateScale(8),
  },
  selectedFontButton: {
    backgroundColor: AppColors.primary,
  },
  fontButtonText: {
    color: 'white',
    fontSize: moderateScale(14),
  },
  selectedFontButtonText: {
    fontWeight: '600',
  },
  previewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: moderateScale(20),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: moderateScale(60),
  },
  previewText: {
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: AppColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(10),
  },
  addButtonText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  effectButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(6),
    marginRight: moderateScale(10),
    alignItems: 'center',
    minWidth: moderateScale(80),
  },
  selectedEffectButton: {
    backgroundColor: 'rgba(37, 155, 154, 0.2)',
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  effectButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: moderateScale(11),
    marginTop: moderateScale(4),
    textAlign: 'center',
  },
  selectedEffectButtonText: {
    color: AppColors.primary,
    fontWeight: '600',
  },
});

export default TextOverlay;