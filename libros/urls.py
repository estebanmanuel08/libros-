from django.urls import path, include


from rest_framework.routers import DefaultRouter


from libros.views import index, librosViewSet


router = DefaultRouter()
router.register(r'libros', librosViewSet, basename='libros')


urlpatterns = [
    path('', index, name='index'),
    path('api/', include(router.urls)),
]
