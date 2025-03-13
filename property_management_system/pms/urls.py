from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, OwnerViewSet, AdminViewSet
from pms.views import LoginView 
from .views import RegisterView
from .views import ProfileView, PropertyViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'tenants', TenantViewSet)
router.register(r'owners', OwnerViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
]