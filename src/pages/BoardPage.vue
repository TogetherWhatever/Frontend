<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-2">
            <MapPinIcon class="h-8 w-8 text-blue-600" />
            <span class="text-xl font-bold text-gray-900">여행동행</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-gray-600 hover:text-blue-600">메인</a>
            <a href="#" class="text-blue-600 font-medium">동행 게시판</a>
            <a href="#" class="text-gray-600 hover:text-blue-600">지도</a>
            <a href="#" class="text-gray-600 hover:text-blue-600">내 정보</a>
          </div>
          <div class="flex items-center space-x-4">
            <button
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              로그인
            </button>
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              동행 모집하기
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">동행 게시판</h1>
        <p class="text-gray-600">함께 여행할 동행을 찾아보세요!</p>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div class="relative lg:col-span-2">
            <SearchIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="도시명이나 국가명으로 검색..."
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            v-model="sortBy"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
            <option value="deadline">마감임박순</option>
          </select>
          <select
            v-model="filterGender"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체</option>
            <option value="남성">남성만</option>
            <option value="여성">여성만</option>
            <option value="성별무관">성별무관</option>
          </select>
          <select
            v-model="filterParticipants"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체</option>
            <option value="available">모집중</option>
            <option value="full">모집완료</option>
          </select>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <FilterIcon class="h-4 w-4 text-gray-500" />
            <span class="text-sm text-gray-600"
              >총 {{ filteredPosts.length }}개의 게시글</span
            >
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-md',
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
              ]"
            >
              <GridIcon class="h-4 w-4" />
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-md',
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
              ]"
            >
              <ListIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Posts Grid -->
      <div
        v-if="viewMode === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="post in filteredPosts"
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
            <div class="flex items-center text-sm text-gray-600 space-x-4 mb-3">
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

      <!-- Posts List -->
      <div v-else class="space-y-4">
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
          @click="goToPostDetail(post.id)"
        >
          <div class="flex items-start space-x-4">
            <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ post.preview }}
              </p>
              <div
                class="flex items-center text-sm text-gray-500 space-x-4 mb-3"
              >
                <div class="flex items-center space-x-1">
                  <MapPinIcon class="h-4 w-4" />
                  <span>{{ post.location }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <CalendarIcon class="h-4 w-4" />
                  <span>{{ post.date }}</span>
                </div>
                <span>by {{ post.author }}</span>
              </div>
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
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">검색 조건에 맞는 게시글이 없습니다.</p>
        <button
          class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          첫 번째 동행 모집글 작성하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  SearchIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
} from 'lucide-vue-next';

const viewMode = ref('grid');
const searchTerm = ref('');
const sortBy = ref('latest');
const filterGender = ref('all');
const filterParticipants = ref('all');

const posts = ref([
  {
    id: 1,
    title: '파리 5박 6일 유럽 여행 동행 구해요!',
    location: '프랑스 파리',
    date: '2024.03.15-20',
    participants: '2/4명',
    gender: '성별무관',
    preview:
      '에펠탑, 루브르 박물관, 몽마르트 언덕을 함께 둘러볼 동행을 찾습니다. 현지 대중교통과 도보로 이동 예정이에요.',
    author: '유럽여행러',
    createdAt: '2024-01-20',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 2,
    title: '도쿄 3박 4일 벚꽃 여행 함께해요',
    location: '일본 도쿄',
    date: '2024.04.01-04',
    participants: '1/3명',
    gender: '여성만',
    preview:
      '우에노 공원과 신주쿠 교엔에서 벚꽃을 보며 일본 문화를 체험해요! 온센과 이자카야 투어도 계획하고 있습니다.',
    author: '사쿠라러버',
    createdAt: '2024-01-19',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 3,
    title: '뉴욕 자유여행 7박 8일',
    location: '미국 뉴욕',
    date: '2024.04.10-17',
    participants: '3/4명',
    gender: '성별무관',
    preview:
      '브로드웨이 뮤지컬, 센트럴파크, 타임스퀘어를 함께 즐겨요. 메트로폴리탄 미술관과 자유의 여신상도 방문 예정입니다.',
    author: 'NYC드리머',
    createdAt: '2024-01-18',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 4,
    title: '런던 해리포터 성지순례 여행',
    location: '영국 런던',
    date: '2024.04.20-25',
    participants: '1/2명',
    gender: '성별무관',
    preview:
      '킹스크로스역 9¾ 승강장, 해리포터 스튜디오 투어, 옥스퍼드 등을 함께 둘러볼 해리포터 팬을 찾습니다.',
    author: '해리포터매니아',
    createdAt: '2024-01-17',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 5,
    title: '로마 역사 탐방 4박 5일',
    location: '이탈리아 로마',
    date: '2024.05.01-05',
    participants: '2/3명',
    gender: '성별무관',
    preview:
      '콜로세움, 바티칸 시국, 트레비 분수 등 로마의 역사적 명소들을 함께 탐방해요. 현지 맛집 투어도 포함!',
    author: '로마사랑',
    createdAt: '2024-01-16',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 6,
    title: '방콕 먹방 여행 3박 4일',
    location: '태국 방콕',
    date: '2024.05.10-13',
    participants: '1/4명',
    gender: '성별무관',
    preview:
      '태국 현지 음식을 마음껏 즐기는 먹방 여행! 플로팅 마켓, 차이나타운, 카오산로드에서 다양한 음식을 체험해요.',
    author: '태국음식러버',
    createdAt: '2024-01-15',
    image: '/placeholder.svg?height=200&width=300',
  },
]);

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      post.location.toLowerCase().includes(searchTerm.value.toLowerCase());

    const matchesGender =
      filterGender.value === 'all' || post.gender.includes(filterGender.value);

    const matchesParticipants =
      filterParticipants.value === 'all' ||
      (filterParticipants.value === 'available' &&
        !post.participants.startsWith(post.participants.split('/')[1]));

    return matchesSearch && matchesGender && matchesParticipants;
  });
});

const goToPostDetail = (id) => {
  console.log('Navigate to post detail:', id);
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
