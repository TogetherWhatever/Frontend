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
            <a href="#" class="text-gray-600 hover:text-blue-600"
              >동행 게시판</a
            >
            <a href="#" class="text-gray-600 hover:text-blue-600">지도</a>
            <a href="#" class="text-gray-600 hover:text-blue-600">내 정보</a>
          </div>
          <div class="flex items-center space-x-4">
            <button
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">동행 모집하기</h1>
        <p class="text-gray-600">함께 여행할 동행을 모집해보세요!</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">기본 정보</h2>
          <div class="space-y-6">
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 mb-1"
                >제목 *</label
              >
              <input
                id="title"
                v-model="formData.title"
                type="text"
                placeholder="동행 모집글 제목을 입력하세요"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                for="location"
                class="block text-sm font-medium text-gray-700 mb-1"
                >여행지 *</label
              >
              <div class="flex space-x-2">
                <input
                  id="location"
                  v-model="formData.location"
                  type="text"
                  placeholder="여행할 도시나 국가를 입력하세요 (예: 프랑스 파리)"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  @click="handleMapClick"
                  class="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <MapPinIcon class="h-4 w-4 mr-2" />
                  지도에서 선택
                </button>
              </div>
              <p v-if="mapLocation" class="text-sm text-gray-600 mt-2">
                선택된 위치: {{ mapLocation.address }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >출발일 *</label
                >
                <input
                  v-model="formData.startDate"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >도착일 *</label
                >
                <input
                  v-model="formData.endDate"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Participant Information -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">모집 조건</h2>
          <div class="space-y-6">
            <div>
              <label
                for="participants"
                class="block text-sm font-medium text-gray-700 mb-1"
                >모집 인원 *</label
              >
              <select
                id="participants"
                v-model="formData.participants"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">모집할 인원 수를 선택하세요</option>
                <option value="1">1명</option>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명 이상</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >성별 조건 *</label
              >
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="formData.gender"
                    type="radio"
                    value="성별무관"
                    class="mr-2"
                    required
                  />
                  성별무관
                </label>
                <label class="flex items-center">
                  <input
                    v-model="formData.gender"
                    type="radio"
                    value="남성만"
                    class="mr-2"
                  />
                  남성만
                </label>
                <label class="flex items-center">
                  <input
                    v-model="formData.gender"
                    type="radio"
                    value="여성만"
                    class="mr-2"
                  />
                  여성만
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-semibold mb-4">상세 내용</h2>
          <div class="space-y-6">
            <div>
              <label
                for="content"
                class="block text-sm font-medium text-gray-700 mb-1"
                >내용 *</label
              >
              <textarea
                id="content"
                v-model="formData.content"
                placeholder="여행 계획, 예상 비용(항공료, 숙박비 등), 찾는 동행의 조건, 언어 소통 수준 등을 자세히 작성해주세요"
                rows="10"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >사진 첨부</label
              >
              <div class="mt-2">
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                />
                <div
                  @click="$refs.fileInput.click()"
                  class="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
                >
                  <div class="text-center">
                    <UploadIcon class="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p class="text-sm text-gray-600">클릭하여 이미지 업로드</p>
                  </div>
                </div>
              </div>

              <div
                v-if="images.length > 0"
                class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
              >
                <div
                  v-for="(image, index) in images"
                  :key="index"
                  class="relative"
                >
                  <img
                    :src="image"
                    :alt="`Upload ${index + 1}`"
                    class="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <XIcon class="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Preview -->
        <div v-if="mapLocation" class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="flex items-center space-x-2 text-lg font-semibold mb-4">
            <MapPinIcon class="h-5 w-5" />
            <span>선택된 위치</span>
          </h3>
          <div
            class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center"
          >
            <div class="text-center">
              <MapPinIcon class="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p class="text-gray-600">지도 미리보기</p>
              <p class="text-sm text-gray-500">{{ mapLocation.address }}</p>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            type="button"
            class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            class="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <UsersIcon class="h-4 w-4 mr-2" />
            동행 모집하기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MapPinIcon, UploadIcon, XIcon, UsersIcon } from 'lucide-vue-next';

const formData = ref({
  title: '',
  location: '',
  startDate: '',
  endDate: '',
  participants: '',
  gender: '',
  content: '',
});

const images = ref([]);
const mapLocation = ref(null);

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files) {
    Array.from(files).forEach((file, index) => {
      const imageUrl = `/placeholder.svg?height=200&width=300&query=travel image ${
        index + 1
      }`;
      images.value.push(imageUrl);
    });
  }
};

const removeImage = (index) => {
  images.value.splice(index, 1);
};

const handleMapClick = () => {
  mapLocation.value = {
    lat: 48.8566,
    lng: 2.3522,
    address: '프랑스 파리',
  };
  formData.value.location = '프랑스 파리';
};

const handleSubmit = () => {
  console.log('Form submitted:', {
    ...formData.value,
    images: images.value,
    mapLocation: mapLocation.value,
  });
  alert('게시글이 등록되었습니다!');
};
</script>
