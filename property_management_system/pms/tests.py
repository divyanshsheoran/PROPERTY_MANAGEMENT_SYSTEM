from django.test import TestCase
from django.contrib.auth.models import User
from .models import Profile, Tenant, Owner, Admin, Property, Booking
from django.utils import timezone
from datetime import date, timedelta
import os

class ProfileModelTest(TestCase):
    def test_profile_creation(self):
        test_password = os.environ.get('TEST_USER_PASSWORD', 'defaultTestPass123')
        user = User.objects.create_user(username='testuser', password=test_password)
        profile = Profile.objects.create(user=user, role='tenant')
        self.assertEqual(profile.role, 'tenant')
        self.assertEqual(str(profile), 'testuser (tenant)')

class TenantModelTest(TestCase):
    def test_tenant_str(self):
        tenant = Tenant.objects.create(
            name="John Doe",
            email="john@example.com",
            phone="1234567890",
            rent_amount=1000.00,
            lease_start_date=date.today(),
            lease_end_date=date.today() + timedelta(days=365)
        )
        self.assertEqual(str(tenant), "John Doe")

class OwnerModelTest(TestCase):
    def test_owner_str(self):
        owner = Owner.objects.create(
            name="Jane Smith",
            email="jane@example.com",
            phone="9876543210",
            property_name="Dream House",
            property_address="123 Elm Street"
        )
        self.assertEqual(str(owner), "Jane Smith")

class AdminModelTest(TestCase):
    def test_admin_str(self):
        admin = Admin.objects.create(
            name="Super Admin",
            email="admin@example.com",
            phone="1112223333"
        )
        self.assertEqual(str(admin), "Super Admin")

class PropertyModelTest(TestCase):
    def setUp(self):
        self.owner_user = User.objects.create_user(username='owneruser', password='password')

    def test_property_str(self):
        prop = Property.objects.create(
            owner=self.owner_user,
            name="Sunny Villa",
            address="456 Beach Drive",
            price=2000.00,
            description="Sea facing villa",
            is_available=True
        )
        self.assertEqual(str(prop), "Sunny Villa")

class BookingModelTest(TestCase):
    def setUp(self):
        self.tenant_user = User.objects.create_user(username='tenantuser', password='password')
        self.owner_user = User.objects.create_user(username='owneruser', password='password')
        self.property = Property.objects.create(
            owner=self.owner_user,
            name="Hilltop Home",
            address="789 Hill Street",
            price=1200.00,
            description="Mountain view home",
            is_available=True
        )

    def test_booking_str(self):
        booking = Booking.objects.create(
            tenant=self.tenant_user,
            property=self.property,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=7),
            status='pending'
        )
        self.assertEqual(str(booking), f"{self.tenant_user.username} - {self.property.name}")
