from django.test import TestCase
from engine.tictactoe import Board

class TicTacToeTestCase(TestCase):
    """Test Tic Tac Toe cases"""
    
    def test_stop_x(self):
        """Stop X from winning"""
        test_squares = ['X',None,'O',None,'X',None,None,None,None]
        b = Board(test_squares, 'O')

        expected_squares = ['X',None,'O',None,'X',None,None,None,'O']
        print(b.squares)
        b.make_move()
        print(b.squares)
        self.assertEqual(b.squares, expected_squares)

    def test_stop_o(self):
        """Stop O from winning"""
        test_squares = ['O',None,'X','X',None,None,'X','O','O']
        b = Board(test_squares, 'X')

        expected_squares = ['O',None,'X','X','X',None,'X','O','O']
        print(b.squares)
        b.make_move()
        print(b.squares)
        self.assertEqual(b.squares, expected_squares)

    def test_middle(self):
        """Stop O from winning"""
        test_squares = [None,None,None,None,'X',None,None,None,None]
        b = Board(test_squares, 'O')

        print(b.squares)
        b.make_move()
        print(b.squares)

    def test_corner(self):
        """Stop X from winning"""
        test_squares = ['X',None,None,None,'O','X',None,None,None]
        b = Board(test_squares, 'O')

        print(b.squares)
        b.make_move()
        print(b.squares)

    def test_fatalistic(self):
        """Stop X from winning"""
        test_squares = [None,'X',None,None,None,'X','O','O','X']
        b = Board(test_squares, 'O')

        expected_squares = [None,'X','O',None,None,'X','O','O','X']
        print(b.squares)
        b.make_move()
        print(b.squares)
        self.assertEqual(b.squares, expected_squares)
