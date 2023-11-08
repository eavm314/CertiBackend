class StudentRegistrationSystem {
    
    List<Student> registeredStudents = new ArrayList<>();
    List<Course> availableCourses = new ArrayList<>();

    boolean registerStudent(Student student, Course course) {
        if (student != null && course != null) {
            if (!registeredStudents.contains(student)) {
                if (availableCourses.contains(course)) {
                    for (Course c : student.getCourses()) {
                        if (c.equals(course)) {
                            // El estudiante ya está registrado en el curso
                            return false;
                        }
                    }
                    // Lógica de registro
                    student.getCourses().add(course);
                    registeredStudents.add(student);
                    return true;
                } else {
                    // Curso no disponible
                    return false;
                }
            } else {
                // El estudiante ya está registrado
                return false;
            }
        } else {
            // Datos nulos
            throw new IllegalArgumentException("Estudiante o curso no pueden ser nulos");
        }
    }
}
