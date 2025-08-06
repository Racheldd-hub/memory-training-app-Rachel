import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const RegisterScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    preferredMode: 'young' as 'elder' | 'young'
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();

  const handleRegister = async () => {
    // 验证表单
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.age) {
      Alert.alert('错误', '请填写所有必填字段');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('错误', '两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('错误', '密码长度至少6位');
      return;
    }

    const age = parseInt(formData.age);
    if (isNaN(age) || age < 1 || age > 120) {
      Alert.alert('错误', '请输入有效年龄');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        name: formData.name,
        age: age,
        level: '初级',
        joinDate: new Date().toISOString().split('T')[0],
        totalTrainingDays: 0,
        preferredMode: formData.preferredMode,
      };

      await register(formData.email, formData.password, userData);
      Alert.alert('成功', '注册成功！', [
        { text: '确定', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error: any) {
      let errorMessage = '注册失败，请重试';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = '该邮箱已被注册';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = '邮箱格式不正确';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = '密码强度太弱';
      }
      Alert.alert('注册失败', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Ionicons name="person-add" size={80} color="#007AFF" />
            <Text style={styles.title}>创建账户</Text>
            <Text style={styles.subtitle}>开始您的记忆力训练之旅</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="姓名"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="邮箱地址"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="密码"
                value={formData.password}
                onChangeText={(text) => setFormData({...formData, password: text})}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="确认密码"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.passwordToggle}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="年龄"
                value={formData.age}
                onChangeText={(text) => setFormData({...formData, age: text})}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.modeSelection}>
              <Text style={styles.modeTitle}>选择训练模式：</Text>
              <View style={styles.modeButtons}>
                <TouchableOpacity 
                  style={[
                    styles.modeButton, 
                    formData.preferredMode === 'young' && styles.modeButtonActive
                  ]}
                  onPress={() => setFormData({...formData, preferredMode: 'young'})}
                >
                  <Ionicons 
                    name="flash" 
                    size={20} 
                    color={formData.preferredMode === 'young' ? '#fff' : '#007AFF'} 
                  />
                  <Text style={[
                    styles.modeButtonText,
                    formData.preferredMode === 'young' && styles.modeButtonTextActive
                  ]}>
                    年轻人模式
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.modeButton, 
                    formData.preferredMode === 'elder' && styles.modeButtonActive
                  ]}
                  onPress={() => setFormData({...formData, preferredMode: 'elder'})}
                >
                  <Ionicons 
                    name="heart" 
                    size={20} 
                    color={formData.preferredMode === 'elder' ? '#fff' : '#007AFF'} 
                  />
                  <Text style={[
                    styles.modeButtonText,
                    formData.preferredMode === 'elder' && styles.modeButtonTextActive
                  ]}>
                    老年人模式
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.registerButton, loading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.registerButtonText}>
                {loading ? '注册中...' : '创建账户'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLinkText}>已有账户？立即登录</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  passwordToggle: {
    padding: 8,
  },
  modeSelection: {
    marginVertical: 20,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  modeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modeButtonActive: {
    backgroundColor: '#007AFF',
  },
  modeButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  loginLinkText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default RegisterScreen; 