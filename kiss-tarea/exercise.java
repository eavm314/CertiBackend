// [ ] Analiza el código proporcionado y haz una lista de todas las complejidades innecesarias que encuentres.

// - Utiliza un monton de ifs anidados para hacer validaciones, lo que provoca que el codigo tenga muchos niveles de indentacion y sea más complicado de entender
// - Realiza un bucle for para verificar si el curso ya se encuentra en la lista de cursos del estudiante en lugar de utilizar un metodo contains()
// - El flujo en general es muy confuso para entender lo que hace el metodo

// [ ] Diseña una solución simplificada que elimine la complejidad innecesaria pero mantenga la funcionalidad.

// - Primero se deberian realizar las validaciones que devuelven false, y luego la logica principal

// [ ] Refactoriza el código implementando tu diseño simplificado.

class StudentRegistrationSystem {
    
    List<Course> availableCourses = new ArrayList<>();

    boolean registerStudent(Student student, Course course) {
        // Datos nulos
        if (student == null || course == null) {
            throw new IllegalArgumentException("Estudiante o curso no pueden ser nulos");
        }

        // Curso no disponible
        if (!availableCourses.contains(course)) {
            return false;
        }

        // El estudiante ya está registrado en el curso
        if (student.getCourses().contains(course)){
            return false;
        }

        // Lógica de registro
        student.getCourses().add(course);
        return true;
    }
}
 
// [ ] Documenta cualquier suposición que hagas durante el proceso de refactorización
// Elimine la lista de estudiantes registrados, ya que al registrarse en un curso e incluirlo en esta lista, un estudiante ya no podría registrarse en otro curso

