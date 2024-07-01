from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import librosSerializers 
from .models import libros
from .utils import query_libros_by_args 


def index(request):
    return render(request, 'index.html')


class librosViewSet(viewsets.ModelViewSet):
    queryset = libros.objects.all()
    serializer_class = librosSerializers

    def list(self, request, **kwargs):
        try:
            libros_data = query_libros_by_args(**request.query_params)
            serializer = librosSerializers(libros_data['items'], many=True)
            result = {
                'data': serializer.data,
                'draw': libros_data['draw'],
                'recordsTotal': libros_data['total'],
                'recordsFiltered': libros_data['count']
            }
            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)


