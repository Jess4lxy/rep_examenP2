import * as mssql from 'mssql';
import { Autor } from './models/Autor';
import { Libro } from './models/Libro';

// Configuración para la conexión a la base de datos
const dbConfig: mssql.config = {
    user: 'Jessie',
    password: '1234',
    server: 'FAVORITECHILD',
    database: 'examenDBAPP_P2',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Función para conectar a la base de datos
export async function conectarBD(): Promise<mssql.ConnectionPool> {
    try {
        const pool = new mssql.ConnectionPool(dbConfig);
        await pool.connect();
        console.log('Conexión establecida correctamente');
        return pool;
    } catch (error) {
        console.error('Error al intentar conectar:', (error as Error).message);
        throw error;
    }
}

export async function agregarAutor(autor: Autor): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { nombre, apellido, fechaNacimiento } = autor;

    try {
        pool = await conectarBD();

        transaction = new mssql.Transaction(pool);

        await transaction.begin();

        const query = `
            INSERT INTO Autores (nombre, apellido, fechaNacimiento)
            VALUES (@nombre, @apellido, @fechaNacimiento)
        `;
        await transaction.request()
            .input('nombre', mssql.NVarChar, nombre)
            .input('apellido', mssql.NVarChar, apellido)
            .input('fechaNacimiento', mssql.Date, fechaNacimiento)
            .query(query);
        await transaction.commit();
        console.log('Autor agregado correctamente');

    } catch (error) {
        // Si hay algún error, hacer rollback de la transacción
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error al agregar el autor:', (error as Error).message);
        throw error;
    } finally {
        // Cerrar la conexión
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

export async function obtenerAutores(): Promise<Autor[]> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Autores');

        return result.recordset as Autor[];
    } catch (error) {
        console.error('Error al obtener todos los autores:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

export async function buscarAutor(idOrNombre: string): Promise<Autor | null> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('idOrNombre', mssql.NVarChar, idOrNombre)
            .query(`
                SELECT * FROM Autores
                WHERE id = @idOrNombre OR nombre LIKE @idOrNombre
            `);

        if (result.recordset.length > 0) {
            return result.recordset[0] as Autor;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el autor por ID o nombre:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

export async function actualizarAutor(id: number, autor: Autor): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { nombre, apellido, fechaNacimiento } = autor;

    try {
        pool = await conectarBD();

        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = `
            UPDATE Autores
            SET nombre = @nombre,
                apellido = @apellido,
                fechaNacimiento = @fechaNacimiento,
            WHERE id = @id
        `;
        await transaction.request()
            .input('nombre', mssql.NVarChar, nombre)
            .input('apellido', mssql.NVarChar, apellido)
            .input('fechaNacimiento', mssql.Date, fechaNacimiento)
            .input('id', mssql.Int, id)
            .query(query);
        await transaction.commit();
        console.log(`Tutor con ID ${id} actualizado correctamente`);

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(`Error al actualizar el tutor con ID ${id}:`, (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

export async function eliminarAutor(id: number): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    try {
        pool = await conectarBD();

        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = `
            DELETE FROM Autores
            WHERE id = @id
        `;
        await transaction.request()
            .input('id', mssql.Int, id)
            .query(query);
        await transaction.commit();
        console.log(`Autor con ID ${id} eliminado correctamente`);

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(`Error al eliminar el autor con ID ${id}:`, (error as Error).message);
        throw error;
    } finally {
        // Cerrar la conexión
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}
export async function agregarLibro(libro: Libro): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { autorID, titulo, fechaPublicacion, precio } = libro;

    try {
        pool = await conectarBD();

        transaction = new mssql.Transaction(pool);

        await transaction.begin();

        const query = `
            INSERT INTO Libros (autorID, titulo, fechaPublicacion, precio)
            VALUES (@autorID, @titulo, @fechaPublicacion, @precio)
        `;
        await transaction.request()
            .input('autorID', mssql.Int, autorID)
            .input('titulo', mssql.NVarChar, titulo)
            .input('fechaPublicacion', mssql.Date, fechaPublicacion)
            .input('precio', mssql.Date, precio)
            .query(query);
        await transaction.commit();
        console.log('Libro agregado correctamente');

    } catch (error) {
        // Si hay algún error, hacer rollback de la transacción
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error al agregar el libro:', (error as Error).message);
        throw error;
    } finally {
        // Cerrar la conexión
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

export async function obtenerLibros(): Promise<Libro[]> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Libros');

        return result.recordset as Libro[];
    } catch (error) {
        console.error('Error al obtener todos los libros:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

export async function buscarLibro(idOrTitulo: string): Promise<Libro | null> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('idOrTitulo', mssql.NVarChar, idOrTitulo)
            .query(`
                SELECT * FROM Libros
                WHERE id = @idOrTitulo OR titulo LIKE @idOrTitulo
            `);

        if (result.recordset.length > 0) {
            return result.recordset[0] as Libro;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el libro por ID o nombre:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

export async function actualizarLibro(id: number, libro: Libro): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { autorID, titulo, fechaPublicacion, precio } = libro;

    try {
        pool = await conectarBD();

        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = `
            UPDATE Libros
            SET autorID = @autorID,
                titulo = @titulo,
                fechaPublicacion = @fechaPublicacion,
                precio = @precio,
            WHERE id = @id
        `;
        await transaction.request()
            .input('autorID', mssql.Int, autorID)
            .input('titulo', mssql.NVarChar, titulo)
            .input('fechaPublicacion', mssql.Date, fechaPublicacion)
            .input('precio', mssql.Date, precio)
            .query(query);
        await transaction.commit();
        console.log(`Libro con ID ${id} actualizado correctamente`);

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(`Error al actualizar el libro con ID ${id}:`, (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

export async function eliminarLibro(id: number): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    try {
        pool = await conectarBD();

        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = `
            DELETE FROM Libros
            WHERE id = @id
        `;
        await transaction.request()
            .input('id', mssql.Int, id)
            .query(query);
        await transaction.commit();
        console.log(`Libro con ID ${id} eliminado correctamente`);

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(`Error al eliminar el libro con ID ${id}:`, (error as Error).message);
        throw error;
    } finally {
        // Cerrar la conexión
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}