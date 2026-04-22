package game;

import java.util.Arrays;

public class GameState {
    private final Cell[] cells;
    private final String instructions;

    private GameState(Cell[] cells, String instructions) {
        this.cells = cells;
        this.instructions = instructions;
    }

    public static GameState forGame(Game game) {
        Cell[] cells = getCells(game);
        String instructions;
        Player winner = game.getWinner();
        
        if (winner != null) {
            instructions = (winner == Player.PLAYER0 ? "X" : "O") + " яллаа!";
        } else {
            instructions = (game.getPlayer() == Player.PLAYER0 ? "X" : "O") + "-ийн ээлж";
        }
        return new GameState(cells, instructions);
    }

    @Override
    public String toString() {
        return "{ \"cells\": %s, \"instructions\": \"%s\" }".formatted(Arrays.toString(this.cells), this.instructions);
    }

    private static Cell[] getCells(Game game) {
        Cell cells[] = new Cell[9];
        Board board = game.getBoard();
        for (int x = 0; x <= 2; x++) {
            for (int y = 0; y <= 2; y++) {
                String text = "";
                boolean playable = false;
                Player player = board.getCell(x, y);
                if (player == Player.PLAYER0) text = "X";
                else if (player == Player.PLAYER1) text = "O";
                else if (player == null && game.getWinner() == null) playable = true;
                cells[3 * y + x] = new Cell(x, y, text, playable);
            }
        }
        return cells;
    }
}