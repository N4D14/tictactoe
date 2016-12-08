from random import sample

class Board(object):
    def __init__(self, squares, next_player):
        self.squares = squares
        self.next_player = next_player

    def empty(self):
        return [i for i,val in enumerate(self.squares) if not val]

def random_engine(board):
    empty_squares = board.empty()
    if len(empty_squares) > 0:
        board.squares[sample(empty_squares,1)[0]] = board.next_player
        board.next_player = 'X' if board.next_player == 'O' else 'O'
