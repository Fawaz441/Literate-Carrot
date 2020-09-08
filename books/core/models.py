from django.db import models
from django.utils.text import slugify
from django.conf import settings

class Author(models.Model):
    name = models.CharField(max_length=40)
    image = models.ImageField(null=True,blank=True)
    slug = models.SlugField(null=True,blank=True)

    def __str__(self):
        return self.name

    def save(self,*args,**kwargs):
        self.slug = slugify(self.name)
        super().save(*args,**kwargs)


class Book(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    discount_price = models.FloatField(null=True,blank=True)
    author = models.ForeignKey(Author,on_delete=models.CASCADE,null=True,blank=True)
    image = models.ImageField(null=True,blank=True)
    slug = models.SlugField(null=True,blank=True)


    def save(self,*args,**kwargs):
        self.slug = slugify(self.title)
        super().save(*args,**kwargs)

    def __str__(self):
        return self.title

class OrderedBook(models.Model):
    book = models.ForeignKey(Book,on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def get_total_price(self):
        if self.book.discount_price:
            return self.book.discount_price * self.quantity
        else:
            return self.book.price * self.quantity

    def __str__(self):
        return f"{self.quantity} of {self.book}"



class Coupon(models.Model):
    amount = models.FloatField()
    code = models.CharField(max_length=20)

    def __str__(self):
        return self.code



class Order(models.Model):
    ordered_books = models.ManyToManyField(OrderedBook)
    coupon = models.ForeignKey(Coupon,null=True,blank=True,on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    started_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} on {self.started_date}"

    def total_price(self):
        total = 0
        for ordered_book in ordered_books.all():
            total += ordered_book.get_total_price()
            if self.coupon:
                total-=coupon.amount
        return total
