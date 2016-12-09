from random import sample

class Board(object):
    """Tic Tac Toe board and game logic"""

    def __init__(self, squares, next_player):
        self.squares = squares
        self.next_player = next_player

    def prev_player(self):
        """Get player from the previous turn"""
        return 'X' if self.next_player == 'O' else 'O'

    def empty(self):
        """List the remaining empty squares"""
        return [i for i,val in enumerate(self.squares) if not val]

    def winning_seq(self, indices):
        """Utility to provide winning square sequences"""
        j = indices[0]
        results = [self.squares[i] == self.squares[j] for i in indices[1:]]
        return self.squares[j] and False not in results

    def winner(self):
        """Determine if this board state has a winner"""
        # Check rows
        for i in [0,3,6]:
            if self.winning_seq([i,i+1,i+2]):
                return self.prev_player()
        # Check cols
        for i in [0,1,2]:
            if self.winning_seq([i,i+3,i+6]):
                return self.prev_player()
        # Check diagonals
        if self.winning_seq([0,4,8]):
            return self.prev_player()
        if self.winning_seq([2,4,6]):
            return self.prev_player()

        return None

    def game_over(self):
        """Is the game over for this board state?"""
        if self.winner() or len(self.empty()) == 0:
            return True
        return False

    def next_boards(self):
        """Produce all available next states of the board"""
        result = []
        if self.game_over():
            return result

        for i in self.empty():
            next_squares = [val for val in self.squares]
            next_squares[i] = self.next_player
            result.append(Board(next_squares, self.prev_player()))

        return result

    def calculate_score(self, depth, player):
        """Calculate a score for this board

        The score for this board gives a ranking of how likely
        this board state is to produce a win for the given player.
        The depth is used to optimize the play at each turn, a
        quicker win should be preferred over a slower one. If the
        game is over for this board state simply return a score,
        otherwise calculate the 'best' score from all possible 
        future moves: the minimax algorithm.
        """
        score = 0
        if self.game_over():
            w = self.winner()
            if w == player:
                score = 10 - depth
            elif w:
                score = depth - 10
        else:
            scores = [b.calculate_score(depth+1,player) for b in self.next_boards()]
            if self.next_player == player:
                score = max(scores)
            else:
                score = min(scores)

        return score

    def make_move(self):
        """Make the best next move possible from this board state"""
        if not self.game_over():
            best_board = None
            b_max = None
            for b in self.next_boards():
                s = b.calculate_score(1, self.next_player)
                if b_max is None or s > b_max:
                    best_board = b
                    b_max = s

            # Set this board to the best next board
            self.squares = [val for val in best_board.squares]
            self.next_player = best_board.next_player


def random_engine(board):
    """Simple tic tac toe engine plays randomly in empty squares"""
    empty_squares = board.empty()
    if len(empty_squares) > 0:
        board.squares[sample(empty_squares,1)[0]] = board.next_player
        board.next_player = 'X' if board.next_player == 'O' else 'O'

