from rest_framework import serializers
from .models import Game, Prices


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name', 'descricao',"api_id","img", "colecao", "wishList"]

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prices
        fields = ['id', 'name','discount','discountedPrice', 'price','game_id']