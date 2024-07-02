import { Request, Response } from 'express';
import { agregarAutor, obtenerAutores, buscarAutor, actualizarAutor, eliminarAutor } from '../db';
import { Autor } from '../models/Autor';

export async function agregarAutorController(req: Request, res: Response): Promise<void> {
    const { nombre, apellido, fechaNacimiento } = req.body;

    const autor: Autor = {
        nombre,
        apellido,
        fechaNacimiento
    };

    try {
        await agregarAutor(autor);

        res.status(201).json({ message: 'Autor agregado correctamente' });
    } catch (error) {
        console.error('Error al dar de alta el autor:', (error as Error).message);
        res.status(500).json({ error: 'Error al dar de alta el autor' });
    }
}

export async function obtenerAutoresController(req: Request, res: Response): Promise<void> {
    try {
        const autores: Autor[] = await obtenerAutores();
        res.status(200).json(autores);
    } catch (error) {
        console.error('Error al obtener todos los autores:', (error as Error).message);
        res.status(500).json({ error: 'Error al obtener todos los autores' });
    }
}

export async function buscarAutorController(req: Request, res: Response): Promise<void> {
    const idOrNombre: string = req.params.idOrNombre;

    try {
        const autor: Autor | null = await buscarAutor(idOrNombre);

        if (autor) {
            res.status(200).json(autor);
        } else {
            res.status(404).json({ message: `Autor con ID o nombre '${idOrNombre}' no encontrado` });
        }
    } catch (error) {
        console.error('Error al buscar el autor por ID o nombre:', (error as Error).message);
        res.status(500).json({ error: 'Error al buscar el autor por ID o nombre' });
    }
}

// Controlador para actualizar un tutor por su ID
export async function actualizarAutorController(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    const { nombre, apellido, fechaNacimiento } = req.body;

    // Crea un objeto tutor usando la interfaz Tutor
    const autor: Autor = {
        nombre,
        apellido,
        fechaNacimiento
    };

    try {
        // Llama a la función actualizarTutor con el ID y el objeto tutor
        await actualizarAutor(id, autor);

        // Si la actualización fue exitosa, devuelve una respuesta exitosa
        res.status(200).json({ message: `Tutor con ID ${id} actualizado correctamente` });
    } catch (error) {
        // Si hubo un error, devuelve un error 500 junto con el mensaje de error
        console.error(`Error al actualizar el tutor con ID ${id}:`, (error as Error).message);
        res.status(500).json({ error: `Error al actualizar el tutor con ID ${id}` });
    }
}

// Controlador para eliminar un tutor por su ID
export async function eliminarAutorController(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);

    try {
        // Llama a la función eliminarTutor con el ID del tutor
        await eliminarAutor(id);

        // Si la eliminación fue exitosa, devuelve una respuesta exitosa
        res.status(200).json({ message: `Tutor con ID ${id} eliminado correctamente` });
    } catch (error) {
        // Si hubo un error, devuelve un error 500 junto con el mensaje de error
        console.error(`Error al eliminar el tutor con ID ${id}:`, (error as Error).message);
        res.status(500).json({ error: `Error al eliminar el tutor con ID ${id}` });
    }
}
