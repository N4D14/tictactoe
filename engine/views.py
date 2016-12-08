from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from engine.serializers import BoardSerializer
from engine.tictactoe import random_engine

# Create your views here.
class PlayTicTacToe(APIView):
    """
    Get an updated game configuration.
    """
    def post(self, request, format=None):
        print('Here in engine endpoint!!!')
        print(request.data)
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
            board = serializer.save()
            # Modify the board with the new play
            random_engine(board)
            # Serialize the updated board and return it in the response
            output = BoardSerializer(board)
            return Response(output.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)