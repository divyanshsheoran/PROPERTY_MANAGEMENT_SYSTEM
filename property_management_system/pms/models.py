from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone  # Import timezone

class Profile(models.Model):
    ROLE_CHOICES = [
        ('tenant', 'Tenant'),
        ('owner', 'Owner'),
        ('admin', 'Admin'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} ({self.role})"

class Tenant(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    lease_start_date = models.DateField()
    lease_end_date = models.DateField()

    def __str__(self):
        return self.name

class Owner(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    property_name = models.CharField(max_length=100)
    property_address = models.TextField()

    def __str__(self):
        return self.name

class Admin(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.name
    
class Property(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    name = models.CharField(max_length=100)
    address = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.CharField(max_length=255, blank=True, null=True)  # Store the image path
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    tenant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    property = models.ForeignKey('Property', on_delete=models.CASCADE, related_name='bookings')
    start_date = models.DateField()
    end_date = models.DateField()
    booking_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ], default='pending')
    payment_status = models.CharField(max_length=10, choices=[
        ('unpaid', 'Unpaid'),
        ('paid', 'Paid'),
    ], default='unpaid')  # New field
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.tenant.username} - {self.property.name}"