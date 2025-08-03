import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// 각 페이지 컴포넌트 import
import BoardPage from '../pages/BoardPage.vue';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import PostDetailPage from '../pages/PostDetailPage.vue';
import WritePage from '../pages/WritePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/board',
      name: 'board',
      component: BoardPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/post/:id',
      name: 'post-detail',
      component: PostDetailPage,
      props: true,
    },
    {
      path: '/write',
      name: 'write',
      component: WritePage,
    },
  ],
});

export default router;
