// [ ] Identifica la lógica común entre las diferentes clases de productos.

// [ ] Crea un método común o una superclase para encapsular la lógica de cálculo de stock.

// [ ] Asegúrate de que todas las clases de productos utilicen esta nueva estructura sin duplicar el código.

// [ ] El refactor debe permitir la fácil adición de nuevos tipos de productos sin necesidad de reimplementar la lógica de venta.

// [ ] Escribe un pequeño comentario en tu código para explicar cómo aplicaste el principio DRY.

class Product {
    protected int stock;
    protected String name;

    public Product(String name, int stock) {
        this.name = name;
        this.stock = stock;
    }

    public void sell(int quantity) {
        if (stock >= quantity) {
            stock -= quantity;
            System.out.println(name + "> Vendido. Stock actualizado: " + stock);
        } else {
            System.out.println(name + "> Stock insuficiente.");
        }
    }    
}

class Book extends Product {
    public Book(int stock){
        super("Libro", stock);
    }
}

class Game extends Product {
    public Game(int stock){
        super("Juego", stock);
    }
}

class Pencil extends Product {
    public Pencil(int stock){
        super("Lapiz", stock);
    }
}

// Para cumplir con el principio DRY, cree un a superclase Product que contiene toda la lógica para vender el producto, la cual se comparte en todas las subclases, mientras que estas solo cambian el nombre del producto, evitando asi la repeticion de codigo