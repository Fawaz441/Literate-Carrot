from rest_framework.serializers import ModelSerializer,SerializerMethodField
from .models import Book, Author, Coupon, Order, OrderedBook

class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ('name','image')


class BookSerializer(ModelSerializer):
    author = SerializerMethodField()
    class Meta:
        model = Book
        fields = ('id','title','price','discount_price','author','image')

    def get_author(self,obj):
        return obj.author