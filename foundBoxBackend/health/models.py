from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class FinancialData(models.Model):
    title = models.CharField(max_length=200)
    income = models.DecimalField(max_digits=12, decimal_places=2)
    expenses = models.DecimalField(max_digits=12, decimal_places=2)
    debts = models.DecimalField(max_digits=12, decimal_places=2)
    assets = models.DecimalField(max_digits=12, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title.title()
