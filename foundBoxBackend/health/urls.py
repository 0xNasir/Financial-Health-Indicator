from rest_framework.routers import DefaultRouter

from health.views import FinancialDataAPIView, RegisterAPIView

app_name = 'health'
router = DefaultRouter()
router.register('register', RegisterAPIView, basename='register')
router.register('financial_data', FinancialDataAPIView, basename='financial_data')
urlpatterns = router.urls
