from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TenantViewSet, OwnerViewSet, AdminViewSet
from pms.views import LoginView 
from .views import RegisterView, ProfileView, PropertyViewSet, BookingView, confirm_booking
from django.conf.urls.static import static
from django.conf import settings

# ✅ Set up DefaultRouter for consistency
router = DefaultRouter()
router.register(r'tenants', TenantViewSet)
router.register(r'owners', OwnerViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'properties', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # ✅ Authentication Endpoints
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),

    # ✅ Booking Endpoints
    path('bookings/', BookingView.as_view(), name='bookings'),  # Handle creating a booking
    path('bookings/confirm/', confirm_booking, name="confirm-booking"),  # Confirm a booking
    
    # ✅ Property Detail API (Important for fetching property details)
    path('properties/<int:pk>/', PropertyViewSet.as_view({'get': 'retrieve'}), name='property-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
