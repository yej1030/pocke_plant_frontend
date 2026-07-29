import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

const ICONS = {
  success: '✓',
  info: 'i',
  warning: '!',
  error: '!',
};

const COLORS = {
  success: '#7fc77c',
  info: '#7BCB95',
  warning: '#F6C15A',
  error: '#FF6B6B',
};

const ACTION_COLORS = {
  primary: '#7fc77c',
  success: '#7fc77c',
  info: '#7BCB95',
  warning: '#F6C15A',
  error: '#FF6B6B',
  destructive: '#FF6B6B',
  secondary: '#666666',
  cancel: '#666666',
};

export default function CustomAlert({
  visible,
  title,
  message,
  buttonText = '확인',
  onPress,
  secondaryButtonText,
  onSecondaryPress,
  variant = 'success',
  onRequestClose,
  actions,
}) {
  const color = COLORS[variant] || COLORS.success;
  const icon = ICONS[variant] || ICONS.success;

  const handlePrimaryPress = () => {
    if (onPress) {
      onPress();
    }
    if (onRequestClose) {
      onRequestClose();
    }
  };

  const handleSecondaryPress = () => {
    if (onSecondaryPress) {
      onSecondaryPress();
    }
    if (onRequestClose) {
      onRequestClose();
    }
  };

  const normalizedActions =
    Array.isArray(actions) && actions.length > 0
      ? actions
      : secondaryButtonText
        ? [
            {
              text: secondaryButtonText,
              onPress: handleSecondaryPress,
              kind: 'secondary',
            },
            {
              text: buttonText,
              onPress: handlePrimaryPress,
              kind: 'primary',
            },
          ]
        : [
            {
              text: buttonText,
              onPress: handlePrimaryPress,
              kind: 'primary',
            },
          ];

  const renderActionButton = (action, index) => {
    const actionKind = action.kind || 'primary';
    const actionColor = ACTION_COLORS[actionKind] || color;
    const isSecondaryKind = actionKind === 'secondary' || actionKind === 'cancel';
    const isVerticalStack = normalizedActions.length > 2;

    return (
      <TouchableOpacity
        key={`${action.text}-${index}`}
        style={[
          styles.actionButton,
          isVerticalStack ? styles.actionButtonStacked : styles.actionButtonInline,
          isVerticalStack && index > 0 && styles.actionButtonStackedSpacing,
          !isVerticalStack && index === 0 && styles.actionButtonInlineSpacing,
          isSecondaryKind
            ? styles.actionButtonSecondary
            : [styles.actionButtonPrimary, { backgroundColor: actionColor }],
          action.style,
        ]}
        onPress={() => {
          if (action.onPress) {
            action.onPress();
          }
          if (onRequestClose) {
            onRequestClose();
          }
        }}
        activeOpacity={0.85}
      >
        <Text
          style={[
            styles.actionButtonText,
            isSecondaryKind ? { color: actionColor } : styles.actionButtonPrimaryText,
          ]}
        >
          {action.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <Pressable style={styles.backdrop} onPress={onRequestClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <View style={[styles.iconWrap, { backgroundColor: `${color}1A` }]}>
            <Text style={[styles.iconText, { color }]}>{icon}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View
            style={[
              styles.actionList,
              normalizedActions.length > 2
                ? styles.actionListStacked
                : styles.actionListInline,
            ]}
          >
            {normalizedActions.map((action, index) => renderActionButton(action, index))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconText: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
    color: '#666',
    textAlign: 'center',
    marginBottom: 22,
  },
  actionList: {
    width: '100%',
  },
  actionListInline: {
    flexDirection: 'row',
  },
  actionListStacked: {
    flexDirection: 'column',
  },
  actionButton: {
    minHeight: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  actionButtonInline: {
    flex: 1,
  },
  actionButtonInlineSpacing: {
    marginRight: 10,
  },
  actionButtonStacked: {
    width: '100%',
  },
  actionButtonStackedSpacing: {
    marginTop: 10,
  },
  actionButtonPrimary: {
    backgroundColor: '#7fc77c',
  },
  actionButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E7E4',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  actionButtonPrimaryText: {
    color: '#fff',
  },
  primaryButton: {
    width: '100%',
    minHeight: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});