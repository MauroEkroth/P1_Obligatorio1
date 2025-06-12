class Sistema {
    constructor() {
        this.clientes = [];
        this.paseadores = [];
        this.contrataciones = [];
        cargarDatosIniciales();
    }

    cargarDatosIniciales() {
        //Clientes
        this.clientes.push(new Cliente("Pablo Ramirez", "Qwer1234@!", "Max", "Mediano", null));
        this.clientes.push(new Cliente("Miriam Ramirez", "Qwer1234@!", "Luna", "Chico", null));
        this.clientes.push(new Cliente("Daniel Gutierrez", "Qwer1234@!", "Rocky", "Grande", null));
        this.clientes.push(new Cliente("Maria Sanchez", "Qwer1234@!", "Canela", "Mediano", null));
        this.clientes.push(new Cliente("Celia Fernandez", "Qwer1234@!", "Toby", "Chico", null));
        this.clientes.push(new Cliente("Oscar Castillo", "Qwer1234@!", "Nala", "Grande", null));
        this.clientes.push(new Cliente("Joaquin Duran", "Qwer1234@!", "Thor", "Grande", null));
        this.clientes.push(new Cliente("Ana Castro", "Qwer1234@!", "Pelusa", "Chico", null));
        this.clientes.push(new Cliente("Verónica Rojas", "Qwer1234@!", "Simba", "Mediano", null));
        this.clientes.push(new Cliente("Juan Fuentes", "Qwer1234@!", "Bella", "Chico", null));
        this.clientes.push(new Cliente("Enrique Reyes", "Qwer1234@!", "Bruno", "Grande", null));
        this.clientes.push(new Cliente("Yolanda Perez", "Qwer1234@!", "Kira", "Mediano", null));
        this.clientes.push(new Cliente("Sofía Gil", "Qwer1234@!", "Zeus", "Grande", null));
        this.clientes.push(new Cliente("Ramon Flores", "Qwer1234@!", "Lola", "Chico", null));
        this.clientes.push(new Cliente("Margarita Castillo", "Qwer1234@!", "Coco", "Mediano", null));
        this.clientes.push(new Cliente("Irene Rubio", "Qwer1234@!", "Sasha", "Chico", null));
        this.clientes.push(new Cliente("Domingo Garcia", "Qwer1234@!", "Duke", "Grande", null));
        this.clientes.push(new Cliente("Manuela Leon", "Qwer1234@!", "Maya", "Mediano", null));
        this.clientes.push(new Cliente("Manuel Leon", "Qwer1234@!", "Rex", "Grande", null));
        this.clientes.push(new Cliente("Pablo Torres", "Qwer1234@!", "Andrew", "Chico", null));
        //Paseadores
        this.paseadores.push(new Paseador(1, "Luis Herrera", "luis.herrera", "Qwer1234@!", 47));
        this.paseadores.push(new Paseador(2, "Carla Morales", "carla.morales", "Qwer1234@!", 38));
        this.paseadores.push(new Paseador(3, "Andrés Vargas", "andres.vargas", "Qwer1234@!", 44));
        this.paseadores.push(new Paseador(4, "Patricia Ruiz", "patricia.ruiz", "Qwer1234@!", 31));
        this.paseadores.push(new Paseador(5, "Fernando Soto", "fernando.soto", "Qwer1234@!", 50));
        this.paseadores.push(new Paseador(6, "Gabriela Medina", "gabriela.medina", "Qwer1234@!", 29));
        this.paseadores.push(new Paseador(7, "Iván Delgado", "ivan.delgado", "Qwer1234@!", 36));
        this.paseadores.push(new Paseador(8, "Lucía Navarro", "lucia.navarro", "Qwer1234@!", 3));
        this.paseadores.push(new Paseador(9, "Raúl Peña", "raul.pena", "Qwer1234@!", 3));
        this.paseadores.push(new Paseador(10, "Elena Cabrera", "elena.cabrera", "Qwer1234@!", 1));
        //Contrataciones
        this.contrataciones.push(new Contratacion(1, "Pablo Ramirez", 1));
        this.contrataciones.push(new Contratacion(2, "Miriam Ramirez", 2));
        this.contrataciones.push(new Contratacion(3, "Daniel Gutierrez", 3));
        this.contrataciones.push(new Contratacion(4, "Maria Sanchez", 4));
        this.contrataciones.push(new Contratacion(5, "Celia Fernandez", 5));
        this.contrataciones.push(new Contratacion(6, "Oscar Castillo", 6));
        this.contrataciones.push(new Contratacion(7, "Joaquin Duran", 7));
        this.contrataciones.push(new Contratacion(8, "Ana Castro", 8));
        this.contrataciones.push(new Contratacion(9, "Verónica Rojas", 9));
        this.contrataciones.push(new Contratacion(10, "Juan Fuentes", 10));
    }
}