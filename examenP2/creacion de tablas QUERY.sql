CREATE TABLE Autores(
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL
);

INSERT INTO Autores (nombre, apellido, fechaNacimiento) VALUES 
('Gabriel', 'García Márquez', '1927-03-06'),
('J.K.', 'Rowling', '1965-07-31'),
('George', 'Orwell', '1903-06-25'),
('Jane', 'Austen', '1775-12-16'),
('Mark', 'Twain', '1835-11-30');

SELECT * FROM Autores

CREATE TABLE Libros(
    id INT IDENTITY(1,1) PRIMARY KEY,
    autorID INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    fechaPublicacion DATE NOT NULL,
    precio MONEY NOT NULL,
    FOREIGN KEY (autorID) REFERENCES Autores(id)
);

INSERT INTO Libros (autorID, titulo, fechaPublicacion, precio) VALUES 
(1, 'Cien años de soledad', '1967-05-30', 350),
(1, 'El amor en los tiempos del cólera', '1985-09-05', 620),
(2, 'Harry Potter y la piedra filosofal', '1997-06-26', 840),
(2, 'Harry Potter y la cámara secreta', '1998-07-02', 700),
(3, '1984', '1949-06-08', 520),
(3, 'Rebelión en la granja', '1945-08-17', 350),
(4, 'Orgullo y prejuicio', '1813-01-28', 650),
(4, 'Sentido y sensibilidad', '1811-10-30', 700),
(5, 'Las aventuras de Tom Sawyer', '1876-06-15', 280),
(5, 'Las aventuras de Huckleberry Finn', '1884-12-10', 380);

SELECT * FROM Libros