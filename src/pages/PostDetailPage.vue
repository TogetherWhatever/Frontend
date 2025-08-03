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

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <div class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <a href="#" class="hover:text-blue-600">홈</a>
        <span>/</span>
        <a href="#" class="hover:text-blue-600">동행 게시판</a>
        <span>/</span>
        <span class="text-gray-900">게시글 상세</span>
      </div>

      <!-- Post Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">
              {{ post.title }}
            </h1>
            <div class="flex items-center space-x-6 text-sm text-gray-600 mb-4">
              <div class="flex items-center space-x-1">
                <MapPinIcon class="h-4 w-4" />
                <span>{{ post.location }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <CalendarIcon class="h-4 w-4" />
                <span>{{ post.date }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <ClockIcon class="h-4 w-4" />
                <span>2024.01.20 10:30</span>
              </div>
              <span>조회 {{ post.views }}</span>
            </div>
            <div class="flex space-x-2 mb-4">
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
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 border border-green-600"
              >
                모집중
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              class="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <HeartIcon class="h-4 w-4 mr-1" />
              {{ post.likes }}
            </button>
            <button
              class="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <Share2Icon class="h-4 w-4 mr-1" />
              공유
            </button>
            <button
              class="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              <FlagIcon class="h-4 w-4 mr-1" />
              신고
            </button>
          </div>
        </div>

        <!-- Author Info -->
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <span class="text-lg font-semibold text-gray-600">{{
                post.author.name[0]
              }}</span>
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ post.author.name }}</p>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <span>⭐ {{ post.author.rating }}</span>
                <span>•</span>
                <span>여행 {{ post.author.tripCount }}회</span>
              </div>
            </div>
          </div>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            메시지 보내기
          </button>
        </div>
      </div>

      <!-- Post Image -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="aspect-video relative overflow-hidden rounded-lg">
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Post Content -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="prose max-w-none">
          <div
            v-for="(paragraph, index) in post.content.split('\n')"
            :key="index"
            class="mb-4 text-gray-700 leading-relaxed"
          >
            {{ paragraph }}
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 class="flex items-center space-x-2 text-lg font-semibold mb-4">
          <MapPinIcon class="h-5 w-5" />
          <span>여행 위치</span>
        </h3>
        <div
          class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center"
        >
          <div class="text-center">
            <MapPinIcon class="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p class="text-gray-600">지도 영역</p>
            <p class="text-sm text-gray-500">{{ post.mapLocation.address }}</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
          >
            <UsersIcon class="h-4 w-4 mr-2" />
            참여하기
          </button>
          <button
            class="flex items-center justify-center px-8 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-lg"
          >
            <MessageCircleIcon class="h-4 w-4 mr-2" />
            문의하기
          </button>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="flex items-center space-x-2 text-lg font-semibold mb-6">
          <MessageCircleIcon class="h-5 w-5" />
          <span>댓글 ({{ comments.length }})</span>
        </h3>

        <div class="space-y-6">
          <div v-for="comment in comments" :key="comment.id">
            <div class="flex items-start space-x-3">
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
              >
                <span class="text-sm font-semibold text-gray-600">{{
                  comment.author[0]
                }}</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-1">
                  <span class="font-medium text-sm">{{ comment.author }}</span>
                  <span class="text-xs text-gray-500">2024.01.20 14:20</span>
                </div>
                <p class="text-gray-700 text-sm">{{ comment.content }}</p>
                <button class="mt-2 text-xs text-blue-600 hover:underline">
                  답글
                </button>
              </div>
            </div>

            <!-- Replies -->
            <div v-if="comment.replies" class="ml-11 mt-4 space-y-4">
              <div
                v-for="reply in comment.replies"
                :key="reply.id"
                class="flex items-start space-x-3"
              >
                <div
                  class="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <span class="text-xs font-semibold text-gray-600">{{
                    reply.author[0]
                  }}</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="font-medium text-sm">{{ reply.author }}</span>
                    <span class="text-xs text-gray-500">2024.01.20 15:10</span>
                  </div>
                  <p class="text-gray-700 text-sm">{{ reply.content }}</p>
                </div>
              </div>
            </div>

            <hr v-if="comment !== comments[comments.length - 1]" class="mt-6" />
          </div>
        </div>

        <!-- Comment Form -->
        <hr class="my-6" />
        <div class="flex items-start space-x-3">
          <div
            class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
          >
            <span class="text-sm font-semibold text-gray-600">나</span>
          </div>
          <div class="flex-1">
            <textarea
              v-model="newComment"
              placeholder="댓글을 입력하세요..."
              class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
            <div class="flex justify-end mt-2">
              <button
                @click="addComment"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                댓글 작성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  HeartIcon,
  Share2Icon,
  FlagIcon,
  MessageCircleIcon,
} from 'lucide-vue-next';

