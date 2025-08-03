<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2">
            <MapPinIcon class="h-8 w-8 text-blue-600" />
            <span class="text-xl font-bold text-gray-900">여행동행</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-blue-600 font-medium">메인</a>
            <a
              href="#"
              class="text-gray-600 hover:text-blue-600"
              @click="goToBoard"
              >동행 게시판</a
            >
            <a
              href="#"
              class="text-gray-600 hover:text-blue-600"
              @click="goToMap"
              >지도</a
            >
            <a
              href="#"
              class="text-gray-600 hover:text-blue-600"
              @click="goToMyPage"
              >내 정보</a
            >
          </div>
          <div class="flex items-center space-x-4">
            <button
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              @click="goToLogin"
            >
              로그인
            </button>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              @click="goToWrite"
            >
              동행 모집하기
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          전세계를 함께 여행하는
          <br />
          <span class="text-blue-600">글로벌 동행</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          혼자 해외여행하기 망설여지셨나요? 같은 목적지로 떠날 한국인 동행을
          찾아보세요!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
            @click="goToBoard"
          >
            동행 찾기
          </button>
          <button
            class="px-8 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-lg"
            @click="goToWrite"
          >
            동행 모집하기
          </button>
        </div>
      </div>
    </section>

    <!-- Recent Posts -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">최근 동행 모집글</h2>
          <button
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            @click="goToBoard"
          >
            전체보기
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="post in recentPosts"
            :key="post.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            @click="goToPostDetail(post.id)"
          >
            <div class="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-2 line-clamp-2">
                {{ post.title }}
              </h3>
              <div
                class="flex items-center text-sm text-gray-600 space-x-4 mb-3"
              >
                <div class="flex items-center space-x-1">
                  <MapPinIcon class="h-4 w-4" />
                  <span>{{ post.location }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <CalendarIcon class="h-4 w-4" />
                  <span>{{ post.date }}</span>
                </div>
              </div>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ post.preview }}
              </p>
              <div class="flex justify-between items-center">
                <div class="flex space-x-2">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    <UsersIcon class="h-3 w-3 mr-1" />
                    {{ post.participants }}
                  </span>
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-700"
                  >
                    {{ post.gender }}
                  </span>
                </div>
                <span class="text-sm text-gray-500">by {{ post.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Destinations -->
    <section class="py-16 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
          인기 여행지
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <div
            v-for="dest in popularDestinations"
            :key="dest.name"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 text-center"
          >
            <div class="flex items-center justify-center mb-2">
              <StarIcon class="h-4 w-4 text-yellow-500 mr-1" />
              <span class="font-semibold text-sm">{{ dest.name }}</span>
            </div>
            <p class="text-xs text-gray-600">{{ dest.count }}개의 모집글</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Guide -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-12">이용 가이드</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">동행 찾기</h3>
            <p class="text-gray-600">
              원하는 여행지와 일정에 맞는 동행을 찾아보세요.
            </p>
          </div>
          <div class="text-center">
            <div
              class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">연락하기</h3>
            <p class="text-gray-600">
              관심있는 동행에게 참여 의사를 표현해보세요.
            </p>
          </div>
          <div class="text-center">
            <div
              class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <span class="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">함께 여행</h3>
            <p class="text-gray-600">
              새로운 인연과 함께 즐거운 여행을 떠나세요!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <MapPinIcon class="h-6 w-6" />
              <span class="text-lg font-bold">여행동행</span>
            </div>
            <p class="text-gray-400">안전하고 즐거운 여행 동행 서비스</p>
          </div>
          <div>
            <h3 class="font-semibold mb-4">서비스</h3>
            <ul class="space-y-2 text-gray-400">
              <li>
                <a href="#" class="hover:text-white" @click="goToBoard"
                  >동행 게시판</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white" @click="goToMap">지도</a>
              </li>
              <li>
                <a href="#" class="hover:text-white" @click="goToWrite"
                  >동행 모집</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4">고객지원</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">문의하기</a></li>
              <li><a href="#" class="hover:text-white">피드백</a></li>
              <li><a href="#" class="hover:text-white">이용약관</a></li>
            </ul>
          </div>
        </div>
        <div
          class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 여행동행. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MapPinIcon, CalendarIcon, UsersIcon, StarIcon } from 'lucide-vue-next';

const recentPosts = ref([
  {
    id: 1,
    title: '파리 5박 6일 유럽 여행 동행 구해요!',
    location: '프랑스 파리',
    date: '2024.03.15-20',
    participants: '2/4명',
    gender: '성별무관',
    preview:
      '에펠탑, 루브르 박물관, 몽마르트 언덕을 함께 둘러볼 동행을 찾습니다.',
    author: '유럽여행러',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 2,
    title: '도쿄 3박 4일 벚꽃 여행 함께해요',
    location: '일본 도쿄',
    date: '2024.04.01-04',
    participants: '1/3명',
    gender: '여성만',
    preview: '우에노 공원과 신주쿠 교엔에서 벚꽃을 보며 일본 문화를 체험해요!',
    author: '사쿠라러버',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 3,
    title: '뉴욕 자유여행 7박 8일',
    location: '미국 뉴욕',
    date: '2024.04.10-17',
    participants: '3/4명',
    gender: '성별무관',
    preview: '브로드웨이 뮤지컬, 센트럴파크, 타임스퀘어를 함께 즐겨요.',
    author: 'NYC드리머',
    image: '/placeholder.svg?height=200&width=300',
  },
]);

const popularDestinations = ref([
  { name: '일본 도쿄', count: 42 },
  { name: '프랑스 파리', count: 38 },
  { name: '미국 뉴욕', count: 31 },
  { name: '영국 런던', count: 28 },
  { name: '이탈리아 로마', count: 25 },
  { name: '태국 방콕', count: 22 },
  { name: '스페인 바르셀로나', count: 19 },
  { name: '호주 시드니', count: 16 },
]);

// Navigation methods
const goToBoard = () => {
  console.log('Navigate to board page');
};

const goToMap = () => {
  console.log('Navigate to map page');
};

const goToMyPage = () => {
  console.log('Navigate to my page');
};

const goToLogin = () => {
  console.log('Navigate to login page');
};

const goToWrite = () => {
  console.log('Navigate to write page');
};

const goToPostDetail = (id) => {
  console.log('Navigate to post detail:', id);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
