from django.db import models

# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=200)
    descricao = models.TextField()
    colecao = models.BooleanField(default=False)
    wishList = models.BooleanField(default=False)
    api_id = models.IntegerField()
    img = models.ImageField(upload_to="./imgs_dados/")
    def __str__(self):
        return f"{self.id}:{self.name}"
    
class Prices(models.Model):
    name = models.CharField(max_length=200)
    discount = models.CharField(max_length=200)
    discountedPrice = models.CharField(max_length=200)
    price = models.CharField(max_length=200)
    game_id = models.ForeignKey(Game, null=True, on_delete=models.CASCADE)
    