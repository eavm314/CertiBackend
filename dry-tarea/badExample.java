class Book {
    private int stock;

    public void sell(int quantity) {
        if (stock >= quantity) {
            stock -= quantity;
            System.out.println("Libro vendido. Stock actualizado: " + stock);
        } else {
            System.out.println("Stock insuficiente para libros.");
        }
    }
}

class Game {
    private int stock;

    public void sell(int quantity) {
        if (stock >= quantity) {
            stock -= quantity;
            System.out.println("Juego vendido. Stock actualizado: " + stock);
        } else {
            System.out.println("Stock insuficiente para juegos.");
        }
    }
}
