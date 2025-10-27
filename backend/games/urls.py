from django.urls import path

from . import views

urlpatterns = [
    path('game/<int:game_id>/', views.api_Game),
    path('game/search/<str:gameTitle>/', views.api_Search),
    path('game/colecao',views.api_Colecao),
    path('game/WishList', views.api_WishList),
    path('game/similar/<int:api_id>', views.api_suggestion),
    path('price/<int:api_id>/', views.api_preco)
]