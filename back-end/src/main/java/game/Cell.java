package game;

public record Cell(int x, int y, String text, boolean playable) {
    @Override
    public String toString() {
        return String.format("{ \"x\": %d, \"y\": %d, \"text\": \"%s\", \"playable\": %b }", x, y, text, playable);
    }
}