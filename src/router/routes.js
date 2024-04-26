const routes = [
  // Home
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/home/IndexPage.vue') },
      { path: 'lumine/:photo_number', name: 'showphoto', component: () => import('pages/home/ShowPhoto.vue') },
      { path: 'search/:search', name: 'searchphoto', component: () => import('pages/home/SearchPhoto.vue') },
      {
        path: 'explore',
        children: [
          { path: '', name: 'explore', component: () => import('pages/home/explore/IndexPage.vue') },
          {
            path: 'collections',
            children: [
              { path: '', name: 'collections', component: () => import('pages/home/explore/collection/IndexCollection.vue') },
              { path: ':collection_code', name: 'showcollection', component: () => import('pages/home/explore/collection/ShowCollection.vue') }
            ]
          },
          {
            path: 'categories',
            children: [
              { path: '', name: 'categories', component: () => import('pages/home/explore/category/IndexCategory.vue') },
              { path: ':category_code', name: 'showcategory', component: () => import('pages/home/explore/category/ShowCategory.vue') }
            ]
          },
          {
            path: 'tags',
            children: [
              { path: '', name: 'tags', component: () => import('pages/home/explore/tag/IndexTag.vue') },
              { path: ':name', name: 'showtag', component: () => import('pages/home/explore/tag/ShowTag.vue') }
            ]
          }
        ]
      },
      { path: 'lumine-creation-tool', meta: { requiresAuth: true, roles: ['Admin', 'Member'] }, name: 'creationtool', component: () => import('pages/home/CreationToolPage.vue') },
      {
        path: 'profile/:username',
        component: () => import('layouts/ProfileLayout.vue'),
        children: [
          { path: '', name: 'indexprofile', component: () => import('pages/home/profile/IndexProfile.vue') },
          { path: 'collections', name: 'collectionsprofile', component: () => import('pages/home/profile/CollectionsProfile.vue') },
          { path: 'likes', name: 'likesprofile', component: () => import('pages/home/profile/LikesProfile.vue') }
        ]
      },
      { path: 'setting', meta: { requiresAuth: true, roles: ['Admin', 'Member'] }, name: 'setting', component: () => import('pages/home/profile/SettingProfile.vue') },
      {
        path: '/:catchAll(.*)*',
        name: 'notfound',
        component: () => import('pages/ErrorNotFound.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true, roles: ['Admin'] },
    children: [
      { path: 'home', name: 'dashboardhome', component: () => import('pages/dashboard/IndexDashboard.vue') },
      { path: 'user', name: 'dashboarduser', component: () => import('pages/dashboard/user/IndexUser.vue') },
      { path: 'category', name: 'dashboardcategory', component: () => import('pages/dashboard/category/IndexCategory.vue') },
      { path: 'tag', name: 'dashboardtag', component: () => import('pages/dashboard/tag/IndexTag.vue') },
      { path: 'photo', name: 'dashboardphoto', component: () => import('pages/dashboard/photo/IndexPhoto.vue') },
      { path: 'collection', name: 'dashboardcollection', component: () => import('pages/dashboard/collection/IndexCollection.vue') },
      { path: 'comment', name: 'dashboardcomment', component: () => import('pages/dashboard/comment/IndexComment.vue') },
    ]
  }
]

export default routes
