import { Request, Response } from 'express';
import { agregarLibro, obtenerLibros, buscarLibro, actualizarLibro, eliminarLibro } from '../db';
import { Libro } from '../models/Libro';

export async function agregarLibroController(req: Request, res: Response): Promise<void> {
    const { autorID, titulo, fechaPublicacion, precio } = req.body;

    const libro: Libro = {
        autorID,
        titulo,
        fechaPublicacion,
        precio
    };

    try {
        await agregarLibro(libro);

        res.status(201).json({ message: 'Libro agregado correctamente' });
    } catch (error) {
        console.error('Error al dar de alta el libro:', (error as Error).message);
        res.status(500).json({ error: 'Error al dar de alta el libro' });
    }
}

export async function obtenerLibroController(req: Request, res: Response): Promise<void> {
    try {
        const libros: Libro[] = await obtenerLibros();
        res.status(200).json(libros);
    } catch (error) {
        console.error('Error al obtener todos los libros:', (error as Error).message);
        res.status(500).json({ error: 'Error al obtener todos los libros' });
    }
}

export async function buscarLibroController(req: Request, res: Response): Promise<void> {
    const idOrNombre: string = req.params.idOrNombre;

    try {
        const libro: Libro | null = await buscarLibro(idOrNombre);

        if (libro) {
            res.status(200).json(libro);
        } else {
            res.status(404).json({ message: `Libro con ID o nombre '${idOrNombre}' no encontrado` });
        }
    } catch (error) {
        console.error('Error al buscar el libro por ID o nombre:', (error as Error).message);
        res.status(500).json({ error: 'Error al buscar el libro por ID o nombre' });
    }
}

export async function actualizarLibroController(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);
    const { autorID, titulo, fechaPublicacion, precio } = req.body;

    const libro: Libro = {
        autorID,
        titulo,
        fechaPublicacion,
        precio
    };

    try {
        await actualizarLibro(id, libro);

        res.status(200).json({ message: `Libro con ID ${id} actualizado correctamente` });
    } catch (error) {
        console.error(`Error al actualizar el libro con ID ${id}:`, (error as Error).message);
        res.status(500).json({ error: `Error al actualizar el libro con ID ${id}` });
    }
}

export async function eliminarLibroController(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id);

    try {
        await eliminarLibro(id);

        res.status(200).json({ message: `Libro con ID ${id} eliminado correctamente` });
    } catch (error) {
        console.error(`Error al eliminar el libro con ID ${id}:`, (error as Error).message);
        res.status(500).json({ error: `Error al eliminar el libro con ID ${id}` });
    }
}
