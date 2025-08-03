<template>
  <div
    class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4"
  >
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center space-x-2">
          <MapPinIcon class="h-10 w-10 text-blue-600" />
          <span class="text-2xl font-bold text-gray-900">여행동행</span>
        </div>
        <p class="text-gray-600 mt-2">함께 떠나는 여행, 새로운 인연</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Tab Buttons -->
        <div class="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            @click="isLogin = true"
            :class="[
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
              isLogin
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            로그인
          </button>
          <button
            @click="isLogin = false"
            :class="[
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
              !isLogin
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            회원가입
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name field for signup -->
          <div v-if="!isLogin">
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
              >닉네임</label
            >
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="닉네임을 입력하세요"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <!-- Email field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >이메일</label
            >
            <div class="relative">
              <MailIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              />
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="이메일을 입력하세요"
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <!-- Password field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
              >비밀번호</label
            >
            <div class="relative">
              <LockIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              />
              <input
                id="password"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="비밀번호를 입력하세요"
                class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeIcon v-if="!showPassword" class="h-4 w-4" />
                <EyeOffIcon v-else class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Confirm Password field for signup -->
          <div v-if="!isLogin">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 mb-1"
              >비밀번호 확인</label
            >
            <div class="relative">
              <LockIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              />
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            {{ isLogin ? '로그인' : '회원가입' }}
          </button>
        </form>

        <!-- Forgot password link for login -->
        <div v-if="isLogin" class="mt-4 text-center">
          <a href="#" class="text-sm text-blue-600 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>

        <!-- Divider -->
        <div class="my-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">또는</span>
            </div>
          </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="space-y-3">
          <button
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Google로 계속하기
          </button>
          <button
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            카카오로 계속하기
          </button>
          <button
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            네이버로 계속하기
          </button>
        </div>
      </div>

      <!-- Toggle between login and signup -->
      <div class="text-center mt-6 text-sm text-gray-600">
        <span v-if="isLogin">
          아직 계정이 없으신가요?
          <button
            @click="isLogin = false"
            class="text-blue-600 hover:underline font-medium"
          >
            회원가입하기
          </button>
        </span>
        <span v-else>
          이미 계정이 있으신가요?
          <button
            @click="isLogin = true"
            class="text-blue-600 hover:underline font-medium"
          >
            로그인하기
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  MapPinIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-vue-next';

const isLogin = ref(true);
const showPassword = ref(false);

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const handleSubmit = () => {
  if (isLogin.value) {
    console.log('Login:', {
      email: formData.value.email,
      password: formData.value.password,
    });
    alert('로그인되었습니다!');
  } else {
    console.log('Register:', formData.value);
    alert('회원가입이 완료되었습니다!');
  }
};
</script>