const newComment = ref('');

const post = ref({
  id: 1,
  title: '파리 5박 6일 유럽 여행 동행 구해요!',
  location: '프랑스 파리',
  date: '2024.03.15-20',
  participants: '2/4명',
  gender: '성별무관',
  content: `안녕하세요! 파리 5박 6일 여행을 함께할 동행을 찾고 있습니다.

**여행 일정:**
- 1일차: 인천공항 출발 → 샤를 드 골 공항 도착 → 호텔 체크인 → 샹젤리제 거리 산책
- 2일차: 에펠탑 → 센 강 유람선 → 루브르 박물관 → 튈르리 정원
- 3일차: 몽마르트 언덕 → 사크레 쾨르 성당 → 물랑루즈 (선택사항)
- 4일차: 베르사유 궁전 당일치기 → 저녁 현지 레스토랑
- 5일차: 마레 지구 → 노트르담 대성당 → 라틴 지구 → 쇼핑
- 6일차: 호텔 체크아웃 → 공항 출발

**예상 비용:**
- 항공료: 약 80-120만원 (개별 예약)
- 숙박: 1박당 약 15만원 (에어비앤비 쉐어)
- 교통비: 약 10만원 (메트로 주간권)
- 식비 및 관광: 개별 부담 (1일 약 8-10만원)

**찾는 동행:**
- 20-30대 남녀 성별무관
- 기본적인 영어 소통 가능하신 분
- 유럽 여행 경험 있으시면 더욱 좋아요
- 새벽 일찍 일어나는 것을 좋아하시는 분 (관광지 사람 적을 때 방문)
- 현지 문화를 존중하고 매너있으신 분

**추가 정보:**
- 항공편은 개별 예약이지만 같은 편으로 맞춰서 예약 예정
- 여행자 보험 가입 필수
- 유럽 여행 경험이 있어서 기본적인 가이드 가능합니다

궁금한 점이 있으시면 댓글로 문의해주세요!`,
  author: {
    name: '유럽여행러',
    rating: 4.8,
    tripCount: 15,
  },
  views: 256,
  likes: 34,
  image: '/placeholder.svg?height=400&width=600',
  mapLocation: {
    lat: 48.8566,
    lng: 2.3522,
    address: '프랑스 파리',
  },
});

const comments = ref([
  {
    id: 1,
    author: '여행초보',
    content:
      '안녕하세요! 유럽 여행이 처음인데 괜찮을까요? 그리고 비자는 어떻게 준비하셨나요?',
    createdAt: '2024-01-20T14:20:00',
    replies: [
      {
        id: 2,
        author: '유럽여행러',
        content:
          '안녕하세요! 처음이셔도 전혀 문제없어요. 프랑스는 무비자로 90일까지 체류 가능하니 여권만 있으면 됩니다!',
        createdAt: '2024-01-20T15:10:00',
      },
    ],
  },
  {
    id: 3,
    author: '파리지앵',
    content:
      '일정이 알차네요! 혹시 현지에서 사용할 유심이나 와이파이는 어떻게 준비하실 예정인가요?',
    createdAt: '2024-01-20T16:45:00',
  },
]);

const addComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({
      id: comments.value.length + 1,
      author: '나',
      content: newComment.value,
      createdAt: new Date().toISOString(),
    });
    newComment.value = '';
  }
};
</script>
