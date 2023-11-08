interface PokemonAttack {
    void execute();
}

class Pikachu implements PokemonAttack {
    public void execute() {
        electricAttack();
    }

    private void electricAttack() {
        System.out.println("Pikachu usa Ataque Eléctrico!");
    }
}

class PokemonTrainer {
    private PokemonAttack attackStrategy;

    public PokemonTrainer(PokemonAttack attackStrategy) {
        this.attackStrategy = attackStrategy;
    }

    void commandToAttack() {
        attackStrategy.execute();
    }
}

// [ ] Crea una nueva clase Charmander que implemente PokemonAttack y modifica el entrenador para usarla.
class Charmander implements PokemonAttack {
    public void execute() {
        fireAttack();
    }

    private void fireAttack() {
        System.out.println("Charmander usa Ataque de Fuego!");
    }
}

// [ ] Piensa en cómo podrías usar el DIP para manejar múltiples tipos de ataques o estrategias de batalla para los Pokémon.

class Main {
    public static void main(String[] args){
        Pikachu pikachu = new Pikachu();
        Charmander charm = new Charmander();

        PokemonTrainer trainer = new PokemonTrainer(charm);
        trainer.commandToAttack();
    }
}