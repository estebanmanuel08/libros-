from django.db.models import Q
from .models import Libros
from model_utils import Choices

ORDER_COLUMN_CHOICES = Choices(
    ('0', 'id'),
    ('1', 'titulo'),
    ('2', 'autor'),
    ('3', 'fecha_publicacion'),
    ('4', 'paginas'),
)

def query_libros_by_args(**kwargs):
    draw = int(kwargs.get('draw', None)[0])
    length = int(kwargs.get('length', None)[0])
    start = int(kwargs.get('start', None)[0])
    search_value = kwargs.get('search[value]', None)[0]
    order_column = kwargs.get('order[0][column]', None)[0]
    order = kwargs.get('order[0][dir]', None)[0]

    order_column = ORDER_COLUMN_CHOICES[order_column]
    # django orm '-' -> desc
    if order == 'desc':
        order_column = '-' + order_column

    queryset = Libros.objects.all()
    total = queryset.count()

    if search_value:
        queryset = queryset.filter(Q(id__icontains=search_value) |
                                   Q(titulo__icontains=search_value) |
                                   Q(autor__icontains=search_value) |
                                   Q(fecha_publicacion__icontains=search_value) |
                                   Q(paginas__icontains=search_value))

    count = queryset.count()

    if length == -1:
        queryset = queryset.order_by(order_column)
    else:
        queryset = queryset.order_by(order_column)[start: start + length]

    return {
        'items': queryset,
        'count': count,
        'total': total,
        'draw': draw
    }
