import java.util.*;
// [ ] Modelar una Clase Base de Teleférico: Crea una clase abstracta que represente las funcionalidades comunes de una línea de teleférico, como iniciar el recorrido, detenerse en estaciones y finalizar el recorrido.
abstract class Teleferico {
    String name;
    public void startTravel(){
        System.out.println("Iniciando recorrido > Linea " + name);
    }

    abstract List<String> getStations();

    public void stopTravel(){
        System.out.println("Deteniendo recorrido > Linea " + name);
    }
}

// [ ] Implementar Clases Específicas de Línea: Diseña clases que hereden de la clase base del teleférico y que representen líneas específicas del teleférico de La Paz (por ejemplo, la Línea Roja, la Línea Azul, etc.). Cada una debe ser capaz de operar de forma independiente siguiendo un itinerario específico.
class LineaRoja extends Teleferico {
    public LineaRoja(){
        super();
        this.name = "Roja";
    }

    public List<String> getStations(){
        return List.of("16 de julio", "Cementerio", "Estacion Central");
    }
}

class LineaAmarilla extends Teleferico {
    public LineaAmarilla(){
        super();
        this.name = "Amarilla";
    }

    public List<String> getStations(){
        return List.of("Satelite", "Buenos Aires", "Sopocachi", "Curva de Holguin");
    }
}

// [ ] Asegurar la Extensibilidad: Debe ser posible añadir nuevas líneas al sistema (como la futura Línea Dorada) creando una nueva clase que herede de la clase base sin modificar las clases existentes.
class LineaDorada extends Teleferico {
    public LineaDorada(){
        super();
        this.name = "Dorada";
    }

    public List<String> getStations(){
        return List.of("Estacion 1", "Estacion 2", "Estacion 3", "Estacion 4", "Estacion 5", "Estacion 6");
    }
}

// [ ] Demostración a Través de Simulación: Escribe un programa de simulación (main método) que cree instancias de varias líneas de teleférico y las ponga en funcionamiento. La simulación debe demostrar que puedes añadir una nueva línea al sistema sin cambiar el código de las líneas existentes.

class Main {
    public static void main(String[] args){
        Teleferico rojo = new LineaRoja();
        Teleferico amarillo = new LineaAmarilla();
        Teleferico dorado = new LineaDorada();

        List<Teleferico> redTelefericos = List.of(rojo, amarillo, dorado);

        for(Teleferico tlf : redTelefericos){
            System.out.println("*****************************");
            tlf.startTravel();
            System.out.println("Estaciones: " + tlf.getStations());
            tlf.stopTravel();
        }
    }
}