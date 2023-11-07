// Requerimientos
// - Interfaz MovieProjector: Debe contener métodos relacionados con la proyección de películas, como startProjection(), stopProjection() y checkProjectorStatus().
interface MovieProjector {
    void startProjection();
    void stopProjection();
    void checkProjectorStatus();
}

// - Interfaz TicketSeller: Debe contener métodos para la venta de boletos, como sellTicket(), refundTicket() y checkTicketAvailability().
interface TicketSeller{
    void sellTicket();
    void refundTicket();
    void checkTicketAvailability();
}
// - Interfaz ConcessionStandWorker: Debe contener métodos para el personal de la concesión, como serveSnack(), restockItems() y processPayment().
interface ConcessionStandWorker{
    void serveSnack();
    void restockItems();
    void processPayment();
}

// - Define las tres interfaces con los métodos sugeridos.

// - Crea clases específicas para cada tipo de empleado que implementen estas interfaces. Asegúrate de que cada empleado solo tenga acceso a los métodos que necesita para realizar su trabajo.
// operador de proyección, vendedor de boletos, personal de concesión
class ProyectionEmployee implements MovieProjector{
    public void startProjection(){
        System.out.println("Inicia la proyeccion de la pelicula");
    }
    public void stopProjection(){
        System.out.println("Detiene la proyeccion");
    }
    public void checkProjectorStatus(){
        System.out.println("Verificando estado del proyector...");
    }
}

class TicketsEmployee implements TicketSeller{
    public void sellTicket(){
        System.out.println("Vendiendo ticket");
    }
    public void refundTicket(){
        System.out.println("Devolviendo ticket");
    }
    public void checkTicketAvailability(){
        System.out.println("Verificando disponibilidad de tickets");
    }
}

class ConcessionsEmployee implements ConcessionStandWorker{
    public void serveSnack(){
        System.out.println("Sirviendo bocadillos");
    }
    public void restockItems(){
        System.out.println("Rellenando stock");
    }
    public void processPayment(){
        System.out.println("Ejecutando proceso de pago");
    }
}

class Main {
    public static void main(String[] args){
        MovieProjector pe = new ProyectionEmployee();
        pe.checkProjectorStatus();
        pe.startProjection();
        pe.stopProjection();

        TicketSeller ts = new TicketsEmployee();
        ts.checkTicketAvailability();
        ts.sellTicket();
        ts.refundTicket();

        ConcessionStandWorker ce = new ConcessionsEmployee();
        ce.restockItems();
        ce.serveSnack();
        ce.processPayment();
    }
}