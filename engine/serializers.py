from rest_framework import serializers

from engine.tictactoe import Board


class CharListField(serializers.ListField):
    child = serializers.CharField(max_length=1, allow_blank=True, allow_null=True)

class BoardSerializer(serializers.Serializer):
    squares = CharListField()
    next_player = serializers.CharField(max_length=1)

    def create(self, validated_data):
        return Board(**validated_data)

    def update(self, instance, validated_data):
        instance.squares = validated_data.get('squares', instance.squares)
        instance.next_player = validated_data.get('next_player', instance.next_player)
        return instance

    def validate_squares(self, value):
        if len(value) != 9:
            msg = "Incorrect number of squares! Found {} should be 9".format(len(value))
            raise serializers.ValidationError(msg)
        valid_chars = ['X', 'O', '', None]
        for c in value:
            if c not in valid_chars:
                msg = "Invalid board character: {}".format(c)
                raise serializers.ValidationError(msg)
        return value