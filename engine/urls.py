from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from engine import views

urlpatterns = [
    url(r'^engine/$', views.PlayTicTacToe.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)