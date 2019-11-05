from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Todo(models.Model):
    name =models.CharField(max_length=20,unique=True)
    isComplete = models.BooleanField(default=False)
    owner = models.ForeignKey(
        User, related_name="todos", on_delete=models.CASCADE, null=True)
    created_at = models.DateField(auto_now_add=True)