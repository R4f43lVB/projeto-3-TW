from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from .models import Prices, Game 
from .serializers import GameSerializer, PriceSerializer
import http.client
import json

@api_view(['GET', 'PUT', 'POST'])
def api_Game(request, game_id):
    existe = True
    try:
        game = Game.objects.get(api_id=game_id)
        existe = True
    except Game.DoesNotExist: 
        existe = False
        
        
    if request.method ==  "POST":
        if existe:
            game = Game.objects.get(api_id=game_id)
            new_gameData = request.data
            game.name = new_gameData["name"]
            game.descricao = new_gameData["descricao"]
            game.colecao = new_gameData["colecao"]
            game.wishList = new_gameData["wishList"]
            game.api_id = new_gameData["api_id"]
            game.img = new_gameData["img"]
            game.save()
        else:
            new_gameData = request.data
            name = new_gameData["name"]
            descricao = new_gameData["descricao"]
            colecao = new_gameData["colecao"]
            wishList = new_gameData["wishList"]
            api_id = new_gameData["api_id"]
            im =new_gameData["img"]
            im = im[8:]
            img = "1234567"+im
            game = Game(name=name, descricao=descricao, colecao=colecao, wishList=wishList, api_id=api_id,img=img)
            game.save()
    if existe == False:
        resp = id_finder(int(game_id))
        return Response(resp)
    serialized_note = GameSerializer(game)
    return Response(serialized_note.data)

@api_view(['GET'])
def api_Search(request, gameTitle):
    conn = http.client.HTTPSConnection("games-details.p.rapidapi.com")

    headers = {
        'x-rapidapi-key': "82abd301b8msh7a02849ad69555dp1cc40djsn5cf9e9c0589c",
        'x-rapidapi-host': "games-details.p.rapidapi.com"
    }

    conn.request("GET", f"/search?sugg={gameTitle}", headers=headers)

    res = conn.getresponse()
    data = res.read()
    data = data.decode("utf-8")
    data = json.loads(data)
    return Response(data["data"])
    
@api_view(['GET', 'PUT'])
def api_Colecao(request):
    games = Game.objects.filter(colecao=True)
    serialized_games = GameSerializer(games, many=True)
    return Response(serialized_games.data)

@api_view(['GET', 'PUT'])
def api_WishList(request):
    games = Game.objects.filter(wishList=True)
    serialized_games = GameSerializer(games, many=True)
    return Response(serialized_games.data)

@api_view(['GET', 'PUT'])
def api_suggestion(request,api_id):
    conn = http.client.HTTPSConnection("games-details.p.rapidapi.com")

    headers = {
        'x-rapidapi-key': "82abd301b8msh7a02849ad69555dp1cc40djsn5cf9e9c0589c",
        'x-rapidapi-host': "games-details.p.rapidapi.com"
    }

    conn.request("GET", f"/similargame/{api_id}", headers=headers)

    res = conn.getresponse()
    data = res.read()

    data = data.decode("utf-8")
    data = json.loads(data)
    return Response(data)
@api_view(['GET', 'POST', 'DELETE'])
def api_preco(request, api_id):
    resp = id_finder(api_id)
    nome = resp["name"]
    game_id = resp["api_id"]
    precos = resp["price"]
    preco=[]
    for item in precos:
        preco.append({"name":nome, "price":item["originalPrice"],"discount":item["discount"], "discountedPrice":item["discountPrice"], "game_id":game_id, "existe":"nop"})
        # preco = {"name":resp["name"], "price":resp["price"], "game_id":resp["api_id"]}
        return Response(preco)
    # if request.method=="DELETE":
    #     if existe==True:
    #         preco = Prices.objects.filter(game_id=game).delete()
    # preco = Prices.objects.filter(game_id=game)
    # serialized_price = PriceSerializer(preco, many=True)
    # return Response(serialized_price.data)

def id_finder(id):
    conn = http.client.HTTPSConnection("games-details.p.rapidapi.com")

    headers = {
        'x-rapidapi-key': "82abd301b8msh7a02849ad69555dp1cc40djsn5cf9e9c0589c",
        'x-rapidapi-host': "games-details.p.rapidapi.com"
    }

    conn.request("GET", f"/gameinfo/single_game/{id}", headers=headers)

    res = conn.getresponse()
    data = res.read()

    data = data.decode("utf-8")
    data = json.loads(data)
    data = data["data"]
    name = data["name"]
    descricao = data["desc"]
    imgs = data["media"]
    imgs = imgs["screenshot"]
    img = imgs[0]
    pricing = data["pricing"]
    return {"name":name,"descricao":descricao, "img":img, "api_id":id, "price":pricing, "colecao": False, "wishList": False}
    # return data
