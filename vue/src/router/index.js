import { createRouter as createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

// Import components
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';
import ChangePasswordView from '../views/ChangePasswordView.vue';
import VolunteerView from '../views/VolunteerView.vue';
import BrowsePetsView from '../views/BrowsePetsView.vue';
import PetDetailsView from '../views/PetDetailsView.vue';
import VolunteerAppView from '../views/VolunteerAppView.vue';
import PetFormView from '../views/PetFormView.vue';
import ApproveVolunteersView from '../views/ApproveVolunteersView.vue';
import ApplicationDetailsView from '../views/ApplicationDetailsView.vue';

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/registration/forms',
    name: 'applications',
    component: ApproveVolunteersView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/pets/:id',
    name: 'pet-details',
    component: PetDetailsView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/volunteer',
    name: 'volunteer',
    component: VolunteerView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/pets',
    name: 'pets',
    component: BrowsePetsView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/changepassword',
    name: 'changedpassword',
    component: ChangePasswordView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/volunteer-app',
    name: 'volunteer-app',
    component: VolunteerAppView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/add-new-pet',
    name: 'pet-form',
    component: PetFormView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/registration/forms/:id',
    name: 'application-details',
    component: ApplicationDetailsView,
    meta: {
      requiresAuth: true
    }
  },
];

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to) => {

  // Get the Vuex store
  const store = useStore();

  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    return { name: "login" };
  }
  // Otherwise, do nothing and they'll go to their next destination
});

export default router;
